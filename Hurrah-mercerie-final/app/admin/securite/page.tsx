import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// Heure actuelle (pages rendues à chaque visite, côté serveur).
function nowMs() {
  return Date.now();
}

type Attempt = {
  id: number;
  created_at: string;
  email: string | null;
  ip: string | null;
  country: string | null;
  user_agent: string | null;
  success: boolean;
  reason: string | null;
};

type AuthEvent = { created_at: string; action: string; email: string | null; ip: string | null };

const REASONS: Record<string, { label: string; color: string }> = {
  success: { label: "Connexion réussie", color: "bg-emerald-50 text-emerald-700" },
  bad_password: { label: "Mot de passe incorrect", color: "bg-red-50 text-red-700" },
  not_admin: { label: "Compte non admin", color: "bg-orange-50 text-orange-700" },
  blocked: { label: "Bloquée (trop d'essais)", color: "bg-neutral-900 text-white" },
  invalid: { label: "Requête invalide", color: "bg-neutral-100 text-neutral-600" },
};

const FILTERS = [
  { key: "tout", label: "Tout" },
  { key: "echecs", label: "Échecs" },
  { key: "reussies", label: "Réussies" },
  { key: "bloquees", label: "Bloquées" },
];

function device(ua: string | null) {
  if (!ua) return "—";
  const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad/i.test(ua) ? "iPhone/iPad" : /Windows/i.test(ua) ? "Windows" : /Mac OS/i.test(ua) ? "Mac" : /Linux/i.test(ua) ? "Linux" : "";
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : /curl|python|wget|bot|http/i.test(ua) ? "Script / robot" : "Autre";
  return [browser, os].filter(Boolean).join(" · ");
}

const fmt = (d: string) =>
  new Date(d).toLocaleString("fr-FR", { timeZone: "Africa/Porto-Novo", dateStyle: "short", timeStyle: "medium" });

