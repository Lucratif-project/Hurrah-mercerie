import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getI18n } from "@/lib/i18n/server";
import { formatPrice } from "@/lib/format";

const items = [
  { key: "singer", href: "/machines/singer", image: "/images/machines/machine singer.jpeg" },
  { key: "butterfly", href: "/machines/butterfly", image: "/images/machines/machine butterfly.jpeg" },
] as const;

export default async function Machines() {
  const { t, locale } = await getI18n();

  return <><SiteHeader/><main className="min-h-screen bg-[#f3eee7] px-6 py-16"><div className="mx-auto max-w-7xl"><h1 className="text-5xl font-black">{t.machines.title}</h1><p className="mt-4 max-w-2xl text-neutral-600">{t.machines.intro}</p><div className="mt-12 grid gap-7 lg:grid-cols-2">{items.map((item)=>{const n=t.machines.items[item.key].shortName;return <Link href={item.href} key={item.key} className="overflow-hidden rounded-[2rem] bg-white shadow"><div className="relative h-96 bg-neutral-100"><img src={item.image} alt={n} className="h-full w-full object-contain p-8"/></div><div className="p-7"><h2 className="text-3xl font-black">{n}</h2><p className="mt-4 text-xl font-black text-orange-600">{formatPrice(80000, locale)} – {formatPrice(90000, locale)}</p><span className="mt-6 block rounded-full bg-neutral-950 py-4 text-center font-bold text-white">{t.machines.seeMachine}</span></div></Link>})}</div></div></main><SiteFooter/></>;
}
