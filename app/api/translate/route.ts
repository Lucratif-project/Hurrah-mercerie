// Traduction automatique FR -> EN pour l'espace admin (bouton « Traduire »).
// Utilise l'API DeepL (offre gratuite : 500 000 caractères / mois).
// Variable d'environnement à définir : DEEPL_API_KEY (serveur uniquement,
// surtout PAS de préfixe NEXT_PUBLIC_).
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const MAX_CHARS = 20000;

async function isAdmin() {
  const store = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll() {
          // Lecture seule : rien à écrire ici.
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  return Boolean(admin);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs." }, { status: 401 });
  }

  const key = process.env.DEEPL_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Traduction automatique non configurée (DEEPL_API_KEY manquante)." },
      { status: 500 }
    );
  }

  let texts: string[] = [];
  try {
    const body = await request.json();
    texts = Array.isArray(body?.texts) ? body.texts.map((x: unknown) => String(x ?? "")) : [];
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (texts.length === 0) return NextResponse.json({ translations: [] });
  if (texts.join("").length > MAX_CHARS) {
    return NextResponse.json({ error: "Texte trop long pour une traduction." }, { status: 413 });
  }

  // Les clés gratuites se terminent par ":fx" et utilisent un autre domaine.
  const host = key.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";

  const response = await fetch(`${host}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texts,
      source_lang: "FR",
      target_lang: "EN-GB",
      preserve_formatting: true,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Erreur DeepL (${response.status}).` },
      { status: 502 }
    );
  }

  const data = (await response.json()) as { translations: { text: string }[] };
  return NextResponse.json({ translations: data.translations.map((t) => t.text) });
}
