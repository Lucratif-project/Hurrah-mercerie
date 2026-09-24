"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { useI18n } from "@/lib/i18n/client";
import { formatDate } from "@/lib/i18n/config";

type Order = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  order_items?: { id: string; product_name: string; quantity: number; price: number }[];
};

export default function SuiviCommande() {
  const { t, locale } = useI18n();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);

    const { data } = await supabase
      .from("orders")
      .select("id, status, total, created_at, order_items(id, product_name, quantity, price)")
      .eq("customer_phone", phone.trim())
      .order("created_at", { ascending: false });

    setOrders(data || []);
    setLoading(false);
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Hurrah Mercerie
          </p>

          <h1 className="mt-3 text-4xl font-black">{t.tracking.title}</h1>

          <p className="mt-4 text-neutral-600">
            {t.tracking.intro}
          </p>

          <form onSubmit={search} className="mt-8 flex gap-3">
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.tracking.placeholder}
              className="flex-1 rounded-2xl border px-5 py-4"
            />

            <button
              disabled={loading}
              className="rounded-2xl bg-neutral-950 px-6 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? t.tracking.searching : t.tracking.search}
            </button>
          </form>

          <div className="mt-10 space-y-4">
            {orders !== null && orders.length === 0 && (
              <div className="rounded-3xl bg-white p-8 text-center text-neutral-500">
                {t.tracking.none}
              </div>
            )}

            {(orders || []).map((order) => (
              <div key={order.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                    {t.tracking.status[order.status] || order.status}
                  </span>

                  <span className="text-xs text-neutral-400">
                    {formatDate(order.created_at, locale)}
                  </span>
                </div>

                <div className="mt-4 space-y-1 text-sm text-neutral-600">
                  {(order.order_items || []).map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.quantity} × {item.product_name}</span>
                      <span>{formatPrice(item.price * item.quantity, locale)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t pt-4 font-black">
                  <span>{t.common.total}</span>
                  <span className="text-orange-600">{formatPrice(order.total, locale)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
