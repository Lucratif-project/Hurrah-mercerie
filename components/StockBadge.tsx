"use client";

import { useI18n } from "@/lib/i18n/client";

type Props = {
  stock: number;
  lowStockThreshold?: number;
};

export default function StockBadge({ stock, lowStockThreshold = 5 }: Props) {
  const { t } = useI18n();

  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        {t.stock.out}
      </span>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        {t.stock.low(stock)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {t.stock.available}
    </span>
  );
}
