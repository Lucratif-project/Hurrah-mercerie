"use client";

import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n/client";

/** Bouton WhatsApp fixe en bas à droite (masqué dans l'admin et la commande). */
export default function WhatsAppFloat() {
  const { t } = useI18n();
  const pathname = usePathname();

  if (/^\/(admin|login|commande)/.test(pathname)) return null;

  return (
    <a
      href={buildWhatsAppLink(t.footer.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.whatsappFloat}
      title={t.footer.whatsappFloat}
      className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
