import {notFound} from "next/navigation";
import Link from "next/link";
import {supabase} from "@/lib/supabase";
import {formatPrice} from "@/lib/format";
import AddToCart from "@/components/AddToCart";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
export default async function ProductPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const {data:p}=await supabase.from("products").select("*, product_images(image_url,display_order)").eq("id",id).single();if(!p)notFound();const image=p.product_images?.sort((a:any,b:any)=>(a.display_order||0)-(b.display_order||0))[0]?.image_url||"/images/machines/machine singer.jpeg";const product={...p,image_url:image};return <><SiteHeader/><main className="min-h-screen bg-[#faf8f4] px-6 py-16"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div className="relative h-[520px] rounded-[2rem] bg-white"><img src={image} alt={p.name} className="h-full w-full object-contain p-10"/></div><div><Link href="/catalogue" className="font-bold">← Catalogue</Link><h1 className="mt-8 text-5xl font-black">{p.name}</h1><p className="mt-6 leading-8 text-neutral-600">{p.description}</p><p className="mt-7 text-3xl font-black text-orange-600">{formatPrice(p.price)}</p><p className="mt-3 text-sm text-neutral-500">Stock : {p.stock}</p><div className="mt-8"><AddToCart product={product}/></div></div></div></main><SiteFooter/></>}
