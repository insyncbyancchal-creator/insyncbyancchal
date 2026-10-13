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
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', caption: 'Panoramic Living Pavilion with Calacatta Marble' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop', caption: 'Bespoke Italian Oak Kitchen & Bar' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop', caption: 'Master Suite Sanctuary with Floor-to-Ceiling Glass' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop', caption: 'Freestanding Stone Soak Tub overlooking Skyline' }
    ],
    beforeAfter: {
      enable: true,
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      labelBefore: 'Original Space Structure',
      labelAfter: 'Aura Atelier Penthouse'
    },
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
    mainImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop', caption: 'Double-Height Grand Foyer & Helical Stairway' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop', caption: 'Organic Minimalist Dining Room with Fluted Wood' },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop', caption: 'Outdoor Infinity Pool Terrace & Lounge' }
    ],
    beforeAfter: {
      enable: true,
      beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
      labelBefore: 'Dated 1990s Mediterranean Interior',
      labelAfter: 'Sculptural Modernist Haven'
    },
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
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop', caption: 'Private Consultation Salon' },
      { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1600&auto=format&fit=crop', caption: 'Executive Boardroom with Linear Brass Chandelier' }
    ],
    beforeAfter: {
      enable: false,
    },
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
    clientName: 'Alexander & Elena Vance',
    roleTitle: 'Owners, The Solstice Penthouse',
    quote: 'AURA transformed our Manhattan penthouse into a living masterpiece. The attention to material craftsmanship and lighting details surpassed our highest expectations.',
    rating: 5,
    projectName: 'The Solstice Penthouse'
  },
  {
    _id: 'test-2',
    clientName: 'Jean-Luc Beaufort',
    roleTitle: 'Managing Director, Haute Couture Group',
    quote: 'Working with AURA was flawless. They understood our brand vision effortlessly and delivered a Paris salon that wows every high-net-worth client entering our space.',
    rating: 5,
    projectName: 'Maison Noir Atelier'
  }
];

export const MOCK_SITE_SETTINGS = {
  studioName: 'AURA | Luxury Interior Atelier',
  heroHeadline: 'Sculpting Timeless Architectural Spaces & Bespoke Interiors',
  heroSubtitle: 'An international award-winning studio creating high-end residential estates, sky penthouses, and bespoke luxury hospitality environments worldwide.',
  contactEmail: 'concierge@aura-interior.atelier',
  contactPhone: '+1 (212) 555-0199',
  studioAddress: '740 Park Avenue, 18th Floor, New York, NY 10021',
  yearsExperience: 16,
  completedProjects: 185,
  awardsCount: 28
};

// Safe fetch wrapper that queries Sanity CMS and falls back gracefully
export async function getProjects() {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "project"] | order(_createdAt desc) {
        _id, title, "slug": slug.current, category, mainImage, gallery, beforeAfter, client, location, year, area, featured, summary, highlights
      }`);
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Sanity query fallback:', err.message);
  }
  return MOCK_PROJECTS;
}

export async function getProjectBySlug(slug) {
  try {
    if (projectId && projectId !== 'demo-project-id') {
      const data = await sanityClient.fetch(`*[_type == "project" && slug.current == $slug][0] {
        _id, title, "slug": slug.current, category, mainImage, gallery, beforeAfter, client, location, year, area, featured, summary, highlights, description
      }`, { slug });
      if (data) return data;
    }
  } catch (err) {
    console.warn('Sanity single project fallback:', err.message);
  }
  return MOCK_PROJECTS.find(p => p.slug === slug) || MOCK_PROJECTS[0];
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
