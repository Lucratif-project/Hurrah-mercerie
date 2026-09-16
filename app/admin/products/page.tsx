import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import ProductManager from "@/components/ProductManager";

export default async function ProductsAdmin() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Administration
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Produits
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            Ajoutez, modifiez et gérez les produits proposés par Hurrah
            Mercerie.
          </p>
        </div>

        <div className="mt-12">
          <ProductManager
            products={products || []}
            categories={categories || []}
          />
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-2xl font-black">
              Produits enregistrés
            </h2>
          </div>

          {(products || []).length === 0 ? (
            <p className="p-8 text-neutral-500">
              Aucun produit pour le moment.
            </p>
          ) : (
            <div>
              {(products || []).map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center justify-between gap-5 border-b p-6 last:border-b-0"
                >
                  <div>
                    <h3 className="font-black">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {product.status} · Stock : {product.stock}
                    </p>
                  </div>

                  <p className="font-black text-orange-600">
                    {formatPrice(product.price)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}