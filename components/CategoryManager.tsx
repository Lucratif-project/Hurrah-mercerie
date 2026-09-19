"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";

type Category = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
};

export default function CategoryManager({
  categories,
}: {
  categories: Category[];
}) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function resetForm() {
    setEditing(null);
    setName("");
    setDescription("");
    setImageUrl("");
  }

  function startEdit(category: Category) {
    setEditing(category);
    setName(category.name);
    setDescription(category.description || "");
    setImageUrl(category.image_url || "");
    setMessage("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Le nom de la catégorie est obligatoire.");
      return;
    }

    setBusy(true);

    const values = {
      name: name.trim(),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
    };

    const result = editing
      ? await supabase.from("categories").update(values).eq("id", editing.id)
      : await supabase.from("categories").insert(values);

    setBusy(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(editing ? "Catégorie modifiée." : "Catégorie ajoutée.");
    resetForm();
    setTimeout(() => window.location.reload(), 600);
  }

  async function remove(category: Category) {
    if (
      !window.confirm(
        `Supprimer la catégorie "${category.name}" ? Les produits liés perdront leur catégorie.`
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={save} className="rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-black">
          {editing ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la catégorie"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optionnelle)"
            className="min-h-24 w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL image de catégorie"
            className="w-full rounded-2xl border px-5 py-4"
          />
        </div>

        {message && (
          <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold">
            {message}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {busy ? "Enregistrement…" : editing ? "Enregistrer" : "Ajouter"}
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
        <h2 className="text-2xl font-black">Catégories existantes</h2>

        <div className="mt-6 space-y-3">
          {categories.length === 0 ? (
            <p className="text-neutral-500">Aucune catégorie pour le moment.</p>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">{category.name}</p>
                  {category.description && (
                    <p className="text-sm text-neutral-500">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(category)}
                    className="rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(category)}
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
