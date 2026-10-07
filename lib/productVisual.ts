// Illustration affichée quand un produit n'a pas encore de vraie photo.
// Le dessin dépend du type de produit (bobine, bouton, tissu…) et prend la
// couleur du produit (« Fil à coudre - Rouge » → bobine rouge).
// Dès qu'une photo est ajoutée dans l'admin, elle remplace l'illustration.

import type { Locale } from "@/lib/i18n/config";

type Kind =
  | "machine" | "oil" | "spool" | "yarn" | "button" | "fabric" | "needles"
  | "scissors" | "ripper" | "tape" | "bobbin" | "thimble" | "zip" | "snap"
  | "hooks" | "ribbon" | "lace" | "elastic" | "pins";

const COLORS: [RegExp, string][] = [
  [/bleu roi|royal/i, "#1d3fa8"],
  [/bleu ciel|sky/i, "#7ec4ef"],
  [/vert|green|émeraude|emerald/i, "#0f8a5f"],
  [/rouge|red/i, "#d62828"],
  [/bleu|blue/i, "#1f5fbf"],
  [/noir|black/i, "#262626"],
  [/blanc|white/i, "#f7f5f0"],
  [/beige/i, "#d9c3a0"],
  [/rose|pink/i, "#e88aa8"],
  [/gris|grey|gray/i, "#9a9a9a"],
  [/dor|or\b|gold/i, "#c9a227"],
  [/argent|silver/i, "#b8bcc4"],
  [/bois|wood/i, "#b07a45"],
  [/naturel|natural|coco/i, "#c8a97e"],
  [/cristal|transparent|clear/i, "#cfe6f2"],
];

const KINDS: [RegExp, Kind][] = [
  [/huile|\boil\b/i, "oil"],
  [/canette|bobbin/i, "bobbin"],
  [/aiguille|needle/i, "needles"],
  [/^fil élastique|elastic thread/i, "spool"],
  [/machine/i, "machine"],
  [/épingle|pin/i, "pins"],
  [/ciseau|scissor/i, "scissors"],
  [/découseur|ripper/i, "ripper"],
  [/mètre|tape measure/i, "tape"],
  [/dé à coudre|thimble/i, "thimble"],
  [/fermeture|zip/i, "zip"],
  [/crochet|hook/i, "hooks"],
  [/pression|snap/i, "snap"],
  [/bouton|button/i, "button"],
  [/laine|yarn/i, "yarn"],
  [/élastique|elastic/i, "elastic"],
  [/dentelle|lace/i, "lace"],
  [/ruban|galon|ribbon|braid/i, "ribbon"],
  [/fil|thread/i, "spool"],
  [/duchesse|popeline|tissu|entoilage|triplure|renfort|fabric|poplin|interfacing/i, "fabric"],
];

const ACCENT = "#ea580c";

function pickColor(text: string) {
  if (/multicolore|multicolour|assorti|imprimé|printed/i.test(text)) return "multi";
  for (const [re, c] of COLORS) if (re.test(text)) return c;
  return ACCENT;
}

function pickKind(text: string): Kind {
  for (const [re, k] of KINDS) if (re.test(text)) return k;
  return "spool";
}

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amount)));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

// Un contour sombre pour que les couleurs très claires restent visibles.
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 200;
};

