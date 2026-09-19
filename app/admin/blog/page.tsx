import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BlogManager from "@/components/BlogManager";

export default async function BlogAdmin() {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Blog</h1>

        <p className="mt-4 text-neutral-600">
          Publiez des conseils couture pour attirer du monde sur le site.
        </p>

        <div className="mt-10">
          <BlogManager posts={data || []} />
        </div>
      </div>
    </main>
  );
}
