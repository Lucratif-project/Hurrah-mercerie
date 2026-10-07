"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n/client";
import { tr } from "@/lib/i18n/localized";
import PaymentBadges, { usePaymentLabel } from "@/components/PaymentBadges";
import {
  MERCHANT_NAME,
  PAYMENT_INFO,
  PAYMENT_METHODS,
  type PaymentMethod,
} from "@/lib/payments";

type CartItem = {
  id: string;
  name: string;
  name_en?: string | null;
  price: number;
  quantity: number;
};

type PlacedOrder = {
  order_number: number;
  subtotal: number;
  discount: number;
  total: number;
  promo_code: string | null;
  payment_method: PaymentMethod;
};

export default function Commande() {
  const { t, locale } = useI18n();
  const wa = t.checkout.wa;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [payment, setPayment] = useState<PaymentMethod>("mtn_momo");
  const paymentLabel = usePaymentLabel();
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

  function whatsappMessage(order: PlacedOrder | null = placed) {
    // Après la commande, on reprend les montants calculés par le serveur.
    const sub = order?.subtotal ?? subtotal;
    const disc = order?.discount ?? discount;
    const tot = order?.total ?? total;
    const code = order ? order.promo_code : promo?.code;

    const lines = [
      wa.intro,
      order ? `${wa.orderNumber} ${order.order_number}` : "",
      "",
      ...cart.map(
        (p) =>
          `• ${p.quantity} × ${tr(p, "name", locale)} — ${formatPrice(p.price * p.quantity, locale)}`
      ),
      "",
      `${wa.subtotal} ${formatPrice(sub, locale)}`,
      code && disc > 0 ? `${wa.code} ${code} : -${formatPrice(disc, locale)}` : "",
      `${wa.total} ${formatPrice(tot, locale)}`,
      `${t.payment.method} : ${paymentLabel(order?.payment_method ?? payment)}`,
      "",
      `${wa.name} ${form.name || "-"}`,
      `${wa.phone} ${form.phone || "-"}`,
      form.address ? `${wa.address} ${form.address}` : "",
      form.notes ? `${wa.notes} ${form.notes}` : "",
    ].filter(Boolean);

    return lines.join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    placeOrder();
  }

  // « Commander par WhatsApp » enregistre AUSSI la commande (et retire le
  // stock) avant d'ouvrir WhatsApp avec le numéro de commande.
  function orderViaWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const formEl = e.currentTarget.form;
    if (formEl && !formEl.reportValidity()) return;

    // Fenêtre ouverte tout de suite (sinon le navigateur la bloque),
    // puis dirigée vers WhatsApp une fois la commande enregistrée.
    const win = window.open("", "_blank");
    placeOrder().then((order) => {
      if (!win) return;
      if (order) win.location.href = buildWhatsAppLink(whatsappMessage(order));
      else win.close();
    });
  }

  async function placeOrder(): Promise<PlacedOrder | null> {
    if (busy) return null;

    if (!cart.length) {
      setMsg(t.checkout.emptyCart);
      return null;
    }

    setBusy(true);
    setMsg(t.checkout.sending);

    // Le serveur relit les prix, vérifie le stock et le code promo,
    // puis crée la commande en une seule opération.
    const { data, error } = await supabase.rpc("create_order", {
      p_name: form.name,
      p_phone: form.phone,
      p_address: form.address,
      p_notes: form.notes,
      p_items: cart.map((p) => ({ product_id: p.id, quantity: p.quantity })),
      p_promo_code: promo?.code || null,
      p_payment_method: payment,
    });

    setBusy(false);

    if (error || !data) {
      const m = error?.message || "";
      if (m.includes("insufficient_stock:")) {
        setMsg(t.checkout.errors.stock(m.split("insufficient_stock:")[1].trim()));
      } else if (m.includes("product_unavailable")) {
        setMsg(t.checkout.errors.unavailable);
      } else if (m.includes("too_many_orders")) {
        setMsg(t.payment.tooMany);
      } else if (m.includes("invalid_phone")) {
        setMsg(t.payment.badPhone);
      } else if (m.includes("missing_fields")) {
        setMsg(t.checkout.errors.fields);
      } else {
        setMsg(t.checkout.saveError);
      }
      return null;
    }

    const order = data as PlacedOrder;
    setPlaced(order);
    localStorage.removeItem("hurrah-cart");
    localStorage.removeItem("hurrah-promo");
    window.dispatchEvent(new Event("hurrah-cart-updated"));
    setMsg(t.checkout.success);
    setSuccess(true);
    return order;
  }

  return (
    <>
    <SiteHeader />
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/panier" className="font-bold">
          {t.checkout.back}
        </Link>

        <h1 className="mt-8 text-5xl font-black">{t.checkout.title}</h1>

        <div className="mt-4 space-y-1 text-sm text-neutral-600">
          <p>{t.checkout.subtotal(formatPrice(subtotal, locale))}</p>
          {promo && (
            <p className="font-semibold text-emerald-600">
              {t.checkout.promo(promo.code, formatPrice(discount, locale))}
            </p>
          )}
          <p className="text-lg font-black text-neutral-950">
            {t.checkout.total(formatPrice(total, locale))}
          </p>
        </div>

        <PaymentBadges className="mt-4 text-neutral-500" />

        {!success && (
          <form
            onSubmit={submit}
            className="mt-10 space-y-5 rounded-3xl bg-white p-8 shadow-sm"
          >
            <input
              required
              className="w-full rounded-2xl border px-5 py-4"
              placeholder={t.checkout.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              required
              className="w-full rounded-2xl border px-5 py-4"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t.checkout.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="w-full rounded-2xl border px-5 py-4"
              placeholder={t.checkout.address}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <textarea
              className="min-h-32 w-full rounded-2xl border px-5 py-4"
              placeholder={t.checkout.notes}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <fieldset>
              <legend className="font-black">{t.payment.choose}</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 font-bold transition ${
                      payment === m ? "border-neutral-950 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      checked={payment === m}
                      onChange={() => setPayment(m)}
                      className="accent-neutral-950"
                    />
                    <span className={`rounded-full px-3 py-1 text-xs ${PAYMENT_INFO[m].badge}`}>
                      {paymentLabel(m)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              disabled={busy}
              className="w-full rounded-full bg-neutral-950 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {t.checkout.confirm}
            </button>

            <button
              type="button"
              onClick={orderViaWhatsApp}
              disabled={busy}
              className="block w-full rounded-full border-2 border-neutral-950 py-4 text-center font-bold text-neutral-950 hover:bg-neutral-950 hover:text-white disabled:opacity-50"
            >
              {t.checkout.whatsappDirect}
            </button>

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
              {t.checkout.successTitle}
            </p>

            {placed && (
              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-2xl font-black text-orange-700">
                  {t.checkout.orderNumber(String(placed.order_number))}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{t.checkout.keepNumber}</p>
                <p className="mt-3 font-bold">
                  {t.checkout.total(formatPrice(placed.total, locale))}
                </p>
              </div>
            )}

            {placed && <PaymentInstructions order={placed} />}

            <p className="text-neutral-600">
              {t.checkout.successText(form.phone)}
            </p>

            <a
              href={buildWhatsAppLink(whatsappMessage())}
              target="_blank"
              className="inline-block rounded-full bg-orange-600 px-7 py-4 font-bold text-white hover:bg-orange-500"
            >
              {t.checkout.whatsappConfirm}
            </a>

            <Link
              href="/catalogue"
              className="block font-bold text-neutral-500 hover:text-neutral-950"
            >
              {t.common.backToCatalogue}
            </Link>
          </div>
        )}
      </div>
    </main>
    <SiteFooter />
    </>
  );
}

function PaymentInstructions({ order }: { order: PlacedOrder }) {
  const { t, locale } = useI18n();
  const label = usePaymentLabel();
  const info = PAYMENT_INFO[order.payment_method];

  if (!info.mobile) {
    return <p className="rounded-2xl bg-emerald-50 p-5 font-semibold text-emerald-800">{t.payment.cashInfo}</p>;
  }

  return (
    <div className="space-y-2 rounded-2xl border-2 border-neutral-950 p-5 text-left">
      <p className="font-black">
        <span className={`mr-2 rounded-full px-3 py-1 text-xs ${info.badge}`}>{label(order.payment_method)}</span>
        {t.payment.momoTitle(label(order.payment_method))}
      </p>
      {info.number ? (
        <>
          <p className="text-lg font-bold">
            {t.payment.momoSend(formatPrice(order.total, locale), info.number, MERCHANT_NAME)}
          </p>
          <p className="text-sm text-neutral-600">{t.payment.momoReference(String(order.order_number))}</p>
          <p className="text-sm text-neutral-600">{t.payment.momoConfirm}</p>
        </>
      ) : (
        <p className="text-sm text-neutral-600">{t.payment.momoWait}</p>
      )}
    </div>
  );
}
