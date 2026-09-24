import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { getI18n } from "@/lib/i18n/server";
import { tr } from "@/lib/i18n/localized";
import { formatDate } from "@/lib/i18n/config";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const { t, locale } = await getI18n();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return {
    title: tr(post, "title", locale) || t.blog.articleFallback,
    description: tr(post, "excerpt", locale) || undefined,
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const { t, locale } = await getI18n();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!post) notFound();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="font-bold">
            {t.blog.back}
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-neutral-400">
            {formatDate(post.created_at, locale)}
          </p>

          <h1 className="mt-2 text-4xl font-black">{tr(post, "title", locale)}</h1>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={tr(post, "title", locale)}
              className="mt-8 h-80 w-full rounded-3xl object-cover"
            />
          )}

          <div className="mt-8 whitespace-pre-line text-lg leading-8 text-neutral-700">
            {tr(post, "content", locale)}
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
