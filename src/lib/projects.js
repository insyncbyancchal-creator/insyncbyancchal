// All pages read projects through these functions only.
// They are async on purpose to allow seamless connection with CMS or APIs later.
import { projects } from "@/data/projects";

export async function getProjects() {
  return projects;
}

export async function getProject(slug) {
  const p = projects.find((x) => x.slug === slug);
  return p || null;
}

export async function getNeighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { next: null, others: [] };
  const next = projects[(i + 1) % projects.length];
  const others = projects.filter((p) => p.slug !== slug && p.slug !== next.slug).slice(0, 2);
  return { next: next.slug === slug ? null : next, others };
}