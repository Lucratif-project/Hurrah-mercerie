import LegalPageView, { legalMetadata } from "@/components/LegalPageView";

export function generateMetadata() {
  return legalMetadata("livraison-retours");
}

export default function Page() {
  return <LegalPageView slug="livraison-retours" />;
}
