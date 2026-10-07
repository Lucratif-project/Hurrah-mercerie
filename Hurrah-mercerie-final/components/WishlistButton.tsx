"use client";

import { useWishlist } from "@/lib/useWishlist";
import { useI18n } from "@/lib/i18n/client";

export default function WishlistButton({ productId }: { productId: string }) {
  const { t } = useI18n();
  const { isFavorite, toggle } = useWishlist(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={isFavorite ? t.product.removeFromWishlist : t.product.addToWishlist}
      aria-pressed={isFavorite}
      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition ${
        isFavorite
          ? "bg-orange-600 text-white"
          : "bg-white text-neutral-400 shadow-sm hover:text-orange-600"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12.1 21s-7.6-4.6-10-9.1C.6 8.6 2 5 5.5 4.2 8 3.6 10 5 12.1 7.5 14.2 5 16.2 3.6 18.7 4.2 22.2 5 23.6 8.6 22.1 11.9c-2.4 4.5-10 9.1-10 9.1z" />
      </svg>
    </button>
  );
}
