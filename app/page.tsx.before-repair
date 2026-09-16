import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const categories = [
  { name: "Fils & Laines", image: "/images/categories/fils.jpeg", href: "/categories/fils", description: "Fils et laines pour vos différents projets." },
  { name: "Duchesse", image: "/images/categories/duchesse.jpeg", href: "/categories/duchesse", description: "Découvrez notre sélection de tissus duchesse." },
  { name: "Boutons", image: "/images/categories/bouton.jpeg", href: "/categories/boutons", description: "Différents boutons et accessoires." },
];

const machines = [
  { name: "Machine à coudre Singer", description: "Une machine pratique pour les travaux de couture du quotidien.", image: "/images/machines/machine singer.jpeg", href: "/machines/singer", type: "Familiale" },
  { name: "Machine à coudre Butterfly", description: "Une machine robuste adaptée aux travaux de couture intensifs.", image: "/images/machines/machine butterfly.jpeg", href: "/machines/butterfly", type: "Industrielle" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f4] text-neutral-900">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700"><span className="h-2 w-2 rounded-full bg-orange-500" />L'univers de la couture</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Tout pour<span className="block text-orange-600">créer, coudre</span>et imaginer.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">Découvrez Hurrah Mercerie, votre espace dédié aux machines à coudre, tissus, fils et accessoires indispensables à vos créations.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/machines" className="rounded-full bg-neutral-950 px-7 py-4 text-center text-sm font-bold text-white shadow-xl hover:bg-orange-600">Voir nos machines</Link>
              <Link href="/catalogue" className="rounded-full border border-neutral-300 bg-white px-7 py-4 text-center text-sm font-bold hover:border-orange-500 hover:text-orange-600">Explorer la mercerie</Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-neutral-200 pt-7">
              <div><div className="text-2xl font-black">02</div><div className="mt-1 text-xs text-neutral-500">types de machines</div></div>
              <div><div className="text-2xl font-black">∞</div><div className="mt-1 text-xs text-neutral-500">possibilités créatives</div></div>
              <div><div className="text-2xl font-black">100%</div><div className="mt-1 text-xs text-neutral-500">passion couture</div></div>
            </div>
          </div>
          <div className="relative h-[500px] overflow-hidden rounded-[2rem] shadow-2xl lg:h-[610px]">
            <Image src="/images/machines/machine singer.jpeg" alt="Machine à coudre chez Hurrah Mercerie" fill priority className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/40 p-5 text-white backdrop-blur-md"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Hurrah Mercerie</p><p className="mt-2 text-xl font-bold">Donnez vie à vos idées.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Nos univers</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Tout commence ici.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((category) => <Link href={category.href} key={category.name} className="group relative h-[420px] overflow-hidden rounded-[1.75rem] bg-neutral-200"><Image src={category.image} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute bottom-0 p-7 text-white"><h3 className="text-2xl font-black">{category.name}</h3><p className="mt-2 text-sm text-white/80">{category.description}</p><span className="mt-5 inline-block text-sm font-bold">Découvrir →</span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f3eee7] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Machines à coudre</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Choisissez la machine adaptée à votre travail.</h2>
          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {machines.map((machine) => <article key={machine.name} className="overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"><Link href={machine.href}><div className="relative h-[390px] overflow-hidden bg-neutral-100"><Image src={machine.image} alt={machine.name} fill className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute left-5 top-5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white">{machine.type}</div></div></Link><div className="p-7"><h3 className="text-2xl font-black">{machine.name}</h3><p className="mt-2 text-sm leading-6 text-neutral-500">{machine.description}</p><p className="mt-4 text-xl font-black text-orange-600">80 000 – 90 000 FCFA</p><Link href={machine.href} className="mt-7 block w-full rounded-full bg-neutral-950 py-4 text-center text-sm font-bold text-white hover:bg-orange-600">Voir la machine</Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-20 text-white"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3"><div><div className="mb-5 text-3xl">✦</div><h3 className="text-xl font-black">Un choix pensé pour la couture</h3><p className="mt-3 text-sm leading-6 text-white/60">Des produits sélectionnés pour accompagner débutants et professionnels.</p></div><div><div className="mb-5 text-3xl">⌁</div><h3 className="text-xl font-black">Tout au même endroit</h3><p className="mt-3 text-sm leading-6 text-white/60">Machines, tissus, fils et accessoires réunis dans un seul univers.</p></div><div><div className="mb-5 text-3xl">♡</div><h3 className="text-xl font-black">Une expérience simple</h3><p className="mt-3 text-sm leading-6 text-white/60">Parcourez nos produits et trouvez facilement ce dont vous avez besoin.</p></div></div></section>

      <section className="bg-white px-6 py-24"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">À propos de Hurrah</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Une mercerie pensée pour les créateurs.</h2><p className="mt-7 leading-8 text-neutral-600">Hurrah Mercerie accompagne les passionnés de couture dans leurs projets en proposant des machines à coudre, des tissus, des fils et différents accessoires.</p><p className="mt-4 leading-8 text-neutral-600">Notre objectif est simple : rendre l'univers de la couture plus accessible et permettre à chacun de trouver facilement les produits nécessaires à ses créations.</p><Link href="/contact" className="mt-8 inline-flex rounded-full bg-orange-600 px-7 py-4 text-sm font-bold text-white hover:bg-neutral-950">Nous contacter</Link></div><div className="grid grid-cols-2 gap-5"><div className="rounded-[2rem] bg-[#f3eee7] p-8"><div className="text-4xl font-black">01</div><p className="mt-3 font-semibold">Machines</p></div><div className="mt-10 rounded-[2rem] bg-neutral-950 p-8 text-white"><div className="text-4xl font-black">02</div><p className="mt-3 font-semibold">Tissus & fils</p></div><div className="-mt-5 rounded-[2rem] bg-orange-600 p-8 text-white"><div className="text-4xl font-black">03</div><p className="mt-3 font-semibold">Accessoires</p></div><div className="rounded-[2rem] bg-[#eee8df] p-8"><div className="text-4xl font-black">04</div><p className="mt-3 font-semibold">Créativité</p></div></div></div></section>

      <section className="px-6 pb-24"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-orange-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16"><p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">Hurrah Mercerie</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Prêt à donner vie à votre prochaine création ?</h2><p className="mx-auto mt-5 max-w-xl text-white/80">Explorez notre univers et découvrez les produits qui vous accompagneront dans vos projets.</p><Link href="/catalogue" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-black text-neutral-950">Découvrir nos produits</Link></div></section>
      <SiteFooter />
    </main>
  );
}
