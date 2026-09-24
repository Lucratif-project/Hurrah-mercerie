import type { Locale } from "./config";

/**
 * Renvoie la version traduite d'un champ Supabase (ex. `name_en`, `name_fon`)
 * quand elle existe ; sinon la version française. Un produit n'apparaît donc
 * jamais vide.
 *
 *   tr(product, "name", locale)
 */
export function tr(
  row: Record<string, unknown> | null | undefined,
  field: string,
  locale: Locale
): string {
  if (!row) return "";

  if (locale !== "fr") {
    const translated = row[`${field}_${locale}`];
    if (typeof translated === "string" && translated.trim() !== "") {
      return translated;
    }
  }

  const fr = row[field];
  return typeof fr === "string" ? fr : "";
}
