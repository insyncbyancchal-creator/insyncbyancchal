// Master Data Access Layer for Services & Insync Home Products
import { sanityClient } from "@/sanity/lib/client";
import { projectId } from "@/sanity/lib/env";
import { urlForImage } from "@/sanity/lib/image";

// 5 Disciplines default data with ZERO placeholder images (ready for client photos from Sanity)
export const DEFAULT_SERVICES = [
  {
    no: "01",
    title: "Architectural Design",
    line: "Spaces conceived from the ground up, where structure, light and proportion are resolved before a single finish is chosen.",
    tags: ["Concept", "Planning", "Elevations"],
    img: null, // Removed placeholder image - uploaded via Sanity
    tone: ["#e9e3d5", "#cdc2a9"],
  },
  {
    no: "02",
    title: "Interior Design",
    line: "Rooms composed with restraint: layered materials, considered light, and furniture that truly belongs.",
    tags: ["Space planning", "Materials", "Lighting"],
    img: null,
    tone: ["#dccdb4", "#a98f68"],
  },
  {
    no: "03",
    title: "Procurement",
    line: "Furniture, fittings and finishes sourced and negotiated on your behalf, to the standard we would specify for ourselves.",
    tags: ["Sourcing", "Vendors", "Quality checks"],
    img: null,
    tone: ["#e4dac2", "#b99a5b"],
  },
  {
    no: "04",
    title: "Delivery & Installation",
    line: "Every piece delivered, placed and finished by our own team, so the room you approved is the room you receive.",
    tags: ["Logistics", "Installation", "Styling"],
    img: null,
    tone: ["#cfc8ba", "#8f8878"],
  },
  {
    no: "05",
    title: "Insync Home",
    line: "A collection of home décor made to be customised, to your dimensions, finishes and taste.",
    tags: ["Décor", "Made to order", "Customisable"],
    img: null,
    tone: ["#efe4cb", "#c4a56a"],
    shop: true,
  },
];

