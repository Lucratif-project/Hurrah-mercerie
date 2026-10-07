"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { useI18n } from "@/lib/i18n/client";
import { formatDate } from "@/lib/i18n/config";
import { usePaymentLabel } from "@/components/PaymentBadges";
import { isPaymentMethod } from "@/lib/payments";

type Order = {
  order_number: number;
  status: string;
  total: number;
  created_at: string;
  payment_method?: string;
  paid?: boolean;
  items: { product_name: string; quantity: number; price: number }[];
};

export default function SuiviCommande() {
  const { t, locale } = useI18n();
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const paymentLabel = usePaymentLabel();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const number = Number(orderNumber.replace(/\D/g, ""));
    if (!phone.trim() || !number) {
      setOrders([]);
      return;
    }

    setLoading(true);

    // Une commande n'est renvoyée que si le numéro ET le téléphone correspondent.
    const { data } = await supabase.rpc("track_order", {
      p_phone: phone.trim(),
      p_order_number: number,
    });

    setOrders(data ? [data as Order] : []);
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

          <form onSubmit={search} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              required
              inputMode="numeric"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder={t.tracking.orderPlaceholder}
              className="rounded-2xl border px-5 py-4 sm:w-48"
            />

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
              <div key={order.order_number} className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="mb-3 font-black">{t.tracking.orderLabel(String(order.order_number))}</p>
                {isPaymentMethod(order.payment_method) && (
                  <p className="mb-3 text-sm text-neutral-600">
                    {t.payment.method} : <b>{paymentLabel(order.payment_method)}</b> ·{" "}
                    <span className={order.paid ? "font-bold text-emerald-600" : "font-bold text-amber-600"}>
                      {order.paid ? t.payment.paid : t.payment.unpaid}
                    </span>
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                    {t.tracking.status[order.status] || order.status}
                  </span>

                  <span className="text-xs text-neutral-400">
                    {formatDate(order.created_at, locale)}
                  </span>
                </div>

                <div className="mt-4 space-y-1 text-sm text-neutral-600">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
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
