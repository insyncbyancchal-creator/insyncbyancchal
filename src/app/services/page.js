import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import ServicesExperience from "@/components/Servicesexperience";
import SimpleFooter from "@/components/SimpleFooter";

export const metadata = {
  title: "Services | Insync by Ancchal",
  description:
    "Architectural design, interior design, procurement, delivery & installation, and Insync Home: five disciplines, one studio.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f7f4ee] min-h-screen">
      <Navbar />
      <ServicesHero />
      <ServicesExperience />
      <SimpleFooter />
    </div>
  );
}