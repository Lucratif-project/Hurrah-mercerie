// ─────────────────────────────────────────────────────────────────────────
//  Traductions en fon (Fɔngbè)
// ─────────────────────────────────────────────────────────────────────────
//  ⚠️ PREMIÈRE VERSION À FAIRE RELIRE par une personne qui parle et écrit
//  le fon couramment (voir hurrah-textes-a-traduire-en-fon.xlsx).
//  Ce fichier ne contient QUE les textes traduits en fon.
//  Tout ce qui n'est pas ici s'affiche automatiquement en français.
//
//  Pour ajouter une traduction, recopie la clé depuis `dictionaries.ts`
//  (même chemin, même nom) et remplace le texte. Exemple :
//
//    header: {
//      nav: {
//        home: "…",        // texte en fon
//      },
//    },
//
//  Les traductions doivent être relues par une personne qui parle et écrit
//  le fon couramment (orthographe officielle : ɔ, ɛ, ɖ, tons…).
// ─────────────────────────────────────────────────────────────────────────

import type { Dictionary } from "./dictionaries";

// Toutes les clés sont facultatives ; les listes (tableaux) et les textes
// avec variables (fonctions) se remplacent en entier.
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown
    ? T[K]
    : T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

export const fonOverrides: DeepPartial<Dictionary> = {
  meta: {
    title: "Hurrah Mercerie | Avɔtɔ́ mashin, avɔ̀ kpo nǔ avɔtɔtɔ́ tɔn lɛ kpo",
    description:
      "Hurrah Mercerie : avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo nú azɔ̌ avɔtɔtɔ́ tɔn towe lɛ bǐ.",
    ogDescription:
      "Avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo bo na bló nǔ e a lin é.",
  },

  language: { label: "Gbè" },

  common: {
    home: "Xwé",
    discover: "Kpɔ́n",
    discoverArrow: "Kpɔ́n →",
    viewCatalogue: "Kpɔ́n nǔ lɛ bǐ",
    viewCatalogueArrow: "Kpɔ́n nǔ lɛ bǐ →",
    backToCatalogue: "← Lɛ́kɔ yì nǔ lɛ",
    loading: "Nɔte kpɛɖé…",
    total: "Akwɛ́ bǐ",
    subtotal: "Akwɛ́ nǔ lɛ tɔn",
    defaultProductDescription: "Nǔ Hurrah Mercerie tɔn.",
    creationAlt: "Nǔ e è bló ɖò Hurrah Mercerie",
  },

  header: {
    tagline: "Fí e a na mɔ nǔ avɔtɔtɔ́ tɔn lɛ bǐ kpo avɔtɔ́ mashin lɛ kpo ɖè",
    nav: {
      home: "Xwé",
      catalogue: "Nǔ lɛ",
      kits: "Kits",
      machines: "Mashin lɛ",
      blog: "Nǔnywɛ́",
      about: "Mǐ",
      contact: "Ylɔ́ mǐ",
    },
    favorites: "Nǔ e un yí wǎn nú",
    tracking: "Kpɔ́n nǔ e un byɔ́",
    cart: "Panier",
    discover: "Kpɔ́n",
  },

  footer: {
    about: "Avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo bo na bló nǔ e a lin é.",
    navigation: "Ali lɛ",
    links: {
      home: "Xwé",
      catalogue: "Nǔ lɛ",
      kits: "Kits avɔtɔtɔ́ tɔn",
      blog: "Nǔnywɛ́ avɔtɔtɔ́ tɔn",
      machines: "Mashin lɛ",
      about: "Xó dó mǐ wu",
      contact: "Ylɔ́ mǐ",
      tracking: "Kpɔ́n nǔ e un byɔ́ é",
    },
    contact: "Ylɔ́ mǐ",
    whatsappMessage: "Kúdo Hurrah Mercerie, un ɖó kanbyɔ ɖé.",
    whatsappButton: "Wlan wɛn mǐ ɖò WhatsApp jí",
    rights: "Acɛ lɛ bǐ nyí mǐtɔn.",
  },

  home: {
    badge: "Xwé avɔtɔtɔ́ tɔn",
    heroTitle1: "Nǔ bǐ dó",
    heroTitle2: "bló, tɔ́ avɔ̀",
    heroTitle3: "bo lin nǔ.",
    heroText:
      "Wá Hurrah Mercerie : fí e a na mɔ avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo e a na zán dó bló nǔ towe lɛ é bǐ ɖè.",
    seeMachines: "Kpɔ́n mashin mǐtɔn lɛ",
    exploreShop: "Kpɔ́n nǔ mǐtɔn lɛ",
    stats: [
      { value: "02", label: "mashin wè" },
      { value: "∞", label: "nǔ e a sixu bló lɛ" },
      { value: "100%", label: "yiwanna avɔtɔtɔ́" },
    ],
    heroImageAlt: "Avɔtɔ́ mashin ɖò Hurrah Mercerie",
    heroCard: "Bló nǔ e a lin é.",
    universesEyebrow: "Nǔ mǐtɔn lɛ",
    universesTitle: "Fí ɔ wɛ nǔ bǐ bɛ́ ɖè.",
    categories: [
      { name: "Kàn lɛ", description: "Kàn lɛ nú azɔ̌ towe lɛ bǐ." },
      { name: "Duchesse", description: "Kpɔ́n avɔ̀ duchesse mǐtɔn lɛ." },
      { name: "Bouton lɛ", description: "Bouton vovo lɛ kpo nǔ ɖevo lɛ kpo." },
    ],
    machinesEyebrow: "Avɔtɔ́ mashin lɛ",
    machinesTitle: "Sɔ́ mashin e jɛ azɔ̌ towe wu é.",
    seeMachine: "Kpɔ́n mashin ɔ",
    features: [
      {
        title: "Nǔ e è sɔ́ dó avɔtɔtɔ́ wu",
        text: "Nǔ e mǐ sɔ́ nú mɛ e ɖò kplɔ́n wɛ lɛ kpo mɛ e ko tuùn azɔ̌ ɔ lɛ kpo.",
      },
      {
        title: "Nǔ bǐ ɖò fí ɖokpó",
        text: "Mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo ɖò fí ɖokpó.",
      },
      {
        title: "Ali ɖé e yá",
        text: "Kpɔ́n nǔ mǐtɔn lɛ bo mɔ nǔ e a jló é bɔ̀bɔ̀.",
      },
    ],
    aboutEyebrow: "Xó dó Hurrah wu",
    aboutTitle: "Mercerie ɖé nú mɛ e nɔ bló nǔ lɛ.",
    aboutText1:
      "Hurrah Mercerie nɔ d'alɔ mɛ e yí wǎn nú avɔtɔtɔ́ lɛ ɖò azɔ̌ yetɔn lɛ mɛ : avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo.",
    aboutText2:
      "Nǔ e mǐ jló é ɖíe : bo avɔtɔtɔ́ ná yá nú mɛ bǐ, bɔ mɛ bǐ ná mɔ nǔ e é ná zán dó bló nǔ tɔn lɛ é bɔ̀bɔ̀.",
    contactUs: "Ylɔ́ mǐ",
    pillars: ["Mashin lɛ", "Avɔ̀ kpo kàn kpo", "Nǔ ɖevo lɛ", "Nǔ yɔ̌yɔ́ bló"],
    ctaTitle: "A ko ɖó gbesisɔ nú nǔ yɔ̌yɔ́ e a na bló é à ?",
    ctaText: "Kpɔ́n nǔ mǐtɔn lɛ bo mɔ nǔ e na d'alɔ we ɖò azɔ̌ towe lɛ mɛ é.",
    ctaButton: "Kpɔ́n nǔ mǐtɔn lɛ",
    featuredEyebrow: "Hurrah sɔ́ nǔ elɔ lɛ",
    featuredTitle: "Nǔ e mǐ sɔ́ dó nukɔn lɛ",
  },

  machines: {
    title: "Avɔtɔ́ mashin lɛ",
    intro: "Mashin wè e Hurrah Mercerie ɖó lɛ é.",
    seeMachine: "Kpɔ́n mashin ɔ",
    detailText:
      "Mashin ɖé e Hurrah Mercerie ɖó bo na d'alɔ we ɖò azɔ̌ avɔtɔtɔ́ tɔn towe lɛ mɛ.",
    askInfo: "Byɔ́ xó ɖé",
    items: {
      singer: {
        shortName: "Mashin Singer",
        name: "Avɔtɔ́ mashin Singer",
        type: "Xwé tɔn",
        description: "Mashin e è nɔ zán ɖò azɔ̌ gbe ɖokpó ɖokpó tɔn lɛ mɛ.",
      },
      butterfly: {
        shortName: "Mashin Butterfly",
        name: "Avɔtɔ́ mashin Butterfly",
        type: "Azɔ̌xwé tɔn",
        description: "Mashin e syɛn bo nɔ wa azɔ̌ susu.",
      },
    },
  },

  catalogue: {
    title: "Nǔ mǐtɔn lɛ",
    intro: "Kpɔ́n mashin, kàn, avɔ̀, bouton kpo nǔ ɖevo lɛ kpo.",
    searchPlaceholder: "Bà nǔ ɖé alǒ réf. ɖé…",
    clear: "Ɖè",
    search: "Bà",
    availability: {
      toutes: "Nǔ bǐ",
      disponible: "É ɖò",
      rupture: "É vɔ",
    },
    exploreByCategory: "Kpɔ́n ɖò akpá akpá",
    allProducts: "Nǔ lɛ bǐ",
    ourCategories: "Akpá mǐtɔn lɛ",
    allOurProducts: "Nǔ mǐtɔn lɛ bǐ",
    resultsFor: (q: string) => `Nǔ e è mɔ nú "${q}" lɛ`,
    discoverProducts: "Kpɔ́n nǔ mǐtɔn lɛ",
    categoryProducts: (c: string) => `${c}`,
    resultCount: (n: number) => `Nǔ ${n}`,
    noMatch: (q: string) => `È ma mɔ nǔ ɖé nú "${q}" ǎ.`,
    emptyCategory: "Nǔ ɖé ma ko ɖò akpá elɔ mɛ ǎ.",
    seeAllProducts: "Kpɔ́n nǔ lɛ bǐ",
    categoryEyebrow: "Akpá",
  },

  product: {
    back: "← Nǔ lɛ",
    similar: "Nǔ ɖevo e ɖí i lɛ",
    quickView: "Kpɔ́n bléblé",
    close: "Sú",
    fullPage: "Kpɔ́n xó tɔn lɛ bǐ →",
    addToWishlist: "Sɔ́ dó nǔ e un yí wǎn nú lɛ mɛ",
    removeFromWishlist: "Ɖè sín nǔ e un yí wǎn nú lɛ mɛ",
  },

  stock: {
    out: "É vɔ",
    low: (n: number) => `${n} ɖéé kpò`,
    available: "É ɖò",
  },

  addToCart: {
    add: "Sɔ́ dó panier mɛ",
    added: "É yì panier mɛ ✓",
    out: "É vɔ",
  },

  reviews: {
    title: "Nǔxɔ̀tɔ́ lɛ sín linlin",
    count: (n: number) => `linlin ${n}`,
    none: "Mɛ ɖé ma ko ɖɔ linlin tɔn dó nǔ elɔ wu ǎ.",
    leave: "Ɖɔ linlin towe",
    thanksPublished: "A wà nǔ ! Linlin towe ko ɖò wema jí.",
    thanksToast: "A wà nǔ ɖò linlin towe wu !",
    namePlaceholder: "Nyǐkɔ́ towe",
    commentPlaceholder: "Xó towe (é ma jɛ dandan ǎ)",
    sending: "É ɖò yiyi wɛ…",
    publish: "Sɛ́ linlin ce",
    starLabel: (n: number) => `sunwlɛ̌ví ${n}`,
  },

  cart: {
    title: "Panier towe",
    empty: "Nǔ ɖé ɖò panier towe mɛ ǎ.",
    remove: "Ɖè",
    checking: "Mǐ ɖò kpɔ́n wɛ…",
    apply: "Zán",
    withdraw: "Ɖè",
    promoInvalid: "Code promo ɔ ma sɔ ǎ alǒ hwenu tɔn ko wá yì.",
    promoApplied: (code: string, pct: number) =>
      `Code "${code}" ɖò azɔ̌ wa wɛ : -${pct}%`,
    discount: (pct: number) => `Akwɛ́ e è ɖè (${pct}%)`,
    checkout: "Byɔ́ nǔ lɛ",
    decrease: "Ɖè ɖokpó",
    increase: "Yí ɖokpó dó",
  },

  checkout: {
    title: "Byɔ́ nǔ lɛ",
    subtotal: (v: string) => `Akwɛ́ nǔ lɛ tɔn : ${v}`,
    total: (v: string) => `Akwɛ́ bǐ : ${v}`,
    paymentAccepted: "Ali e a sixu sú akwɛ́ gbɔn é :",
    cashOnDelivery: "Sú akwɛ́ hwenu è hɛn nǔ wá é",
    name: "Nyǐkɔ́ towe bǐ",
    phone: "Alokan",
    address: "Fí e a nɔ nɔ",
    notes: "Xó ɖevo lɛ",
    confirm: "Sɛ́ nǔ byɔ́byɔ́ ɔ",
    whatsappDirect: "Byɔ́ nǔ lɛ gbɔn WhatsApp jí",
    sending: "É ɖò yiyi wɛ...",
    emptyCart: "Nǔ ɖé ɖò panier towe mɛ ǎ.",
    saveError: "Nǔ ɖé gblé. Vɔ́ bló.",
    success: "Mǐ mɔ nǔ byɔ́byɔ́ towe.",
    successTitle: "Mǐ mɔ nǔ byɔ́byɔ́ towe !",
    successText: (phone: string) =>
      `Hurrah Mercerie na ylɔ́ we ɖò ${phone} jí bo na ɖɔ nǔ byɔ́byɔ́ towe sín xó.`,
    whatsappConfirm: "Ɖɔ ɖò WhatsApp jí lɔ",
    wa: {
      intro: "Kúdo Hurrah Mercerie, un jló na byɔ́ nǔ elɔ lɛ :",
      subtotal: "Akwɛ́ nǔ lɛ tɔn :",
      total: "Akwɛ́ bǐ :",
      name: "Nyǐkɔ́ :",
      phone: "Alokan :",
      address: "Fí e un nɔ nɔ :",
      notes: "Xó ɖevo :",
    },
  },

  favorites: {
    title: "Nǔ e un yí wǎn nú lɛ",
    empty: "A ko sɔ́ nǔ ɖé dó fí ǎ.",
  },

  tracking: {
    title: "Kpɔ́n nǔ e un byɔ́ lɛ",
    intro: "Wlan alokan e a zán hwenu a byɔ́ nǔ é.",
    placeholder: "Alokan towe",
    searching: "Mǐ ɖò bà wɛ…",
    search: "Bà",
    none: "Mǐ ma mɔ nǔ byɔ́byɔ́ ɖé nú alokan elɔ ǎ.",
    status: {
      new: "Yɔ̌yɔ́",
      confirmed: "Mǐ ɖɔ ɛɛn",
      preparing: "Mǐ ɖò bló wɛ",
      delivered: "È ko hɛn wá",
      cancelled: "È ɖè",
    },
  },

  kits: {
    metaTitle: "Kits avɔtɔtɔ́ tɔn",
    metaDescription: "Kits e mǐ ko kplé gbesisɔ nú we.",
    title: "Kits avɔtɔtɔ́ tɔn",
    intro: "Nǔ e mǐ ko kplé dó fí ɖokpó nú we, bo a na bɛ́ azɔ̌ towe ɖò ali ɖagbe jí.",
    empty: "Kit ɖé ma ko ɖò fí ǎ.",
  },

  blog: {
    metaTitle: "Nǔnywɛ́ avɔtɔtɔ́ tɔn",
    metaDescription: "Nǔnywɛ́ kpo xó yɔ̌yɔ́ lɛ kpo sín Hurrah Mercerie.",
    title: "Nǔnywɛ́ avɔtɔtɔ́ tɔn",
    intro: "Nǔnywɛ́ e na d'alɔ we bo a na sɔ́ nǔ avɔtɔtɔ́ tɔn ɖagbe lɛ.",
    empty: "Mǐ ma ko wlan xó ɖé ǎ.",
    read: "Xà →",
    back: "← Nǔnywɛ́ avɔtɔtɔ́ tɔn",
    articleFallback: "Xó",
  },

  contact: {
    title: "Ylɔ́ mǐ",
    intro:
      "Nú a ɖó kanbyɔ ɖé dó nǔ mǐtɔn lɛ, mashin lɛ alǒ nǔ byɔ́byɔ́ ɖé wu ɔ, ylɔ́ Hurrah Mercerie. Mǐ nɔ yí gbè bléblé ɖò WhatsApp jí.",
    phoneLabel: "Alokan / WhatsApp",
    addressLabel: "Fí e mǐ ɖè",
    name: "Nyǐkɔ́ towe",
    phone: "Alokan towe",
    message: "Xó towe",
    fillAll: "Wlan nǔ lɛ bǐ.",
    send: "Sɛ́ ɖò WhatsApp jí",
    wa: {
      greeting: "Kúdo Hurrah Mercerie,",
      name: "Nyǐkɔ́ :",
      phone: "Alokan :",
    },
  },

  about: {
    title: "Xó dó mǐ wu",
    text1:
      "Hurrah Mercerie nɔ d'alɔ mɛ e yí wǎn nú avɔtɔtɔ́ lɛ, kpo avɔtɔ́ mashin, avɔ̀, kàn kpo nǔ ɖevo lɛ kpo.",
    text2:
      "Nǔ e mǐ jló é wɛ nyí ɖɔ avɔtɔtɔ́ ná yá nú mɛ bǐ, bɔ mɛ bǐ na mɔ nǔ lɛ bo byɔ́ bɔ̀bɔ̀.",
  },

  social: {
    eyebrow: "Nǔ e è bló lɛ",
    title: "Nǔ e nǔxɔ̀tɔ́ mǐtɔn lɛ nɔ bló lɛ",
  },
};
