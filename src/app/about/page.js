import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import AboutHero from "@/components/AboutHero";
import AboutExperience from "@/components/AboutExperience";
import SpacesInMotion from "@/components/SpacesInMotion";
import TestimonialSection from "@/components/TestimonialSection";
import { getAboutPage, getTestimonials, getSiteSettings } from "@/sanity/lib/client";

export const revalidate = 60;

export const metadata = {
  title: "About | Insync by Ancchal",
  description: "The people, philosophy and design approach behind Insync by Ancchal, Ludhiana.",
};

export default async function AboutPage() {
  const [aboutData, testimonials, siteSettings] = await Promise.all([
    getAboutPage(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-[#f7f4ee] min-h-screen text-[#1b1a17]">
      <Navbar siteSettings={siteSettings} />
      <AboutHero />
      <AboutExperience data={aboutData}>
        <SpacesInMotion data={aboutData?.reelsSection} />
        <TestimonialSection items={testimonials} />
      </AboutExperience>
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  );
}