function draw(kind: Kind, c: string, multi: boolean): string {
  const d = shade(c, -40);
  const l = shade(c, 45);
  const stroke = isLight(c) ? "#bfb4a3" : d;
  const m = (i: number) => (multi ? ["#d62828", "#1f5fbf", "#0f8a5f", "#c9a227", "#e88aa8"][i % 5] : c);

  switch (kind) {
    case "spool":
      return `<rect x="135" y="95" width="130" height="22" rx="6" fill="#c89b6d"/><rect x="135" y="283" width="130" height="22" rx="6" fill="#c89b6d"/>
        <rect x="150" y="117" width="100" height="166" fill="${c}" stroke="${stroke}" stroke-width="3"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="150" y1="${130 + i * 19}" x2="250" y2="${124 + i * 19}" stroke="${multi ? m(i) : d}" stroke-width="${multi ? 14 : 2}" opacity="${multi ? 1 : 0.5}"/>`).join("")}
        <path d="M250 200 C 300 210, 300 280, 330 300" stroke="${multi ? m(1) : c}" stroke-width="4" fill="none"/>`;
    case "yarn":
      return `<circle cx="200" cy="200" r="95" fill="${c}" stroke="${stroke}" stroke-width="3"/>
        <path d="M118 160 Q200 120 282 175 M108 205 Q200 160 290 225 M125 255 Q205 205 270 270 M160 112 Q130 200 175 290 M230 108 Q270 200 230 292" stroke="${d}" stroke-width="5" fill="none" opacity="0.55"/>
        <path d="M280 255 C 320 270, 310 320, 345 330" stroke="${c}" stroke-width="6" fill="none"/>`;
    case "button": {
      const b = (cx: number, cy: number, r: number, i: number) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${m(i)}" stroke="${isLight(m(i)) ? "#bfb4a3" : shade(m(i), -40)}" stroke-width="3"/>
         <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="none" stroke="${shade(m(i), -30)}" stroke-width="2" opacity="0.6"/>
         ${[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, y]) => `<circle cx="${cx + x * r * 0.22}" cy="${cy + y * r * 0.22}" r="${r * 0.09}" fill="${shade(m(i), -60)}"/>`).join("")}`;
      return b(165, 175, 70, 0) + b(265, 240, 52, 1) + b(150, 285, 38, 2);
    }
    case "fabric":
      return `<path d="M95 150 h170 v170 h-170z" fill="${l}" stroke="${stroke}" stroke-width="3"/>
        <ellipse cx="95" cy="235" rx="34" ry="85" fill="${c}" stroke="${stroke}" stroke-width="3"/>
        <ellipse cx="95" cy="235" rx="14" ry="36" fill="${d}"/>
        <path d="M95 150 h170 q40 0 40 30 v170 q0 -30 -40 -30 h-170" fill="${c}" stroke="${stroke}" stroke-width="3"/>
        ${multi ? [0, 1, 2, 3].map((i) => `<circle cx="${150 + i * 40}" cy="${200 + (i % 2) * 50}" r="12" fill="${m(i + 1)}"/>`).join("") : `<path d="M120 180 Q200 165 290 190" stroke="#fff" stroke-width="6" opacity="0.35" fill="none"/>`}`;
    case "machine":
      return `<rect x="70" y="285" width="260" height="22" rx="8" fill="#3a3a3a"/>
        <path d="M95 285 V170 q0 -40 40 -40 h150 q30 0 30 30 v40 h-40 v-20 h-120 v105z" fill="#262626"/>
        <rect x="270" y="190" width="45" height="95" rx="6" fill="#262626"/>
        <rect x="282" y="250" width="6" height="40" fill="#b8bcc4"/>
        <circle cx="130" cy="150" r="10" fill="${ACCENT}"/><path d="M150 140 h100" stroke="#c9a227" stroke-width="4"/>
        <circle cx="330" cy="160" r="26" fill="none" stroke="#3a3a3a" stroke-width="10"/>`;
    case "oil":
      return `<path d="M160 160 h80 v150 q0 15 -15 15 h-50 q-15 0 -15 -15z" fill="${ACCENT}" opacity="0.85"/>
        <rect x="160" y="210" width="80" height="60" fill="#fff" opacity="0.9"/><rect x="175" y="228" width="50" height="6" fill="#262626"/><rect x="175" y="242" width="35" height="5" fill="#9a9a9a"/>
        <rect x="185" y="135" width="30" height="25" fill="#262626"/><path d="M195 135 L200 85 L205 135z" fill="#262626"/>
        <path d="M200 70 q-8 12 0 18 q8 -6 0 -18z" fill="#c9a227"/>`;
    case "needles":
      return [0, 1, 2, 3, 4].map((i) => `<g transform="rotate(${-30 + i * 6} 200 200)"><rect x="${150 + i * 22}" y="90" width="5" height="220" rx="2.5" fill="#9aa0a8"/><rect x="${151 + i * 22}" y="100" width="3" height="16" rx="1.5" fill="#f3eee7"/></g>`).join("") +
        `<rect x="120" y="300" width="160" height="40" rx="8" fill="${ACCENT}"/>`;
    case "pins":
      return `<rect x="120" y="240" width="160" height="80" rx="14" fill="#f7f5f0" stroke="#bfb4a3" stroke-width="3"/>` +
        [0, 1, 2, 3, 4, 5].map((i) => `<line x1="${140 + i * 24}" y1="260" x2="${150 + i * 22}" y2="140" stroke="#9aa0a8" stroke-width="4"/><circle cx="${150 + i * 22}" cy="135" r="11" fill="${["#d62828", "#1f5fbf", "#0f8a5f", "#c9a227", "#e88aa8", ACCENT][i]}"/>`).join("");
    case "scissors":
      return `<path d="M200 205 L320 95" stroke="#9aa0a8" stroke-width="16" stroke-linecap="round"/><path d="M200 205 L320 120" stroke="#b8bcc4" stroke-width="12" stroke-linecap="round"/>
        <circle cx="140" cy="250" r="38" fill="none" stroke="${ACCENT}" stroke-width="16"/><circle cx="215" cy="290" r="38" fill="none" stroke="${ACCENT}" stroke-width="16"/>
        <path d="M170 228 L205 205 L210 255" stroke="${ACCENT}" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="205" cy="208" r="7" fill="#262626"/>`;
    case "ripper":
      return `<g transform="rotate(-35 200 200)"><rect x="185" y="200" width="30" height="120" rx="12" fill="${ACCENT}"/><rect x="196" y="120" width="8" height="85" fill="#9aa0a8"/><path d="M200 120 q20 -10 10 -35" stroke="#9aa0a8" stroke-width="6" fill="none"/><circle cx="200" cy="105" r="6" fill="#d62828"/></g>`;
    case "tape":
      return `<circle cx="180" cy="200" r="85" fill="#f2c94c" stroke="#c9a227" stroke-width="4"/><circle cx="180" cy="200" r="30" fill="#f7f5f0" stroke="#c9a227" stroke-width="3"/>
        <path d="M245 255 L345 300 L330 335 L230 290z" fill="#f2c94c" stroke="#c9a227" stroke-width="3"/>` +
        [0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="${250 + i * 13}" y1="${267 + i * 6}" x2="${245 + i * 13}" y2="${279 + i * 6}" stroke="#262626" stroke-width="2"/>`).join("");
    case "bobbin":
      return [0, 1, 2].map((i) => `<g transform="translate(${-90 + i * 90} ${i % 2 ? 20 : -10})"><ellipse cx="200" cy="200" rx="45" ry="45" fill="#d4d7dc" stroke="#9aa0a8" stroke-width="4"/><circle cx="200" cy="200" r="32" fill="${m(i)}"/><circle cx="200" cy="200" r="9" fill="#f3eee7" stroke="#9aa0a8" stroke-width="3"/></g>`).join("");
    case "thimble":
      return `<path d="M140 300 V190 q0 -70 60 -70 q60 0 60 70 v110z" fill="#b8bcc4" stroke="#9aa0a8" stroke-width="4"/><rect x="132" y="290" width="136" height="22" rx="8" fill="#9aa0a8"/>` +
        [0, 1, 2, 3, 4].flatMap((r) => [0, 1, 2, 3].map((k) => `<circle cx="${160 + k * 27 + (r % 2) * 13}" cy="${160 + r * 26}" r="4" fill="#8a9098"/>`)).join("");
    case "zip":
      return `<rect x="150" y="70" width="100" height="270" rx="6" fill="${multi ? ACCENT : c}" stroke="${stroke}" stroke-width="3"/>` +
        [...Array(18)].map((_, i) => `<rect x="${i % 2 ? 200 : 186}" y="${80 + i * 14}" width="14" height="8" rx="2" fill="#b8bcc4"/>`).join("") +
        `<rect x="180" y="180" width="40" height="34" rx="6" fill="#9aa0a8"/><rect x="194" y="214" width="12" height="40" rx="5" fill="#9aa0a8"/>`;
    case "snap":
      return [0, 1, 2, 3].map((i) => `<g transform="translate(${(i % 2) * 110 - 55} ${Math.floor(i / 2) * 110 - 55})"><circle cx="200" cy="200" r="42" fill="#d4d7dc" stroke="#9aa0a8" stroke-width="4"/><circle cx="200" cy="200" r="16" fill="#b8bcc4" stroke="#8a9098" stroke-width="3"/></g>`).join("");
    case "hooks":
      return `<path d="M140 170 h70 q30 0 30 25 q0 25 -30 25 h-20" stroke="#9aa0a8" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M180 260 h60 v-30 h-60" stroke="#9aa0a8" stroke-width="10" fill="none" stroke-linecap="round" transform="translate(30 30)"/>`;
    case "ribbon":
      return `<ellipse cx="200" cy="210" rx="95" ry="95" fill="${c}" stroke="${stroke}" stroke-width="3"/><ellipse cx="200" cy="210" rx="40" ry="40" fill="#f3eee7" stroke="${stroke}" stroke-width="3"/>
        <circle cx="200" cy="210" r="70" fill="none" stroke="${l}" stroke-width="4" opacity="0.7"/>
        <path d="M285 250 C 320 270, 300 320, 345 335 L 335 350 C 290 335, 300 290, 270 270z" fill="${c}" stroke="${stroke}" stroke-width="3"/>`;
    case "lace":
      return `<rect x="70" y="150" width="260" height="70" fill="#f7f5f0" stroke="#bfb4a3" stroke-width="3"/>` +
        [...Array(7)].map((_, i) => `<path d="M${70 + i * 37} 220 q18 40 37 0" fill="#f7f5f0" stroke="#bfb4a3" stroke-width="3"/><circle cx="${88 + i * 37}" cy="185" r="10" fill="none" stroke="#bfb4a3" stroke-width="3"/>`).join("");
    case "elastic":
      return `<ellipse cx="200" cy="205" rx="110" ry="110" fill="#f7f5f0" stroke="#bfb4a3" stroke-width="4"/><ellipse cx="200" cy="205" rx="80" ry="80" fill="#f3eee7" stroke="#bfb4a3" stroke-width="4"/>` +
        [...Array(24)].map((_, i) => { const a = (i / 24) * Math.PI * 2; return `<line x1="${200 + Math.cos(a) * 84}" y1="${205 + Math.sin(a) * 84}" x2="${200 + Math.cos(a) * 106}" y2="${205 + Math.sin(a) * 106}" stroke="#d8d0c3" stroke-width="3"/>`; }).join("");
  }
}

