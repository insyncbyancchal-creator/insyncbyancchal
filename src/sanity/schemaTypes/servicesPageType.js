import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page & 5 Disciplines',
  type: 'document',
  initialValue: () => ({
    heroEyebrow: 'OUR PRACTICE',
    heroTitle: 'FIVE DISCIPLINES, one quiet STUDIO.',
    heroLede: 'From the first sketch to the final cushion, everything under one roof, and one standard.',
    disciplines: [
      {
        _key: 'disc-1',
        no: '01',
        title: 'Architectural Design',
        line: 'Spaces conceived from the ground up, where structure, light and proportion are resolved before a single finish is chosen.',
        tags: ['Concept', 'Planning', 'Elevations'],
        shop: false,
      },
      {
        _key: 'disc-2',
        no: '02',
        title: 'Interior Design',
        line: 'Rooms composed with restraint: layered materials, considered light, and furniture that truly belongs.',
        tags: ['Space planning', 'Materials', 'Lighting'],
        shop: false,
      },
      {
        _key: 'disc-3',
        no: '03',
        title: 'Procurement',
        line: 'Furniture, fittings and finishes sourced and negotiated on your behalf, to the standard we would specify for ourselves.',
        tags: ['Sourcing', 'Vendors', 'Quality checks'],
        shop: false,
      },
      {
        _key: 'disc-4',
        no: '04',
        title: 'Delivery & Installation',
        line: 'Every piece delivered, placed and finished by our own team, so the room you approved is the room you receive.',
        tags: ['Logistics', 'Installation', 'Styling'],
        shop: false,
      },
      {
        _key: 'disc-5',
        no: '05',
        title: 'Insync Home',
        line: 'A collection of home décor made to be customised, to your dimensions, finishes and taste.',
        tags: ['Décor', 'Made to order', 'Customisable'],
        shop: true,
      },
    ],
    homeEyebrow: 'INSYNC HOME',
    homeTitle: 'CURATED OBJECTS, made for your SPACE.',
    homeLede: 'Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.',
  }),
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (e.g. OUR PRACTICE)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero Lede Paragraph',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'disciplines',
      title: 'The 5 Studio Disciplines',
      description: 'Upload your own photo for each discipline. Hotspot will automatically crop and adjust the frame to look stunning.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'disciplineItem',
          fields: [
            { name: 'no', title: 'Number (e.g. 01, 02)', type: 'string' },
            { name: 'title', title: 'Discipline Title', type: 'string' },
            { name: 'line', title: 'Description Line', type: 'text', rows: 2 },
            {
              name: 'tags',
              title: 'Deliverable Tags',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'image',
              title: 'Showcase Photo (Replaceable with Auto-Adjustment)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload your real discipline photo. Use hotspot to focus on the key detail.',
            },
            {
              name: 'shop',
              title: 'Show "Shop & Customise" Action Link',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'no',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `${subtitle ? subtitle + ' — ' : ''}${title || 'Discipline'}`,
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'homeEyebrow',
      title: 'Insync Home Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'homeTitle',
      title: 'Insync Home Section Title',
      type: 'string',
    }),
    defineField({
      name: 'homeLede',
      title: 'Insync Home Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'homeImage',
      title: 'Insync Home Feature Image (Right Side Showcase)',
      description: 'Upload a feature photograph of an Insync Home bespoke object or curated setting for the right side of the section.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services Page & 5 Disciplines',
        subtitle: 'Manage 5 studio discipline photos & texts',
      }
    },
  },
})
