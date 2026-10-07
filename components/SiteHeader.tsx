"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n/client";

export default function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu quand on change de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Empêche la page de défiler derrière le menu ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ["/", t.header.nav.home],
    ["/catalogue", t.header.nav.catalogue],
    ["/machines", t.header.nav.machines],
    ["/blog", t.header.nav.blog],
    ["/a-propos", t.header.nav.about],
    ["/contact", t.header.nav.contact],
  ] as const;

  return (
    <>
      <div className="bg-neutral-950 px-6 py-2 text-center text-xs font-medium text-white">
        {t.header.tagline}
      </div>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5">
          <Link href="/" className="group">
            <div className="text-2xl font-black tracking-tight">
              HURRAH<span className="text-orange-600">.</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {t.header.brandSub}
            </div>
          </Link>
          <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold md:flex xl:gap-7">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={pathname === href ? "text-orange-600" : "hover:text-orange-600"}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 whitespace-nowrap sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
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
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.header.menu}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] md:hidden" role="dialog" aria-modal="true" aria-label={t.header.menu}>
          <button
            type="button"
            aria-label={t.product.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <nav className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black">
                HURRAH<span className="text-orange-600">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.product.close}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 flex flex-col">
              {links.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`border-b py-4 text-lg font-bold ${pathname === href ? "text-orange-600" : ""}`}
                >
                  {label}
                </Link>
              ))}
              <Link href="/favoris" onClick={() => setOpen(false)} className="border-b py-4 text-lg font-bold">
                {t.header.favorites}
              </Link>
              <Link href="/suivi" onClick={() => setOpen(false)} className="border-b py-4 text-lg font-bold">
                {t.header.tracking}
              </Link>
            </div>

            <div className="mt-8">
              <LanguageSwitcher />
            </div>

            <Link
              href="/catalogue"
              onClick={() => setOpen(false)}
              className="mt-auto block rounded-full bg-neutral-950 py-4 text-center font-bold text-white"
            >
              {t.header.discover}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
