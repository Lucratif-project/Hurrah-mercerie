import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdministratorManager from "@/components/AdministratorManager";

export default async function Administrators() {
  const { data } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at");

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="font-bold">
          ← Administration
        </Link>

        <h1 className="mt-8 text-5xl font-black">Administrateurs</h1>

        <div className="mt-6 rounded-3xl bg-white p-6 text-sm leading-7 text-neutral-600 shadow-sm">
          <p className="font-bold text-neutral-900">Comment ajouter un administrateur :</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>
              Dans Supabase → <b>Authentication → Users</b>, crée le compte
              (email + mot de passe) de la personne.
            </li>
            <li>Copie son <b>UID</b> (identifiant utilisateur).</li>
            <li>Colle cet UID et son e-mail ci-dessous pour lui donner accès à l&apos;administration.</li>
          </ol>
        </div>

        <div className="mt-8">
          <AdministratorManager admins={data || []} />
        </div>
      </div>
    </main>
  );
}
