"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions/locale";
import { useI18n } from "@/lib/i18n/client";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  const idle =
    variant === "dark"
      ? "text-white/60 hover:text-white"
      : "text-neutral-500 hover:text-neutral-950";
  const active =
    variant === "dark" ? "bg-white text-neutral-950" : "bg-neutral-950 text-white";

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={`flex items-center rounded-full border p-0.5 text-xs font-bold ${
        variant === "dark" ? "border-white/20" : "border-neutral-200"
      } ${pending ? "opacity-60" : ""}`}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => change(l)}
          aria-pressed={locale === l}
          title={t.language.names[l]}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            locale === l ? active : idle
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
