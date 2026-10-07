#!/usr/bin/env bash
# ------------------------------------------------------------------
# Installe la version finale de Hurrah Mercerie dans ton projet.
# Utilisation :   bash ~/Hurrah-mercerie-final/installer.sh
# (ou, si ton projet est ailleurs :  bash installer.sh /chemin/vers/Hurrah-mercerie)
# Ton .env / .env.local ne sont jamais touchés.
# ------------------------------------------------------------------
set -uo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${1:-$HOME/Hurrah-mercerie}"
vert() { printf "\033[32m%s\033[0m\n" "$1"; }
rouge() { printf "\033[31m%s\033[0m\n" "$1"; }

if [ ! -f "$DEST/package.json" ] || [ ! -d "$DEST/.git" ]; then
  rouge "✗ Projet introuvable dans : $DEST"
  echo "  Donne le bon chemin : bash $0 /chemin/vers/Hurrah-mercerie"
  exit 1
fi
DEST="$(cd "$DEST" && pwd)"
if [ "$SRC" = "$DEST" ]; then
  rouge "✗ Lance ce script depuis le dossier décompressé, pas depuis ton projet."
  exit 1
fi

echo "Source : $SRC"
echo "Projet : $DEST"
cd "$DEST" || exit 1

# 1. Sauvegarde
git add -A >/dev/null 2>&1
git commit -q -m "Sauvegarde avant version finale" >/dev/null 2>&1 || true
git branch -f sauvegarde-avant-finale >/dev/null 2>&1
vert "✓ Sauvegarde : branche « sauvegarde-avant-finale » (annuler : git reset --hard sauvegarde-avant-finale)"

# 2. Copie (le script lui-même n'est pas copié)
tar -C "$SRC" --exclude=./installer.sh -cf - . | tar -C "$DEST" -xf -
vert "✓ Fichiers copiés"

# 3. Anciens fichiers devenus inutiles
rm -f securite.sql conseils.sql seed-catalogue.sql lib/placeholder.ts .env~ \
      lib/supabase.ts~ components/*.tsx~ app/*/*.tsx~ app/*/*/*.tsx~ app/*.before-repair
git rm -q --cached securite.sql conseils.sql seed-catalogue.sql lib/placeholder.ts >/dev/null 2>&1 || true
rm -rf .next   # vide le cache : sinon l'ancien site peut rester affiché
vert "✓ Anciens fichiers et cache supprimés"

# 4. Dépendances
if [ "${SKIP_NPM:-0}" != "1" ]; then
  echo "Installation des dépendances (1 à 2 minutes)…"
  if npm install --no-audit --no-fund >/tmp/hurrah-npm.log 2>&1; then
    vert "✓ Dépendances installées"
  else
    rouge "✗ npm install a échoué : voir /tmp/hurrah-npm.log"
  fi
fi

# 5. Vérification
ok=1
check() { if eval "$1"; then vert "  ✓ $2"; else rouge "  ✗ $2"; ok=0; fi; }
echo "Vérification :"
check '[ -f lib/productVisual.ts ]' "Illustrations des produits"
check 'grep -q getProductVisual components/ProductCard.tsx' "Cartes produits branchées sur les illustrations"
check 'grep -q getCategoryImage app/catalogue/page.tsx' "Images différentes par catégorie"
check '! grep -q "en stock\`" components/AddToCart.tsx' "Ancien bouton panier remplacé"
check '[ -f lib/payments.ts ]' "Paiement MTN / Moov / Celtiis / espèces"
check '[ -f app/api/auth/login/route.ts ]' "Journal des connexions"
check '[ -f supabase/photos.sql ]' "Envoi de photos depuis l'admin"
check 'grep -q "\"next\": \"^16.3.8\"" package.json' "Next.js corrigé (16.3.8)"

echo
if [ "$ok" = 1 ]; then
  vert "Tout est en place."
  echo "Ensuite :"
  echo "  1. Arrête l'ancien serveur (Ctrl + C) s'il tourne encore"
  echo "  2. npm run dev   puis ouvre http://localhost:3000/catalogue"
  echo "  3. Si tout va bien : git add -A && git commit -m \"Version finale\" && git push"
else
  rouge "Certains éléments manquent : envoie une capture de ce message à Claude."
fi
