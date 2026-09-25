import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CategoryManager from "@/components/CategoryManager";

export default async function CategoriesAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Catégories</h1>

        <p className="mt-4 text-neutral-600">
          Ajoutez, renommez ou supprimez les catégories du catalogue.
        </p>

        <div className="mt-10">
          <CategoryManager categories={data || []} />
        </div>
      </div>
    </main>
  );
}