export default async function SecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ filtre?: string }>;
}) {
  const supabase = await createClient();
  const { filtre = "tout" } = await searchParams;

  const { data: owner } = await supabase.rpc("is_owner");
  if (!owner) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/admin" className="font-bold">← Administration</Link>
          <h1 className="mt-8 text-4xl font-black">Sécurité</h1>
          <p className="mt-6 rounded-3xl bg-white p-8 text-neutral-600">
            Cette page est réservée à l&apos;administrateur principal.
          </p>
        </div>
      </main>
    );
  }

  const since7d = new Date(nowMs() - 7 * 86400_000).toISOString();
  const since24h = nowMs() - 86400_000;
  const since15m = nowMs() - 15 * 60_000;

  const [{ data: rows }, { data: events, error: eventsError }] = await Promise.all([
    supabase
      .from("login_attempts")
      .select("*")
      .gte("created_at", since7d)
      .order("created_at", { ascending: false })
      .limit(1000),
    supabase.rpc("admin_auth_events", { p_limit: 30 }),
  ]);

  const attempts = (rows || []) as Attempt[];
  const last24 = attempts.filter((a) => new Date(a.created_at).getTime() > since24h);
  const failures24 = last24.filter((a) => !a.success);
  const success7 = attempts.filter((a) => a.success);

  // Adresses IP actuellement bloquées (5 échecs ou plus en 15 minutes).
  const recentFailByIp = new Map<string, number>();
  for (const a of attempts) {
    if (!a.success && a.ip && new Date(a.created_at).getTime() > since15m) {
      recentFailByIp.set(a.ip, (recentFailByIp.get(a.ip) || 0) + 1);
    }
  }
  const blockedIps = [...recentFailByIp.entries()].filter(([, n]) => n >= 5);

  // Adresses IP les plus actives en échecs (7 jours).
  const failByIp = new Map<string, { n: number; country: string | null; emails: Set<string> }>();
  for (const a of attempts) {
    if (a.success || !a.ip) continue;
    const e = failByIp.get(a.ip) || { n: 0, country: a.country, emails: new Set<string>() };
    e.n += 1;
    if (a.email) e.emails.add(a.email);
    failByIp.set(a.ip, e);
  }
  const topIps = [...failByIp.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 8);

  // Connexion réussie depuis une adresse jamais vue pour ce compte.
  const seen = new Set<string>();
  const newIpIds = new Set<number>();
  for (const a of [...attempts].reverse()) {
    if (!a.success) continue;
    const key = `${a.email}|${a.ip}`;
    if (!seen.has(key) && [...seen].some((k) => k.startsWith(`${a.email}|`))) newIpIds.add(a.id);
    seen.add(key);
  }

  const shown = attempts.filter((a) =>
    filtre === "echecs" ? !a.success : filtre === "reussies" ? a.success : filtre === "bloquees" ? a.reason === "blocked" : true
  );

  const alert = failures24.length >= 10 || blockedIps.length > 0;

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="font-bold">← Administration</Link>

        <h1 className="mt-8 text-5xl font-black">Sécurité</h1>
        <p className="mt-3 text-neutral-600">
          Historique des tentatives de connexion à l&apos;administration (7 derniers jours, conservé 90 jours).
        </p>

        {alert && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-800">
            <p className="text-lg font-black">⚠ Activité suspecte</p>
            <p className="mt-1 text-sm">
              {failures24.length} échec{failures24.length > 1 ? "s" : ""} en 24 h
              {blockedIps.length > 0 && `, ${blockedIps.length} adresse${blockedIps.length > 1 ? "s" : ""} bloquée${blockedIps.length > 1 ? "s" : ""} en ce moment`}.
              Vérifiez que vos mots de passe administrateurs sont longs et uniques.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-4">
          {[
            ["Échecs (24 h)", failures24.length, failures24.length ? "text-red-600" : ""],
            ["IP bloquées maintenant", blockedIps.length, blockedIps.length ? "text-red-600" : ""],
            ["Connexions réussies (7 j)", success7.length, "text-emerald-600"],
            ["Nouvelles adresses (7 j)", newIpIds.size, newIpIds.size ? "text-amber-600" : ""],
          ].map(([label, value, color]) => (
            <div key={label as string} className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">{label}</p>
              <p className={`mt-2 text-3xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {topIps.length > 0 && (
          <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-xl font-black">Adresses IP avec le plus d&apos;échecs (7 j)</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-neutral-400">
                  <tr><th className="py-2 pr-4">IP</th><th className="pr-4">Pays</th><th className="pr-4">Échecs</th><th>Comptes visés</th></tr>
                </thead>
                <tbody>
                  {topIps.map(([ip, v]) => (
                    <tr key={ip} className="border-t">
                      <td className="py-2 pr-4 font-mono">{ip}</td>
                      <td className="pr-4">{v.country || "—"}</td>
                      <td className="pr-4 font-bold text-red-600">{v.n}</td>
                      <td className="text-neutral-600">{[...v.emails].slice(0, 3).join(", ")}{v.emails.size > 3 ? "…" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black">Historique</h2>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <Link
                  key={f.key}
                  href={`/admin/securite?filtre=${f.key}`}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${filtre === f.key ? "bg-neutral-950 text-white" : "border"}`}
                >
                  {f.label}
                </Link>
              ))}
            </div>
          </div>

          {shown.length === 0 ? (
            <p className="mt-6 text-neutral-500">Aucune tentative enregistrée.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-neutral-400">
                  <tr>
                    <th className="py-2 pr-4">Date</th>
                    <th className="pr-4">Résultat</th>
                    <th className="pr-4">Email saisi</th>
                    <th className="pr-4">IP</th>
                    <th className="pr-4">Pays</th>
                    <th>Appareil</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.slice(0, 300).map((a) => {
                    const r = REASONS[a.reason || ""] || REASONS.invalid;
                    return (
                      <tr key={a.id} className="border-t align-top">
                        <td className="whitespace-nowrap py-2 pr-4 text-neutral-500">{fmt(a.created_at)}</td>
                        <td className="pr-4">
                          <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${r.color}`}>{r.label}</span>
                          {newIpIds.has(a.id) && (
                            <span className="ml-1 whitespace-nowrap rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800">Nouvelle adresse</span>
                          )}
                        </td>
                        <td className="pr-4">{a.email || "—"}</td>
                        <td className="pr-4 font-mono">{a.ip || "—"}</td>
                        <td className="pr-4">{a.country || "—"}</td>
                        <td className="text-neutral-600">{device(a.user_agent)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
          <h2 className="text-xl font-black">Journal Supabase</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Inclut les connexions faites directement auprès de Supabase, sans passer par le site.
            Les échecs de ce type sont visibles dans Supabase &gt; Logs &gt; Auth.
          </p>
          {eventsError ? (
            <p className="mt-4 text-sm text-neutral-500">Journal indisponible.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody>
                  {((events || []) as AuthEvent[]).map((e, i) => (
                    <tr key={i} className="border-t">
                      <td className="whitespace-nowrap py-2 pr-4 text-neutral-500">{fmt(e.created_at)}</td>
                      <td className="pr-4 font-bold">{e.action}</td>
                      <td className="pr-4">{e.email || "—"}</td>
                      <td className="font-mono">{e.ip || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
