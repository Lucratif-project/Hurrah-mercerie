import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import CatalogueFilters from "@/components/CatalogueFilters";
import { supabase } from "@/lib/supabase";

const FALLBACK_IMAGE = "/images/categories/fils.jpeg";

type Props = {
  searchParams: Promise<{
    categorie?: string;
    q?: string;
    disponibilite?: string;
  }>;
};

export default async function CataloguePage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCategory = params.categorie || "Toutes";
  const searchTerm = (params.q || "").trim();
  const availability = params.disponibilite || "toutes";

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("name, image_url")
    .order("name");

  const categories = (categoriesData || []).map((c) => ({
    name: c.name,
    image: c.image_url || FALLBACK_IMAGE,
  }));

  let query = supabase
    .from("products")
    .select("*, product_images(image_url, display_order)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (selectedCategory !== "Toutes") {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("name", selectedCategory)
      .maybeSingle();

    if (category) {
      query = query.eq("category_id", category.id);
    } else {
      query = query.eq(
        "category_id",
        "00000000-0000-0000-0000-000000000000"
      );
    }
  }

  if (searchTerm) {
    const escaped = searchTerm.replace(/[%,]/g, "");
    query = query.or(
      `name.ilike.%${escaped}%,description.ilike.%${escaped}%,reference.ilike.%${escaped}%`
    );
  }

  if (availability === "disponible") {
    query = query.gt("stock", 0);
  } else if (availability === "rupture") {
    query = query.lte("stock", 0);
  }

  const { data } = await query;

  const products = (data || []).map((product: any) => ({
    ...product,
    image_url:
      product.product_images
        ?.sort(
          (a: any, b: any) =>
            (a.display_order || 0) - (b.display_order || 0)
        )[0]?.image_url || null,
  }));

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Hurrah Mercerie
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Notre catalogue
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            Découvrez nos machines, fils, tissus, boutons et accessoires.
          </p>

          {/* RECHERCHE + DISPONIBILITÉ */}
          <CatalogueFilters
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            availability={availability}
          />

          {/* FILTRES CATÉGORIE */}
          <section className="mt-8">
            <h2 className="text-2xl font-black">
              Explorer par catégorie
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={{
                  pathname: "/catalogue",
                  query: {
                    ...(searchTerm ? { q: searchTerm } : {}),
                    ...(availability !== "toutes"
                      ? { disponibilite: availability }
                      : {}),
                  },
                }}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  selectedCategory === "Toutes"
                    ? "bg-neutral-950 text-white"
                    : "bg-white hover:bg-neutral-950 hover:text-white"
                }`}
              >
                Tous les produits
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={{
                    pathname: "/catalogue",
                    query: {
                      categorie: category.name,
                      ...(searchTerm ? { q: searchTerm } : {}),
                      ...(availability !== "toutes"
                        ? { disponibilite: availability }
                        : {}),
                    },
                  }}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                    selectedCategory === category.name
                      ? "bg-orange-600 text-white"
                      : "bg-white hover:bg-orange-600 hover:text-white"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CATÉGORIES : UNIQUEMENT POUR "TOUS" SANS RECHERCHE */}
          {selectedCategory === "Toutes" && !searchTerm && (
            <section className="mt-12">
              <h2 className="text-2xl font-black">
                Nos catégories
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/catalogue?categorie=${encodeURIComponent(
                      category.name
                    )}`}
                    className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="p-6">
                      <h3 className="text-2xl font-black">
                        {category.name}
                      </h3>

                      <p className="mt-3 font-semibold text-orange-600">
                        Découvrir →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* PRODUITS FILTRÉS */}
          <section className="mt-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              {selectedCategory === "Toutes"
                ? "Tous nos produits"
                : selectedCategory}
            </p>

            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-3xl font-black">
                {searchTerm
                  ? `Résultats pour "${searchTerm}"`
                  : selectedCategory === "Toutes"
                  ? "Découvrez nos produits"
                  : `Produits ${selectedCategory}`}
              </h2>

              <p className="text-sm font-semibold text-neutral-500">
                {products.length}{" "}
                {products.length > 1 ? "résultats" : "résultat"}
              </p>
            </div>

            {products.length ? (
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-white p-10 text-center">
                <p className="font-semibold text-neutral-600">
                  {searchTerm
                    ? `Aucun produit ne correspond à "${searchTerm}".`
                    : "Aucun produit publié dans cette catégorie pour le moment."}
                </p>

                <Link
                  href="/catalogue"
                  className="mt-5 inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white"
                >
                  Voir tous les produits
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
