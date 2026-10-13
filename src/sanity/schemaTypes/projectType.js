import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Interior Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential Villa', value: 'residential' },
          { title: 'Luxury Penthouse', value: 'penthouse' },
          { title: 'Commercial Atelier', value: 'commercial' },
          { title: 'Hospitality & Resort', value: 'hospitality' },
          { title: 'Architectural Renovation', value: 'renovation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery (Add, Replace or Delete Images)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' }
          ]
        }
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before & After Transformation',
      type: 'object',
      fields: [
        {
          name: 'enable',
          title: 'Enable Transformation Comparison',
          type: 'boolean',
        },
        {
          name: 'beforeImage',
          title: 'Original / Before Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'afterImage',
          title: 'Completed Luxury Transformation Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'labelBefore',
          title: 'Before Label',
          type: 'string',
          initialValue: 'Original Space',
        },
        {
          name: 'labelAfter',
          title: 'After Label',
          type: 'string',
          initialValue: 'Atelier Design',
        }
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client Name / Estate',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location (City & Country)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'string',
    }),
    defineField({
      name: 'area',
      title: 'Total Area (e.g. 5,200 sq ft)',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Highlight on Homepage Hero Grid',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Full Design Concept & Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Key Design Features (Bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
