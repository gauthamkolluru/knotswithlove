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
      name: 'priceAmount',
      title: 'Price amount',
      type: 'number',
      description: 'Use decimals for cents/paise (e.g. 12.50). Required for new products.',
      validation: (Rule) =>
        Rule.custom((amount, context) => {
          const parent = context.parent as { price?: string }
          if (typeof amount === 'number' && amount >= 0) return true
          if (parent?.price) return true
          return 'Enter a price amount'
        }),
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'US Dollar (USD)', value: 'USD' },
          { title: 'Indian Rupee (INR)', value: 'INR' },
        ],
        layout: 'radio',
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'price',
      title: 'Legacy price (deprecated)',
      type: 'string',
      description: 'Old text price field. Use Price amount + Currency instead.',
      hidden: true,
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
    select: {
      title: 'name',
      priceAmount: 'priceAmount',
      priceCurrency: 'priceCurrency',
      media: 'image',
    },
    prepare({ title, priceAmount, priceCurrency, media }) {
      const amount = typeof priceAmount === 'number' ? priceAmount.toFixed(2) : '—'
      const currency = priceCurrency || 'USD'
      return { title, subtitle: `${currency} ${amount}`, media }
    },
  },
})
