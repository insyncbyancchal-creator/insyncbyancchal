import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services & 5 Disciplines Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'disciplines',
      title: 'The 5 Studio Disciplines (Photos)',
      description: 'Upload your showcase photo for each of the 5 disciplines. Click Hotspot on each image to frame the focal point.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'disciplineItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Discipline',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'image',
              title: 'Showcase Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload your photo for this discipline. Click Hotspot to pick the focal point.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Discipline',
                subtitle: media ? 'Photo Uploaded ✓' : 'Default Studio Visual',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'homeImage',
      title: 'Insync Home Feature Photograph (Right-Side Showcase Image)',
      description: 'Upload the showcase image shown on the right side of the Insync Home section. Drag the hotspot circle to target the focal point perfectly across all screens.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Accessibility & SEO description of the feature image.',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services & 5 Disciplines',
        subtitle: 'Upload photos for 5 studio disciplines & Insync Home showcase',
      }
    },
  },
})
