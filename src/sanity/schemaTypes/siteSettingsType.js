import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Global Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio Name',
      type: 'string',
      initialValue: 'AURA | Luxury Interior Atelier',
    }),
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
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'studioAddress',
      title: 'Studio Address',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile Link',
      type: 'url',
    }),
    defineField({
      name: 'pinterestUrl',
      title: 'Pinterest Profile Link',
      type: 'url',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Atelier Excellence',
      type: 'number',
      initialValue: 14,
    }),
    defineField({
      name: 'completedProjects',
      title: 'Completed Projects Count',
      type: 'number',
      initialValue: 180,
    }),
    defineField({
      name: 'awardsCount',
      title: 'International Awards Won',
      type: 'number',
      initialValue: 24,
    }),
  ],
})
