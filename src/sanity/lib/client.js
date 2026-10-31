import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

export const sanityClient = createClient({
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
  apiVersion,
  useCdn,
})

// Curated high-resolution luxury mock data for instant preview & fallback
export const MOCK_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'The Solstice Penthouse',
    slug: 'the-solstice-penthouse',
    category: 'penthouse',
    mainImage: null,
    gallery: [],
    client: 'Private Tech Executive',
    location: 'Manhattan, New York',
    year: '2024',
    area: '6,400 sq ft',
    featured: true,
    summary: 'A glass-encased sky sanctuary combining minimalism, brushed champagne brass accents, and raw monolithic travertine architecture.',
    highlights: [
      'Custom floating marble fireplace centerpiece',
      'Acoustically tuned architectural ceiling reveals',
      'Automated motoric linen & bronze mesh drapery',
      'Bespoke hand-knotted silk floor coverings'
    ]
  },
  {
    _id: 'proj-2',
    title: 'Villa Riviera Estates',
    slug: 'villa-riviera-estates',
    category: 'residential',
    mainImage: null,
    gallery: [],
    client: 'The Sterling Family',
    location: 'Côte d’Azur, France',
    year: '2023',
    area: '9,200 sq ft',
    featured: true,
    summary: 'Harmonizing Mediterranean light with warm plaster finishes, sculptural furniture, and seamless indoor-outdoor transitions.',
    highlights: [
      'Hand-troweled Venetian plaster throughout all gallery walls',
      'Custom curved boucle sofa designed in Italy',
      'Temperature-controlled subterranean glass wine vault',
      'Seamless micro-cement flooring with underfloor radiant heating'
    ]
  },
  {
    _id: 'proj-3',
    title: 'Maison Noir Atelier',
    slug: 'maison-noir-atelier',
    category: 'commercial',
    mainImage: null,
    gallery: [],
    client: 'Haute Couture Group',
    location: 'Paris, France',
    year: '2024',
    area: '4,100 sq ft',
    featured: true,
    summary: 'A dramatic high-fashion atelier interior featuring dark smoked oak, antiqued bronze mirrors, and ambient halo illumination.',
    highlights: [
      'Acoustic velvet wall panels with hidden shadow lines',
      'Sculptural brass reception desk handcrafted by local artisans',
      'Smart circadian lighting system tailored for garment presentation'
    ]
  }
];

export const MOCK_SERVICES = [
  {
    _id: 'serv-1',
    title: 'Full-Scope Interior Architecture',
    slug: 'interior-architecture',
    iconName: 'Compass',
    shortDescription: 'From spatial re-configuration to bespoke millwork design, we orchestrate end-to-end luxury architectural renovations.',
    features: ['Spatial Space Planning & 3D BIM Modeling', 'Custom Structural & Millwork Detail Drawings', 'Material Selection & Finish Specification', 'On-Site Construction Administration']
  },
  {
    _id: 'serv-2',
    title: 'Bespoke FF&E & Furniture Curation',
    slug: 'furniture-curation',
    iconName: 'Armchair',
    shortDescription: 'Direct sourcing of rare antiques, custom Italian furniture fabrication, and high-end artisanal textile selection.',
    features: ['Custom Italian & French Furniture Fabrication', 'Global Antique & Fine Art Sourcing', 'Custom Rug, Drapery & Textile Design', 'White-Glove Delivery & Styling']
  },
  {
    _id: 'serv-3',
    title: 'Architectural Lighting & Illumination',
    slug: 'lighting-design',
    iconName: 'Sparkles',
    shortDescription: 'Crafting emotion through light. Layering hidden ambient LEDs, accent spotlights, and custom hand-blown chandeliers.',
    features: ['Circadian & Mood Lighting Calculations', 'Custom Decorative Light Fixture Design', 'Lutron / Savant Smart Control Integration', 'Art & Sculpture Accent Illumination']
  }
];

