import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export default async function CategoryProducts({name,slug}:{name:string;slug:string}) {
  const {data:cat}=await supabase.from("categories").select("*").ilike("name",slug).maybeSingle();
  const {data}=cat?await supabase.from("products").select("*, product_images(image_url, display_order)").eq("category_id",cat.id).eq("status","published"):await supabase.from("products").select("*, product_images(image_url, display_order)").eq("status","published").ilike("name",`%${name}%`);
  const products=(data||[]).map((p:any)=>({...p,image_url:p.product_images?.sort((a:any,b:any)=>(a.display_order||0)-(b.display_order||0))[0]?.image_url||null}));
  return <><SiteHeader/><main className="min-h-screen bg-[#faf8f4] px-6 py-16"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Catégorie</p><h1 className="mt-3 text-5xl font-black">{name}</h1><div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{products.length?products.map((p:any)=><ProductCard key={p.id} product={p}/>):<div className="rounded-3xl bg-white p-10">Aucun produit publié dans cette catégorie pour le moment.</div>}</div></div></main><SiteFooter/></>;
}
