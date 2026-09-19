"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";
import { formatPrice } from "@/lib/format";

type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  notes: string | null;
  status: string;
  total: number;
  created_at: string;
  order_items?: OrderItem[];
};

const STATUSES = [
  { value: "new", label: "Nouvelle", color: "bg-blue-50 text-blue-700" },
  {
    value: "confirmed",
    label: "Confirmée",
    color: "bg-purple-50 text-purple-700",
  },
  {
    value: "preparing",
    label: "En préparation",
    color: "bg-amber-50 text-amber-700",
  },
  {
    value: "delivered",
    label: "Livrée",
    color: "bg-emerald-50 text-emerald-700",
  },
  { value: "cancelled", label: "Annulée", color: "bg-red-50 text-red-700" },
];

export default function OrderManager({ orders }: { orders: Order[] }) {
  const toast = useToast();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(order: Order, status: string) {
    setBusyId(order.id);

    const { error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", order.id);

    setBusyId(null);

    if (error) {
      toast.show(error.message, "error");
      return;
    }

    window.location.reload();
  }

  if (!orders.length) {
    return (
      <div className="rounded-3xl bg-white p-8 text-neutral-500">
        Aucune commande pour le moment.
      </div>
    );
  }

  function exportCsv() {
    const header = ["Date", "Client", "Téléphone", "Statut", "Total", "Articles"];
    const rows = orders.map((o) => [
      new Date(o.created_at).toLocaleString("fr-FR"),
      o.customer_name,
      o.customer_phone,
      STATUSES.find((s) => s.value === o.status)?.label || o.status,
      String(o.total),
      (o.order_items || []).map((i) => `${i.quantity}x ${i.product_name}`).join(" | "),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commandes-hurrah-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={exportCsv}
          className="rounded-full border border-neutral-950 px-5 py-2 text-sm font-bold hover:bg-neutral-950 hover:text-white"
        >
          Exporter en CSV
        </button>
      </div>
      {orders.map((order) => {
        const statusInfo =
          STATUSES.find((s) => s.value === order.status) || STATUSES[0];
        const isOpen = openId === order.id;

        return (
          <div key={order.id} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <b>{order.customer_name}</b>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-500">
                  {order.customer_phone}
                  {order.customer_address ? ` · ${order.customer_address}` : ""}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  {new Date(order.created_at).toLocaleString("fr-FR")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <b className="text-lg text-orange-600">
                  {formatPrice(order.total)}
                </b>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                  className="rounded-full border px-4 py-2 text-xs font-bold"
                >
                  {isOpen ? "Fermer" : "Détails"}
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="mt-5 space-y-4 border-t pt-5">
                <div className="space-y-2">
                  {(order.order_items || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-neutral-600"
                    >
                      <span>
                        {item.quantity} × {item.product_name}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}

                  {order.notes && (
                    <p className="rounded-2xl bg-neutral-50 p-3 text-sm text-neutral-500">
                      Note : {order.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      disabled={busyId === order.id}
                      onClick={() => updateStatus(order, s.value)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition disabled:opacity-50 ${
                        order.status === s.value
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 hover:bg-neutral-950 hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
