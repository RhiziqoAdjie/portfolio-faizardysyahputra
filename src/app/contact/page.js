import { getProfile } from "@/lib/dataStore";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const profile = await getProfile();
  return <ContactClient profile={profile} />;
}
