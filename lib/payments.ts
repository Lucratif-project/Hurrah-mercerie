// Moyens de paiement acceptés par Hurrah Mercerie.
// Les numéros marchands se règlent dans .env (ou sur Vercel) :
//   NEXT_PUBLIC_MOMO_MTN, NEXT_PUBLIC_MOMO_MOOV, NEXT_PUBLIC_MOMO_CELTIIS
//   NEXT_PUBLIC_MOMO_NAME (nom affiché sur le compte, ex. « Hurrah Mercerie »)
// Si un numéro n'est pas renseigné, le client est invité à attendre
// l'appel ou le message WhatsApp de la boutique.

export const PAYMENT_METHODS = ["mtn_momo", "moov_money", "celtiis_cash", "cash"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_INFO: Record<
  PaymentMethod,
  { label: string; badge: string; number?: string; mobile: boolean }
> = {
  mtn_momo: {
    label: "MTN MoMo",
    badge: "bg-[#ffcb05] text-neutral-950",
    number: process.env.NEXT_PUBLIC_MOMO_MTN,
    mobile: true,
  },
  moov_money: {
    label: "Moov Money",
    badge: "bg-[#0a5cad] text-white",
    number: process.env.NEXT_PUBLIC_MOMO_MOOV,
    mobile: true,
  },
  celtiis_cash: {
    label: "Celtiis Cash",
    badge: "bg-[#6c2bd9] text-white",
    number: process.env.NEXT_PUBLIC_MOMO_CELTIIS,
    mobile: true,
  },
  cash: {
    label: "", // traduit : t.payment.cash
    badge: "bg-emerald-600 text-white",
    mobile: false,
  },
};

export const MERCHANT_NAME = process.env.NEXT_PUBLIC_MOMO_NAME || "Hurrah Mercerie";

export function isPaymentMethod(v: unknown): v is PaymentMethod {
  return typeof v === "string" && (PAYMENT_METHODS as readonly string[]).includes(v);
}