export const DEFAULT_PRODUCTS = [
  {
    id: "plinth",
    no: "01",
    name: "Monolithic Travertine Plinth",
    category: "Stone Furniture",
    desc: "Hand-carved Italian travertine with distinctive geological veining and honed bevels.",
    img: null,
    badge: "Bespoke Stone",
    options: "Travertine · Marble · Onyx",
  },
  {
    id: "lighting",
    no: "02",
    name: "Alabaster & Brass Pendant",
    category: "Architectural Lighting",
    desc: "Solid Spanish alabaster sphere with hand-brushed brass emitting ambient luminescence.",
    img: null,
    badge: "Made to Order",
    options: "Alabaster · Fluted Glass",
  },
  {
    id: "chair",
    no: "03",
    name: "Solstice Bouclé Lounge Chair",
    category: "Bespoke Seating",
    desc: "Sculptural low-slung curves in tactile French bouclé over a kiln-dried hardwood frame.",
    img: null,
    badge: "Atelier Crafted",
    options: "Bouclé · Linen · Leather",
  },
  {
    id: "mirror",
    no: "04",
    name: "Monumental Arched Atelier Mirror",
    category: "Architectural Accents",
    desc: "Hand-rolled iron frame with deep architectural reveal and beveled crystal glass.",
    img: null,
    badge: "Custom Dimensions",
    options: "Aged Bronze · Brass · Steel",
  },
  {
    id: "credenza",
    no: "05",
    name: "Fluted Smoked Oak Credenza",
    category: "Storage & Joinery",
    desc: "Precision-fluted European oak with patinated brass shadowline and soft-close acoustic reveals.",
    img: null,
    badge: "Artisan Joinery",
    options: "Smoked Oak · Walnut · Ash",
  },
  {
    id: "sconce",
    no: "06",
    name: "Cast Bronze Sculptural Sconce",
    category: "Architectural Lighting",
    desc: "Lost-wax cast bronze fixture casting a warm directional glow across textured masonry.",
    img: null,
    badge: "Hand Cast",
    options: "Antiqued Bronze · Blackened Iron",
  },
  {
    id: "viola-table",
    no: "07",
    name: "Calacatta Viola Cocktail Plinth",
    category: "Stone Furniture",
    desc: "Monolithic burgundy and cream Italian marble carved from a single hand-selected quarry block.",
    img: null,
    badge: "Quarry Select",
    options: "Calacatta Viola · Arabescato",
  },
  {
    id: "rug",
    no: "08",
    name: "Hand-Loomed Mohair & Silk Rug",
    category: "Textiles & Rugs",
    desc: "Dense Tibetan weave blending hand-spun virgin wool, raw silk and mohair in tonal gradients.",
    img: null,
    badge: "Hand Loomed",
    options: "Mulberry Silk · Tibetan Wool",
  },
  {
    id: "daybed",
    no: "09",
    name: "Low-Slung Belgian Linen Daybed",
    category: "Bespoke Seating",
    desc: "Minimalist floating platform with bolster headrest upholstered in heavyweight washed linen.",
    img: null,
    badge: "Natural Fibers",
    options: "Belgian Linen · Nubuck · Bouclé",
  },
  {
    id: "chandelier",
    no: "10",
    name: "Ribbed Champagne Crystal Chandelier",
    category: "Architectural Lighting",
    desc: "Mouth-blown fluted crystal cylinders mounted to a suspended architectural champagne brass armature.",
    img: null,
    badge: "Mouth Blown",
    options: "Champagne Brass · Smoked Crystal",
  },
  {
    id: "console",
    no: "11",
    name: "Nero Marquina Architectural Console",
    category: "Stone Furniture",
    desc: "Sculptural cantilevers in deep black Spanish marble with stark white calcitic lightning veins.",
    img: null,
    badge: "Monolithic",
    options: "Nero Marquina · Belgian Black",
  },
  {
    id: "armchair",
    no: "12",
    name: "Curved Bouclé Accent Armchair",
    category: "Bespoke Seating",
    desc: "Enveloping organic silhouette tailored in Italian wool bouclé with a hidden swivel base.",
    img: null,
    badge: "Sculptural Form",
    options: "Ecru Bouclé · Cashmere · Velvet",
  },
  {
    id: "dining-table",
    no: "13",
    name: "Honed Limestone Oval Dining Table",
    category: "Stone Furniture",
    desc: "Soft-edged architectural tabletop resting on dual cylindrical pedestals in Portuguese limestone.",
    img: null,
    badge: "Custom Length",
    options: "Moleanos Limestone · Travertine",
  },
  {
    id: "quartzite",
    no: "14",
    name: "Backlit Patagonia Quartzite Panel",
    category: "Architectural Accents",
    desc: "Rare volcanic crystal slab with integrated diffused LED warmth creating a glowing room centerpiece.",
    img: null,
    badge: "Luminous Stone",
    options: "Patagonia Quartzite · White Onyx",
  },
  {
    id: "screen",
    no: "15",
    name: "Hand-Forged Aged Brass Screen",
    category: "Architectural Accents",
    desc: "Three-panel architectural privacy partition with delicate perforated geometric apertures.",
    img: null,
    badge: "Metalsmith",
    options: "Aged Brass · Blackened Steel",
  },
  {
    id: "vessel",
    no: "16",
    name: "Sculptural Travertine Catchall & Vessels",
    category: "Objects & Decor",
    desc: "Lathe-turned solid Roman travertine vessel trio with raw chiselled rims and honed bowls.",
    img: null,
    badge: "Hand Carved",
    options: "Roman Travertine · Silver Onyx",
  },
  {
    id: "leather-bench",
    no: "17",
    name: "Woven Saddle Leather Gallery Bench",
    category: "Bespoke Seating",
    desc: "Thick vegetable-tanned bridle leather straps hand-interlaced over a solid blackened ash trestle.",
    img: null,
    badge: "Saddlery Craft",
    options: "Cognac · Espresso · Natural Saddle",
  },
  {
    id: "floating-vanity",
    no: "18",
    name: "Floating Monolithic Stone Vanity",
    category: "Stone Furniture",
    desc: "Integrated seamless basin carved into an 8-inch mitered fascia with concealed drainage.",
    img: null,
    badge: "Architectural",
    options: "Crema Marfil · Pietra Grey",
  },
  {
    id: "walnut-pedestal",
    no: "19",
    name: "Hand-Turned Solid Walnut Pedestal",
    category: "Objects & Decor",
    desc: "Fluted sculptural column carved from sustainably harvested American black walnut with oil finish.",
    img: null,
    badge: "Solid Hardwood",
    options: "American Walnut · White Oak",
  },
  {
    id: "glass-table",
    no: "20",
    name: "Beveled Smoked Glass Cocktail Table",
    category: "Stone Furniture",
    desc: "Extra-thick 19mm tempered smoked grey glass top floating above dual solid cast brass geometry.",
    img: null,
    badge: "Architectural",
    options: "Smoked Grey · Bronze Tint · Clear",
  },
];

