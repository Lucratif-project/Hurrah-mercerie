import Link from "next/link";
import { supabase } from "@/lib/supabase";
import GalleryManager from "@/components/GalleryManager";

export default async function GalleryAdmin() {
  const { data } = await supabase
    .from("social_posts")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Galerie "Nos créations"</h1>

        <p className="mt-4 text-neutral-600">
          Ajoute des photos (réalisations clients, ambiance boutique, nouveaux
          produits) affichées sur la page d'accueil. C'est l'équivalent d'un
          flux Instagram, géré ici plutôt que connecté à un vrai compte.
        </p>

        <div className="mt-10">
          <GalleryManager posts={data || []} />
        </div>
      </div>
    </main>
  );
}
