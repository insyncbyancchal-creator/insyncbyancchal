import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactExperience from "@/components/ContactExperience";
import SimpleFooter from "@/components/SimpleFooter";

export const metadata = {
  title: "Contact | Insync Interiors",
  description:
    "Begin a conversation with Insync Interiors, Ludhiana. Visit our studio at Sarabha Nagar or send an enquiry.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f7f4ee] min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactExperience />
      <SimpleFooter />
    </div>
  );
}
