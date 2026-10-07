"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
  products: { name: string } | null;
};

export default function ReviewManager({ reviews }: { reviews: Review[] }) {
  const toast = useToast();
  const [items, setItems] = useState(reviews);
  const [busyId, setBusyId] = useState<string | null>(null);
  const pending = items.filter((r) => !r.approved);
  const published = items.filter((r) => r.approved);

  async function setApproved(review: Review, approved: boolean) {
    setBusyId(review.id);
    const { error } = await supabase
      .from("product_reviews")
      .update({ approved })
      .eq("id", review.id);
    setBusyId(null);

    if (error) {
      toast.show(error.message, "error");
      return;
    }
    setItems((list) => list.map((r) => (r.id === review.id ? { ...r, approved } : r)));
    toast.show(approved ? "Avis publié." : "Avis retiré du site.");
  }

  async function remove(review: Review) {
    if (!window.confirm(`Supprimer définitivement l'avis de « ${review.author_name} » ?`)) return;
    setBusyId(review.id);
    const { error } = await supabase.from("product_reviews").delete().eq("id", review.id);
    setBusyId(null);

    if (error) {
      toast.show(error.message, "error");
      return;
    }
    setItems((list) => list.filter((r) => r.id !== review.id));
  }

  function renderCard(review: Review) {
    return (
      <div key={review.id} className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-black">
              {review.author_name}{" "}
              <span className="text-amber-500">
                {"★".repeat(review.rating)}
                <span className="text-neutral-300">{"★".repeat(5 - review.rating)}</span>
              </span>
            </p>
            <p className="text-xs text-neutral-400">
              {review.products?.name || "Produit supprimé"} ·{" "}
              {new Date(review.created_at).toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="flex gap-2">
            {review.approved ? (
              <button
                onClick={() => setApproved(review, false)}
                disabled={busyId === review.id}
                className="rounded-full border px-4 py-2 text-xs font-bold disabled:opacity-50"
              >
                Retirer du site
              </button>
            ) : (
              <button
                onClick={() => setApproved(review, true)}
                disabled={busyId === review.id}
                className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                Publier
              </button>
            )}
            <button
              onClick={() => remove(review)}
              disabled={busyId === review.id}
              className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </div>

        {review.comment && (
          <p className="mt-3 whitespace-pre-line text-sm text-neutral-700">{review.comment}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-black">
          En attente <span className="text-orange-600">({pending.length})</span>
        </h2>
        <div className="mt-4 space-y-3">
          {pending.length === 0 ? (
            <p className="text-neutral-500">Aucun avis en attente.</p>
          ) : (
            pending.map(renderCard)
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black">Publiés ({published.length})</h2>
        <div className="mt-4 space-y-3">
          {published.length === 0 ? (
            <p className="text-neutral-500">Aucun avis publié.</p>
          ) : (
            published.map(renderCard)
          )}
        </div>
      </section>
    </div>
  );
}
