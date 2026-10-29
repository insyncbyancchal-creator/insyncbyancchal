import Navbar from '@/components/Navbar'
import SimpleFooter from '@/components/SimpleFooter'
import InsyncHomeClient from '@/components/InsyncHomeClient'
import { getDecorProducts } from '@/lib/services'
import { getSiteSettings } from '@/sanity/lib/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Insync Home Collection | Bespoke Décor & Atelier Objects',
  description:
    'A curated capsule of custom furniture and artisan décor crafted to order by Insync by Ancchal, Ludhiana.',
}

export default async function InsyncHomePage() {
  const [products, siteSettings] = await Promise.all([
    getDecorProducts(),
    getSiteSettings(),
  ])

  return (
    <div className="bg-[#FBF9F6] text-[#1A1A1A] min-h-screen selection:bg-[#C5A059] selection:text-white">
      <Navbar siteSettings={siteSettings} />
      <InsyncHomeClient products={products} />
      <SimpleFooter siteSettings={siteSettings} />
    </div>
  )
}
