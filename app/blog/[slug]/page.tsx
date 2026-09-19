import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .maybeSingle();

  return {
    title: post?.title || "Article",
    description: post?.excerpt || undefined,
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;

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
            ← Conseils couture
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-neutral-400">
            {new Date(post.created_at).toLocaleDateString("fr-FR")}
          </p>

          <h1 className="mt-2 text-4xl font-black">{post.title}</h1>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="mt-8 h-80 w-full rounded-3xl object-cover"
            />
          )}

          <div className="mt-8 whitespace-pre-line text-lg leading-8 text-neutral-700">
            {post.content}
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
