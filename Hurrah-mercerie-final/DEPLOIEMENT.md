# Mise en ligne finale — Hurrah Mercerie

## 0. Ce qui doit être fait AVANT d'ouvrir le site au public

- [ ] Vraies photos des produits (Admin > Produits > « Ajouter des photos »)
- [ ] Remplacer les 5 images de `public/images/` : ce sont des captures de Google Images
      (droits d'auteur non garantis). Prends tes propres photos et garde les mêmes noms de fichiers,
      ou ajoute une photo à chaque catégorie dans Admin > Catégories.
- [ ] Vrais prix et stocks dans Admin > Produits
- [ ] Numéros MoMo marchands, téléphone, adresse, WhatsApp (variables Vercel, étape 4)
- [ ] Relecture des pages Livraison / Conditions de vente : délais, frais, règle de retour
- [ ] Déclaration du traitement des données clients à l'APDP (Autorité de protection des données du Bénin)
- [ ] Relecture du fon par un locuteur (`lib/i18n/fon.ts`)

## 1. Mettre le code sur GitHub

Décompresse `hurrah-version-finale.zip` dans ton dossier personnel, puis :

```bash
cd ~/Hurrah-mercerie
git checkout traduction
git pull
git branch sauvegarde-avant-finale
cp -r ~/Hurrah-mercerie-final/. ~/Hurrah-mercerie/
git rm -q --cached securite.sql lib/placeholder.ts 2>/dev/null
rm -f securite.sql lib/placeholder.ts .env~ lib/supabase.ts~ components/*.tsx~ app/*/*.tsx~ app/*/*/*.tsx~ app/*.before-repair conseils.sql seed-catalogue.sql
npm install
npm run dev
```

Vérifie le site sur http://localhost:3000, puis :

```bash
git add -A
git commit -m "Version finale avant mise en ligne"
git push
```

Annuler si besoin : `git reset --hard sauvegarde-avant-finale`.

Fusionne ensuite `traduction` dans `main` sur GitHub (bouton « Compare & pull request » → Merge).

## 2. Supabase — scripts SQL (SQL Editor)

Exécute dans cet ordre ceux que tu n'as pas encore lancés (tous sont relançables) :

1. `supabase/i18n-english.sql`
2. `supabase/securite.sql` (version actuelle : paiement, anti-spam)
3. `supabase/journal-connexions.sql`
4. `supabase/photos.sql` ← **nouveau** (envoi de photos depuis l'admin)
5. `supabase/conseils.sql` (articles)

⚠️ Si tu as déjà exécuté `securite.sql` récent mais que ton site tourne encore avec l'ancien code,
le bouton « Ajouter au panier » affiche « Stock insuffisant » (l'ancien code appelait une fonction
supprimée pour raison de sécurité). Le code de cette version corrige ce problème.

Vérification rapide :
```sql
select proname, pronargs from pg_proc
where proname in ('create_order','decrease_product_stock','increase_product_stock');
-- attendu : une seule ligne « create_order | 7 »
select id, public from storage.buckets where id = 'images';
-- attendu : images | true
```

## 3. Supabase — réglages

- **Authentication > Sign In / Providers > Email** : désactiver « Allow new users to sign up »
- **Authentication > URL Configuration** : Site URL = adresse du site en ligne
- **Advisors > Security Advisor** : aucune alerte rouge
- Mot de passe admin long et unique
- Administrateur principal :
  ```sql
  update admin_users set is_owner = true
  where id = (select id from auth.users where email = 'TON-EMAIL');
  ```

## 4. Vercel

1. vercel.com > Sign up with GitHub > Add New > Project > `Lucratif-project/Hurrah-mercerie`
2. Branche : `main`. Framework : Next.js (automatique).
3. **Environment Variables** : recopie `.env.example` avec tes vraies valeurs.
   Obligatoires : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_DISPLAY`,
   `NEXT_PUBLIC_ADDRESS`, `SUPABASE_SERVICE_ROLE_KEY` (secret).
   Recommandées : `NEXT_PUBLIC_MOMO_MTN`, `NEXT_PUBLIC_MOMO_MOOV`, `NEXT_PUBLIC_MOMO_CELTIIS`,
   `NEXT_PUBLIC_LEGAL_RCCM`, `NEXT_PUBLIC_LEGAL_IFU`, `NEXT_PUBLIC_LEGAL_OWNER`,
   `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Deploy. Chaque `git push` sur `main` redéploie automatiquement.
5. Domaine : Settings > Domains > `hurrahmercerie.com` (enregistrements DNS chez ton registraire),
   puis mets à jour `NEXT_PUBLIC_SITE_URL` et la Site URL de Supabase.

## 5. Après la mise en ligne

- Google Search Console : ajoute le site et envoie `https://TON-DOMAINE/sitemap.xml`
- Google Business Profile : fiche de la boutique à Cotonou
- Teste depuis un téléphone :
  - menu ☰, changement de langue, bouton WhatsApp vert
  - commande MTN MoMo → numéro de commande + instructions de paiement
  - /suivi avec numéro + téléphone
  - Admin > Produits > ajouter une photo prise avec le téléphone
  - Admin > Sécurité : tes connexions apparaissent
  - partage d'un lien produit sur WhatsApp : aperçu avec titre et prix
