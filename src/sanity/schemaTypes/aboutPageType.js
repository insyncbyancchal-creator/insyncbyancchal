import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Identifier',
      type: 'string',
      initialValue: 'About Page Content',
      readOnly: true,
      hidden: true,
    }),

    // Section 1: Founder Section
    defineField({
      name: 'founderSection',
      title: 'Founder Portrait & Details',
      description: 'Upload Ancchal’s photo for the About page. Use Hotspot to select her face/focal point. The frame automatically adjusts.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'founderPhoto',
          title: 'Founder Portrait Photo',
          description: 'Upload Ancchal’s photo for the About page. Click Hotspot to pick focal point.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'founderPhotoAlt',
          title: 'Photo Alt Description',
          type: 'string',
          initialValue: 'Portrait of Ancchal Sharma, Founder and Principal Designer of Insync',
        }),
      ],
    }),

    // Section 2: Our Approach / Manifesto
    defineField({
      name: 'approachSection',
      title: 'Our Approach (Manifesto Photo)',
      description: 'The architectural atmosphere image on the right of "Our Approach".',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'approachPhoto',
          title: 'Our Approach Image',
          description: 'Upload the atmosphere/architectural photo for Our Approach section.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'approachPhotoAlt',
          title: 'Image Alt Description',
          type: 'string',
          initialValue: 'Luxury architectural interior with serene natural light, fluted oak and organic travertine',
        }),
        defineField({
          name: 'caption',
          title: 'Image Caption Below Photo',
          type: 'string',
          initialValue: 'STUDIO PHILOSOPHY IN PRACTICE',
        }),
      ],
    }),

    // Section 3: Spaces in Motion (4 Reels)
    defineField({
      name: 'reelsSection',
      title: 'Spaces in Motion (Instagram Reels)',
      description: 'Manage the 4 video reels, their titles, video files/links, and Instagram post URLs.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'instagramProfileUrl',
          title: 'Main Instagram Profile Link (Follow button)',
          description: 'The link that opens when clicking FOLLOW @INSYNC_BYANCCHAL',
          type: 'url',
          initialValue: 'https://www.instagram.com/insync_byancchal/',
        }),
        defineField({
          name: 'reelsList',
          title: '4 Video Reels',
          description: 'Add or update the 4 video reels.',
          type: 'array',
          validation: (Rule) => Rule.max(4),
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Reel Title',
                  type: 'string',
                }),
                defineField({
                  name: 'videoFile',
                  title: 'Upload MP4 Video File',
                  type: 'file',
                  options: {
                    accept: 'video/mp4,video/*',
                  },
                }),
                defineField({
                  name: 'videoUrl',
                  title: 'Or Video URL (Direct MP4 link / fallback)',
                  type: 'string',
                }),
                defineField({
                  name: 'poster',
                  title: 'Poster Cover Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'duration',
                  title: 'Duration Label (e.g. 0:05)',
                  type: 'string',
                  initialValue: '0:05',
                }),
                defineField({
                  name: 'instagramUrl',
                  title: 'Instagram Post Link (Opens when reel is clicked)',
                  type: 'url',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'instagramUrl',
                  media: 'poster',
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'founderSection.founderPhoto',
    },
    prepare({ media }) {
      return {
        title: 'About Page Content',
        subtitle: 'Founder Photo, Approach Photo & 4 Reels',
        media,
      }
    },
  },
})
