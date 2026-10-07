import { intlLocale, type Locale } from "@/lib/i18n/config";

export function formatPrice(value: number, locale: Locale = "fr") {
  return new Intl.NumberFormat(intlLocale(locale)).format(value) + " FCFA";
}
