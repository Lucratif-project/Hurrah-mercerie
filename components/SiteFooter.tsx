import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="text-2xl font-black">HURRAH<span className="text-orange-500">.</span></div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
            Machines à coudre, tissus, fils et accessoires pour donner vie à vos créations.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Navigation</h3>
          <div className="mt-4 space-y-3 text-sm text-white/50">
            <Link className="block hover:text-white" href="/">Accueil</Link>
            <Link className="block hover:text-white" href="/catalogue">Catalogue</Link>
            <Link className="block hover:text-white" href="/categories">Catégories</Link>
            <Link className="block hover:text-white" href="/machines">Machines</Link>
            <Link className="block hover:text-white" href="/a-propos">À propos</Link>
            <Link className="block hover:text-white" href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Contact</h3>
          <p className="mt-4 text-sm leading-7 text-white/50">
            Pour toute demande concernant nos produits ou nos machines, contactez Hurrah Mercerie.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Hurrah Mercerie. Tous droits réservés.
      </div>
    </footer>
  );
}
