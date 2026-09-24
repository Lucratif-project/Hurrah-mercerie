"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { useToast } from "./Toast";
import EnglishFields, { englishFromRow, englishValues } from "./EnglishFields";

type Category = {
  id: string;
  name: string;
};

type ProductImage = {
  id: string;
  image_url: string;
  display_order: number | null;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  status: string;
  category_id: string | null;
  featured: boolean;
  reference?: string | null;
  color?: string | null;
  size?: string | null;
  format?: string | null;
  name_en?: string | null;
  description_en?: string | null;
  color_en?: string | null;
  size_en?: string | null;
  format_en?: string | null;
  product_images?: ProductImage[];
};

export default function ProductManager({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const toast = useToast();
  const [editing, setEditing] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);
  const [reference, setReference] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [format, setFormat] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [english, setEnglish] = useState<Record<string, string>>({});

  const englishFields = [
    { key: "name_en", label: "Nom du produit", source: name },
    { key: "description_en", label: "Description", source: description, multiline: true },
    { key: "color_en", label: "Couleur", source: color },
    { key: "size_en", label: "Taille", source: size },
    { key: "format_en", label: "Format", source: format },
  ];
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function resetForm() {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setStatus("published");
    setFeatured(false);
    setReference("");
    setColor("");
    setSize("");
    setFormat("");
    setNewImageUrl("");
    setEnglish({});
  }

  function editProduct(product: Product) {
    setEditing(product);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(String(product.price));
    setStock(String(product.stock));
    setCategoryId(product.category_id || "");
    setStatus(product.status);
    setFeatured(product.featured);
    setReference(product.reference || "");
    setColor(product.color || "");
    setSize(product.size || "");
    setFormat(product.format || "");
    setEnglish(englishFromRow(englishFields, product));
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !price || !stock) {
      setMessage("Veuillez remplir les champs obligatoires.");
      return;
    }

    setBusy(true);

    const values = {
      name: name.trim(),
      description: description.trim() || null,
      price: Number(price),
      stock: Number(stock),
      category_id: categoryId || null,
      status,
      featured,
      reference: reference.trim() || null,
      color: color.trim() || null,
      size: size.trim() || null,
      format: format.trim() || null,
      ...englishValues(englishFields, english),
      updated_at: new Date().toISOString(),
    };

    const result = editing
      ? await supabase.from("products").update(values).eq("id", editing.id)
      : await supabase.from("products").insert(values);

    setBusy(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(
      editing ? "Produit modifié avec succès." : "Produit ajouté avec succès."
    );

    resetForm();

    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  async function deleteProduct(product: Product) {
    if (
      !window.confirm(
        `Supprimer définitivement "${product.name}" ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  async function toggleStatus(product: Product) {
    const nextStatus = product.status === "published" ? "hidden" : "published";
    const { error } = await supabase
      .from("products")
      .update({ status: nextStatus })
      .eq("id", product.id);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  async function addImage() {
    if (!editing || !newImageUrl.trim()) return;

    const nextOrder = (editing.product_images?.length || 0);

    const { error } = await supabase.from("product_images").insert({
      product_id: editing.id,
      image_url: newImageUrl.trim(),
      display_order: nextOrder,
    });

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    setNewImageUrl("");
    window.location.reload();
  }

  async function removeImage(imageId: string) {
    const { error } = await supabase
      .from("product_images")
      .delete()
      .eq("id", imageId);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  async function setPrimaryImage(imageId: string) {
    if (!editing) return;

    // La photo principale est celle avec le display_order le plus bas.
    await supabase
      .from("product_images")
      .update({ display_order: 1 })
      .eq("product_id", editing.id);

    const { error } = await supabase
      .from("product_images")
      .update({ display_order: 0 })
      .eq("id", imageId);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form
        onSubmit={saveProduct}
        className="rounded-3xl bg-white p-7 shadow-sm"
      >
        <h2 className="text-2xl font-black">
          {editing ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <div className="mt-7 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du produit"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Référence (si disponible)"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="min-h-28 w-full rounded-2xl border px-5 py-4"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Prix en FCFA"
              className="w-full rounded-2xl border px-5 py-4"
            />

            <input
              required
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="w-full rounded-2xl border px-5 py-4"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Couleur"
              className="w-full rounded-2xl border px-4 py-4 text-sm"
            />

            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Taille"
              className="w-full rounded-2xl border px-4 py-4 text-sm"
            />

            <input
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="Format"
              className="w-full rounded-2xl border px-4 py-4 text-sm"
            />
          </div>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-2xl border px-5 py-4"
          >
            <option value="">Sans catégorie</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-2xl border px-5 py-4"
          >
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
            <option value="hidden">Masqué</option>
          </select>

          <label className="flex items-center gap-3 rounded-2xl border p-4">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            <span className="font-semibold">Produit mis en avant</span>
          </label>

          <EnglishFields
            fields={englishFields}
            values={english}
            onChange={setEnglish}
          />
        </div>

        {editing && (
          <div className="mt-6 rounded-2xl border border-dashed p-4">
            <p className="text-sm font-black">Photos du produit</p>

            <div className="mt-3 space-y-2">
              {(editing.product_images || [])
                .slice()
                .sort(
                  (a, b) => (a.display_order || 0) - (b.display_order || 0)
                )
                .map((image, index) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 rounded-xl bg-neutral-50 p-2"
                  >
                    <img
                      src={image.image_url}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <p className="flex-1 truncate text-xs text-neutral-500">
                      {image.image_url}
                    </p>

                    {index === 0 ? (
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
                        Principale
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(image.id)}
                        className="text-[10px] font-bold text-neutral-500 hover:text-orange-600"
                      >
                        Définir principale
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="text-xs font-bold text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="URL de la photo (ex : /images/produits/...)"
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
              />

              <button
                type="button"
                onClick={addImage}
                className="rounded-xl bg-neutral-950 px-4 py-2 text-xs font-bold text-white"
              >
                Ajouter
              </button>
            </div>
          </div>
        )}

        {message && (
          <p className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm font-semibold">
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
        <h2 className="text-2xl font-black">Tous les produits</h2>

        <div className="mt-6 space-y-3">
          {products.length === 0 ? (
            <p className="text-neutral-500">Aucun produit à modifier.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">
                    {product.name}
                    {!product.name_en?.trim() && (
                    <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      EN à traduire
                    </span>
                  )}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {formatPrice(product.price)} · Stock {product.stock} ·{" "}
                    <span
                      className={
                        product.status === "published"
                          ? "text-emerald-600"
                          : "text-neutral-400"
                      }
                    >
                      {product.status === "published"
                        ? "Publié"
                        : product.status === "draft"
                        ? "Brouillon"
                        : "Masqué"}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(product)}
                    className="rounded-full border px-4 py-2 text-xs font-bold"
                  >
                    {product.status === "published" ? "Masquer" : "Publier"}
                  </button>

                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                    className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600"
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product)}
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
