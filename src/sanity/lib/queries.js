import { groq } from 'next-sanity'

// Query for all projects
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage,
    client,
    location,
    year,
    area,
    featured,
    summary,
    beforeAfter
  }
`

// Query for featured projects on homepage
export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage,
    client,
    location,
    year,
    area,
    summary
  }
`

// Query for single project by slug
export const SINGLE_PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage,
    gallery,
    beforeAfter,
    client,
    location,
    year,
    area,
    featured,
    summary,
    description,
    highlights
  }
`

// Query for services
export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    iconName,
    shortDescription,
    coverImage,
    features
  }
`

// Query for testimonials
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] {
    _id,
    clientName,
    roleTitle,
    quote,
    rating,
    avatar,
    projectName
  }
`

// Query for global site settings
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    studioName,
    heroHeadline,
    heroSubtitle,
    contactEmail,
    contactPhone,
    studioAddress,
    instagramUrl,
    pinterestUrl,
    yearsExperience,
    completedProjects,
    awardsCount
  }
`
