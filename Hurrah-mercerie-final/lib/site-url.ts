// Adresse publique du site (pour Google, les aperçus WhatsApp/Facebook…).
// À régler sur Vercel : NEXT_PUBLIC_SITE_URL=https://ton-domaine
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hurrahmercerie.com").replace(/\/$/, "");
