import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";

const MODULES = [
  ["Produits", "/admin/products"],
  ["Catégories", "/admin/categories"],
  ["Commandes", "/admin/orders"],
  ["Codes promo", "/admin/promo"],
  ["Kits couture", "/admin/kits"],
  ["Blog", "/admin/blog"],
  ["Galerie", "/admin/galerie"],
  ["Administrateurs", "/admin/administrators"],
];

export default async function Admin() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [{ data: monthOrders }, { data: lowStock }, { data: recentOrders }] =
    await Promise.all([
      supabase
        .from("orders")
        .select("total, created_at")
        .gte("created_at", startOfMonth.toISOString()),
      supabase
        .from("products")
        .select("id, name, stock")
        .eq("status", "published")
        .lte("stock", 5)
        .order("stock", { ascending: true }),
      supabase
        .from("orders")
        .select("id, customer_name, total, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const monthRevenue = (monthOrders || []).reduce((s, o) => s + (o.total || 0), 0);
  const monthCount = (monthOrders || []).length;

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Administration
          </p>

          <h1 className="mt-3 text-5xl font-black">Tableau de bord</h1>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">
                Chiffre d'affaires ce mois
              </p>
              <p className="mt-2 text-3xl font-black text-orange-600">
                {formatPrice(monthRevenue)}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">
                Commandes ce mois
              </p>
              <p className="mt-2 text-3xl font-black">{monthCount}</p>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">
                Produits en rupture / stock faible
              </p>
              <p className="mt-2 text-3xl font-black text-amber-600">
                {(lowStock || []).length}
              </p>
            </div>
          </div>

          {(lowStock || []).length > 0 && (
            <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="text-xl font-black">Stock à surveiller</h2>
              <div className="mt-4 space-y-2">
                {(lowStock || []).map((p) => (
                  <div key={p.id} className="flex justify-between text-sm">
                    <span>{p.name}</span>
                    <span className={p.stock <= 0 ? "font-bold text-red-600" : "font-bold text-amber-600"}>
                      {p.stock <= 0 ? "Rupture" : `${p.stock} restants`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(recentOrders || []).length > 0 && (
            <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Dernières commandes</h2>
                <Link href="/admin/orders" className="text-sm font-bold text-orange-600">
                  Voir tout →
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {(recentOrders || []).map((o) => (
                  <div key={o.id} className="flex justify-between text-sm">
                    <span>{o.customer_name}</span>
                    <span className="font-bold">{formatPrice(o.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className="rounded-3xl bg-white p-7 shadow-sm hover:shadow-xl"
              >
                <h2 className="text-2xl font-black">{name}</h2>
                <p className="mt-4 font-semibold text-orange-600">Gérer →</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
