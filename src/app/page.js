import { getProfile, getCollection } from "@/lib/dataStore";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const profile = await getProfile();
  const projects = await getCollection("projects");

  return <HomeClient profile={profile} projects={projects.slice(0, 3)} />;
}
