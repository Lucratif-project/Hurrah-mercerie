"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";

type Admin = {
  id: string;
  email: string | null;
  created_at: string;
};

export default function AdministratorManager({
  admins,
}: {
  admins: Admin[];
}) {
  const toast = useToast();
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault();

    if (!uid.trim()) {
      setMessage("L'UID de l'utilisateur est obligatoire.");
      return;
    }

    setBusy(true);
    setMessage("");

    const { error } = await supabase
      .from("admin_users")
      .insert({ id: uid.trim(), email: email.trim() || null });

    setBusy(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setUid("");
    setEmail("");
    setMessage("Administrateur ajouté.");
    setTimeout(() => window.location.reload(), 600);
  }

  async function removeAdmin(admin: Admin) {
    if (
      !window.confirm(
        `Retirer les droits administrateur de ${admin.email || admin.id} ?`
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", admin.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={addAdmin} className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Ajouter un administrateur</h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="UID Supabase de l'utilisateur"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail (pour l'affichage)"
            className="w-full rounded-2xl border px-5 py-4"
          />
        </div>

        {message && (
          <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {busy ? "Ajout…" : "Ajouter"}
        </button>
      </form>

      <div className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Administrateurs actuels</h2>

        <div className="mt-6 space-y-3">
          {admins.length === 0 ? (
            <p className="text-neutral-500">Aucun administrateur enregistré.</p>
          ) : (
            admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">{admin.email || "Sans e-mail"}</p>
                  <p className="text-xs text-neutral-400">{admin.id}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeAdmin(admin)}
                  className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  Retirer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
