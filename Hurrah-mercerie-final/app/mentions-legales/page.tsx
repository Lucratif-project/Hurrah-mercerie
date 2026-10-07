import LegalPageView, { legalMetadata } from "@/components/LegalPageView";

export function generateMetadata() {
  return legalMetadata("mentions-legales");
}

export default function Page() {
  return <LegalPageView slug="mentions-legales" />;
}
