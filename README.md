# Hurrah Mercerie

Boutique en ligne de mercerie et de machines à coudre (Cotonou, Bénin).
Next.js 16 · Supabase · Tailwind CSS · déploiement Vercel.

## Fonctionnalités

**Boutique**
- Catalogue avec recherche, filtres par catégorie et disponibilité, aperçu rapide
- Fiches produits : galerie, variantes, stock, produits similaires, avis clients (validés par l'admin)
- Illustrations automatiques par type et couleur de produit tant qu'il n'y a pas de photo
- Panier, codes promo, favoris
- Commande sécurisée côté serveur (prix relus en base, stock réservé à la validation, anti-spam)
- Paiement : MTN MoMo, Moov Money, Celtiis Cash ou espèces ; instructions de paiement avec numéro de commande
- Commande et contact par WhatsApp, bouton WhatsApp flottant
- Suivi de commande (numéro + téléphone)
- Site en français, anglais et fon
- Menu mobile, pages légales, page 404, sitemap, robots.txt, données structurées Google

**Administration** (`/admin`)
- Produits, catégories, kits, blog, galerie : envoi de photos depuis le téléphone (Supabase Storage)
- Traduction automatique FR → EN (DeepL)
- Commandes : statut, moyen de paiement, « payé / non payé », export CSV ; annulation = stock remis
- Avis clients à valider, codes promo, administrateurs
- Sécurité (administrateur principal) : journal des connexions, blocage automatique des attaques

## Démarrer en local

```bash
cp .env.example .env.local   # puis remplir les valeurs
npm install
npm run dev
```

## Base de données (Supabase > SQL Editor, dans cet ordre)

| Script | Rôle |
|---|---|
| `supabase/schema.sql` | Tables |
| `supabase/seed-catalogue.sql` | Catalogue de démarrage (53 produits) |
| `supabase/update-images.sql` | 4 photos produits existantes |
| `supabase/i18n-english.sql` | Colonnes et textes anglais |
| `supabase/securite.sql` | Règles de sécurité, commandes, paiement |
| `supabase/journal-connexions.sql` | Administrateur principal, journal des connexions |
| `supabase/photos.sql` | Stockage des photos |
| `supabase/conseils.sql` | Articles de conseils |

Tous les scripts sont relançables.

Mise en ligne pas à pas : voir **DEPLOIEMENT.md**.
