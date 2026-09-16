import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const image =
    product.image_url || "/images/machines/machine singer.jpeg";

  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/produits/${product.id}`} className="block">
        <div className="relative h-64 bg-neutral-100">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-black">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
          {product.description || "Produit Hurrah Mercerie."}
        </p>

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