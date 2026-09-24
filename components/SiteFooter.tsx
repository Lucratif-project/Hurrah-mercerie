"use client";

import Link from "next/link";
import { SITE_CONTACT, buildWhatsAppLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n/client";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteFooter() {
  const { t } = useI18n();
  const l = t.footer.links;

  return (
    <footer className="bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="text-2xl font-black">HURRAH<span className="text-orange-500">.</span></div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
            {t.footer.about}
          </p>
          <div className="mt-6 inline-block">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
        <div>
          <h3 className="font-bold">{t.footer.navigation}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/50">
            <Link className="block hover:text-white" href="/">{l.home}</Link>
            <Link className="block hover:text-white" href="/catalogue">{l.catalogue}</Link>
            <Link className="block hover:text-white" href="/kits">{l.kits}</Link>
            <Link className="block hover:text-white" href="/blog">{l.blog}</Link>
            <Link className="block hover:text-white" href="/machines">{l.machines}</Link>
            <Link className="block hover:text-white" href="/a-propos">{l.about}</Link>
            <Link className="block hover:text-white" href="/contact">{l.contact}</Link>
            <Link className="block hover:text-white" href="/suivi">{l.tracking}</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">{t.footer.contact}</h3>
          <p className="mt-4 text-sm leading-7 text-white/50">
            {SITE_CONTACT.phoneDisplay}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/50">
            {SITE_CONTACT.address}
          </p>
          <a
            href={buildWhatsAppLink(t.footer.whatsappMessage)}
            target="_blank"
            className="mt-4 inline-block rounded-full bg-orange-600 px-5 py-2 text-sm font-bold hover:bg-orange-500"
          >
            {t.footer.whatsappButton}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Hurrah Mercerie. {t.footer.rights}
      </div>
    </footer>
  );
}
