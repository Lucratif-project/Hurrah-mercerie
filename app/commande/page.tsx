"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/site-config";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Commande() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [promo, setPromo] = useState<{ code: string; discount_percent: number } | null>(null);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("hurrah-cart") || "[]"));
    } catch {
      setCart([]);
    }
    try {
      const saved = localStorage.getItem("hurrah-promo");
      if (saved) setPromo(JSON.parse(saved));
    } catch {
      setPromo(null);
    }
  }, []);

  const subtotal = cart.reduce((s, p) => s + p.price * p.quantity, 0);
  const discount = promo ? Math.round((subtotal * promo.discount_percent) / 100) : 0;
  const total = subtotal - discount;

  function whatsappMessage() {
    const lines = [
      "Bonjour Hurrah Mercerie, je souhaite passer une commande :",
      "",
      ...cart.map((p) => `• ${p.quantity} × ${p.name} — ${formatPrice(p.price * p.quantity)}`),
      "",
      `Sous-total : ${formatPrice(subtotal)}`,
      promo ? `Code ${promo.code} : -${formatPrice(discount)}` : "",
      `Total : ${formatPrice(total)}`,
      "",
      `Nom : ${form.name || "-"}`,
      `Téléphone : ${form.phone || "-"}`,
      form.address ? `Adresse : ${form.address}` : "",
      form.notes ? `Notes : ${form.notes}` : "",
    ].filter(Boolean);

    return lines.join("\n");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Envoi...");

    if (!cart.length) {
      setMsg("Votre panier est vide.");
      return;
    }

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        notes: form.notes,
        total,
        promo_code: promo?.code || null,
        discount,
      })
      .select()
      .single();

    if (error || !order) {
      setMsg(error?.message || "Erreur lors de l'enregistrement.");
      return;
    }

    const { error: itemError } = await supabase.from("order_items").insert(
      cart.map((p) => ({
        order_id: order.id,
        product_id: p.id,
        product_name: p.name,
        quantity: p.quantity,
        price: p.price,
      }))
    );

    if (itemError) {
      setMsg(itemError.message);
      return;
    }

    // Décrémente le stock de chaque produit commandé.
    await Promise.all(
      cart.map(async (item) => {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .maybeSingle();

        if (product) {
          await supabase
            .from("products")
            .update({ stock: Math.max(0, product.stock - item.quantity) })
            .eq("id", item.id);
        }
      })
    );

    localStorage.removeItem("hurrah-cart");
    localStorage.removeItem("hurrah-promo");
    window.dispatchEvent(new Event("hurrah-cart-updated"));
    setMsg("Commande enregistrée avec succès.");
    setSuccess(true);
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/panier" className="font-bold">
          ← Panier
        </Link>

        <h1 className="mt-8 text-5xl font-black">Finaliser la commande</h1>

        <div className="mt-4 space-y-1 text-sm text-neutral-600">
          <p>Sous-total : {formatPrice(subtotal)}</p>
          {promo && (
            <p className="font-semibold text-emerald-600">
              Code {promo.code} : -{formatPrice(discount)}
            </p>
          )}
          <p className="text-lg font-black text-neutral-950">
            Total : {formatPrice(total)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-500">
          <span>Paiement accepté :</span>
          <span className="rounded-full bg-yellow-400 px-3 py-1.5 text-neutral-900">MTN Mobile Money</span>
          <span className="rounded-full bg-orange-500 px-3 py-1.5 text-white">Moov Money</span>
          <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-white">Espèces à la livraison</span>
        </div>

        {!success && (
          <form
            onSubmit={submit}
            className="mt-10 space-y-5 rounded-3xl bg-white p-8 shadow-sm"
          >
            <input
              required
              className="w-full rounded-2xl border px-5 py-4"
              placeholder="Nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              required
              className="w-full rounded-2xl border px-5 py-4"
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="w-full rounded-2xl border px-5 py-4"
              placeholder="Adresse"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <textarea
              className="min-h-32 w-full rounded-2xl border px-5 py-4"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <button className="w-full rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600">
              Confirmer la commande
            </button>

            <a
              href={buildWhatsAppLink(whatsappMessage())}
              target="_blank"
              className="block w-full rounded-full border-2 border-neutral-950 py-4 text-center font-bold text-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              Commander directement par WhatsApp
            </a>

            {msg && (
              <p className="rounded-2xl bg-orange-50 p-4 font-semibold">
                {msg}
              </p>
            )}
          </form>
        )}

        {success && (
          <div className="mt-10 space-y-5 rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-xl font-black text-emerald-600">
              Commande enregistrée avec succès !
            </p>

            <p className="text-neutral-600">
              Hurrah Mercerie va vous contacter au {form.phone} pour confirmer
              votre commande.
            </p>

            <a
              href={buildWhatsAppLink(whatsappMessage())}
              target="_blank"
              className="inline-block rounded-full bg-orange-600 px-7 py-4 font-bold text-white hover:bg-orange-500"
            >
              Confirmer aussi par WhatsApp
            </a>

            <Link
              href="/catalogue"
              className="block font-bold text-neutral-500 hover:text-neutral-950"
            >
              ← Retour au catalogue
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
