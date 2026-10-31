import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Navbar & Global Site Settings',
  type: 'document',
  fields: [
    // ==============================================================
    // ⭐ 1. NAVBAR & SOCIAL APPS (WHATSAPP, MAIL, INSTAGRAM)
    // ==============================================================
    defineField({
      name: 'whatsappNumber',
      title: '⭐ 1. WhatsApp Number / Link (Navbar & Floating Chat)',
      description: 'Used for the WhatsApp icon in the top Navbar and floating chat button. Enter phone number with country code (e.g. 919877417531 or +91 98774 17531) or full wa.me link.',
      type: 'string',
      initialValue: '919877417531',
    }),
    defineField({
      name: 'contactEmail',
      title: '⭐ 2. Email Address (Navbar Mail Icon)',
      description: 'Used for the Mail envelope icon in the Navbar and site footer. When clicked, it opens an email to this address (e.g. hello@insyncinteriors.com).',
      type: 'string',
      initialValue: 'hello@insyncinteriors.com',
    }),
    defineField({
      name: 'instagramUrl',
      title: '⭐ 3. Instagram Profile URL (Navbar Instagram Icon)',
      description: 'Used for the Instagram camera icon in the Navbar and footer (e.g. https://www.instagram.com/insync_byancchal/).',
      type: 'url',
      initialValue: 'https://www.instagram.com/insync_byancchal/',
    }),
    defineField({
      name: 'enquireButtonText',
      title: '⭐ 4. Navbar Inquire Button Label',
      description: 'Text displayed inside the main gold button in the Navbar (e.g. INQUIRE or ENQUIRE NOW).',
      type: 'string',
      initialValue: 'INQUIRE',
    }),

    // ==============================================================
    // 2. STUDIO IDENTITY
    // ==============================================================
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

    // ==============================================================
    // 3. CONTACT PAGE & ATELIER DETAILS
    // ==============================================================
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
      name: 'enquireButtonSubtitle',
      title: 'Enquire Button Subtitle (Contact Page)',
      description: 'Italic text below the Enquire button on the contact hero',
      type: 'string',
      initialValue: 'Begin your bespoke architectural commission',
    }),
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
    defineField({
      name: 'pinterestUrl',
      title: 'Pinterest Profile Link',
      type: 'url',
    }),

    // ==============================================================
    // 4. HERO & STATS
    // ==============================================================
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
