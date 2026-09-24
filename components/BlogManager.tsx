"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";
import EnglishFields, { englishFromRow, englishValues } from "./EnglishFields";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: string;
  title_en?: string | null;
  excerpt_en?: string | null;
  content_en?: string | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogManager({ posts }: { posts: Post[] }) {
  const toast = useToast();
  const [editing, setEditing] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("published");
  const [busy, setBusy] = useState(false);
  const [english, setEnglish] = useState<Record<string, string>>({});

  const englishFields = [
    { key: "title_en", label: "Titre", source: title },
    { key: "excerpt_en", label: "Résumé court", source: excerpt, multiline: true },
    { key: "content_en", label: "Contenu complet", source: content, multiline: true },
  ];

  function resetForm() {
    setEditing(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setStatus("published");
    setEnglish({});
  }

  function edit(post: Post) {
    setEditing(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || "");
    setContent(post.content);
    setCoverImage(post.cover_image || "");
    setStatus(post.status);
    setEnglish(englishFromRow(englishFields, post));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.show("Titre et contenu sont obligatoires.", "error");
      return;
    }

    setBusy(true);

    const values = {
      title: title.trim(),
      slug: editing ? editing.slug : slugify(title),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      status,
      ...englishValues(englishFields, english),
    };

    const result = editing
      ? await supabase.from("blog_posts").update(values).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(values);

    setBusy(false);

    if (result.error) {
      toast.show(result.error.message, "error");
      return;
    }

    toast.show(editing ? "Article modifié." : "Article publié.");
    resetForm();
    setTimeout(() => window.location.reload(), 600);
  }

  async function remove(post: Post) {
    if (!window.confirm(`Supprimer l'article "${post.title}" ?`)) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form onSubmit={save} className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">
          {editing ? "Modifier l'article" : "Nouvel article"}
        </h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="URL image de couverture"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé court (affiché dans la liste)"
            className="min-h-20 w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu complet de l'article"
            className="min-h-56 w-full rounded-2xl border px-5 py-4"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-2xl border px-5 py-4"
          >
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>

          <EnglishFields
            fields={englishFields}
            values={english}
            onChange={setEnglish}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            disabled={busy}
            className="flex-1 rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {busy ? "Enregistrement…" : editing ? "Enregistrer" : "Publier"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border px-5 py-4 font-bold"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">Articles</h2>

        <div className="mt-6 space-y-3">
          {posts.length === 0 ? (
            <p className="text-neutral-500">Aucun article pour le moment.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">
                    {post.title}
                    {!post.title_en?.trim() && (
                      <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        EN à traduire
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {post.status === "published" ? "Publié" : "Brouillon"} · /blog/{post.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => edit(post)}
                    className="rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => remove(post)}
                    className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
