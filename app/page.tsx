import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SocialGallery from "@/components/SocialGallery";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { getI18n } from "@/lib/i18n/server";
import { formatPrice } from "@/lib/format";

// Les liens gardent le nom français de la catégorie (utilisé par le filtre du catalogue).
const categoryLinks = [
  { image: "/images/categories/fils.jpeg", href: "/catalogue?categorie=Fils%20%26%20Laines" },
  { image: "/images/categories/duchesse.jpeg", href: "/catalogue?categorie=Duchesse" },
  { image: "/images/categories/bouton.jpeg", href: "/catalogue?categorie=Boutons" },
];

const machineLinks = [
  { key: "singer", image: "/images/machines/machine singer.jpeg", href: "/machines/singer" },
  { key: "butterfly", image: "/images/machines/machine butterfly.jpeg", href: "/machines/butterfly" },
] as const;

export default async function Home() {
  const { t, locale } = await getI18n();
  const h = t.home;

  const categories = categoryLinks.map((c, i) => ({ ...c, ...h.categories[i] }));
  const machines = machineLinks.map((m) => ({ ...m, ...t.machines.items[m.key] }));

  const { data: featuredData } = await supabase
    .from("products")
    .select("*, product_images(image_url, display_order)")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const featuredProducts = (featuredData || []).map((p: any) => ({
    ...p,
    image_url:
      p.product_images
        ?.sort(
          (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
        )[0]?.image_url || null,
  }));

  return (
    <main className="min-h-screen bg-[#faf8f4] text-neutral-900">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700"><span className="h-2 w-2 rounded-full bg-orange-500" />{h.badge}</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">{h.heroTitle1}<span className="block text-orange-600">{h.heroTitle2}</span>{h.heroTitle3}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">{h.heroText}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/machines" className="rounded-full bg-neutral-950 px-7 py-4 text-center text-sm font-bold text-white shadow-xl hover:bg-orange-600">{h.seeMachines}</Link>
              <Link href="/catalogue" className="rounded-full border border-neutral-300 bg-white px-7 py-4 text-center text-sm font-bold hover:border-orange-500 hover:text-orange-600">{h.exploreShop}</Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-neutral-200 pt-7">
              {h.stats.map((stat) => <div key={stat.label}><div className="text-2xl font-black">{stat.value}</div><div className="mt-1 text-xs text-neutral-500">{stat.label}</div></div>)}
            </div>
          </div>
          <div className="relative h-[500px] overflow-hidden rounded-[2rem] shadow-2xl lg:h-[610px]">
            <Image src="/images/machines/machine singer.jpeg" alt={h.heroImageAlt} fill priority className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/40 p-5 text-white backdrop-blur-md"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Hurrah Mercerie</p><p className="mt-2 text-xl font-bold">{h.heroCard}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{h.universesEyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{h.universesTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((category) => <Link href={category.href} key={category.href} className="group relative h-[420px] overflow-hidden rounded-[1.75rem] bg-neutral-200"><Image src={category.image} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute bottom-0 p-7 text-white"><h3 className="text-2xl font-black">{category.name}</h3><p className="mt-2 text-sm text-white/80">{category.description}</p><span className="mt-5 inline-block text-sm font-bold">{t.common.discoverArrow}</span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f3eee7] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{h.machinesEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">{h.machinesTitle}</h2>
          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {machines.map((machine) => <article key={machine.key} className="overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"><Link href={machine.href}><div className="relative h-[390px] overflow-hidden bg-neutral-100"><Image src={machine.image} alt={machine.name} fill className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute left-5 top-5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white">{machine.type}</div></div></Link><div className="p-7"><h3 className="text-2xl font-black">{machine.name}</h3><p className="mt-2 text-sm leading-6 text-neutral-500">{machine.description}</p><p className="mt-4 text-xl font-black text-orange-600">{formatPrice(80000, locale)} – {formatPrice(90000, locale)}</p><Link href={machine.href} className="mt-7 block w-full rounded-full bg-neutral-950 py-4 text-center text-sm font-bold text-white hover:bg-orange-600">{h.seeMachine}</Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-20 text-white"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">{h.features.map((feature, i) => <div key={feature.title}><div className="mb-5 text-3xl">{["✦", "⌁", "♡"][i]}</div><h3 className="text-xl font-black">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{feature.text}</p></div>)}</div></section>

      <section className="bg-white px-6 py-24"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{h.aboutEyebrow}</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{h.aboutTitle}</h2><p className="mt-7 leading-8 text-neutral-600">{h.aboutText1}</p><p className="mt-4 leading-8 text-neutral-600">{h.aboutText2}</p><Link href="/contact" className="mt-8 inline-flex rounded-full bg-orange-600 px-7 py-4 text-sm font-bold text-white hover:bg-neutral-950">{h.contactUs}</Link></div><div className="grid grid-cols-2 gap-5"><div className="rounded-[2rem] bg-[#f3eee7] p-8"><div className="text-4xl font-black">01</div><p className="mt-3 font-semibold">{h.pillars[0]}</p></div><div className="mt-10 rounded-[2rem] bg-neutral-950 p-8 text-white"><div className="text-4xl font-black">02</div><p className="mt-3 font-semibold">{h.pillars[1]}</p></div><div className="-mt-5 rounded-[2rem] bg-orange-600 p-8 text-white"><div className="text-4xl font-black">03</div><p className="mt-3 font-semibold">{h.pillars[2]}</p></div><div className="rounded-[2rem] bg-[#eee8df] p-8"><div className="text-4xl font-black">04</div><p className="mt-3 font-semibold">{h.pillars[3]}</p></div></div></div></section>

      <section className="px-6 pb-24"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-orange-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16"><p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">Hurrah Mercerie</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">{h.ctaTitle}</h2><p className="mx-auto mt-5 max-w-xl text-white/80">{h.ctaText}</p><Link href="/catalogue" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-black text-neutral-950">{h.ctaButton}</Link></div></section>

      {featuredProducts.length > 0 && (
        <section className="bg-[#faf8f4] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{h.featuredEyebrow}</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{h.featuredTitle}</h2>

            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SocialGallery />

      <SiteFooter />
    </main>
  );
}
