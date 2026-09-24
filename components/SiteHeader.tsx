"use client";

import Link from "next/link";
import CartButton from "./CartButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n/client";

export default function SiteHeader() {
  const { t } = useI18n();

  return (
    <>
      <div className="bg-neutral-950 px-6 py-2 text-center text-xs font-medium text-white">
        {t.header.tagline}
      </div>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="group">
            <div className="text-2xl font-black tracking-tight">
              HURRAH<span className="text-orange-600">.</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {t.header.brandSub}
            </div>
          </Link>
          <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold md:flex xl:gap-7">
            <Link href="/">{t.header.nav.home}</Link>
            <Link href="/catalogue">{t.header.nav.catalogue}</Link>
            <Link href="/kits">{t.header.nav.kits}</Link>
            <Link href="/machines">{t.header.nav.machines}</Link>
            <Link href="/blog">{t.header.nav.blog}</Link>
            <Link href="/a-propos">{t.header.nav.about}</Link>
            <Link href="/contact">{t.header.nav.contact}</Link>
          </nav>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <LanguageSwitcher />
            <Link
              href="/favoris"
              className="hidden rounded-full border px-4 py-2 text-sm font-bold sm:block"
            >
              {t.header.favorites}
            </Link>
            <Link
              href="/suivi"
              className="hidden rounded-full border px-4 py-2 text-sm font-bold xl:block"
            >
              {t.header.tracking}
            </Link>
            <Link href="/panier" className="rounded-full border px-4 py-2 text-sm font-bold">
              <CartButton />
            </Link>
            <Link href="/catalogue" className="hidden rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white 2xl:block">
              {t.header.discover}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
