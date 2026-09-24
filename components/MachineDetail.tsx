import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { getI18n } from "@/lib/i18n/server";
import { formatPrice } from "@/lib/format";

type MachineKey = "singer" | "butterfly";

export default async function MachineDetail({ machine, image }: { machine: MachineKey; image: string }) {
  const { t, locale } = await getI18n();
  const { name, type } = t.machines.items[machine];

  return <><SiteHeader/><main className="min-h-screen bg-[#faf8f4] px-6 py-16"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center"><div className="relative h-[500px] rounded-[2rem] bg-white shadow"><img src={image} alt={name} className="h-full w-full object-contain p-10"/></div><div><span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">{type}</span><h1 className="mt-6 text-5xl font-black">{name}</h1><p className="mt-6 text-lg leading-8 text-neutral-600">{t.machines.detailText}</p><p className="mt-7 text-2xl font-black text-orange-600">{formatPrice(80000, locale)} – {formatPrice(90000, locale)}</p><Link href="/contact" className="mt-8 inline-block rounded-full bg-neutral-950 px-7 py-4 font-bold text-white hover:bg-orange-600">{t.machines.askInfo}</Link></div></div></main><SiteFooter/></>;
}
