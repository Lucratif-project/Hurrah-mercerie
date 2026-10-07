import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { getI18n } from "@/lib/i18n/server";
import { getLegalPage, type LegalSlug } from "@/lib/legal";

export async function legalMetadata(slug: LegalSlug) {
  const { locale } = await getI18n();
  const page = getLegalPage(slug, locale);
  return { title: page.title, description: page.intro };
}

export default async function LegalPageView({ slug }: { slug: LegalSlug }) {
  const { locale } = await getI18n();
  const page = getLegalPage(slug, locale);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
        <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Hurrah Mercerie</p>
          <h1 className="mt-3 text-4xl font-black">{page.title}</h1>
          {page.intro && <p className="mt-5 text-lg leading-8 text-neutral-600">{page.intro}</p>}

          {page.sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="text-xl font-black">{section.title}</h2>
              {section.body.filter(Boolean).map((p, i) => (
                <p key={i} className="mt-3 leading-7 text-neutral-700">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
