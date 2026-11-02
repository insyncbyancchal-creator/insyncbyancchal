import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioExperience from "@/components/PortfolioExperience";
import { getProjects } from "@/lib/projects";
import { getSiteSettings } from "@/sanity/lib/client";

export const revalidate = 60;

export const metadata = {
  title: "Portfolio | Insync by Ancchal",
  description:
    "Selected architectural, residential, commercial and hospitality interiors by Insync by Ancchal, Ludhiana.",
};

export default async function PortfolioPage() {
  const [projects, siteSettings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-[#FBF9F6] min-h-screen text-[#1A1A1A] selection:bg-[#C5A059] selection:text-white">
      <Navbar siteSettings={siteSettings} />
      <PortfolioHero />
      <PortfolioExperience projects={projects} />
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  );
}