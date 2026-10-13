import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Client Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleTitle',
      title: 'Role / Designation / Estate',
      type: 'string',
      placeholder: 'Owner, Royal Palm Villa',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5 stars)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'avatar',
      title: 'Client Portrait / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'projectName',
      title: 'Associated Project Title',
      type: 'string',
    }),
  ],
})
