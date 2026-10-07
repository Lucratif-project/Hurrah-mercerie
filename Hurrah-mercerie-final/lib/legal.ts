// Contenu des pages légales (français / anglais).
// ⚠️ Ce sont des modèles raisonnables pour une boutique au Bénin :
// adapte les délais, frais et règles à ta façon de travailler, et fais-les
// relire par un professionnel du droit si besoin.
// Les informations de l'entreprise se règlent dans les variables
// d'environnement (voir .env.example) ; une ligne vide n'est pas affichée.

import type { Locale } from "@/lib/i18n/config";
import { SITE_CONTACT } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

export type LegalSection = { title: string; body: (string | null)[] };
export type LegalPage = { title: string; intro?: string; sections: LegalSection[] };
export type LegalSlug = "mentions-legales" | "conditions-de-vente" | "livraison-retours" | "confidentialite";

const env = (k: string) => (process.env[k] || "").trim();
const COMPANY = env("NEXT_PUBLIC_LEGAL_NAME") || "Hurrah Mercerie";
const RCCM = env("NEXT_PUBLIC_LEGAL_RCCM");
const IFU = env("NEXT_PUBLIC_LEGAL_IFU");
const OWNER = env("NEXT_PUBLIC_LEGAL_OWNER");
const EMAIL = env("NEXT_PUBLIC_CONTACT_EMAIL");
const PHONE = env("NEXT_PUBLIC_PHONE_DISPLAY");
const ADDRESS = SITE_CONTACT.address;
const DELIVERY_DAYS = env("NEXT_PUBLIC_DELIVERY_DAYS") || "24 à 72 h";
const DELIVERY_DAYS_EN = env("NEXT_PUBLIC_DELIVERY_DAYS_EN") || "24 to 72 hours";
const RETURN_DAYS = env("NEXT_PUBLIC_RETURN_DAYS") || "7";

const line = (label: string, value: string) => (value ? `${label} : ${value}` : null);
const lineEn = (label: string, value: string) => (value ? `${label}: ${value}` : null);

