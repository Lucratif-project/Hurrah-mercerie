"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n/client";
import { buildWhatsAppLink } from "@/lib/site-config";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#faf8f4] px-6 py-20 text-center">
      <div className="max-w-lg">
        <p className="text-5xl">🧵</p>
        <h1 className="mt-4 text-3xl font-black">{t.errors.errorTitle}</h1>
        <p className="mt-4 text-neutral-600">{t.errors.errorText}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-neutral-950 px-7 py-4 font-bold text-white hover:bg-orange-600"
          >
            {t.errors.retry}
          </button>
          <Link href="/" className="rounded-full border border-neutral-300 bg-white px-7 py-4 font-bold">
            {t.common.home}
          </Link>
        </div>
        <a
          href={buildWhatsAppLink(t.footer.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-bold text-orange-600"
        >
          {t.footer.whatsappButton}
        </a>
        {error.digest && <p className="mt-6 text-xs text-neutral-400">Code : {error.digest}</p>}
      </div>
    </main>
  );
}
