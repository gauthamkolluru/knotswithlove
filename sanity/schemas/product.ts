import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price (e.g. $12)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge label (e.g. New, Bestseller) — leave blank for none',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Product Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a photo of the product. If empty, a colour card is shown instead.',
    }),
    defineField({
      name: 'color',
      title: 'Card Colour (shown when no photo)',
      type: 'string',
      options: {
        list: [
          { title: 'Rose', value: 'plh-rose' },
          { title: 'Yellow', value: 'plh-yellow' },
          { title: 'Sage', value: 'plh-sage' },
          { title: 'Blue', value: 'plh-blue' },
          { title: 'Lavender', value: 'plh-lavender' },
          { title: 'Peach', value: 'plh-peach' },
        ],
        layout: 'radio',
      },
      initialValue: 'plh-rose',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order (lower = appears first)',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
  },
})
