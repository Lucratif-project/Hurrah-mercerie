import Link from "next/link";
import CartButton from "./CartButton";

export default function SiteHeader() {
  return (
    <>
      <div className="bg-neutral-950 px-6 py-2 text-center text-xs font-medium text-white">
        Votre univers couture, mercerie et machines à coudre
      </div>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="group">
            <div className="text-2xl font-black tracking-tight">
              HURRAH<span className="text-orange-600">.</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Mercerie
            </div>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <Link href="/">Accueil</Link>
            <Link href="/catalogue">Catalogue</Link>
            <Link href="/kits">Kits</Link>
            <Link href="/machines">Machines</Link>
            <Link href="/blog">Conseils</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/favoris"
              className="hidden rounded-full border px-4 py-2 text-sm font-bold sm:block"
            >
              Favoris
            </Link>
            <Link
              href="/suivi"
              className="hidden rounded-full border px-4 py-2 text-sm font-bold lg:block"
            >
              Suivi commande
            </Link>
            <Link href="/panier" className="rounded-full border px-4 py-2 text-sm font-bold">
              <CartButton />
            </Link>
            <Link href="/catalogue" className="hidden rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white sm:block">
              Découvrir
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
