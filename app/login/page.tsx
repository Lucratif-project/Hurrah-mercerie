"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("Ce compte n'est pas administrateur.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#faf8f4] px-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <Link href="/" className="font-bold">
          ← Accueil
        </Link>

        <div className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Hurrah Mercerie
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Connexion administrateur
          </h1>

          <p className="mt-4 text-neutral-500">
            Connectez-vous pour accéder à votre espace d'administration.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold">
              Adresse e-mail
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hurrahmercerie.com"
              className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Mot de passe
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-neutral-950 py-4 font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
