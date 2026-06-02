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
      name: 'priceUsdAmount',
      title: 'Price (USD)',
      type: 'number',
      description: 'US / international price (e.g. 8.00).',
    }),
    defineField({
      name: 'priceInrAmount',
      title: 'Price (INR)',
      type: 'number',
      description: 'India price in rupees (e.g. 499.00).',
    }),
    defineField({
      name: 'checkoutUrlUsd',
      title: 'Checkout link (USD)',
      type: 'url',
      description: 'PayPal or Gumroad link for USD checkout. Leave empty until ready.',
    }),
    defineField({
      name: 'checkoutUrlInr',
      title: 'Checkout link (INR)',
      type: 'url',
      description: 'PayPal or Gumroad link for INR checkout. Leave empty until ready.',
    }),
    defineField({
      name: 'priceAmount',
      title: 'Price amount (legacy)',
      type: 'number',
      description: 'Deprecated — use Price (USD) and Price (INR) instead.',
      hidden: ({ document }) =>
        typeof document?.priceUsdAmount === 'number' || typeof document?.priceInrAmount === 'number',
      validation: (Rule) =>
        Rule.custom((amount, context) => {
          const parent = context.parent as {
            price?: string
            priceUsdAmount?: number
            priceInrAmount?: number
          }
          if (typeof parent?.priceUsdAmount === 'number' || typeof parent?.priceInrAmount === 'number') {
            return true
          }
          if (typeof amount === 'number' && amount >= 0) return true
          if (parent?.price) return true
          return 'Enter USD and INR prices, or a legacy price amount'
        }),
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Currency (legacy)',
      type: 'string',
      options: {
        list: [
          { title: 'US Dollar (USD)', value: 'USD' },
          { title: 'Indian Rupee (INR)', value: 'INR' },
        ],
        layout: 'radio',
      },
      initialValue: 'USD',
      hidden: ({ document }) =>
        typeof document?.priceUsdAmount === 'number' || typeof document?.priceInrAmount === 'number',
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
      priceUsdAmount: 'priceUsdAmount',
      priceInrAmount: 'priceInrAmount',
      priceAmount: 'priceAmount',
      priceCurrency: 'priceCurrency',
      media: 'image',
    },
    prepare({ title, priceUsdAmount, priceInrAmount, priceAmount, priceCurrency, media }) {
      const usd =
        typeof priceUsdAmount === 'number'
          ? `$${priceUsdAmount.toFixed(2)}`
          : priceCurrency === 'USD' && typeof priceAmount === 'number'
            ? `$${priceAmount.toFixed(2)}`
            : null
      const inr =
        typeof priceInrAmount === 'number'
          ? `₹${priceInrAmount.toFixed(2)}`
          : priceCurrency === 'INR' && typeof priceAmount === 'number'
            ? `₹${priceAmount.toFixed(2)}`
            : null
      const subtitle = [usd, inr].filter(Boolean).join(' · ') || '—'
      return { title, subtitle, media }
    },
  },
})