export const MOCK_TESTIMONIALS = [
  {
    _id: 'test-1',
    clientName: 'Mansi Poddar',
    roleTitle: 'CONSULTANT & RESIDENCE OWNER',
    location: 'CIVIL LINES, LUDHIANA',
    quote: 'Ancchal and her team are people I trust 100% with any space. She sets the bar so high that when I envision an interior, I cannot think beyond her. Intuitive and deeply attentive, she brings forth the client’s true personality through spatial stillness and soulful materials.',
    rating: 5,
  },
  {
    _id: 'test-2',
    clientName: 'Vikramjit Singh Grewal',
    roleTitle: 'ESTATE OWNER & INDUSTRIALIST',
    location: 'SARABHA NAGAR, LUDHIANA',
    quote: 'Insync by Ancchal brought a quiet, museum-level discipline to our family residence. Ancchal understood from day one that we didn’t seek loud opulence—we wanted timeless stillness, natural travertine, and daylight that changes gracefully through the day.',
    rating: 5,
  },
  {
    _id: 'test-3',
    clientName: 'Dr. Meera & Rajesh Malhotra',
    roleTitle: 'SURGICAL SPECIALISTS & WELLNESS PATRONS',
    location: 'SECTOR 9, CHANDIGARH',
    quote: 'Walking into our residence after demanding days feels like entering a retreat. The acoustic quiet, the hand-waxed joinery, and the seamless connection to the courtyard reflect an understanding of human well-being that goes far beyond conventional decoration.',
    rating: 5,
  },
  {
    _id: 'test-4',
    clientName: 'Harpreet & Amanat Dhillon',
    roleTitle: 'VILLA OWNER & ENTREPRENEUR',
    location: 'MODEL TOWN, JALANDHAR',
    quote: 'Every guest who enters our villa is immediately struck by the restraint. Insync showed us that true luxury is about what you choose not to put into a room. The craftsmanship is flawless, down to the millimeter of every bronze reveal and customized marble island.',
    rating: 5,
  },
  {
    _id: 'test-5',
    clientName: 'Sunaina Ahluwalia',
    roleTitle: 'HERITAGE & ART COLLECTOR',
    location: 'RANJIT AVENUE, AMRITSAR',
    quote: 'As someone who lives surrounded by art, I needed an architect who respected light above all else. Insync conceived our space as a living gallery—calm, tactile, and deeply personal. It is the rare studio that listens with extraordinary patience.',
    rating: 5,
  },
];

export const MOCK_SITE_SETTINGS = {
  studioName: 'INSYNC INTERIORS',
  subName: 'by Ancchal',
  contactHeroTitle: 'LET’S BEGIN a quiet CONVERSATION.',
  contactHeroLede: 'Tell us about the space you imagine. We’ll listen first, then design.',
  enquireButtonText: 'ENQUIRE NOW',
  enquireButtonSubtitle: 'Begin your bespoke architectural commission',
  heroHeadline: 'Curating Quiet Spaces & Soulful Architectural Residences',
  heroSubtitle: 'A bespoke interior architecture studio based in Ludhiana, Punjab crafting timeless residential estates and curated spaces.',
  contactEmail: 'hello@insyncinteriors.com',
  contactPhone: '+91 98774 17531',
  whatsappNumber: '919877417531',
  studioAddress: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana – 141001',
  studioHours: 'Monday – Saturday · 10:00 AM – 6:00 PM',
  mapQuery: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001',
  instagramUrl: 'https://www.instagram.com/insync_byancchal/',
  yearsExperience: 8,
  completedProjects: 65,
  awardsCount: 12,
};

// Safe fetch wrapper that queries Sanity CMS and falls back gracefully
export async function getProjects() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "project"] | order(_createdAt desc) {
        _id, title, "slug": slug.current, category, mainImage, gallery, client, location, year, area, featured, summary, highlights
      }`);
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('Sanity query fallback:', err.message);
  }
  return [];
}

export async function getProjectBySlug(slug) {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "project" && slug.current == $slug][0] {
        _id, title, "slug": slug.current, category, mainImage, gallery, client, location, year, area, featured, summary, highlights, description
      }`, { slug });
      if (data) return data;
    }
  } catch (err) {
    console.warn('Sanity single project fallback:', err.message);
  }
  return null;
}

export async function getServices() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "service"] | order(order asc)`);
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Sanity services fallback');
  }
  return MOCK_SERVICES;
}

export async function getTestimonials() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "testimonial"]`);
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Sanity testimonials fallback');
  }
  return MOCK_TESTIMONIALS;
}

export async function getSiteSettings() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
      if (data) return data;
    }
  } catch (err) {
    console.warn('Sanity settings fallback');
  }
  return MOCK_SITE_SETTINGS;
}

export async function getHomePage() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "homePage"][0] {
        _id,
        aboutSection {
          founderPhoto {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            },
            hotspot,
            crop
          },
          founderPhotoAlt,
          founderName,
          founderRole
        }
      }`);
      if (data) return data;
    }
  } catch (err) {
    console.warn('Sanity homePage fallback:', err.message);
  }
  return null;
}

export async function getAboutPage() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "aboutPage"][0] {
        _id,
        founderSection {
          founderPhoto {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            },
            hotspot,
            crop
          },
          founderPhotoAlt
        },
        approachSection {
          approachPhoto {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            },
            hotspot,
            crop
          },
          approachPhotoAlt,
          caption
        },
        reelsSection {
          instagramProfileUrl,
          reelsList[] {
            _key,
            title,
            videoFile {
              asset-> {
                url
              }
            },
            videoUrl,
            poster {
              asset-> {
                url
              }
            },
            duration,
            instagramUrl
          }
        }
      }`);
      if (data) return data;
    }
  } catch (err) {
    console.warn('Sanity aboutPage fallback:', err.message);
  }
  return null;
}
