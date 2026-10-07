import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <>
      <SiteHeader />
      <main className="grid min-h-[70vh] place-items-center bg-[#faf8f4] px-6 py-20 text-center">
        <div className="max-w-lg">
          <p className="text-7xl font-black text-orange-600">404</p>
          <h1 className="mt-4 text-3xl font-black">{t.errors.notFoundTitle}</h1>
          <p className="mt-4 text-neutral-600">{t.errors.notFoundText}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/catalogue" className="rounded-full bg-neutral-950 px-7 py-4 font-bold text-white hover:bg-orange-600">
              {t.common.viewCatalogue}
            </Link>
            <Link href="/" className="rounded-full border border-neutral-300 bg-white px-7 py-4 font-bold">
              {t.common.home}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
