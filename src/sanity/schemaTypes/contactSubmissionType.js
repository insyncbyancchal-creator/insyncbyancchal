import { defineField, defineType } from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Client Inquiries & Leads',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          { title: '🟢 New Lead', value: 'New' },
          { title: '🟡 In Discussion', value: 'In Discussion' },
          { title: '🔵 Site Visit Scheduled', value: 'Site Visit' },
          { title: '⭐ Commissioned Project', value: 'Commissioned' },
          { title: '⚪ Archived / Closed', value: 'Archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'New',
    }),
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      readOnly: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services / Disciplines Interested In',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'location',
      title: 'Project Location / City',
      type: 'string',
    }),
    defineField({
      name: 'budget',
      title: 'Approximate Budget',
      type: 'string',
    }),
    defineField({
      name: 'timeline',
      title: 'Desired Timeline',
      type: 'string',
    }),
    defineField({
      name: 'slot',
      title: 'Preferred Contact Time / Method',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Project Vision / Message',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date & Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'studioNotes',
      title: 'Internal Studio Notes (Private to Team)',
      description: 'Notes by Ancchal or the studio team regarding client meetings, site visits, or quotation details.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      phone: 'phone',
      services: 'services',
      status: 'status',
      date: 'submittedAt',
    },
    prepare({ name, email, phone, services, status, date }) {
      const statusIcon =
        status === 'Commissioned'
          ? '⭐'
          : status === 'In Discussion'
          ? '🟡'
          : status === 'Site Visit'
          ? '🔵'
          : status === 'Archived'
          ? '⚪'
          : '🟢'
      const servStr = Array.isArray(services) && services.length > 0 ? services.join(', ') : 'General Enquiry'
      const d = date
        ? new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })
        : ''
      return {
        title: `${statusIcon} ${name || 'Anonymous Client'}`,
        subtitle: `${email || 'No email'} ${phone ? '• ' + phone : ''} • [${servStr}] ${d ? '• ' + d : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date (Newest First)',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
