import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PromoManager from "@/components/PromoManager";

export default async function PromoAdmin() {
  const { data } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Codes promo</h1>

        <p className="mt-4 text-neutral-600">
          Créez des codes de réduction utilisables dans le panier.
        </p>

        <div className="mt-10">
          <PromoManager promoCodes={data || []} />
        </div>
      </div>
    </main>
  );
}
