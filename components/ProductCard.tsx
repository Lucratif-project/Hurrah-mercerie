"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import StockBadge from "./StockBadge";
import WishlistButton from "./WishlistButton";
import QuickView from "./QuickView";
import { formatPrice } from "@/lib/format";
import { getPlaceholder } from "@/lib/placeholder";
import { useI18n } from "@/lib/i18n/client";
import { tr } from "@/lib/i18n/localized";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { t, locale } = useI18n();
  const image = product.image_url;
  const name = tr(product, "name", locale);
  const description = tr(product, "description", locale);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Link href={`/produits/${product.id}`} className="block">
          <div className="relative h-64 overflow-hidden bg-neutral-100">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain p-6 transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <img
                src={getPlaceholder(locale)}
                alt={name}
                className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-110"
              />
            )}
          </div>
        </Link>

        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} />
        </div>

        <QuickView product={product} />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black">
            {name}
          </h3>

          <StockBadge stock={product.stock} />
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
          {description || t.common.defaultProductDescription}
        </p>

        {product.reference && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {t.common.reference(product.reference)}
          </p>
        )}

        <p className="mt-4 text-xl font-black text-orange-600">
          {formatPrice(product.price, locale)}
        </p>

        <div className="mt-4">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