const cache = new Map<string, string>();

export function getProductVisual(
  product: { name?: string | null; reference?: string | null; color?: string | null },
  locale: Locale
) {
  const text = `${product.name || ""} ${product.color || ""}`;
  const kind = pickKind(product.name || "");
  let color = pickColor(text);
  // L'entoilage est blanc par défaut.
  if (color === ACCENT && /entoilage|triplure|renfort|interfacing|interlining/i.test(product.name || "")) color = "#f7f5f0";
  const key = `${kind}|${color}|${locale}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const multi = color === "multi";
  const label = locale === "en" ? "Illustration · photo coming soon" : "Illustration · photo à venir";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f3eee7"/><circle cx="200" cy="205" r="160" fill="#ece5da"/>${draw(kind, multi ? ACCENT : color, multi)}<text x="200" y="382" font-family="Arial, sans-serif" font-size="15" fill="#a8998a" text-anchor="middle">${label}</text></svg>`;
  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " "))}`;
  cache.set(key, uri);
  return uri;
}

// ------------------------------------------------------------------
// Image d'une catégorie (catalogue) quand aucune photo n'est définie
// dans Admin > Catégories.
// ------------------------------------------------------------------

// Vraies photos déjà présentes dans public/images.
const CATEGORY_PHOTOS: [RegExp, string][] = [
  [/fil|laine|thread|yarn/i, "/images/categories/fils.jpeg"],
  [/duchesse|duchess/i, "/images/categories/duchesse.jpeg"],
  [/^bouton|^button/i, "/images/categories/bouton.jpeg"],
  [/machine/i, "/images/machines/machine butterfly.jpeg"],
];

// Pour les autres : une composition illustrée de plusieurs articles.
const CATEGORY_SCENES: [RegExp, { kinds: Kind[]; colors: string[]; bg: string }][] = [
  [/accessoire|accessor/i, { kinds: ["scissors", "tape", "pins"], colors: [ACCENT, ACCENT, ACCENT], bg: "#f6e7d8" }],
  [/élastique|elastic/i, { kinds: ["elastic", "elastic", "spool"], colors: ["#f7f5f0", "#262626", "#f7f5f0"], bg: "#e9eef3" }],
  [/entoilage|renfort|interfacing/i, { kinds: ["fabric", "fabric", "fabric"], colors: ["#f7f5f0", "#262626", "#d9c3a0"], bg: "#efe9e0" }],
  [/fermeture|attache|zip|fastener/i, { kinds: ["zip", "snap", "hooks"], colors: ["#1f5fbf", ACCENT, ACCENT], bg: "#e6edf6" }],
  [/ruban|décoration|ribbon|trim/i, { kinds: ["ribbon", "lace", "ribbon"], colors: ["#d62828", "#f7f5f0", "#c9a227"], bg: "#f8e6e6" }],
  [/tissu|fabric/i, { kinds: ["fabric", "fabric", "fabric"], colors: ["#7ec4ef", "#f7f5f0", "multi"], bg: "#e3f0f7" }],
];

export function getCategoryImage(name: string): string {
  for (const [re, src] of CATEGORY_PHOTOS) if (re.test(name)) return src;

  const scene = CATEGORY_SCENES.find(([re]) => re.test(name))?.[1] ?? {
    kinds: ["spool", "button", "scissors"] as Kind[],
    colors: ["#d62828", "#1f5fbf", ACCENT],
    bg: "#f3eee7",
  };

  const key = `cat|${name}`;
  const hit = cache.get(key);
  if (hit) return hit;

  // Trois articles côte à côte, format paysage (comme une photo de vitrine).
  // Format de la carte du catalogue (environ 1,6 × plus large que haute).
  const slots = [
    { x: -30, y: 110, s: 1.0 },
    { x: 290, y: 50, s: 1.15 },
    { x: 640, y: 120, s: 0.95 },
  ];
  const items = scene.kinds
    .map((k, i) => {
      const c = scene.colors[i];
      const multi = c === "multi";
      const { x, y, s } = slots[i];
      return `<g transform="translate(${x} ${y}) scale(${s})">${draw(k, multi ? ACCENT : c, multi)}</g>`;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"><rect width="1000" height="620" fill="${scene.bg}"/>${items}</svg>`;
  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " "))}`;
  cache.set(key, uri);
  return uri;
}
