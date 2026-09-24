"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

export default function AddToCart({ product }: { product: Product }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  function add() {
    const raw = localStorage.getItem("hurrah-cart");
    const cart = raw ? JSON.parse(raw) : [];
    const existing = cart.find((item: Product & { quantity: number }) => item.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("hurrah-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("hurrah-cart-updated"));
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      onClick={add}
      disabled={product.stock <= 0}
      className="w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {product.stock <= 0 ? t.addToCart.out : done ? t.addToCart.added : t.addToCart.add}
    </button>
  );
}
