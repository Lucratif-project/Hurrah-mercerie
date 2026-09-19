import { supabase } from "@/lib/supabase";

export default async function SocialGallery() {
  const { data: posts } = await supabase
    .from("social_posts")
    .select("*")
    .order("display_order", { ascending: true })
    .limit(8);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
          Nos créations
        </p>
        <h2 className="mt-2 text-3xl font-black">
          Ce que nos clients réalisent
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {posts.map((post) => {
            const content = (
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={post.image_url}
                  alt={post.caption || "Création Hurrah Mercerie"}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {post.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                    {post.caption}
                  </div>
                )}
              </div>
            );

            return post.link_url ? (
              <a key={post.id} href={post.link_url} target="_blank">
                {content}
              </a>
            ) : (
              <div key={post.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
