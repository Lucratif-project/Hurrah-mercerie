// Tous les textes de l'interface publique, en français et en anglais.
// Pour ajouter un texte : ajoute la clé dans `fr`, puis dans `en`.
// TypeScript signale une erreur si une clé manque dans l'une des deux langues.

import type { Locale } from "./config";
import { fonOverrides } from "./fon";

const fr = {
  meta: {
    title: "Hurrah Mercerie | Machines à coudre, tissus et accessoires",
    description:
      "Découvrez Hurrah Mercerie : machines à coudre, tissus, fils et accessoires pour tous vos projets de couture.",
    ogDescription:
      "Machines à coudre, tissus, fils et accessoires pour donner vie à vos créations.",
    ogLocale: "fr_FR",
  },

  language: {
    label: "Langue",
    names: { fr: "Français", en: "English", fon: "Fɔngbè" } as Record<Locale, string>,
  },

  common: {
    home: "Accueil",
    colon: " :",
    discover: "Découvrir",
    discoverArrow: "Découvrir →",
    viewCatalogue: "Voir le catalogue",
    viewCatalogueArrow: "Voir le catalogue →",
    backToCatalogue: "← Retour au catalogue",
    loading: "Chargement…",
    total: "Total",
    subtotal: "Sous-total",
    reference: (ref: string) => `Réf. ${ref}`,
    defaultProductDescription: "Produit Hurrah Mercerie.",
    creationAlt: "Création Hurrah Mercerie",
  },

  header: {
    tagline: "Votre univers couture, mercerie et machines à coudre",
    brandSub: "Mercerie",
    nav: {
      home: "Accueil",
      catalogue: "Catalogue",
      kits: "Kits",
      machines: "Machines",
      blog: "Conseils",
      about: "À propos",
      contact: "Contact",
    },
    favorites: "Favoris",
    tracking: "Suivi commande",
    cart: "Panier",
    discover: "Découvrir",
  },

  footer: {
    about:
      "Machines à coudre, tissus, fils et accessoires pour donner vie à vos créations.",
    navigation: "Navigation",
    links: {
      home: "Accueil",
      catalogue: "Catalogue",
      kits: "Kits couture",
      blog: "Conseils couture",
      machines: "Machines",
      about: "À propos",
      contact: "Contact",
      tracking: "Suivre ma commande",
    },
    contact: "Contact",
    whatsappMessage: "Bonjour Hurrah Mercerie, j'ai une question.",
    whatsappButton: "Écrire sur WhatsApp",
    rights: "Tous droits réservés.",
  },

  home: {
    badge: "L'univers de la couture",
    heroTitle1: "Tout pour",
    heroTitle2: "créer, coudre",
    heroTitle3: "et imaginer.",
    heroText:
      "Découvrez Hurrah Mercerie, votre espace dédié aux machines à coudre, tissus, fils et accessoires indispensables à vos créations.",
    seeMachines: "Voir nos machines",
    exploreShop: "Explorer la mercerie",
    stats: [
      { value: "02", label: "types de machines" },
      { value: "∞", label: "possibilités créatives" },
      { value: "100%", label: "passion couture" },
    ],
    heroImageAlt: "Machine à coudre chez Hurrah Mercerie",
    heroCard: "Donnez vie à vos idées.",
    universesEyebrow: "Nos univers",
    universesTitle: "Tout commence ici.",
    categories: [
      { name: "Fils & Laines", description: "Fils et laines pour vos différents projets." },
      { name: "Duchesse", description: "Découvrez notre sélection de tissus duchesse." },
      { name: "Boutons", description: "Différents boutons et accessoires." },
    ],
    machinesEyebrow: "Machines à coudre",
    machinesTitle: "Choisissez la machine adaptée à votre travail.",
    seeMachine: "Voir la machine",
    features: [
      {
        title: "Un choix pensé pour la couture",
        text: "Des produits sélectionnés pour accompagner débutants et professionnels.",
      },
      {
        title: "Tout au même endroit",
        text: "Machines, tissus, fils et accessoires réunis dans un seul univers.",
      },
      {
        title: "Une expérience simple",
        text: "Parcourez nos produits et trouvez facilement ce dont vous avez besoin.",
      },
    ],
    aboutEyebrow: "À propos de Hurrah",
    aboutTitle: "Une mercerie pensée pour les créateurs.",
    aboutText1:
      "Hurrah Mercerie accompagne les passionnés de couture dans leurs projets en proposant des machines à coudre, des tissus, des fils et différents accessoires.",
    aboutText2:
      "Notre objectif est simple : rendre l'univers de la couture plus accessible et permettre à chacun de trouver facilement les produits nécessaires à ses créations.",
    contactUs: "Nous contacter",
    pillars: ["Machines", "Tissus & fils", "Accessoires", "Créativité"],
    ctaTitle: "Prêt à donner vie à votre prochaine création ?",
    ctaText:
      "Explorez notre univers et découvrez les produits qui vous accompagneront dans vos projets.",
    ctaButton: "Découvrir nos produits",
    featuredEyebrow: "Sélection Hurrah",
    featuredTitle: "Produits mis en avant",
  },

  machines: {
    title: "Machines à coudre",
    intro: "Deux grandes catégories de machines proposées par Hurrah Mercerie.",
    seeMachine: "Voir la machine",
    detailText:
      "Une machine proposée par Hurrah Mercerie pour accompagner vos travaux de couture.",
    askInfo: "Demander des informations",
    items: {
      singer: {
        shortName: "Machine Singer",
        name: "Machine à coudre Singer",
        type: "Familiale",
        description: "Une machine pratique pour les travaux de couture du quotidien.",
      },
      butterfly: {
        shortName: "Machine Butterfly",
        name: "Machine à coudre Butterfly",
        type: "Industrielle",
        description: "Une machine robuste adaptée aux travaux de couture intensifs.",
      },
    },
  },

  catalogue: {
    title: "Notre catalogue",
    intro: "Découvrez nos machines, fils, tissus, boutons et accessoires.",
    searchPlaceholder: "Rechercher un produit, une couleur, une référence…",
    clear: "Effacer",
    search: "Rechercher",
    availability: {
      toutes: "Toute disponibilité",
      disponible: "Disponible",
      rupture: "Rupture",
    },
    exploreByCategory: "Explorer par catégorie",
    allProducts: "Tous les produits",
    ourCategories: "Nos catégories",
    allOurProducts: "Tous nos produits",
    resultsFor: (q: string) => `Résultats pour "${q}"`,
    discoverProducts: "Découvrez nos produits",
    categoryProducts: (c: string) => `Produits ${c}`,
    resultCount: (n: number) => `${n} ${n > 1 ? "résultats" : "résultat"}`,
    noMatch: (q: string) => `Aucun produit ne correspond à "${q}".`,
    emptyCategory: "Aucun produit publié dans cette catégorie pour le moment.",
    seeAllProducts: "Voir tous les produits",
    categoryEyebrow: "Catégorie",
  },

  product: {
    back: "← Catalogue",
    color: "Couleur",
    size: "Taille",
    format: "Format",
    stock: (n: number) => `Stock : ${n}`,
    similar: "Produits similaires",
    quickView: "Vue rapide",
    close: "Fermer",
    fullPage: "Voir la fiche complète →",
    addToWishlist: "Ajouter aux favoris",
    removeFromWishlist: "Retirer des favoris",
  },

  stock: {
    out: "Rupture de stock",
    low: (n: number) => `Plus que ${n} en stock`,
    available: "Disponible",
  },

  addToCart: {
    add: "Ajouter au panier",
    added: "Ajouté au panier ✓",
    out: "Rupture de stock",
  },

  reviews: {
    title: "Avis clients",
    count: (n: number) => `${n} avis`,
    none: "Aucun avis pour ce produit pour le moment.",
    leave: "Laisser un avis",
    thanksPublished: "Merci, votre avis a été publié !",
    thanksToast: "Merci pour votre avis !",
    namePlaceholder: "Votre nom",
    commentPlaceholder: "Votre commentaire (optionnel)",
    sending: "Envoi…",
    publish: "Publier mon avis",
    starLabel: (n: number) => `${n} étoile${n > 1 ? "s" : ""}`,
  },

  cart: {
    title: "Votre panier",
    empty: "Votre panier est vide.",
    remove: "Supprimer",
    promoPlaceholder: "Code promo",
    checking: "Vérification…",
    apply: "Appliquer",
    withdraw: "Retirer",
    promoLine: (code: string, pct: number) => `Code "${code}" : -${pct}%`,
    promoInvalid: "Code promo invalide ou expiré.",
    promoApplied: (code: string, pct: number) =>
      `Code "${code}" appliqué : -${pct}%`,
    discount: (pct: number) => `Réduction (${pct}%)`,
    checkout: "Passer la commande",
    decrease: "Diminuer la quantité",
    increase: "Augmenter la quantité",
  },

  checkout: {
    back: "← Panier",
    title: "Finaliser la commande",
    subtotal: (v: string) => `Sous-total : ${v}`,
    promo: (code: string, v: string) => `Code ${code} : -${v}`,
    total: (v: string) => `Total : ${v}`,
    paymentAccepted: "Paiement accepté :",
    cashOnDelivery: "Espèces à la livraison",
    name: "Nom complet",
    phone: "Téléphone",
    address: "Adresse",
    notes: "Notes",
    confirm: "Confirmer la commande",
    whatsappDirect: "Commander directement par WhatsApp",
    sending: "Envoi...",
    emptyCart: "Votre panier est vide.",
    saveError: "Erreur lors de l'enregistrement.",
    success: "Commande enregistrée avec succès.",
    successTitle: "Commande enregistrée avec succès !",
    successText: (phone: string) =>
      `Hurrah Mercerie va vous contacter au ${phone} pour confirmer votre commande.`,
    whatsappConfirm: "Confirmer aussi par WhatsApp",
    wa: {
      intro: "Bonjour Hurrah Mercerie, je souhaite passer une commande :",
      subtotal: "Sous-total :",
      code: "Code",
      total: "Total :",
      name: "Nom :",
      phone: "Téléphone :",
      address: "Adresse :",
      notes: "Notes :",
    },
  },

  favorites: {
    title: "Mes favoris",
    empty: "Vous n'avez pas encore de favoris.",
  },

  tracking: {
    title: "Suivre ma commande",
    intro: "Entrez le numéro de téléphone utilisé lors de votre commande.",
    placeholder: "Votre numéro de téléphone",
    searching: "Recherche…",
    search: "Chercher",
    none: "Aucune commande trouvée pour ce numéro.",
    status: {
      new: "Nouvelle",
      confirmed: "Confirmée",
      preparing: "En préparation",
      delivered: "Livrée",
      cancelled: "Annulée",
    } as Record<string, string>,
  },

  kits: {
    metaTitle: "Kits couture",
    metaDescription: "Nos kits prêts à l'emploi à prix groupé.",
    title: "Kits couture",
    intro:
      "Des sélections prêtes à l'emploi, à prix groupé, pour bien démarrer votre projet.",
    empty: "Aucun kit disponible pour le moment.",
  },

  blog: {
    metaTitle: "Conseils couture",
    metaDescription: "Astuces, guides et actualités couture par Hurrah Mercerie.",
    title: "Conseils couture",
    intro:
      "Astuces, guides pratiques et actualités pour bien choisir votre matériel de couture.",
    empty: "Aucun article publié pour le moment.",
    read: "Lire →",
    back: "← Conseils couture",
    articleFallback: "Article",
  },

  contact: {
    title: "Contact",
    intro:
      "Pour toute demande concernant les produits, les machines ou une commande, contactez Hurrah Mercerie. Nous répondons rapidement par WhatsApp.",
    phoneLabel: "Téléphone / WhatsApp",
    addressLabel: "Adresse",
    name: "Votre nom",
    phone: "Votre téléphone",
    message: "Votre message",
    fillAll: "Merci de remplir tous les champs.",
    send: "Envoyer sur WhatsApp",
    wa: {
      greeting: "Bonjour Hurrah Mercerie,",
      name: "Nom :",
      phone: "Téléphone :",
    },
  },

  about: {
    title: "À propos de nous",
    text1:
      "Hurrah Mercerie accompagne les passionnés de couture avec des machines à coudre, tissus, fils et accessoires.",
    text2:
      "Notre objectif est de rendre l'univers de la couture plus accessible et de proposer une expérience simple pour découvrir et commander les produits.",
  },

  social: {
    eyebrow: "Nos créations",
    title: "Ce que nos clients réalisent",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "Hurrah Mercerie | Sewing machines, fabrics and notions",
    description:
      "Discover Hurrah Mercerie: sewing machines, fabrics, threads and notions for all your sewing projects.",
    ogDescription:
      "Sewing machines, fabrics, threads and notions to bring your creations to life.",
    ogLocale: "en_GB",
  },

  language: {
    label: "Language",
    names: { fr: "Français", en: "English", fon: "Fɔngbè" },
  },

  common: {
    home: "Home",
    colon: ":",
    discover: "Discover",
    discoverArrow: "Discover →",
    viewCatalogue: "Browse the shop",
    viewCatalogueArrow: "Browse the shop →",
    backToCatalogue: "← Back to the shop",
    loading: "Loading…",
    total: "Total",
    subtotal: "Subtotal",
    reference: (ref: string) => `Ref. ${ref}`,
    defaultProductDescription: "A Hurrah Mercerie product.",
    creationAlt: "Hurrah Mercerie creation",
  },

  header: {
    tagline: "Your world of sewing, haberdashery and sewing machines",
    brandSub: "Haberdashery",
    nav: {
      home: "Home",
      catalogue: "Shop",
      kits: "Kits",
      machines: "Machines",
      blog: "Tips",
      about: "About",
      contact: "Contact",
    },
    favorites: "Wishlist",
    tracking: "Track order",
    cart: "Cart",
    discover: "Discover",
  },

  footer: {
    about:
      "Sewing machines, fabrics, threads and notions to bring your creations to life.",
    navigation: "Navigation",
    links: {
      home: "Home",
      catalogue: "Shop",
      kits: "Sewing kits",
      blog: "Sewing tips",
      machines: "Machines",
      about: "About",
      contact: "Contact",
      tracking: "Track my order",
    },
    contact: "Contact",
    whatsappMessage: "Hello Hurrah Mercerie, I have a question.",
    whatsappButton: "Message us on WhatsApp",
    rights: "All rights reserved.",
  },

  home: {
    badge: "The world of sewing",
    heroTitle1: "Everything to",
    heroTitle2: "create, sew",
    heroTitle3: "and imagine.",
    heroText:
      "Discover Hurrah Mercerie, your place for sewing machines, fabrics, threads and all the essential notions for your creations.",
    seeMachines: "See our machines",
    exploreShop: "Explore the shop",
    stats: [
      { value: "02", label: "types of machines" },
      { value: "∞", label: "creative possibilities" },
      { value: "100%", label: "passion for sewing" },
    ],
    heroImageAlt: "Sewing machine at Hurrah Mercerie",
    heroCard: "Bring your ideas to life.",
    universesEyebrow: "Our collections",
    universesTitle: "It all starts here.",
    categories: [
      { name: "Threads & Yarns", description: "Threads and yarns for all your projects." },
      { name: "Duchess Satin", description: "Discover our selection of duchess satin fabrics." },
      { name: "Buttons", description: "A wide range of buttons and accessories." },
    ],
    machinesEyebrow: "Sewing machines",
    machinesTitle: "Choose the right machine for your work.",
    seeMachine: "See the machine",
    features: [
      {
        title: "A range designed for sewing",
        text: "Carefully selected products for beginners and professionals alike.",
      },
      {
        title: "Everything in one place",
        text: "Machines, fabrics, threads and notions, all in one shop.",
      },
      {
        title: "A simple experience",
        text: "Browse our products and easily find what you need.",
      },
    ],
    aboutEyebrow: "About Hurrah",
    aboutTitle: "A haberdashery made for makers.",
    aboutText1:
      "Hurrah Mercerie supports sewing enthusiasts in their projects with sewing machines, fabrics, threads and a range of notions.",
    aboutText2:
      "Our goal is simple: make sewing more accessible and help everyone easily find the products they need for their creations.",
    contactUs: "Contact us",
    pillars: ["Machines", "Fabrics & threads", "Notions", "Creativity"],
    ctaTitle: "Ready to bring your next creation to life?",
    ctaText:
      "Explore our shop and discover the products that will support you in your projects.",
    ctaButton: "Discover our products",
    featuredEyebrow: "Hurrah picks",
    featuredTitle: "Featured products",
  },

  machines: {
    title: "Sewing machines",
    intro: "Two main types of machines offered by Hurrah Mercerie.",
    seeMachine: "See the machine",
    detailText:
      "A machine offered by Hurrah Mercerie to support all your sewing work.",
    askInfo: "Ask for information",
    items: {
      singer: {
        shortName: "Singer machine",
        name: "Singer sewing machine",
        type: "Home",
        description: "A practical machine for everyday sewing.",
      },
      butterfly: {
        shortName: "Butterfly machine",
        name: "Butterfly sewing machine",
        type: "Industrial",
        description: "A sturdy machine built for heavy-duty sewing.",
      },
    },
  },

  catalogue: {
    title: "Our shop",
    intro: "Discover our machines, threads, fabrics, buttons and notions.",
    searchPlaceholder: "Search for a product, colour or reference…",
    clear: "Clear",
    search: "Search",
    availability: {
      toutes: "Any availability",
      disponible: "In stock",
      rupture: "Out of stock",
    },
    exploreByCategory: "Browse by category",
    allProducts: "All products",
    ourCategories: "Our categories",
    allOurProducts: "All our products",
    resultsFor: (q: string) => `Results for "${q}"`,
    discoverProducts: "Discover our products",
    categoryProducts: (c: string) => `${c}`,
    resultCount: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    noMatch: (q: string) => `No products match "${q}".`,
    emptyCategory: "No products in this category yet.",
    seeAllProducts: "See all products",
    categoryEyebrow: "Category",
  },

  product: {
    back: "← Shop",
    color: "Colour",
    size: "Size",
    format: "Format",
    stock: (n: number) => `Stock: ${n}`,
    similar: "Similar products",
    quickView: "Quick view",
    close: "Close",
    fullPage: "View full details →",
    addToWishlist: "Add to wishlist",
    removeFromWishlist: "Remove from wishlist",
  },

  stock: {
    out: "Out of stock",
    low: (n: number) => `Only ${n} left`,
    available: "In stock",
  },

  addToCart: {
    add: "Add to cart",
    added: "Added to cart ✓",
    out: "Out of stock",
  },

  reviews: {
    title: "Customer reviews",
    count: (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`,
    none: "No reviews for this product yet.",
    leave: "Leave a review",
    thanksPublished: "Thank you, your review has been published!",
    thanksToast: "Thank you for your review!",
    namePlaceholder: "Your name",
    commentPlaceholder: "Your comment (optional)",
    sending: "Sending…",
    publish: "Post my review",
    starLabel: (n: number) => `${n} star${n > 1 ? "s" : ""}`,
  },

  cart: {
    title: "Your cart",
    empty: "Your cart is empty.",
    remove: "Remove",
    promoPlaceholder: "Promo code",
    checking: "Checking…",
    apply: "Apply",
    withdraw: "Remove",
    promoLine: (code: string, pct: number) => `Code "${code}": -${pct}%`,
    promoInvalid: "Invalid or expired promo code.",
    promoApplied: (code: string, pct: number) =>
      `Code "${code}" applied: -${pct}%`,
    discount: (pct: number) => `Discount (${pct}%)`,
    checkout: "Proceed to checkout",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
  },

  checkout: {
    back: "← Cart",
    title: "Complete your order",
    subtotal: (v: string) => `Subtotal: ${v}`,
    promo: (code: string, v: string) => `Code ${code}: -${v}`,
    total: (v: string) => `Total: ${v}`,
    paymentAccepted: "Payment accepted:",
    cashOnDelivery: "Cash on delivery",
    name: "Full name",
    phone: "Phone",
    address: "Address",
    notes: "Notes",
    confirm: "Confirm order",
    whatsappDirect: "Order directly via WhatsApp",
    sending: "Sending...",
    emptyCart: "Your cart is empty.",
    saveError: "Something went wrong while saving your order.",
    success: "Order placed successfully.",
    successTitle: "Order placed successfully!",
    successText: (phone: string) =>
      `Hurrah Mercerie will contact you on ${phone} to confirm your order.`,
    whatsappConfirm: "Also confirm via WhatsApp",
    wa: {
      intro: "Hello Hurrah Mercerie, I would like to place an order:",
      subtotal: "Subtotal:",
      code: "Code",
      total: "Total:",
      name: "Name:",
      phone: "Phone:",
      address: "Address:",
      notes: "Notes:",
    },
  },

  favorites: {
    title: "My wishlist",
    empty: "Your wishlist is empty.",
  },

  tracking: {
    title: "Track my order",
    intro: "Enter the phone number you used when placing your order.",
    placeholder: "Your phone number",
    searching: "Searching…",
    search: "Search",
    none: "No orders found for this number.",
    status: {
      new: "New",
      confirmed: "Confirmed",
      preparing: "Being prepared",
      delivered: "Delivered",
      cancelled: "Cancelled",
    },
  },

  kits: {
    metaTitle: "Sewing kits",
    metaDescription: "Our ready-to-use kits at a bundle price.",
    title: "Sewing kits",
    intro:
      "Ready-to-use selections at a bundle price to get your project off to a great start.",
    empty: "No kits available at the moment.",
  },

  blog: {
    metaTitle: "Sewing tips",
    metaDescription: "Sewing tips, guides and news from Hurrah Mercerie.",
    title: "Sewing tips",
    intro:
      "Tips, practical guides and news to help you choose the right sewing supplies.",
    empty: "No articles published yet.",
    read: "Read →",
    back: "← Sewing tips",
    articleFallback: "Article",
  },

  contact: {
    title: "Contact",
    intro:
      "For any question about our products, machines or an order, get in touch with Hurrah Mercerie. We reply quickly on WhatsApp.",
    phoneLabel: "Phone / WhatsApp",
    addressLabel: "Address",
    name: "Your name",
    phone: "Your phone number",
    message: "Your message",
    fillAll: "Please fill in all fields.",
    send: "Send via WhatsApp",
    wa: {
      greeting: "Hello Hurrah Mercerie,",
      name: "Name:",
      phone: "Phone:",
    },
  },

  about: {
    title: "About us",
    text1:
      "Hurrah Mercerie supports sewing enthusiasts with sewing machines, fabrics, threads and notions.",
    text2:
      "Our goal is to make sewing more accessible and to offer a simple way to discover and order products.",
  },

  social: {
    eyebrow: "Our creations",
    title: "What our customers make",
  },
};

/**
 * Fusionne les traductions fon avec le français : tout texte pas encore
 * traduit en fon s'affiche en français au lieu de laisser un trou.
 */
function withFallback<T>(base: T, overrides: unknown): T {
  if (
    overrides === undefined ||
    overrides === null ||
    typeof base !== "object" ||
    base === null ||
    Array.isArray(base) ||
    typeof overrides !== "object" ||
    Array.isArray(overrides)
  ) {
    return (overrides ?? base) as T;
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(overrides as Record<string, unknown>)) {
    if (value !== undefined && value !== "") {
      result[key] = withFallback((base as Record<string, unknown>)[key], value);
    }
  }
  return result as T;
}

const fon: Dictionary = withFallback(fr, fonOverrides);

export const dictionaries: Record<Locale, Dictionary> = { fr, en, fon };
