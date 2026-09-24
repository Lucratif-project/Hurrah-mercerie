import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getI18n } from "@/lib/i18n/server";

export default async function About() {
  const { t } = await getI18n();

  return <><SiteHeader/><main className="min-h-screen bg-white px-6 py-20"><div className="mx-auto max-w-4xl"><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Hurrah Mercerie</p><h1 className="mt-3 text-5xl font-black">{t.about.title}</h1><p className="mt-8 text-lg leading-8 text-neutral-600">{t.about.text1}</p><p className="mt-5 text-lg leading-8 text-neutral-600">{t.about.text2}</p></div></main><SiteFooter/></>;
}
