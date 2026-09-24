import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import AddToCart from "@/components/AddToCart";
import StockBadge from "@/components/StockBadge";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import { getPlaceholder } from "@/lib/placeholder";
import { getI18n } from "@/lib/i18n/server";
import { tr } from "@/lib/i18n/localized";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type Params = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const { t, locale } = await getI18n();

  const { data: p } = await supabase
    .from("products")
    .select("*, product_images(image_url, display_order)")
    .eq("id", id)
    .single();

  if (!p) notFound();

  const images = (p.product_images || [])
    .slice()
    .sort(
      (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
    )
    .map((img: any) => img.image_url);

  const mainImage = images[0] || getPlaceholder(locale);
  const product = { ...p, image_url: mainImage };

  const name = tr(p, "name", locale);
  const description = tr(p, "description", locale);
  const color = tr(p, "color", locale);
  const size = tr(p, "size", locale);
  const format = tr(p, "format", locale);
  const variants = [color, size, format].filter(Boolean);

  const { data: reviews } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", p.id)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  let similar: any[] = [];
  if (p.category_id) {
    const { data } = await supabase
      .from("products")
      .select("*, product_images(image_url, display_order)")
      .eq("category_id", p.category_id)
      .eq("status", "published")
      .neq("id", p.id)
      .limit(3);

    similar = (data || []).map((prod: any) => ({
      ...prod,
      image_url:
        prod.product_images?.sort(
          (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
        )[0]?.image_url || null,
    }));
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Link href="/catalogue" className="font-bold">
            {t.product.back}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <ProductGallery images={images.length ? images : [mainImage]} name={name} />

            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-5xl font-black">{name}</h1>
                <StockBadge stock={p.stock} />
              </div>

              {p.reference && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                  {t.common.reference(p.reference)}
                </p>
              )}

              <p className="mt-6 leading-8 text-neutral-600">
                {description}
              </p>

              {variants.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {color && (
                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold">
                      {t.product.color}{t.common.colon} {color}
                    </span>
                  )}
                  {size && (
                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold">
                      {t.product.size}{t.common.colon} {size}
                    </span>
                  )}
                  {format && (
                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold">
                      {t.product.format}{t.common.colon} {format}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-7 text-3xl font-black text-orange-600">
                {formatPrice(p.price, locale)}
              </p>

              <p className="mt-3 text-sm text-neutral-500">{t.product.stock(p.stock)}</p>

              <div className="mt-8">
                <AddToCart product={product} />
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-black">{t.product.similar}</h2>

              <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </section>
          )}

          <ProductReviews productId={p.id} reviews={reviews || []} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
