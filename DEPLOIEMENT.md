# Mise en ligne — Hurrah Mercerie

## 1. Appliquer le code (branche `traduction`)
Copie `paiement-securite.patch` et `journal-connexions.patch` à la racine du projet, puis :
```bash
git checkout traduction
git pull
git am paiement-securite.patch
git am journal-connexions.patch
npm install
npm run dev
```
`git am` crée directement le commit. Si tu préfères : `git apply paiement-securite.patch`
puis `git add -A && git commit -m "Paiement et sécurité"`.

## 2. Mettre à jour Supabase (EN MÊME TEMPS que l'étape 1)
SQL Editor > colle tout `supabase/securite.sql` (nouvelle version) > Run.
Il est relançable. Il :
- ajoute le moyen de paiement et le statut « payé » aux commandes ;
- supprime `decrease_product_stock` et `increase_product_stock` ;
- ajoute la limite anti-spam des commandes.

Vérification :
```sql
select proname, pronargs from pg_proc
where proname in ('create_order','decrease_product_stock','increase_product_stock');
```
→ une seule ligne attendue : `create_order | 7`.

Puis exécute `supabase/journal-connexions.sql` (relançable). Il :
- crée le rôle **administrateur principal** (le plus ancien admin le devient
  automatiquement) ;
- réserve la gestion des admins à l'administrateur principal ;
- crée le journal des connexions `login_attempts`.

Pour choisir toi-même le compte principal :
```sql
update admin_users set is_owner = true
where id = (select id from auth.users where email = 'TON-EMAIL');
```

Si tu ne l'as pas encore fait : exécute aussi `supabase/conseils.sql` (articles).

### Clé secrète pour le journal
Supabase > Project Settings > API Keys > copie la clé **secret / service_role**.
Mets-la dans `.env.local` (et sur Vercel) sous le nom `SUPABASE_SERVICE_ROLE_KEY`.
⚠️ Jamais de préfixe `NEXT_PUBLIC_`, jamais dans un fichier commité, jamais partagée.
Sans cette clé, la connexion marche mais rien n'est enregistré ni bloqué.

## 3. Réglages Supabase (tableau de bord)
- **Authentication > Sign In / Providers > Email** : désactive « Allow new users to sign up ».
  Seuls les admins ont besoin d'un compte.
- **Authentication > URL Configuration** : Site URL = l'adresse de ton site en ligne.
- **Advisors > Security Advisor** : aucune alerte rouge ne doit rester.
- Mot de passe admin : long et unique (12 caractères minimum).

## 4. Fusionner dans `main`
```bash
git push
```
Puis sur GitHub : bandeau « Compare & pull request » de la branche `traduction` → Merge.

## 5. Déployer sur Vercel (gratuit pour démarrer)
1. vercel.com > Sign up with GitHub.
2. Add New > Project > importe `Lucratif-project/Hurrah-mercerie`.
3. Framework : Next.js (détecté automatiquement). Branche : `main`.
4. **Environment Variables** : recopie chaque ligne de `.env.example` avec tes vraies valeurs :
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (ex. `https://hurrah-mercerie.vercel.app` au début)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_ADDRESS`
   - `NEXT_PUBLIC_MOMO_NAME`, `NEXT_PUBLIC_MOMO_MTN`, `NEXT_PUBLIC_MOMO_MOOV`, `NEXT_PUBLIC_MOMO_CELTIIS`
   - `SUPABASE_SERVICE_ROLE_KEY` (**secret**, obligatoire pour le journal de connexions)
   - `DEEPL_API_KEY` (facultatif, secret)
5. Deploy. Chaque `git push` sur `main` redéploie ensuite automatiquement.
6. Nom de domaine : Vercel > Settings > Domains > ajoute `hurrahmercerie.com`,
   puis recopie les enregistrements DNS indiqués chez ton registraire.
   Mets ensuite à jour `NEXT_PUBLIC_SITE_URL` et la Site URL de Supabase.

## 6. Tests après mise en ligne
- Commande avec MTN MoMo : le numéro marchand et le n° de commande s'affichent.
- Admin > Commandes : badge du réseau, bouton « Marquer comme payé ».
- /suivi : numéro de commande + téléphone → statut et paiement.
- 4 commandes d'affilée avec le même téléphone : la 4e est refusée (normal).
- Ajouter au panier ne change plus le stock ; valider la commande, si.
- Connexion admin avec un mauvais mot de passe 2 fois, puis le bon :
  Admin > Sécurité affiche les 2 échecs et la réussite, avec ton IP et ton pays.
  (En local, l'IP affichée est « ::1 » ou « inconnue » : c'est normal.)
- Avec un compte admin non principal : Admin > Sécurité est refusé.