// Fetch Services Page content (the 5 disciplines & headers)
export async function getServicesPageData() {
  try {
    if (projectId && projectId !== "demo-project-id") {
      const doc = await sanityClient.fetch(`*[_type == "servicesPage"][0] {
        heroEyebrow,
        heroTitle,
        heroLede,
        disciplines[] {
          no,
          title,
          line,
          tags,
          shop,
          image {
            asset-> { url, metadata { dimensions } },
            hotspot
          }
        },
        homeEyebrow,
        homeTitle,
        homeLede
      }`);

      if (doc) {
        // Merge Sanity disciplines with default structure, resolving images with hotspot
        let disciplines = DEFAULT_SERVICES;
        if (Array.isArray(doc.disciplines) && doc.disciplines.length > 0) {
          disciplines = doc.disciplines.map((d, i) => {
            const defaultItem = DEFAULT_SERVICES[i] || {};
            const imgUrl = d.image?.asset?.url || (d.image ? urlForImage(d.image)?.url() : null);
            const focus = d.image?.hotspot
              ? `${Math.round(d.image.hotspot.x * 100)}% ${Math.round(d.image.hotspot.y * 100)}%`
              : "50% 50%";

            return {
              no: d.no || defaultItem.no || `0${i + 1}`,
              title: d.title || defaultItem.title,
              line: d.line || defaultItem.line,
              tags: Array.isArray(d.tags) && d.tags.length > 0 ? d.tags : defaultItem.tags || [],
              img: imgUrl || null,
              imageFocus: focus,
              tone: defaultItem.tone || ["#e9e3d5", "#cdc2a9"],
              shop: d.shop ?? defaultItem.shop ?? false,
            };
          });
        }

        return {
          heroEyebrow: doc.heroEyebrow || "OUR PRACTICE",
          heroTitle: doc.heroTitle || "FIVE DISCIPLINES, one quiet STUDIO.",
          heroLede: doc.heroLede || "From the first sketch to the final cushion, everything under one roof, and one standard.",
          disciplines,
          homeEyebrow: doc.homeEyebrow || "INSYNC HOME",
          homeTitle: doc.homeTitle || "CURATED OBJECTS, made for your SPACE.",
          homeLede: doc.homeLede || "Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.",
        };
      }
    }
  } catch (err) {
    console.warn("Sanity getServicesPageData fallback:", err.message);
  }

  return {
    heroEyebrow: "OUR PRACTICE",
    heroTitle: "FIVE DISCIPLINES, one quiet STUDIO.",
    heroLede: "From the first sketch to the final cushion, everything under one roof, and one standard.",
    disciplines: DEFAULT_SERVICES,
    homeEyebrow: "INSYNC HOME",
    homeTitle: "CURATED OBJECTS, made for your SPACE.",
    homeLede: "Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.",
  };
}

// Fetch Insync Home Products from Sanity (ordered, dynamic, deleteable)
export async function getDecorProducts() {
  try {
    if (projectId && projectId !== "demo-project-id") {
      const docs = await sanityClient.fetch(`*[_type == "decorProduct"] | order(coalesce(order, 999) asc, _createdAt desc) {
        _id,
        order,
        no,
        name,
        category,
        desc,
        badge,
        options,
        image {
          asset-> { url, metadata { dimensions } },
          hotspot
        }
      }`);

      if (docs && docs.length > 0) {
        return docs
          .map((doc, idx) => {
            if (!doc || !doc.name) return null; // Filter empty cards
            const imgUrl = doc.image?.asset?.url || (doc.image ? urlForImage(doc.image)?.url() : null);
            const focus = doc.image?.hotspot
              ? `${Math.round(doc.image.hotspot.x * 100)}% ${Math.round(doc.image.hotspot.y * 100)}%`
              : "50% 50%";

            return {
              id: doc._id,
              order: doc.order ?? (idx + 1),
              no: doc.no || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
              name: doc.name,
              category: doc.category || "Stone Furniture",
              desc: doc.desc || "",
              img: imgUrl || null,
              imageFocus: focus,
              badge: doc.badge || "Bespoke Stone",
              options: doc.options || "Travertine · Marble · Onyx",
            };
          })
          .filter(Boolean); // Eliminate any null/deleted cards
      }
    }
  } catch (err) {
    console.warn("Sanity getDecorProducts fallback:", err.message);
  }

  return DEFAULT_PRODUCTS;
}
