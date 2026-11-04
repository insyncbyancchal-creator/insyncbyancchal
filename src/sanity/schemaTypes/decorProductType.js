import { defineField, defineType } from 'sanity'
import { DecorCardPreviewSelector } from '../components/DecorCardPreviewSelector'

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
      description: 'The title of the piece (e.g. Monolithic Travertine Plinth, Solstice Bouclé Lounge Chair).',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload high-resolution product photo. Click Hotspot to frame the focal point perfectly.',
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
      name: 'aspectRatio',
      title: 'Card Framing & Aspect Ratio (Live Website Preview)',
      type: 'string',
      components: { input: DecorCardPreviewSelector },
      initialValue: 'auto',
      description: 'Select how this piece frames in the gallery. See the live interactive preview below update in real time.',
    }),
    defineField({
      name: 'order',
      title: 'Display Position / Order (1 for 1st place, 2 for 2nd...)',
      description: 'Set 1 to place this product 1st in the gallery, 2 for 2nd, etc. Products with smaller numbers appear first.',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      order: 'order',
      aspectRatio: 'aspectRatio',
      media: 'image',
    },
    prepare({ name, order, aspectRatio, media }) {
      const displayName = name || 'Untitled Product'
      const ratioTag = aspectRatio && aspectRatio !== 'auto' ? ` · ${aspectRatio}` : ''
      return {
        title: order !== undefined ? `#${order} — ${displayName}` : displayName,
        subtitle: `Insync Home Product${ratioTag}`,
        media,
      }
    },
  },
})
