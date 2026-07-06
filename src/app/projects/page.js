import { getCollection } from "@/lib/dataStore";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getCollection("projects");
  return <ProjectsClient projects={projects} />;
}
