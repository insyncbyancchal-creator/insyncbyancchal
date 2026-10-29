import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Home Page Atelier',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'aboutSection',
      title: 'About the Atelier — Founder Portrait',
      description: 'Upload the founder photo here. The frame on the live website will automatically adjust its aspect ratio and focal point to match this image.',
      type: 'object',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'founderPhoto',
          title: 'Founder Portrait Photo',
          description: 'Upload Ancchal’s portrait. Click "Hotspot" on the uploaded photo to set the focal point (face/body). The website frame will automatically adapt.',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'founderPhotoAlt',
          title: 'Photo Accessibility Alt Text',
          type: 'string',
          initialValue: 'Ancchal, Founder & Principal Designer of Insync by Ancchal',
        }),
        defineField({
          name: 'founderName',
          title: 'Founder Name (Attribution below photo)',
          type: 'string',
          initialValue: 'Ancchal',
        }),
        defineField({
          name: 'founderRole',
          title: 'Founder Title (Attribution below photo)',
          type: 'string',
          initialValue: 'FOUNDER & PRINCIPAL DESIGNER',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'aboutSection.founderPhoto',
    },
    prepare({ media }) {
      return {
        title: 'Home Page Content',
        subtitle: 'About the Atelier & Founder Portrait',
        media,
      }
    },
  },
})
