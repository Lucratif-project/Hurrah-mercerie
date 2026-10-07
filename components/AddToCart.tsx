"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

type CartLine = Product & { quantity: number };

/**
 * Ajoute un produit au panier (stocké dans le navigateur).
 * Le stock n'est PAS retiré ici : il est réservé uniquement quand la
 * commande est validée (fonction create_order côté serveur). Sinon un
 * panier abandonné bloquerait le stock pour toujours.
 */
export default function AddToCart({ product }: { product: Product }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState(false);

  function add() {
    if (product.stock <= 0) return;

    let cart: CartLine[] = [];
    try {
      cart = JSON.parse(localStorage.getItem("hurrah-cart") || "[]");
    } catch {
      cart = [];
    }

    const existing = cart.find((item) => item.id === product.id);
    const inCart = existing?.quantity ?? 0;

    // On ne laisse pas mettre plus d'articles que le stock affiché.
    if (inCart >= product.stock) {
      setLimit(true);
      setTimeout(() => setLimit(false), 2000);
      return;
    }

    if (existing) {
      existing.quantity += 1;
      existing.stock = product.stock;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("hurrah-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("hurrah-cart-updated"));
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  }

  return (
    <div>
      <button
        onClick={add}
        disabled={product.stock <= 0}
        className="w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {product.stock <= 0
          ? t.addToCart.out
          : done
            ? t.addToCart.added
            : t.addToCart.add}
      </button>

      {limit && (
        <p className="mt-2 text-center text-xs font-semibold text-amber-600">
          {t.addToCart.limit(product.stock)}
        </p>
      )}
    </div>
  );
}
