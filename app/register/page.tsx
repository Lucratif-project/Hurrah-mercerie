import { redirect } from "next/navigation";

// Les comptes administrateurs se créent dans Supabase (voir Admin > Administrateurs).
export default function Register() {
  redirect("/login");
}
