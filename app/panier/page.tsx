"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/Toast";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Promo = { code: string; discount_percent: number };

export default function Panier() {
  const toast = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [checkingPromo, setCheckingPromo] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("hurrah-cart") || "[]"));
    } catch {
      setCart([]);
    }
    try {
      const saved = localStorage.getItem("hurrah-promo");
      if (saved) setPromo(JSON.parse(saved));
    } catch {
      setPromo(null);
    }
  }, []);

  function save(next: CartItem[]) {
    setCart(next);
    localStorage.setItem("hurrah-cart", JSON.stringify(next));
    window.dispatchEvent(new Event("hurrah-cart-updated"));
  }

  const subtotal = cart.reduce((s, p) => s + p.price * p.quantity, 0);
  const discount = promo ? Math.round((subtotal * promo.discount_percent) / 100) : 0;
  const total = subtotal - discount;

  async function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setCheckingPromo(true);

    const { data } = await supabase
      .from("promo_codes")
      .select("code, discount_percent, active, expires_at")
      .ilike("code", promoInput.trim())
      .maybeSingle();

    setCheckingPromo(false);

    if (!data || !data.active || (data.expires_at && new Date(data.expires_at) < new Date())) {
      toast.show("Code promo invalide ou expiré.", "error");
      return;
    }

    const applied = { code: data.code, discount_percent: data.discount_percent };
    setPromo(applied);
    localStorage.setItem("hurrah-promo", JSON.stringify(applied));
    setPromoInput("");
    toast.show(`Code "${data.code}" appliqué : -${data.discount_percent}%`);
  }

  function removePromo() {
    setPromo(null);
    localStorage.removeItem("hurrah-promo");
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="font-bold">
          ← Accueil
        </Link>

        <h1 className="mt-8 text-5xl font-black">Votre panier</h1>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10">
            Votre panier est vide.
            <br />
            <Link href="/catalogue" className="mt-5 inline-block font-bold text-orange-600">
              Voir le catalogue →
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-4">
              {cart.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5"
                >
                  <div>
                    <h2 className="font-black">{p.name}</h2>
                    <p className="text-orange-600">{formatPrice(p.price)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        save(
                          cart.map((x) =>
                            x.id === p.id
                              ? { ...x, quantity: Math.max(1, x.quantity - 1) }
                              : x
                          )
                        )
                      }
                      className="rounded-full border px-3"
                    >
                      −
                    </button>
                    <span>{p.quantity}</span>
                    <button
                      onClick={() =>
                        save(
                          cart.map((x) =>
                            x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x
                          )
                        )
                      }
                      className="rounded-full border px-3"
                    >
                      +
                    </button>
                    <button
                      onClick={() => save(cart.filter((x) => x.id !== p.id))}
                      className="ml-3 text-sm text-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={applyPromo}
              className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl bg-white p-5"
            >
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Code promo"
                className="flex-1 rounded-2xl border px-4 py-3 text-sm"
              />
              <button
                disabled={checkingPromo}
                className="rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {checkingPromo ? "Vérification…" : "Appliquer"}
              </button>

              {promo && (
                <div className="flex w-full items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  <span>Code "{promo.code}" : -{promo.discount_percent}%</span>
                  <button type="button" onClick={removePromo} className="text-red-600">
                    Retirer
                  </button>
                </div>
              )}
            </form>

            <div className="mt-8 rounded-3xl bg-neutral-950 p-7 text-white">
              <div className="flex justify-between text-sm text-white/60">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {promo && (
                <div className="mt-1 flex justify-between text-sm text-emerald-400">
                  <span>Réduction ({promo.discount_percent}%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-xl font-black">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                href="/commande"
                className="mt-6 block rounded-full bg-orange-600 py-4 text-center font-bold"
              >
                Passer la commande
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
