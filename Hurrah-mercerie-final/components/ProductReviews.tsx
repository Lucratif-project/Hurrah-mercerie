"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";
import { useI18n } from "@/lib/i18n/client";
import { formatDate } from "@/lib/i18n/config";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={n <= value ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviews({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const average = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setBusy(true);

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      author_name: name.trim(),
      rating,
      comment: comment.trim() || null,
    });

    setBusy(false);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    toast.show(t.reviews.thanksToast);
    setSubmitted(true);
    setName("");
    setComment("");
    setRating(5);
  }

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-2xl font-black">{t.reviews.title}</h2>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <Stars value={Math.round(average)} />
            <span className="text-sm font-bold text-neutral-600">
              {average.toFixed(1)}/5 · {t.reviews.count(reviews.length)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-neutral-500">
              {t.reviews.none}
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{review.author_name}</p>
                  <Stars value={review.rating} />
                </div>

                {review.comment && (
                  <p className="mt-2 text-sm text-neutral-600">{review.comment}</p>
                )}

                <p className="mt-2 text-xs text-neutral-400">
                  {formatDate(review.created_at, locale)}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-black">{t.reviews.leave}</h3>

          {submitted ? (
            <p className="mt-4 text-sm font-semibold text-emerald-600">
              {t.reviews.thanksPublished}
            </p>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.reviews.namePlaceholder}
                className="w-full rounded-xl border px-4 py-3 text-sm"
              />

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={t.reviews.starLabel(n)}
                    className="text-amber-400"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill={n <= rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
                    </svg>
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.reviews.commentPlaceholder}
                className="min-h-24 w-full rounded-xl border px-4 py-3 text-sm"
              />

              <button
                disabled={busy}
                className="w-full rounded-full bg-neutral-950 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {busy ? t.reviews.sending : t.reviews.publish}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
