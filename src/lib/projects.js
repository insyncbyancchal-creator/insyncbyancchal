// Master Data Access Layer for Insync Portfolio Projects
// Connects dynamically to Sanity CMS with manual ordering, inside gallery, and clean backend-only data.
import { sanityClient } from "@/sanity/lib/client";
import { projectId } from "@/sanity/lib/env";
import { urlForImage } from "@/sanity/lib/image";

// Helper to normalize a Sanity project document so all pages receive clean, compatible structures
function normalizeSanityProject(doc) {
  if (!doc) return null;

  // Resolve main cover image, with fallback to first gallery photo if mainImage wasn't uploaded
  const galleryFirstUrl = doc.gallery?.[0]?.asset?.url || (doc.gallery?.[0]?.asset ? urlForImage(doc.gallery[0])?.url() : null);
  const coverUrl = doc.mainImage?.asset?.url || (doc.mainImage ? urlForImage(doc.mainImage)?.url() : null) || galleryFirstUrl;
  const hoverUrl = doc.hoverImage?.asset?.url || (doc.hoverImage ? urlForImage(doc.hoverImage)?.url() : null) || galleryFirstUrl || coverUrl;

  // Resolve inside gallery photos
  const gallery = (doc.gallery || [])
    .map((img, i) => {
      const src = img.asset?.url || (img.asset ? urlForImage(img)?.url() : null);
      if (!src) return null;
      return {
        src,
        alt: img.alt || doc.title || `Gallery photo ${i + 1}`,
        caption: img.caption || "",
        aspectRatio: img.aspectRatio || "16 / 10",
      };
    })
    .filter(Boolean);

  // Cover focus
  const coverFocus = doc.mainImage?.hotspot
    ? `${Math.round(doc.mainImage.hotspot.x * 100)}% ${Math.round(doc.mainImage.hotspot.y * 100)}%`
    : "50% 50%";

  return {
    _id: doc._id,
    order: doc.order ?? 999,
    slug: doc.slug,
    title: doc.title,
    location: doc.location || "LUDHIANA",
    type: doc.type || doc.category || "Bespoke Residence",
    category: doc.category || "Residential",
    year: doc.year || "2025",
    area: doc.area || "",
    status: doc.status || "Completed",
    description: doc.summary || "",
    tagline: doc.tagline || doc.summary || "",
    cover: {
      src: coverUrl || null,
      hoverSrc: hoverUrl || coverUrl || null,
      alt: doc.mainImage?.alt || doc.title,
      focus: coverFocus,
    },
    hero: {
      src: coverUrl || null,
      alt: doc.title,
    },
    concept:
      Array.isArray(doc.concept) && doc.concept.length > 0
        ? doc.concept
        : [doc.summary || "A bespoke architectural study crafted with quiet luxury, proportion, and natural light."].filter(Boolean),
    materials: doc.materials || [],
    gallery,
    featured: Boolean(doc.featured),
  };
}

export async function getProjects() {
  try {
    if (projectId && projectId !== "demo-project-id") {
      const docs = await sanityClient.fetch(`*[_type == "project"] | order(coalesce(order, 999) asc, _createdAt desc) {
        _id,
        order,
        title,
        "slug": slug.current,
        tagline,
        category,
        location,
        type,
        year,
        area,
        status,
        featured,
        summary,
        concept,
        materials,
        mainImage {
          asset-> { url, metadata { dimensions } },
          hotspot,
          alt
        },
        hoverImage {
          asset-> { url },
          hotspot
        },
        gallery[] {
          _key,
          caption,
          alt,
          aspectRatio,
          asset-> { url, metadata { dimensions } }
        }
      }`);

      if (Array.isArray(docs)) {
        // Return ONLY the real projects created in Sanity backend — zero mock or fallback boxes
        return docs.map(normalizeSanityProject).filter(Boolean);
      }
    }
  } catch (err) {
    console.warn("Sanity getProjects error:", err.message);
  }
  return [];
}

export async function getProject(slug) {
  const all = await getProjects();
  if (!slug) return null;
  const target = decodeURIComponent(slug).toLowerCase().replace(/_/g, "-");
  const p = all.find((x) => {
    if (!x.slug) return false;
    const s = x.slug.toLowerCase().replace(/_/g, "-");
    return s === target || x.slug === slug;
  });
  return p || null;
}

export async function getNeighbours(slug) {
  const all = await getProjects();
  const target = (slug || "").toLowerCase().replace(/_/g, "-");
  const filtered = all.filter((p) => (p.slug || "").toLowerCase().replace(/_/g, "-") !== target);
  if (filtered.length === 0) return { next: null, others: [] };

  // Randomize other commissions automatically so every visit displays fresh commissions
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  const next = shuffled[0] || null;
  const others = shuffled.slice(1, 3);

  return { next, others };
}