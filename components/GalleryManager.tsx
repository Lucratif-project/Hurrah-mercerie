"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";

type Post = {
  id: string;
  image_url: string;
  caption: string | null;
  link_url: string | null;
  display_order: number | null;
};

export default function GalleryManager({ posts }: { posts: Post[] }) {
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setBusy(true);

    const { error } = await supabase.from("social_posts").insert({
      image_url: imageUrl.trim(),
      caption: caption.trim() || null,
      link_url: linkUrl.trim() || null,
      display_order: posts.length,
    });

    setBusy(false);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    setImageUrl("");
    setCaption("");
    setLinkUrl("");
    window.location.reload();
  }

  async function remove(post: Post) {
    const { error } = await supabase.from("social_posts").delete().eq("id", post.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Ajouter une photo</h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de la photo"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Légende (optionnelle)"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Lien au clic (optionnel, ex : votre Instagram)"
            className="w-full rounded-2xl border px-5 py-4"
          />
        </div>

        <button
          disabled={busy}
          className="mt-6 w-full rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {busy ? "Ajout…" : "Ajouter"}
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
            <img src={post.image_url} alt="" className="aspect-square w-full object-cover" />
            <button
              onClick={() => remove(post)}
              className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-red-600 opacity-0 transition group-hover:opacity-100"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
