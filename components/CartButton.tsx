"use client";

import { useEffect, useState } from "react";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("hurrah-cart") || "[]");
        setCount(cart.reduce((n: number, item: { quantity?: number }) => n + (item.quantity || 0), 0));
      } catch {
        setCount(0);
      }
    };
    update();
    window.addEventListener("hurrah-cart-updated", update);
    return () => window.removeEventListener("hurrah-cart-updated", update);
  }, []);

  return <span>Panier{count > 0 ? ` (${count})` : ""}</span>;
}
