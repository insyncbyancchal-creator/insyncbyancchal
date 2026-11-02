import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import ServicesExperience from "@/components/Servicesexperience";
import SimpleFooter from "@/components/SimpleFooter";
import { getServicesPageData, getDecorProducts } from "@/lib/services";
import { getSiteSettings } from "@/sanity/lib/client";

export const revalidate = 60;

export const metadata = {
  title: "Services | Insync by Ancchal",
  description:
    "Architectural design, interior design, procurement, delivery & installation, and Insync Home: five disciplines, one studio.",
};

export default async function ServicesPage() {
  const [pageData, products, siteSettings] = await Promise.all([
    getServicesPageData(),
    getDecorProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-[#f7f4ee] min-h-screen">
      <Navbar siteSettings={siteSettings} />
      <ServicesHero />
      <ServicesExperience data={pageData} initialProducts={products} />
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  );
}