"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCart from "./AddToCart";
import StockBadge from "./StockBadge";
import { formatPrice } from "@/lib/format";
import { NO_IMAGE_PLACEHOLDER } from "@/lib/placeholder";
import type { Product } from "@/lib/types";

export default function QuickView({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const image = product.image_url || NO_IMAGE_PLACEHOLDER;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-neutral-950/90 px-4 py-2 text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      >
        Vue rapide
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[85vh] w-full max-w-3xl grid-cols-1 gap-6 overflow-y-auto rounded-[2rem] bg-white p-6 sm:grid-cols-2 sm:p-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 font-bold text-neutral-500 hover:bg-neutral-950 hover:text-white"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="relative h-64 rounded-2xl bg-neutral-50 sm:h-full">
              <img
                src={image}
                alt={product.name}
                className="h-full w-full object-contain p-6"
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-black">{product.name}</h2>
                <StockBadge stock={product.stock} />
              </div>

              {product.reference && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Réf. {product.reference}
                </p>
              )}

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {product.description || "Produit Hurrah Mercerie."}
              </p>

              <p className="mt-5 text-2xl font-black text-orange-600">
                {formatPrice(product.price)}
              </p>

              <div className="mt-6">
                <AddToCart product={product} />
              </div>

              <Link
                href={`/produits/${product.id}`}
                className="mt-4 block text-center text-sm font-bold text-neutral-500 hover:text-neutral-950"
              >
                Voir la fiche complète →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
