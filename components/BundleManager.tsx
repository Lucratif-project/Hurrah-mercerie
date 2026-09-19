"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { useToast } from "./Toast";

type BundleItem = { id: string; label: string };
type Bundle = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  status: string;
  bundle_items?: BundleItem[];
};

export default function BundleManager({ bundles }: { bundles: Bundle[] }) {
  const toast = useToast();
  const [editing, setEditing] = useState<Bundle | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [busy, setBusy] = useState(false);

  function resetForm() {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setItemsText("");
  }

  function edit(bundle: Bundle) {
    setEditing(bundle);
    setName(bundle.name);
    setDescription(bundle.description || "");
    setPrice(String(bundle.price));
    setImageUrl(bundle.image_url || "");
    setItemsText((bundle.bundle_items || []).map((i) => i.label).join("\n"));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price) {
      toast.show("Nom et prix sont obligatoires.", "error");
      return;
    }

    setBusy(true);

    const values = {
      name: name.trim(),
      description: description.trim() || null,
      price: Number(price),
      image_url: imageUrl.trim() || null,
    };

    const result = editing
      ? await supabase.from("bundles").update(values).eq("id", editing.id).select().single()
      : await supabase.from("bundles").insert(values).select().single();

    if (result.error || !result.data) {
      setBusy(false);
      toast.show(result.error?.message || "Erreur.", "error");
      return;
    }

    const bundleId = result.data.id;

    // On remplace la liste des articles du kit à chaque enregistrement.
    await supabase.from("bundle_items").delete().eq("bundle_id", bundleId);

    const labels = itemsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (labels.length) {
      await supabase
        .from("bundle_items")
        .insert(labels.map((label) => ({ bundle_id: bundleId, label })));
    }

    setBusy(false);
    toast.show(editing ? "Kit modifié." : "Kit créé.");
    resetForm();
    setTimeout(() => window.location.reload(), 600);
  }

  async function remove(bundle: Bundle) {
    if (!window.confirm(`Supprimer le kit "${bundle.name}" ?`)) return;

    const { error } = await supabase.from("bundles").delete().eq("id", bundle.id);

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
          {editing ? "Modifier le kit" : "Créer un kit"}
        </h2>

        <div className="mt-6 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du kit (ex : Kit débutant couture)"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="min-h-20 w-full rounded-2xl border px-5 py-4"
          />

          <input
            required
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix du kit en FCFA"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL image"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            placeholder={"Contenu du kit, un article par ligne :\nFil à coudre\nAiguilles\nCiseaux"}
            className="min-h-28 w-full rounded-2xl border px-5 py-4"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            disabled={busy}
            className="flex-1 rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {busy ? "Enregistrement…" : editing ? "Enregistrer" : "Créer"}
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
        <h2 className="text-2xl font-black">Kits existants</h2>

        <div className="mt-6 space-y-3">
          {bundles.length === 0 ? (
            <p className="text-neutral-500">Aucun kit pour le moment.</p>
          ) : (
            bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">{bundle.name}</p>
                  <p className="text-sm text-neutral-500">
                    {formatPrice(bundle.price)} ·{" "}
                    {(bundle.bundle_items || []).length} articles
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => edit(bundle)}
                    className="rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => remove(bundle)}
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
