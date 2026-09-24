import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { getI18n } from "@/lib/i18n/server";
import { tr } from "@/lib/i18n/localized";

export default async function CategoryProducts({name,slug}:{name:string;slug:string}) {
  const { t, locale } = await getI18n();
  const {data:cat}=await supabase.from("categories").select("*").ilike("name",slug).maybeSingle();
  const {data}=cat?await supabase.from("products").select("*, product_images(image_url, display_order)").eq("category_id",cat.id).eq("status","published"):await supabase.from("products").select("*, product_images(image_url, display_order)").eq("status","published").ilike("name",`%${name}%`);
  const products=(data||[]).map((p:any)=>({...p,image_url:p.product_images?.sort((a:any,b:any)=>(a.display_order||0)-(b.display_order||0))[0]?.image_url||null}));
  return <><SiteHeader/><main className="min-h-screen bg-[#faf8f4] px-6 py-16"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{t.catalogue.categoryEyebrow}</p><h1 className="mt-3 text-5xl font-black">{cat ? tr(cat, "name", locale) : name}</h1><div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{products.length?products.map((p:any)=><ProductCard key={p.id} product={p}/>):<div className="rounded-3xl bg-white p-10">{t.catalogue.emptyCategory}</div>}</div></div></main><SiteFooter/></>;
}
