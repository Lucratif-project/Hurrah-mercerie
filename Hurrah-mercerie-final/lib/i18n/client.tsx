"use client";

import { createContext, useContext } from "react";
import { dictionaries } from "./dictionaries";
import { DEFAULT_LOCALE, type Locale } from "./config";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/** À utiliser dans les composants client : const { t, locale } = useI18n(); */
export function useI18n() {
  const locale = useContext(LocaleContext);
  return { locale, t: dictionaries[locale] };
}
