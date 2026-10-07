// Connexion administrateur, côté serveur.
// Chaque tentative (réussie ou non) est enregistrée dans login_attempts
// avec l'adresse IP, le pays et l'appareil, et les attaques par force
// brute sont bloquées automatiquement pendant 15 minutes.
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MINUTES = 15;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_PER_EMAIL = 10;

type Reason = "success" | "bad_password" | "not_admin" | "blocked" | "invalid";

function clientInfo(request: NextRequest) {
  // Sur Vercel, x-forwarded-for est écrit par la plateforme : la première
  // adresse est celle du visiteur.
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const ip =
    forwarded.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "inconnue";

  return {
    ip: ip.slice(0, 64),
    country: request.headers.get("x-vercel-ip-country")?.slice(0, 8) || null,
    userAgent: (request.headers.get("user-agent") || "").slice(0, 300),
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: NextRequest) {
  const info = clientInfo(request);
  const admin = createAdminClient();

  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase().slice(0, 200);
    password = String(body?.password ?? "").slice(0, 200);
  } catch {
    // corps invalide
  }

  async function log(success: boolean, reason: Reason) {
    if (!admin) return;
    await admin.from("login_attempts").insert({
      email: email || null,
      ip: info.ip,
      country: info.country,
      user_agent: info.userAgent,
      success,
      reason,
    });
  }

  if (!email || !password) {
    await log(false, "invalid");
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  // 1. Trop d'échecs récents depuis cette adresse IP ou sur ce compte ?
  if (admin) {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const [byIp, byEmail] = await Promise.all([
      admin
        .from("login_attempts")
        .select("id", { count: "exact", head: true })
        .eq("ip", info.ip)
        .eq("success", false)
        .gte("created_at", since),
      admin
        .from("login_attempts")
        .select("id", { count: "exact", head: true })
        .ilike("email", email)
        .eq("success", false)
        .neq("reason", "blocked")
        .gte("created_at", since),
    ]);

    if ((byIp.count ?? 0) >= MAX_FAILURES_PER_IP || (byEmail.count ?? 0) >= MAX_FAILURES_PER_EMAIL) {
      await log(false, "blocked");
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${WINDOW_MINUTES} minutes.` },
        { status: 429 }
      );
    }
  }

  // 2. Vérification du mot de passe (la session est posée dans les cookies).
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    await log(false, "bad_password");
    await sleep(600); // ralentit les essais en série
    return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  // 3. Le compte est-il administrateur ?
  const { data: isAdmin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!isAdmin) {
    await supabase.auth.signOut();
    await log(false, "not_admin");
    return NextResponse.json({ error: "Ce compte n'est pas administrateur." }, { status: 403 });
  }

  await log(true, "success");
  return NextResponse.json({ ok: true });
}
