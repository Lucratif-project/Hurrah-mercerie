"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";

type PromoCode = {
  id: string;
  code: string;
  discount_percent: number;
  active: boolean;
  expires_at: string | null;
};

export default function PromoManager({
  promoCodes,
}: {
  promoCodes: PromoCode[];
}) {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("10");
  const [expiresAt, setExpiresAt] = useState("");
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !discount) return;

    setBusy(true);

    const { error } = await supabase.from("promo_codes").insert({
      code: code.trim().toUpperCase(),
      discount_percent: Number(discount),
      expires_at: expiresAt || null,
    });

    setBusy(false);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    setCode("");
    setDiscount("10");
    setExpiresAt("");
    window.location.reload();
  }

  async function toggle(promo: PromoCode) {
    const { error } = await supabase
      .from("promo_codes")
      .update({ active: !promo.active })
      .eq("id", promo.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  async function remove(promo: PromoCode) {
    if (!window.confirm(`Supprimer le code "${promo.code}" ?`)) return;

    const { error } = await supabase
      .from("promo_codes")
      .delete()
      .eq("id", promo.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <form onSubmit={create} className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Créer un code</h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code (ex : BIENVENUE10)"
            className="w-full rounded-2xl border px-5 py-4 uppercase"
          />

          <input
            required
            type="number"
            min="1"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Réduction (%)"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <div>
            <label className="mb-2 block text-xs font-bold text-neutral-500">
              Expiration (optionnelle)
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4"
            />
          </div>
        </div>

        <button
          disabled={busy}
          className="mt-6 w-full rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {busy ? "Création…" : "Créer le code"}
        </button>
      </form>

      <div className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Codes existants</h2>

        <div className="mt-6 space-y-3">
          {promoCodes.length === 0 ? (
            <p className="text-neutral-500">Aucun code promo pour le moment.</p>
          ) : (
            promoCodes.map((promo) => (
              <div
                key={promo.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-black">{promo.code}</p>
                  <p className="text-sm text-neutral-500">
                    -{promo.discount_percent}%
                    {promo.expires_at &&
                      ` · expire le ${new Date(promo.expires_at).toLocaleDateString("fr-FR")}`}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggle(promo)}
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      promo.active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {promo.active ? "Actif" : "Désactivé"}
                  </button>

                  <button
                    onClick={() => remove(promo)}
                    className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
