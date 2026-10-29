import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Global Site Settings & Studio Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio Name',
      type: 'string',
      initialValue: 'INSYNC INTERIORS',
    }),
    defineField({
      name: 'subName',
      title: 'Studio Sub-Title / Tag',
      type: 'string',
      initialValue: 'by Ancchal',
    }),

    // --- CONTACT HERO & ENQUIRE BUTTON ---
    defineField({
      name: 'contactHeroTitle',
      title: 'Contact Hero Headline',
      description: 'Main heading on Contact Page (e.g. LET’S BEGIN a quiet CONVERSATION.)',
      type: 'string',
      initialValue: 'LET’S BEGIN a quiet CONVERSATION.',
    }),
    defineField({
      name: 'contactHeroLede',
      title: 'Contact Hero Subtitle / Lede',
      description: 'Intro text on Contact Page below headline',
      type: 'text',
      rows: 2,
      initialValue: 'Tell us about the space you imagine. We’ll listen first, then design.',
    }),
    defineField({
      name: 'enquireButtonText',
      title: 'Enquire Button Label',
      description: 'Text displayed inside the main button (e.g. ENQUIRE NOW)',
      type: 'string',
      initialValue: 'ENQUIRE NOW',
    }),
    defineField({
      name: 'enquireButtonSubtitle',
      title: 'Enquire Button Subtitle',
      description: 'Italic text below the Enquire Now button',
      type: 'string',
      initialValue: 'Begin your bespoke architectural commission',
    }),

    // --- CONTACT & ATELIER DETAILS ---
    defineField({
      name: 'studioAddress',
      title: 'Studio Physical Address',
      description: 'Full address shown on Contact page and Footer.',
      type: 'text',
      rows: 3,
      initialValue: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana – 141001',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone Number (Display)',
      description: 'e.g. +91 98774 17531',
      type: 'string',
      initialValue: '+91 98774 17531',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (Digits Only with Country Code)',
      description: 'e.g. 919877417531 (used for direct WhatsApp chat links)',
      type: 'string',
      initialValue: '919877417531',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Studio Contact Email',
      description: 'e.g. hello@insyncinteriors.com',
      type: 'string',
      initialValue: 'hello@insyncinteriors.com',
    }),
    defineField({
      name: 'studioHours',
      title: 'Studio Operating Hours',
      description: 'e.g. Monday – Saturday · 10:00 AM – 6:00 PM',
      type: 'string',
      initialValue: 'Monday – Saturday · 10:00 AM – 6:00 PM',
    }),
    defineField({
      name: 'mapQuery',
      title: 'Google Maps Search Query / Atelier Landmark',
      description: 'Address used to pin the atelier on Google Maps.',
      type: 'string',
      initialValue: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001',
    }),

    // --- SOCIAL LINKS ---
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/insync_byancchal/',
    }),
    defineField({
      name: 'pinterestUrl',
      title: 'Pinterest Profile Link',
      type: 'url',
    }),

    // --- HERO & STATS ---
    defineField({
      name: 'heroHeadline',
      title: 'Homepage Hero Headline',
      type: 'string',
      initialValue: 'Sculpting Timeless Architectural Spaces & Bespoke Interiors',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Atelier Excellence',
      type: 'number',
      initialValue: 8,
    }),
    defineField({
      name: 'completedProjects',
      title: 'Completed Projects Count',
      type: 'number',
      initialValue: 65,
    }),
  ],
})
