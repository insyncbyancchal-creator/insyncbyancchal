import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import ProjectStory from "@/components/ProjectStory";
import { getProjects, getProject, getNeighbours } from "@/lib/projects";

export async function generateStaticParams() {
  const all = await getProjects();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} | Insync Interiors`,
    description: p.tagline || p.concept?.[0],
    openGraph: p.cover?.src ? { images: [p.cover.src] } : undefined,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const { next, others } = await getNeighbours(slug);
  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#1B1A17] selection:bg-[#C5A059] selection:text-[#1B1A17]">
      <Navbar />
      <ProjectStory project={project} next={next} others={others} />
      <SimpleFooter />
    </div>
  );
}