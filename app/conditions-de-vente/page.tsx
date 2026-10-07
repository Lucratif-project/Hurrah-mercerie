import LegalPageView, { legalMetadata } from "@/components/LegalPageView";

export function generateMetadata() {
  return legalMetadata("conditions-de-vente");
}

export default function Page() {
  return <LegalPageView slug="conditions-de-vente" />;
}
