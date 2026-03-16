import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inspirationPost',
  title: 'Inspiration Post',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a photo. If empty, a colour card with the caption on hover is shown.',
    }),
    defineField({
      name: 'color',
      title: 'Card Colour (shown when no photo)',
      type: 'string',
      options: {
        list: [
          { title: 'Rose', value: 'ig-rose' },
          { title: 'Yellow', value: 'ig-yellow' },
          { title: 'Sage', value: 'ig-sage' },
          { title: 'Blue', value: 'ig-blue' },
          { title: 'Lavender', value: 'ig-lavender' },
          { title: 'Peach', value: 'ig-peach' },
        ],
        layout: 'radio',
      },
      initialValue: 'ig-rose',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
  },
})
