import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import BrandStatement from '@/components/BrandStatement'
import HomeAboutSection from '@/components/HomeAboutSection'
import LatestProjectsGrid from '@/components/LatestProjectsGrid'
import HomeClosingCta from '@/components/HomeClosingCta'
import SimpleFooter from '@/components/SimpleFooter'
import { getHomePage, getSiteSettings } from '@/sanity/lib/client'
import { getProjects } from '@/lib/projects'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Insync by Ancchal | Luxury Architectural & Interior Design Atelier',
  description:
    'Bespoke architectural and interior design studio in Ludhiana, Punjab. Conceived from the ground up: light, proportion and quiet luxury.',
}

export default async function Home() {
  const [homeData, projects, siteSettings] = await Promise.all([
    getHomePage(),
    getProjects(),
    getSiteSettings(),
  ])

  return (
    <div className="bg-[#FBF9F6] text-[#1A1A1A] min-h-screen selection:bg-[#C5A059] selection:text-white">
      <Navbar siteSettings={siteSettings} />
      <HeroSection />
      <BrandStatement />
      <HomeAboutSection data={homeData?.aboutSection} />
      <LatestProjectsGrid projects={projects} />
      <HomeClosingCta />
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  )
}
