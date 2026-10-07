import type { NextConfig } from "next";

const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "").hostname;
  } catch {
    return "";
  }
})();

// En-têtes de sécurité envoyés avec chaque page.
const securityHeaders = [
  // Interdit d'afficher le site dans une iframe d'un autre site (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  // Empêche le navigateur de deviner le type d'un fichier.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // N'envoie que le domaine (pas l'adresse complète) aux autres sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Le site n'a pas besoin de la caméra, du micro ni de la localisation.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force le HTTPS pendant 2 ans.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Seuls ces domaines passent par l'optimiseur (voir lib/images.ts).
    remotePatterns: [
      ...(supabaseHost ? [{ protocol: "https" as const, hostname: supabaseHost }] : []),
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
