import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import StockBadge from "./StockBadge";
import WishlistButton from "./WishlistButton";
import QuickView from "./QuickView";
import { formatPrice } from "@/lib/format";
import { NO_IMAGE_PLACEHOLDER } from "@/lib/placeholder";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const image = product.image_url;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Link href={`/produits/${product.id}`} className="block">
          <div className="relative h-64 overflow-hidden bg-neutral-100">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-contain p-6 transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <img
                src={NO_IMAGE_PLACEHOLDER}
                alt={product.name}
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
            {product.name}
          </h3>

          <StockBadge stock={product.stock} />
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
          {product.description || "Produit Hurrah Mercerie."}
        </p>

        {product.reference && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Réf. {product.reference}
          </p>
        )}

        <p className="mt-4 text-xl font-black text-orange-600">
          {formatPrice(product.price)}
        </p>

        <div className="mt-4">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
