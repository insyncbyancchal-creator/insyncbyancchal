'use client'

import { useEffect } from 'react'
import { useClient } from 'sanity'

export function StudioAutoSyncNavbar(props) {
  const client = useClient({ apiVersion: '2024-03-01' })

  useEffect(() => {
    let isCancelled = false

    async function autoSync() {
      try {
        const res = await fetch('/api/contact')
        if (!res.ok) return
        const data = await res.json()
        // 1. Fetch current contact submissions from Sanity to check and clean duplicates
        const existingDocs = await client.fetch('*[_type == "contactSubmission"] | order(_createdAt asc) { _id, email, submittedAt, name }')
        const seenKeys = new Set()
        if (Array.isArray(existingDocs)) {
          for (const doc of existingDocs) {
            const key = `${(doc.email || doc.name || '').toLowerCase().trim()}_${doc.submittedAt || ''}`
            if (seenKeys.has(key)) {
              // Duplicate found in Sanity: delete it
              try {
                await client.delete(doc._id)
              } catch {}
            } else {
              seenKeys.add(key)
            }
          }
        }

        // 2. Sync new inquiries from website form without creating duplicates
        if (data.ok && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          for (const inq of data.inquiries) {
            if (isCancelled) break
            const key = `${(inq.email || inq.name || '').toLowerCase().trim()}_${inq.submittedAt || ''}`
            if (!seenKeys.has(key)) {
              await client.createIfNotExists({
                _id: inq._id,
                _type: 'contactSubmission',
                name: inq.name,
                email: inq.email,
                phone: inq.phone || '',
                services: inq.services || [],
                location: inq.location || '',
                budget: inq.budget || '',
                timeline: inq.timeline || '',
                slot: inq.slot || '',
                message: inq.message || '',
                status: inq.status || 'New',
                submittedAt: inq.submittedAt || new Date().toISOString(),
              })
              seenKeys.add(key)
            }
          }
        }

        const testCount = await client.fetch('count(*[_type == "testimonial"])')
        if (testCount === 0 && !isCancelled) {
          const reviews = [
            {
              _id: 'test-1',
              _type: 'testimonial',
              clientName: 'Mansi Poddar',
              roleTitle: 'CONSULTANT & RESIDENCE OWNER',
              location: 'CIVIL LINES, LUDHIANA',
              quote: 'Ancchal and her team are people I trust 100% with any space. She sets the bar so high that when I envision an interior, I cannot think beyond her. Intuitive and deeply attentive, she brings forth the client’s true personality through spatial stillness and soulful materials.',
              rating: 5,
            },
            {
              _id: 'test-2',
              _type: 'testimonial',
              clientName: 'Vikramjit Singh Grewal',
              roleTitle: 'ESTATE OWNER & INDUSTRIALIST',
              location: 'SARABHA NAGAR, LUDHIANA',
              quote: 'Insync by Ancchal brought a quiet, museum-level discipline to our family residence. Ancchal understood from day one that we didn’t seek loud opulence—we wanted timeless stillness, natural travertine, and daylight that changes gracefully through the day.',
              rating: 5,
            },
            {
              _id: 'test-3',
              _type: 'testimonial',
              clientName: 'Dr. Meera & Rajesh Malhotra',
              roleTitle: 'SURGICAL SPECIALISTS & WELLNESS PATRONS',
              location: 'SECTOR 9, CHANDIGARH',
              quote: 'Walking into our residence after demanding days feels like entering a retreat. The acoustic quiet, the hand-waxed joinery, and the seamless connection to the courtyard reflect an understanding of human well-being that goes far beyond conventional decoration.',
              rating: 5,
            },
            {
              _id: 'test-4',
              _type: 'testimonial',
              clientName: 'Harpreet & Amanat Dhillon',
              roleTitle: 'VILLA OWNER & ENTREPRENEUR',
              location: 'MODEL TOWN, JALANDHAR',
              quote: 'Every guest who enters our villa is immediately struck by the restraint. Insync showed us that true luxury is about what you choose not to put into a room. The craftsmanship is flawless, down to the millimeter of every bronze reveal and customized marble island.',
              rating: 5,
            },
            {
              _id: 'test-5',
              _type: 'testimonial',
              clientName: 'Sunaina Ahluwalia',
              roleTitle: 'HERITAGE & ART COLLECTOR',
              location: 'RANJIT AVENUE, AMRITSAR',
              quote: 'As someone who lives surrounded by art, I needed an architect who respected light above all else. Insync conceived our space as a living gallery—calm, tactile, and deeply personal. It is the rare studio that listens with extraordinary patience.',
              rating: 5,
            },
          ]
          for (const r of reviews) {
            await client.createIfNotExists(r)
          }
        }

        // 4. Auto-initialize servicesPage singleton if not existing to prevent 'Cannot create published document'
        const servicesPageDoc = await client.fetch('*[_type == "servicesPage" && (_id == "servicesPage" || _id == "drafts.servicesPage")][0]._id')
        if (!servicesPageDoc && !isCancelled) {
          await client.createIfNotExists({
            _id: 'servicesPage',
            _type: 'servicesPage',
            heroEyebrow: 'OUR PRACTICE',
            heroTitle: 'FIVE DISCIPLINES, one quiet STUDIO.',
            heroLede: 'From the first sketch to the final cushion, everything under one roof, and one standard.',
            disciplines: [
              {
                _key: 'disc-1',
                no: '01',
                title: 'Architectural Design',
                line: 'Spaces conceived from the ground up, where structure, light and proportion are resolved before a single finish is chosen.',
                tags: ['Concept', 'Planning', 'Elevations'],
                shop: false,
              },
              {
                _key: 'disc-2',
                no: '02',
                title: 'Interior Design',
                line: 'Rooms composed with restraint: layered materials, considered light, and furniture that truly belongs.',
                tags: ['Space planning', 'Materials', 'Lighting'],
                shop: false,
              },
              {
                _key: 'disc-3',
                no: '03',
                title: 'Procurement',
                line: 'Furniture, fittings and finishes sourced and negotiated on your behalf, to the standard we would specify for ourselves.',
                tags: ['Sourcing', 'Vendors', 'Quality checks'],
                shop: false,
              },
              {
                _key: 'disc-4',
                no: '04',
                title: 'Delivery & Installation',
                line: 'Every piece delivered, placed and finished by our own team, so the room you approved is the room you receive.',
                tags: ['Logistics', 'Installation', 'Styling'],
                shop: false,
              },
              {
                _key: 'disc-5',
                no: '05',
                title: 'Insync Home',
                line: 'A collection of home décor made to be customised, to your dimensions, finishes and taste.',
                tags: ['Décor', 'Made to order', 'Customisable'],
                shop: true,
              },
            ],
            homeEyebrow: 'INSYNC HOME',
            homeTitle: 'CURATED OBJECTS, made for your SPACE.',
            homeLede: 'Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.',
          })
        }
        // 5. Elevate any casual placeholder decor product names to luxury editorial names
        const decorDocs = await client.fetch('*[_type == "decorProduct"] { _id, name }')
        if (Array.isArray(decorDocs)) {
          const DECOR_MAP = {
            'd6f9b0bf-344c-4cb6-8d3f-79722c112add': {
              name: 'Nautilus Silver Clamshell Vessel',
              category: 'Cast Metal & Accents',
              badge: 'Artisanal Cast',
              options: 'Hand-Textured Aluminium · Antique Silver Leaf',
              order: 1,
              no: '01',
            },
            '869470eb-ab77-4874-a885-abddbb749323': {
              name: 'Ariadne Entwined Bronze Cylinder Urn',
              category: 'Artisanal Ceramics & Bronze',
              badge: 'Handcrafted',
              options: 'Matte Charcoal Ceramic · Patinated Cast Bronze Cord',
              order: 2,
              no: '02',
            },
            '23f85f44-42d4-4783-a5cb-de3e715d8e59': {
              name: 'Ariadne Spherical Bronze Rope Vessel',
              category: 'Artisanal Ceramics & Bronze',
              badge: 'Handcrafted',
              options: 'Matte Charcoal Ceramic · Patinated Cast Bronze Cord',
              order: 3,
              no: '03',
            },
            '861d99f5-b255-44da-abec-ba909bb90860': {
              name: 'Giacometti Sculpted Plaster Candelabrum',
              category: 'Architectural Lighting & Candelabra',
              badge: 'Sculptural Lighting',
              options: 'Hand-Applied Chalk Plaster · Nine-Tier Structure',
              order: 4,
              no: '04',
            },
            '4e551336-92d4-4ef4-b5b2-c70824e00503': {
              name: 'Stria Ribbed Ceramic Amphora',
              category: 'Ceramic Vessels',
              badge: 'Studio Ceramic',
              options: 'Matte Chalk White · Mineral Glaze',
              order: 5,
              no: '05',
            },
            'f1991377-7865-4950-9171-93f748cbb476': {
              name: 'Palais Monogram Mirrored Salon Tray',
              category: 'Trays & Salon Vignettes',
              badge: 'Editorial Tray',
              options: 'Polished Chrome Rail · Beveled Mirror Base',
              order: 6,
              no: '06',
            },
            '4ace159e-fb4e-4753-bbd1-4d1b8bea017b': {
              name: 'Aethel Cast Brass Multi-Arm Candelabrum',
              category: 'Architectural Lighting & Candelabra',
              badge: 'Cast Brass',
              options: 'Raw Textured Brass · Antique Gold Patina',
              order: 7,
              no: '07',
            },
            '69bd429d-296f-4085-aa7c-e131ecc7dc55': {
              name: 'Nelumbo Gilded Lotus Pedestal Bowls',
              category: 'Sculptural Objects & Accents',
              badge: 'Artisanal Duo',
              options: 'Hand-Textured Gilt Brass · Matte Black Plinth',
              order: 8,
              no: '08',
            },
            'e47c30f3-1c1a-4189-904b-ad6efa3a6f78': {
              name: 'Soleil Sunburst Fluted Brass Coffrets',
              category: 'Lidded Coffrets & Vessels',
              badge: 'Heirloom Brass',
              options: 'Radiant Ribbed Brass · Sphere Finial',
              order: 9,
              no: '09',
            },
            'd5e4088f-957c-465f-b580-c9d9767781ce': {
              name: 'Plume Tripartite Gilt Server',
              category: 'Table Accents & Servers',
              badge: 'Pewter & Bronze',
              options: 'Patinised Cast Bronze · Textured Feather Stem',
              order: 10,
              no: '10',
            },
            'fa787b18-8ca9-4f0c-a7c7-407d19321af2': {
              name: 'Verona Baluster Brass Candlestick Pair',
              category: 'Candleholders & Illumination',
              badge: 'Turned Brass',
              options: 'Solid Spun Brass · Satin Lustre Finish',
              order: 11,
              no: '11',
            },
            '6fb16cf1-bc4d-4d2e-a93c-ce3be2faf2f5': {
              name: 'Aurelia Gilded Pedestal Centerpiece Urn',
              category: 'Centerpieces & Floral Vessels',
              badge: 'Statement Urn',
              options: 'Hammered Champagne Brass · Acrylic Pedestal Base',
              order: 12,
              no: '12',
            },
            'f2cd8dec-e66a-4d72-9144-2e0710c272bd': {
              name: 'Lucent Brass & Acrylic Hurricane Lantern',
              category: 'Lanterns & Illumination',
              badge: 'Architectural Glass',
              options: 'Clear Fluted Acrylic Rods · Brushed Brass Capping',
              order: 13,
              no: '13',
            },
            'ae7c5a84-3f08-49ce-bedf-945d17e60997': {
              name: 'Solaris Concentric Brass Halo Candelabrum',
              category: 'Candleholders & Illumination',
              badge: 'Celestial Brass',
              options: 'Gilded Brass Rings · White Marble Plinth',
              order: 14,
              no: '14',
            },
            'c5b4d523-580b-4957-a355-516f544da754': {
              name: 'Panthère Dorée Art Deco Brass Sculpture',
              category: 'Sculptural Objects & Accents',
              badge: 'Limited Edition',
              options: 'Mirror-Polished Brass · Nero Marquina Marble Base',
              order: 15,
              no: '15',
            },
            '188833d5-4ebb-40f8-8a74-16bd3f00eaa9': {
              name: 'Gordian Textured Bronze Infinity Knot',
              category: 'Sculptural Objects & Accents',
              badge: 'Cast Bronze',
              options: 'Hand-Cast Patinated Bronze · Ribbed Texture',
              order: 16,
              no: '16',
            },
            '32d22089-8b8e-4651-bd82-32844b4e5615': {
              name: 'Atelier Gilded Lucite Salon Tray Ensemble',
              category: 'Trays & Salon Vignettes',
              badge: 'Curated Suite',
              options: 'Lucite Handles · Polished Brass Trim · Mirrored Base',
              order: 17,
              no: '17',
            },
            'b1554c1c-cb19-4915-bdee-5b655e74a43a': {
              name: 'Argentum Fluted Mercury Glass Urn & Pillar Set',
              category: 'Vessels & Candlestick Sets',
              badge: 'Silver Luster',
              options: 'Ribbed Mercury Glass · Mirror-Polished Nickel Tapers',
              order: 18,
              no: '18',
            },
            '5aa2e4b5-52be-4d7b-88ca-588a7f989a68': {
              name: 'Château Polished Steel Champagne Urn & Candlesticks',
              category: 'Centerpieces & Floral Vessels',
              badge: 'Mirror Finish',
              options: 'Mirror-Polished Stainless Steel · Classical Turned Pedestals',
              order: 19,
              no: '19',
            },
            '3f595b50-035f-4098-b4da-cb111bad93d1': {
              name: 'Versailles Five-Light Baroque Brass Candelabra',
              category: 'Architectural Lighting & Candelabra',
              badge: 'Baroque Brass',
              options: 'Antique Patinated Brass · Five-Branch Structure',
              order: 20,
              no: '20',
            },
            '50bb6bbf-0c01-4ec0-a592-4489fd1357b5': {
              name: 'Equus Cubist Geometric Horse Sculptures',
              category: 'Sculptural Objects & Accents',
              badge: 'Cubist Equine',
              options: 'Antiqued Mirrored Glass · Geometric Nickel Mount',
              order: 21,
              no: '21',
            },
            '3fa77e88-6991-4dd7-9df5-ab0e6fa3fdc3': {
              name: 'Lunette Crescent Hammered Brass Hurricane',
              category: 'Candleholders & Illumination',
              badge: 'Hand-Forged',
              options: 'Hand-Forged Hammered Brass · Glass Cylinder',
              order: 22,
              no: '22',
            },
            '2ebb070b-10b9-4ac2-b040-c923bb5f6cd3': {
              name: 'Monstera Sculpted Silver Leaf Plinth',
              category: 'Sculptural Objects & Accents',
              badge: 'Botanical Bronze',
              options: 'Hand-Cast Textured Silver · Nero Marquina Base',
              order: 23,
              no: '23',
            },
          }

          const RAW_CASUAL_NAMES = new Set([
            'sea shell',
            'vase',
            'another vase',
            'candle holder',
            'white vase',
            'center table decor',
            'golden candle holder',
            'golden floral decor',
            'golden container',
            'cooper feather container',
            'a vase with flower',
            'glass candle holder',
            'golden glass candle holder',
            'golden jaguar',
            'golden paper weigh',
            'a tray with paper weigh and candle holder',
            'silver vase and silver candle holder',
            'steeel vase and holder',
            'candle holden golden',
            'candle holden golden ',
            'horse shape decor',
            'another beautiful candle holder',
            'another beautiful candle holder ',
            'a silver leaf design decor',
          ])

          for (const doc of decorDocs) {
            if (isCancelled) break
            const cleanId = doc._id.replace(/^drafts\./, '')
            const itemConfig = DECOR_MAP[cleanId]
            const nameLower = (doc.name || '').trim().toLowerCase()
            if (itemConfig && RAW_CASUAL_NAMES.has(nameLower)) {
              try {
                await client
                  .patch(doc._id)
                  .set({
                    name: itemConfig.name,
                    category: itemConfig.category,
                    badge: itemConfig.badge,
                    options: itemConfig.options,
                    order: itemConfig.order,
                    no: itemConfig.no,
                  })
                  .commit()
              } catch (patchErr) {
                console.warn('Decor patch error:', patchErr.message)
              }
            }
          }
        }
      } catch (err) {
        console.warn('Sanity auto-sync check:', err.message)
      }
    }

    autoSync()
    const interval = setInterval(autoSync, 20000)
    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [client])

  return props.renderDefault(props)
}
