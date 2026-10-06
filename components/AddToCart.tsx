"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";
import { supabase } from "@/lib/supabase";

export default function AddToCart({ product }: { product: Product }) {
  const { t } = useI18n();

  const [remainingStock, setRemainingStock] = useState(product.stock);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function add() {
    if (remainingStock <= 0 || loading) return;

    setLoading(true);
    setError("");

    // Diminue réellement le stock dans Supabase
    const { data: newStock, error: stockError } = await supabase.rpc(
      "decrease_product_stock",
      {
        p_product_id: product.id,
        p_quantity: 1,
      }
    );

    if (stockError || newStock === null || newStock === undefined) {
      setError("Stock insuffisant ou produit indisponible.");
      setLoading(false);
      return;
    }

    // Ajout au panier local
    const raw = localStorage.getItem("hurrah-cart");
    const cart = raw ? JSON.parse(raw) : [];

    const existing = cart.find(
      (item: Product & { quantity: number }) =>
        item.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("hurrah-cart", JSON.stringify(cart));

    // Mise à jour immédiate de l'affichage
    setRemainingStock(Number(newStock));
    setDone(true);
    setLoading(false);

    window.dispatchEvent(new Event("hurrah-cart-updated"));

    setTimeout(() => {
      setDone(false);
    }, 1600);
  }

  return (
    <div>
      <button
        onClick={add}
        disabled={remainingStock <= 0 || loading}
        className="w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {remainingStock <= 0
          ? t.addToCart.out
          : loading
            ? "Ajout..."
            : done
              ? t.addToCart.added
              : t.addToCart.add}
      </button>

      <p className="mt-2 text-center text-sm font-semibold text-neutral-500">
        {remainingStock > 0
          ? `${remainingStock} en stock`
          : t.addToCart.out}
      </p>

      {error && (
        <p className="mt-2 text-center text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}