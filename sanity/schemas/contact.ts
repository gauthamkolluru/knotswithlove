import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'say hi!',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'channels',
      title: 'Contact Channels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (Font Awesome class, e.g. fas fa-envelope)',
              type: 'string',
            }),
            defineField({ name: 'label', title: 'Label (e.g. email)', type: 'string' }),
            defineField({ name: 'value', title: 'Display Value (e.g. hello@knotswithlove.in)', type: 'string' }),
            defineField({ name: 'href', title: 'Link (e.g. mailto:hello@knotswithlove.in)', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
