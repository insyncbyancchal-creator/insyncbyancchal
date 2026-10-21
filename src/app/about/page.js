import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import AboutHero from "@/components/AboutHero";
import AboutExperience from "@/components/AboutExperience";
import SpacesInMotion from "@/components/SpacesInMotion";
import TestimonialSection from "@/components/TestimonialSection";

export const metadata = {
  title: "About | Insync Interiors",
  description: "The people, philosophy and design approach behind Insync Interiors, Ludhiana.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f7f4ee] min-h-screen text-[#1b1a17]">
      <Navbar />
      <AboutHero />
      <AboutExperience>
        <SpacesInMotion />
        <TestimonialSection />
      </AboutExperience>
      <SimpleFooter />
    </div>
  );
}