const fr: Record<LegalSlug, LegalPage> = {
  "mentions-legales": {
    title: "Mentions légales",
    sections: [
      {
        title: "Éditeur du site",
        body: [
          `Le site ${SITE_URL.replace(/^https?:\/\//, "")} est édité par ${COMPANY}.`,
          line("Adresse", ADDRESS),
          line("Téléphone / WhatsApp", PHONE),
          line("E-mail", EMAIL),
          line("RCCM", RCCM),
          line("IFU", IFU),
          line("Responsable de la publication", OWNER),
        ],
      },
      {
        title: "Hébergement",
        body: [
          "Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).",
          "Données de la boutique (catalogue, commandes) hébergées par Supabase Inc. (supabase.com).",
        ],
      },
      {
        title: "Propriété intellectuelle",
        body: [
          `Les textes, logos et éléments graphiques du site appartiennent à ${COMPANY}. Toute reproduction sans autorisation est interdite.`,
          "Les marques citées (Singer, Butterfly…) appartiennent à leurs propriétaires respectifs.",
        ],
      },
      {
        title: "Responsabilité",
        body: [
          "Nous faisons notre possible pour que les informations du site (prix, stock, descriptions) soient exactes. Une erreur manifeste de prix ne peut pas nous engager : nous vous contactons alors avant toute validation.",
        ],
      },
    ],
  },

  "conditions-de-vente": {
    title: "Conditions générales de vente",
    intro: `Les présentes conditions s'appliquent à toute commande passée sur le site ou par WhatsApp auprès de ${COMPANY}.`,
    sections: [
      {
        title: "1. Produits et prix",
        body: [
          "Les produits sont décrits le plus précisément possible. Les couleurs peuvent légèrement varier selon votre écran.",
          "Les prix sont indiqués en francs CFA (FCFA), toutes taxes comprises. Les frais de livraison éventuels sont communiqués avant la confirmation de la commande.",
        ],
      },
      {
        title: "2. Commande",
        body: [
          "Votre commande est enregistrée dès sa validation sur le site ; un numéro de commande vous est alors attribué.",
          "Nous vous contactons par téléphone ou WhatsApp pour confirmer la commande, le moyen de paiement et la livraison. Nous pouvons annuler une commande si un produit n'est plus disponible ou si le client reste injoignable.",
        ],
      },
      {
        title: "3. Paiement",
        body: [
          "Moyens acceptés : MTN MoMo, Moov Money, Celtiis Cash, ou espèces à la livraison / au retrait.",
          "Pour un paiement Mobile Money, la commande est préparée dès réception du transfert. Indiquez votre numéro de commande comme motif.",
        ],
      },
      {
        title: "4. Livraison et retrait",
        body: ["Voir la page « Livraison et retours »."],
      },
      {
        title: "5. Échanges, retours et garantie",
        body: [
          `Vous pouvez demander un échange ou un remboursement dans les ${RETURN_DAYS} jours suivant la réception, pour un article non utilisé et dans son emballage d'origine.`,
          "Les tissus, rubans, élastiques et entoilages coupés au mètre ne sont ni repris ni échangés, sauf défaut.",
          "Un produit défectueux ou non conforme est échangé ou remboursé. Les machines à coudre bénéficient de la garantie indiquée lors de la vente.",
        ],
      },
      {
        title: "6. Litiges",
        body: [
          "En cas de difficulté, contactez-nous d'abord : nous cherchons toujours une solution à l'amiable. À défaut, le droit béninois s'applique et les tribunaux de Cotonou sont compétents.",
        ],
      },
    ],
  },

  "livraison-retours": {
    title: "Livraison et retours",
    sections: [
      {
        title: "Zones et délais",
        body: [
          `Livraison à Cotonou et environs (Abomey-Calavi, Porto-Novo…) sous ${DELIVERY_DAYS} après confirmation de la commande.`,
          "Autres villes du Bénin : expédition par transporteur, délai et frais communiqués à la confirmation.",
          "Retrait gratuit en boutique possible : nous vous prévenons dès que la commande est prête.",
        ],
      },
      {
        title: "Frais de livraison",
        body: [
          "Les frais dépendent du quartier ou de la ville. Ils vous sont indiqués par téléphone ou WhatsApp avant la livraison ; rien n'est livré sans votre accord.",
        ],
      },
      {
        title: "Suivi",
        body: [
          "Suivez l'avancement de votre commande sur la page « Suivre ma commande », avec votre numéro de commande et votre téléphone.",
        ],
      },
      {
        title: "Retours et échanges",
        body: [
          `Contactez-nous sous ${RETURN_DAYS} jours après réception, avec votre numéro de commande et une photo du produit.`,
          "L'article doit être non utilisé, dans son emballage d'origine. Les produits coupés au mètre ne sont pas repris, sauf défaut.",
          "Si le produit est défectueux ou ne correspond pas à la commande, l'échange ou le remboursement est à notre charge.",
        ],
      },
    ],
  },

  confidentialite: {
    title: "Politique de confidentialité",
    intro: `${COMPANY} respecte la loi n° 2017-20 portant Code du numérique en République du Bénin.`,
    sections: [
      {
        title: "Données collectées",
        body: [
          "Lors d'une commande : nom, téléphone, adresse de livraison, remarques, contenu de la commande et moyen de paiement choisi.",
          "Lors d'un avis client : le nom que vous indiquez et votre commentaire.",
          "Pour la sécurité de l'espace d'administration : adresse IP, pays et type d'appareil des tentatives de connexion.",
        ],
      },
      {
        title: "Utilisation",
        body: [
          "Ces données servent uniquement à traiter et livrer vos commandes, vous contacter à leur sujet et protéger le site contre les attaques. Elles ne sont jamais vendues ni utilisées pour de la publicité.",
        ],
      },
      {
        title: "Durée de conservation",
        body: [
          "Commandes : le temps nécessaire à leur suivi et à nos obligations comptables.",
          "Journal des connexions à l'administration : 90 jours, puis suppression automatique.",
        ],
      },
      {
        title: "Cookies et stockage",
        body: [
          "Le site n'utilise ni publicité ni outil de suivi. Il enregistre seulement, sur votre appareil, votre panier, vos favoris et la langue choisie, ainsi que la session des administrateurs.",
        ],
      },
      {
        title: "Vos droits",
        body: [
          "Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou vous opposer à leur traitement, en nous contactant.",
          line("Contact", [PHONE, EMAIL].filter(Boolean).join(" · ")),
          "Vous pouvez aussi saisir l'Autorité de Protection des Données à caractère Personnel (APDP) du Bénin.",
        ],
      },
    ],
  },
};

