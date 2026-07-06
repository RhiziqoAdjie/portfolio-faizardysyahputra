import { getCollection } from "@/lib/dataStore";
import CertificatesClient from "./CertificatesClient";

export default async function CertificatesPage() {
  const certificates = await getCollection("certificates");
  return <CertificatesClient certificates={certificates} />;
}
