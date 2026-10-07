"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "hurrah-wishlist";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useWishlist(productId?: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const update = () => setIds(read());
    window.addEventListener("hurrah-wishlist-updated", update);
    return () => window.removeEventListener("hurrah-wishlist-updated", update);
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("hurrah-wishlist-updated"));
  }, []);

  return {
    ids,
    isFavorite: productId ? ids.includes(productId) : false,
    toggle,
  };
}
