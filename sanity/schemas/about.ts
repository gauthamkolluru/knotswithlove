import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: "hey, it's me!",
    }),
    defineField({
      name: 'photo',
      title: 'Your Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'story',
      title: 'Your Story',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Write about yourself — supports bold, italic, and paragraphs.',
    }),
    defineField({
      name: 'values',
      title: 'Values / Why I Do This',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (Font Awesome class, e.g. fas fa-heart)',
              type: 'string',
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'photo' },
  },
})
