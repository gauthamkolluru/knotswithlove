import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({ name: 'name',      title: 'Name',      type: 'string' }),
    defineField({ name: 'email',     title: 'Email',     type: 'string' }),
    defineField({ name: 'subject',   title: 'Subject',   type: 'string' }),
    defineField({ name: 'message',   title: 'Message',   type: 'text'   }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'email', description: 'submittedAt' },
  },
})
