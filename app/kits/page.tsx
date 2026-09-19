import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Kits couture",
  description: "Nos kits prêts à l'emploi à prix groupé.",
};

export default async function Kits() {
  const { data: bundles } = await supabase
    .from("bundles")
    .select("*, bundle_items(id, label)")
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

          <h1 className="mt-3 text-5xl font-black">Kits couture</h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            Des sélections prêtes à l'emploi, à prix groupé, pour bien
            démarrer votre projet.
          </p>

          {!bundles || bundles.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center text-neutral-500">
              Aucun kit disponible pour le moment.
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
                      alt={bundle.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-black">{bundle.name}</h2>

                    {bundle.description && (
                      <p className="mt-2 text-sm text-neutral-500">
                        {bundle.description}
                      </p>
                    )}

                    {bundle.bundle_items?.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-neutral-600">
                        {bundle.bundle_items.map((item: any) => (
                          <li key={item.id}>• {item.label}</li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 text-xl font-black text-orange-600">
                      {formatPrice(bundle.price)}
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
