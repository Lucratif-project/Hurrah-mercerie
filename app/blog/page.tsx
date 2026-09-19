import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Conseils couture",
  description: "Astuces, guides et actualités couture par Hurrah Mercerie.",
};

export default async function Blog() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
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

          <h1 className="mt-3 text-5xl font-black">Conseils couture</h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            Astuces, guides pratiques et actualités pour bien choisir votre
            matériel de couture.
          </p>

          {!posts || posts.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center text-neutral-500">
              Aucun article publié pour le moment.
            </div>
          ) : (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={post.cover_image || "/images/categories/fils.jpeg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">
                      {new Date(post.created_at).toLocaleDateString("fr-FR")}
                    </p>

                    <h2 className="mt-2 text-xl font-black">{post.title}</h2>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                        {post.excerpt}
                      </p>
                    )}

                    <p className="mt-4 font-semibold text-orange-600">
                      Lire →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
