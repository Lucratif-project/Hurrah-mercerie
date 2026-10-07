import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages privées ou sans intérêt pour Google.
      disallow: ["/admin", "/api", "/login", "/register", "/panier", "/commande", "/suivi", "/favoris"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
