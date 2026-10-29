import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Interior Projects',
  type: 'document',
  orderings: [
    {
      title: 'Manual Position (1st, 2nd, 3rd...)',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Position / Order (1 for 1st place, 2 for 2nd...)',
      description: 'Set 1 to place this project in the 1st position in the portfolio and homepage, 2 for 2nd, etc. Projects with smaller numbers appear first.',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL link)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage Hero Grid',
      description: 'Turn ON to display this project in the curated 3 projects on the Home Page.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential Villa', value: 'Residential' },
          { title: 'Luxury Penthouse', value: 'Penthouse' },
          { title: 'Commercial Atelier', value: 'Commercial' },
          { title: 'Hospitality & Resort', value: 'Hospitality' },
          { title: 'Architectural Renovation', value: 'Renovation' },
        ],
      },
      initialValue: 'Residential',
    }),
    defineField({
      name: 'type',
      title: 'Typology / Subtitle (e.g. Boutique Residence & BNB)',
      type: 'string',
      initialValue: 'Boutique Residence',
    }),
    defineField({
      name: 'location',
      title: 'Location (City & Country)',
      type: 'string',
      initialValue: 'LUDHIANA',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed (e.g. 2025)',
      type: 'string',
      initialValue: '2025',
    }),
    defineField({
      name: 'area',
      title: 'Total Area (e.g. 8,500 sq ft)',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      initialValue: 'Completed',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image (Portfolio Grid & Page Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      description: 'Upload cover photo. If left empty, the website uses the default high-res project image.',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Detail Image (Optional)',
      description: 'Second image revealed smoothly when hovering on the project card in portfolio.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Short Hook',
      type: 'string',
      description: 'e.g. A bespoke architectural sanctuary of quiet luxury and hospitality.',
    }),
    defineField({
      name: 'summary',
      title: 'Project Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'concept',
      title: 'Design Concept Paragraphs',
      description: 'Add paragraphs explaining the design story, daylight, and spatial concept.',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'materials',
      title: 'Materials Palette (e.g. Travertine stone, Fluted oak)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Inside Project Gallery (Photos, Rooms, Details)',
      description: 'Add, replace, reorder, or delete inside gallery images. You can drag and drop to rearrange them.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption / Room Name' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              options: {
                list: [
                  { title: 'Landscape (16:10)', value: '16 / 10' },
                  { title: 'Portrait (3:4)', value: '3 / 4' },
                  { title: 'Wide (16:9)', value: '16 / 9' },
                  { title: 'Square (1:1)', value: '1 / 1' },
                ],
              },
              initialValue: '16 / 10',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      order: 'order',
      media: 'mainImage',
    },
    prepare({ title, subtitle, order, media }) {
      const displayTitle = title || 'Untitled Project'
      return {
        title: order !== undefined ? `#${order} — ${displayTitle}` : displayTitle,
        subtitle: subtitle || 'Interior Project',
        media,
      }
    },
  },
})
