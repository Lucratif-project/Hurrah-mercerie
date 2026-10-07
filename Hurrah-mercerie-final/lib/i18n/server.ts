import { cookies } from "next/headers";
import { dictionaries } from "./dictionaries";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "./config";

/** Langue choisie par le visiteur (cookie), français par défaut. */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}

/** À utiliser dans les composants serveur : const { t, locale } = await getI18n(); */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
