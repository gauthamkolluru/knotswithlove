import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Brand Name (shown in navbar & footer)',
      type: 'string',
      initialValue: 'Knots with Love',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'greeting',
      title: 'Home Greeting (e.g. "hey, it\'s")',
      type: 'string',
      initialValue: "hey, it's",
    }),
    defineField({
      name: 'authorName',
      title: 'Your First Name (shown in hero)',
      type: 'string',
      initialValue: 'Harshita',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle (one-liner under your name)',
      type: 'string',
      initialValue: 'maker, crocheter & the one tying all these knots',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description (paragraph under subtitle)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (your photo)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle (e.g. @knotswithlove)',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
