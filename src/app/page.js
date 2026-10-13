import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import BrandStatement from '@/components/BrandStatement'
import HomeAboutSection from '@/components/HomeAboutSection'
import LatestProjectsGrid from '@/components/LatestProjectsGrid'
import HomeClosingCta from '@/components/HomeClosingCta'
import Preloader from '@/components/Preloader'
import SimpleFooter from '@/components/SimpleFooter'

export const metadata = {
  title: 'Insync Interiors | Luxury Architectural & Interior Design Atelier',
  description:
    'Bespoke architectural and interior design studio in Ludhiana, Punjab. Conceived from the ground up: light, proportion and quiet luxury.',
}

export default function Home() {
  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen selection:bg-[#C5A059] selection:text-[#1A1A1A]">
      <Preloader />
      <Navbar />
      <HeroSection />
      <BrandStatement />
      <HomeAboutSection />
      <LatestProjectsGrid />
      <HomeClosingCta />
      <SimpleFooter />
    </div>
  )
}
