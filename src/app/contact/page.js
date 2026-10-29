import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactExperience from "@/components/ContactExperience";
import SimpleFooter from "@/components/SimpleFooter";
import { getSiteSettings } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Contact | Insync by Ancchal",
  description:
    "Begin a conversation with Insync by Ancchal, Ludhiana. Visit our studio at Sarabha Nagar or send an enquiry.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="bg-[#f7f4ee] min-h-screen">
      <Navbar siteSettings={siteSettings} />
      <ContactHero />
      <ContactExperience siteSettings={siteSettings} />
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  );
}
