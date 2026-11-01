import { defineField, defineType } from 'sanity'

export const decorProductType = defineType({
  name: 'decorProduct',
  title: 'Insync Home Products',
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
      name: 'name',
      title: 'Product Name',
      description: 'The title of the object (e.g. Monolithic Travertine Plinth, Solstice Bouclé Lounge Chair).',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload high-resolution product photo. Enable hotspot to frame the focal point perfectly across all devices.',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Accessibility & SEO description of the piece.',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Position / Order (1 for 1st place, 2 for 2nd...)',
      description: 'Set 1 to place this product 1st in the gallery, 2 for 2nd, etc. Products with smaller numbers appear first.',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Stone Furniture', value: 'Stone Furniture' },
          { title: 'Architectural Lighting', value: 'Architectural Lighting' },
          { title: 'Bespoke Seating', value: 'Bespoke Seating' },
          { title: 'Architectural Accents', value: 'Architectural Accents' },
          { title: 'Storage & Joinery', value: 'Storage & Joinery' },
          { title: 'Textiles & Rugs', value: 'Textiles & Rugs' },
          { title: 'Objects & Decor', value: 'Objects & Decor' },
        ],
      },
      initialValue: 'Stone Furniture',
    }),
    defineField({
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'no',
      title: 'Number Code (e.g. 01, 02)',
      type: 'string',
      initialValue: '01',
    }),
    defineField({
      name: 'badge',
      title: 'Card Badge (e.g. Bespoke Stone, Made to Order, Atelier Crafted)',
      type: 'string',
      initialValue: 'Bespoke Stone',
    }),
    defineField({
      name: 'options',
      title: 'Custom Material Options (e.g. Travertine · Marble · Onyx)',
      type: 'string',
      initialValue: 'Travertine · Marble · Onyx',
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Detail Photos (Optional)',
      description: 'Upload any extra angles or material close-ups.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    select: {
      name: 'name',
      no: 'no',
      order: 'order',
      category: 'category',
      media: 'image',
    },
    prepare({ name, no, order, category, media }) {
      const displayName = name || 'Untitled Product'
      return {
        title: order !== undefined ? `#${order} — ${displayName}` : displayName,
        subtitle: `${no ? no + ' · ' : ''}${category || 'Product'}`,
        media,
      }
    },
  },
})
