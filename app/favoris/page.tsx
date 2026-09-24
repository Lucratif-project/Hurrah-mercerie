"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/useWishlist";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

export default function Favoris() {
  const { t } = useI18n();
  const { ids } = useWishlist();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    async function load() {
      if (!ids.length) {
        setProducts([]);
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("*, product_images(image_url, display_order)")
        .in("id", ids);

      const mapped = (data || []).map((p: any) => ({
        ...p,
        image_url:
          p.product_images?.sort(
            (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
          )[0]?.image_url || null,
      }));

      setProducts(mapped);
    }

    load();
  }, [ids]);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Hurrah Mercerie
          </p>

          <h1 className="mt-3 text-5xl font-black">{t.favorites.title}</h1>

          {products === null ? (
            <p className="mt-10 text-neutral-500">{t.common.loading}</p>
          ) : products.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-white p-10 text-center">
              <p className="font-semibold text-neutral-600">
                {t.favorites.empty}
              </p>

              <Link
                href="/catalogue"
                className="mt-5 inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white"
              >
                {t.common.viewCatalogue}
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
