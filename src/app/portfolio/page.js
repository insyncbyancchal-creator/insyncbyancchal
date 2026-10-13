import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioExperience from "@/components/PortfolioExperience";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Portfolio | Insync Interiors",
  description:
    "Selected architectural, residential, commercial and hospitality interiors by Insync Interiors, Ludhiana.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="bg-white min-h-screen text-[#1A1A1A] selection:bg-[#C5A059] selection:text-white">
      <Navbar />
      <PortfolioHero />
      <PortfolioExperience projects={projects} />
      <SimpleFooter />
    </div>
  );
}