import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";

// Heure actuelle (pages rendues à chaque visite, côté serveur).
function nowMs() {
  return Date.now();
}

const MODULES = [
  ["Produits", "/admin/products"],
  ["Catégories", "/admin/categories"],
  ["Commandes", "/admin/orders"],
  ["Avis clients", "/admin/avis"],
  ["Codes promo", "/admin/promo"],
  ["Kits couture", "/admin/kits"],
  ["Blog", "/admin/blog"],
  ["Galerie", "/admin/galerie"],
  ["Administrateurs", "/admin/administrators"],
];

export default async function Admin() {
  const supabase = await createClient();
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    { data: monthOrders },
    { data: lowStock },
    { data: recentOrders },
    { count: pendingReviews },
  ] =
    await Promise.all([
      supabase
        .from("orders")
        .select("total, created_at")
        .neq("status", "cancelled")
        .gte("created_at", startOfMonth.toISOString()),
      supabase
        .from("products")
        .select("id, name, stock")
        .eq("status", "published")
        .lte("stock", 5)
        .order("stock", { ascending: true }),
      supabase
        .from("orders")
        .select("id, order_number, customer_name, total, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("product_reviews")
        .select("id", { count: "exact", head: true })
        .eq("approved", false),
    ]);

  // Journal de sécurité : visible uniquement par l'administrateur principal.
  const { data: isOwner } = await supabase.rpc("is_owner");
  let failedLogins24h = 0;
  if (isOwner) {
    const { count } = await supabase
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("success", false)
      .gte("created_at", new Date(nowMs() - 86400_000).toISOString());
    failedLogins24h = count || 0;
  }
  const modules = isOwner ? [...MODULES, ["Sécurité", "/admin/securite"]] : MODULES;

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

          {isOwner && failedLogins24h >= 5 && (
            <Link
              href="/admin/securite?filtre=echecs"
              className="mt-8 block rounded-3xl bg-red-50 p-5 font-bold text-red-700 hover:bg-red-100"
            >
              ⚠ {failedLogins24h} tentatives de connexion échouées en 24 h → voir le journal de sécurité
            </Link>
          )}

          {(pendingReviews || 0) > 0 && (
            <Link
              href="/admin/avis"
              className="mt-8 block rounded-3xl bg-orange-50 p-5 font-bold text-orange-700 hover:bg-orange-100"
            >
              {pendingReviews} avis client{(pendingReviews || 0) > 1 ? "s" : ""} en attente de validation →
            </Link>
          )}

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
                    <span>
                      <span className="text-neutral-400">n° {o.order_number}</span>{" "}
                      {o.customer_name}
                    </span>
                    <span className="font-bold">{formatPrice(o.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(([name, href]) => (
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
