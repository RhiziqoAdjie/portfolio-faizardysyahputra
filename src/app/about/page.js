import { getProfile } from "@/lib/dataStore";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const profile = await getProfile();
  return <AboutClient profile={profile} />;
}
