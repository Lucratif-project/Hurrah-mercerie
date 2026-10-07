"use client";

import { PAYMENT_INFO, PAYMENT_METHODS, type PaymentMethod } from "@/lib/payments";
import { useI18n } from "@/lib/i18n/client";

export function usePaymentLabel() {
  const { t } = useI18n();
  return (m: PaymentMethod) => (m === "cash" ? t.payment.cash : PAYMENT_INFO[m].label);
}

/** Pastilles « MTN MoMo · Moov Money · Celtiis Cash · Espèces ». */
export default function PaymentBadges({
  title = true,
  className = "",
}: {
  title?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  const label = usePaymentLabel();

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs font-bold ${className}`}>
      {title && <span className="opacity-70">{t.payment.accepted}</span>}
      {PAYMENT_METHODS.map((m) => (
        <span key={m} className={`rounded-full px-3 py-1.5 ${PAYMENT_INFO[m].badge}`}>
          {label(m)}
        </span>
      ))}
    </div>
  );
}
