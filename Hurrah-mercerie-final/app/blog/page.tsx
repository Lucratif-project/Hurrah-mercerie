import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { getI18n } from "@/lib/i18n/server";
import { tr } from "@/lib/i18n/localized";
import { formatDate } from "@/lib/i18n/config";

export async function generateMetadata() {
  const { t } = await getI18n();
  return { title: t.blog.metaTitle, description: t.blog.metaDescription };
}

export default async function Blog() {
  const { t, locale } = await getI18n();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
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

          <h1 className="mt-3 text-5xl font-black">{t.blog.title}</h1>

          <p className="mt-4 max-w-2xl text-neutral-600">
            {t.blog.intro}
          </p>

          {!posts || posts.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center text-neutral-500">
              {t.blog.empty}
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
                      alt={tr(post, "title", locale)}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">
                      {formatDate(post.created_at, locale)}
                    </p>

                    <h2 className="mt-2 text-xl font-black">{tr(post, "title", locale)}</h2>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                        {tr(post, "excerpt", locale)}
                      </p>
                    )}

                    <p className="mt-4 font-semibold text-orange-600">
                      {t.blog.read}
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
