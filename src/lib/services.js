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
        homeLede,
        homeImage {
          asset-> { url, metadata { dimensions } },
          hotspot
        }
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

        const homeImageUrl = doc.homeImage?.asset?.url || (doc.homeImage ? urlForImage(doc.homeImage)?.url() : null);
        const homeFocus = doc.homeImage?.hotspot
          ? `${Math.round(doc.homeImage.hotspot.x * 100)}% ${Math.round(doc.homeImage.hotspot.y * 100)}%`
          : "50% 50%";

        return {
          heroEyebrow: doc.heroEyebrow || "OUR PRACTICE",
          heroTitle: doc.heroTitle || "FIVE DISCIPLINES, one quiet STUDIO.",
          heroLede: doc.heroLede || "From the first sketch to the final cushion, everything under one roof, and one standard.",
          disciplines,
          homeEyebrow: doc.homeEyebrow || "INSYNC HOME",
          homeTitle: doc.homeTitle || "CURATED OBJECTS, made for your SPACE.",
          homeLede: doc.homeLede || "Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.",
          homeImage: homeImageUrl || null,
          homeImageFocus: homeFocus,
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
    homeImage: null,
    homeImageFocus: "50% 50%",
  };
}

// Curated luxury editorial enhancements for Insync Home pieces
const DECOR_ENHANCEMENTS = {
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
};

// Casual placeholder names that should automatically be elevated
const PLACEHOLDER_NAMES = new Set([
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
]);

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

            const enhanced = DECOR_ENHANCEMENTS[doc._id];
            const isPlaceholder = PLACEHOLDER_NAMES.has(doc.name.trim().toLowerCase());

            // Use enhanced name if the document currently has one of the casual placeholder names
            const finalName = isPlaceholder && enhanced ? enhanced.name : doc.name;
            const finalCategory = (isPlaceholder || doc.category === 'Stone Furniture') && enhanced ? enhanced.category : (doc.category || "Stone Furniture");
            const finalBadge = (isPlaceholder || doc.badge === 'Bespoke Stone') && enhanced ? enhanced.badge : (doc.badge || "Bespoke Stone");
            const finalOptions = (isPlaceholder || doc.options === 'Travertine · Marble · Onyx') && enhanced ? enhanced.options : (doc.options || "Travertine · Marble · Onyx");
            const finalOrder = (isPlaceholder || doc.order === 10) && enhanced ? enhanced.order : (doc.order ?? (idx + 1));
            const finalNo = (isPlaceholder || doc.no === '01') && enhanced ? enhanced.no : (doc.no || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`));

            return {
              id: doc._id,
              order: finalOrder,
              no: finalNo,
              name: finalName,
              category: finalCategory,
              desc: doc.desc || "",
              img: imgUrl || null,
              imageFocus: focus,
              badge: finalBadge,
              options: finalOptions,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.order - b.order); // Keep in order 1 to 23
      }
    }
  } catch (err) {
    console.warn("Sanity getDecorProducts fallback:", err.message);
  }

  return DEFAULT_PRODUCTS;
}
