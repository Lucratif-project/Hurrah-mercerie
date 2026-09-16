"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
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
};

export default function ProductManager({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);
  const [message, setMessage] = useState("");

  function resetForm() {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setStatus("published");
    setFeatured(false);
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
    setMessage("");
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !price || !stock) {
      setMessage("Veuillez remplir les champs obligatoires.");
      return;
    }

    const values = {
      name: name.trim(),
      description: description.trim() || null,
      price: Number(price),
      stock: Number(stock),
      category_id: categoryId || null,
      status,
      featured,
      updated_at: new Date().toISOString(),
    };

    const result = editing
      ? await supabase
          .from("products")
          .update(values)
          .eq("id", editing.id)
      : await supabase
          .from("products")
          .insert(values);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(
      editing
        ? "Produit modifié avec succès."
        : "Produit ajouté avec succès."
    );

    resetForm();

    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
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

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="min-h-28 w-full rounded-2xl border px-5 py-4"
          />

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

            <span className="font-semibold">
              Produit mis en avant
            </span>
          </label>
        </div>

        {message && (
          <p className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm font-semibold">
            {message}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600"
          >
            {editing ? "Enregistrer" : "Ajouter"}
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
        <h2 className="text-2xl font-black">
          Modifier un produit
        </h2>

        <div className="mt-6 space-y-3">
          {products.length === 0 ? (
            <p className="text-neutral-500">
              Aucun produit à modifier.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-neutral-500">
                    {product.price.toLocaleString("fr-FR")} FCFA · Stock{" "}
                    {product.stock}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => editProduct(product)}
                  className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600"
                >
                  Modifier
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}