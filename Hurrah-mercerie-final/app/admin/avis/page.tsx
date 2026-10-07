import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ReviewManager from "@/components/ReviewManager";

export default async function ReviewsAdmin() {
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from("product_reviews")
    .select("id, author_name, rating, comment, approved, created_at, products(name)")
    .order("approved", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Avis clients</h1>

        <p className="mt-4 text-neutral-600">
          Les nouveaux avis n&apos;apparaissent sur le site qu&apos;après votre validation.
        </p>

        <div className="mt-10">
          <ReviewManager reviews={(reviews || []) as unknown as Review[]} />
        </div>
      </div>
    </main>
  );
}

type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
  products: { name: string } | null;
};
