export const LOCALES = ["fr", "en", "fon"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "hurrah-locale";

export function normalizeLocale(value?: string | null): Locale {
  return (LOCALES as readonly string[]).includes(value || "")
    ? (value as Locale)
    : DEFAULT_LOCALE;
}

/**
 * Locale à utiliser pour les dates et les nombres (Intl).
 * Les navigateurs ne connaissent pas le fon : on garde le format français
 * (12 000 FCFA, 24/09/2026), qui est celui utilisé au Bénin.
 */
export function intlLocale(locale: Locale) {
  return locale === "en" ? "en-GB" : "fr-FR";
}

export function formatDate(value: string | Date, locale: Locale) {
  return new Date(value).toLocaleDateString(intlLocale(locale));
}
