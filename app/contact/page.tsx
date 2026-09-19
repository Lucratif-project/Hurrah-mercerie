import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { SITE_CONTACT } from "@/lib/site-config";

export default function Contact() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#faf8f4] px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-black">Contact</h1>

            <p className="mt-5 text-sm leading-7 text-neutral-600">
              Pour toute demande concernant les produits, les machines ou une
              commande, contactez Hurrah Mercerie. Nous répondons rapidement
              par WhatsApp.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div>
                <p className="font-bold text-neutral-500">Téléphone / WhatsApp</p>
                <p className="mt-1 font-black">{SITE_CONTACT.phoneDisplay}</p>
              </div>

              <div>
                <p className="font-bold text-neutral-500">Adresse</p>
                <p className="mt-1 font-black">{SITE_CONTACT.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
