import { getCollection } from "@/lib/dataStore";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const experience = await getCollection("experience");
  return <ExperienceClient experience={experience} />;
}
