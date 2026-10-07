import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { getI18n } from "@/lib/i18n/server";
import { tr } from "@/lib/i18n/localized";

export async function generateMetadata() {
  const { t } = await getI18n();
  return { title: t.kits.metaTitle, description: t.kits.metaDescription };
}

export default async function Kits() {
  const { t, locale } = await getI18n();

  const { data: bundles } = await supabase
    .from("bundles")
    .select("*, bundle_items(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Hurrah Mercerie
          </p>

          <h1 className="mt-3 text-5xl font-black">{t.kits.title}</h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            {t.kits.intro}
          </p>

          {!bundles || bundles.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center text-neutral-500">
              {t.kits.empty}
            </div>
          ) : (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {bundles.map((bundle: any) => (
                <div
                  key={bundle.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <div className="h-56 bg-neutral-100">
                    <img
                      src={bundle.image_url || "/images/categories/fils.jpeg"}
                      alt={tr(bundle, "name", locale)}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-black">{tr(bundle, "name", locale)}</h2>

                    {bundle.description && (
                      <p className="mt-2 text-sm text-neutral-500">
                        {tr(bundle, "description", locale)}
                      </p>
                    )}

                    {bundle.bundle_items?.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-neutral-600">
                        {bundle.bundle_items.map((item: any) => (
                          <li key={item.id}>• {tr(item, "label", locale)}</li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 text-xl font-black text-orange-600">
                      {formatPrice(bundle.price, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
