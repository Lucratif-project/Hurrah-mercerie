import Link from "next/link";
import { supabase } from "@/lib/supabase";
import OrderManager from "@/components/OrderManager";

export default async function Orders() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(id, product_name, quantity, price)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Commandes</h1>

        <p className="mt-4 text-neutral-600">
          Suivez et mettez à jour le statut de chaque commande.
        </p>

        <div className="mt-10">
          <OrderManager orders={orders || []} />
        </div>
      </div>
    </main>
  );
}
