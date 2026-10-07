import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-url";

// Régénéré au plus toutes les heures.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/catalogue`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/machines`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/machines/singer`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/machines/butterfly`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kits`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/a-propos`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/livraison-retours`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/conditions-de-vente`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.1 },
  ];

  try {
    const [{ data: products }, { data: posts }] = await Promise.all([
      supabase.from("products").select("id, updated_at").eq("status", "published"),
      supabase.from("blog_posts").select("slug, created_at").eq("status", "published"),
    ]);

    for (const p of products || []) {
      pages.push({
        url: `${SITE_URL}/produits/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const post of posts || []) {
      pages.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.created_at ? new Date(post.created_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // Base injoignable : on garde au moins les pages fixes.
  }

  return pages;
}
