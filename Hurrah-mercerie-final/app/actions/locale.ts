"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale } from "@/lib/i18n/config";

export async function setLocale(value: string) {
  const store = await cookies();
  store.set(LOCALE_COOKIE, normalizeLocale(value), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 an
    sameSite: "lax",
  });
}