const en: Record<LegalSlug, LegalPage> = {
  "mentions-legales": {
    title: "Legal notice",
    sections: [
      {
        title: "Publisher",
        body: [
          `${SITE_URL.replace(/^https?:\/\//, "")} is published by ${COMPANY}.`,
          lineEn("Address", ADDRESS),
          lineEn("Phone / WhatsApp", PHONE),
          lineEn("Email", EMAIL),
          lineEn("Trade register (RCCM)", RCCM),
          lineEn("Tax ID (IFU)", IFU),
          lineEn("Publication manager", OWNER),
        ],
      },
      {
        title: "Hosting",
        body: [
          "Website hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (vercel.com).",
          "Shop data (catalogue, orders) hosted by Supabase Inc. (supabase.com).",
        ],
      },
      {
        title: "Intellectual property",
        body: [
          `Texts, logos and graphics on this site belong to ${COMPANY}. Reproduction without permission is prohibited.`,
          "Brands mentioned (Singer, Butterfly…) belong to their respective owners.",
        ],
      },
      {
        title: "Liability",
        body: [
          "We do our best to keep information (prices, stock, descriptions) accurate. An obvious pricing error is not binding: we will contact you before confirming.",
        ],
      },
    ],
  },
  "conditions-de-vente": {
    title: "Terms of sale",
    intro: `These terms apply to every order placed on the website or via WhatsApp with ${COMPANY}.`,
    sections: [
      { title: "1. Products and prices", body: ["Products are described as accurately as possible; colours may vary slightly on screen.", "Prices are in CFA francs (FCFA), all taxes included. Any delivery fee is communicated before the order is confirmed."] },
      { title: "2. Orders", body: ["Your order is recorded once submitted and receives an order number.", "We contact you by phone or WhatsApp to confirm the order, payment and delivery. We may cancel an order if a product is no longer available or the customer cannot be reached."] },
      { title: "3. Payment", body: ["Accepted: MTN MoMo, Moov Money, Celtiis Cash, or cash on delivery / pick-up.", "For Mobile Money, the order is prepared once the transfer is received. Use your order number as the reference."] },
      { title: "4. Delivery and pick-up", body: ["See the “Delivery and returns” page."] },
      { title: "5. Exchanges, returns and warranty", body: [`You may request an exchange or refund within ${RETURN_DAYS} days of receipt for unused items in their original packaging.`, "Fabrics, ribbons, elastics and interfacing cut by the metre cannot be returned unless defective.", "Defective or incorrect products are exchanged or refunded. Sewing machines come with the warranty stated at the time of sale."] },
      { title: "6. Disputes", body: ["Please contact us first: we always look for an amicable solution. Otherwise, Beninese law applies and the courts of Cotonou have jurisdiction."] },
    ],
  },
  "livraison-retours": {
    title: "Delivery and returns",
    sections: [
      { title: "Areas and times", body: [`Delivery in Cotonou and surroundings (Abomey-Calavi, Porto-Novo…) within ${DELIVERY_DAYS_EN} after confirmation.`, "Other towns in Benin: shipped by carrier; time and fees given at confirmation.", "Free in-store pick-up: we let you know as soon as your order is ready."] },
      { title: "Delivery fees", body: ["Fees depend on the area or town. They are given to you by phone or WhatsApp before delivery; nothing is delivered without your agreement."] },
      { title: "Tracking", body: ["Follow your order on the “Track my order” page with your order number and phone number."] },
      { title: "Returns and exchanges", body: [`Contact us within ${RETURN_DAYS} days of receipt with your order number and a photo of the product.`, "Items must be unused and in their original packaging. Products cut by the metre cannot be returned unless defective.", "If a product is defective or not what you ordered, the exchange or refund is at our expense."] },
    ],
  },
  confidentialite: {
    title: "Privacy policy",
    intro: `${COMPANY} complies with Law No. 2017-20 on the Digital Code of the Republic of Benin.`,
    sections: [
      { title: "Data collected", body: ["When you order: name, phone, delivery address, notes, order content and chosen payment method.", "When you post a review: the name you enter and your comment.", "For the security of the admin area: IP address, country and device type of login attempts."] },
      { title: "Use", body: ["This data is only used to process and deliver your orders, contact you about them and protect the site against attacks. It is never sold or used for advertising."] },
      { title: "Retention", body: ["Orders: as long as needed for follow-up and our accounting obligations.", "Admin login log: 90 days, then deleted automatically."] },
      { title: "Cookies and storage", body: ["The site uses no advertising or tracking tools. It only stores, on your device, your cart, wishlist and chosen language, plus the administrators' session."] },
      { title: "Your rights", body: ["You can request access to, correction or deletion of your data, or object to its processing, by contacting us.", lineEn("Contact", [PHONE, EMAIL].filter(Boolean).join(" · ")), "You may also contact Benin's personal data protection authority (APDP)."] },
    ],
  },
};

export function getLegalPage(slug: LegalSlug, locale: Locale): LegalPage {
  return (locale === "en" ? en : fr)[slug];
}
