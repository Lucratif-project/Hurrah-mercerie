import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductManager from "@/components/ProductManager";

export default async function ProductsAdmin() {
  const { data: products } = await supabase
    .from("products")
    .select("*, product_images(id, image_url, display_order)")
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
      </div>
    </main>
  );
}