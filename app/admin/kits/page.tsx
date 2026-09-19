import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BundleManager from "@/components/BundleManager";

export default async function BundlesAdmin() {
  const { data } = await supabase
    .from("bundles")
    .select("*, bundle_items(id, label)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Kits couture</h1>

        <p className="mt-4 text-neutral-600">
          Regroupez plusieurs articles en kit à prix groupé (ex. "Kit
          débutant").
        </p>

        <div className="mt-10">
          <BundleManager bundles={data || []} />
        </div>
      </div>
    </main>
  );
}
