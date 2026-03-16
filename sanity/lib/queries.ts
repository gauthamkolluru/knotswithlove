export const productsQuery = `*[_type == "product"] | order(order asc) {
  _id,
  name,
  description,
  price,
  badge,
  image,
  color,
  inStock
}`

export const inspirationPostsQuery = `*[_type == "inspirationPost"] | order(publishedAt desc) {
  _id,
  caption,
  image,
  color
}`

export const aboutQuery = `*[_type == "about"][0] {
  heading,
  photo,
  story,
  values
}`

export const contactQuery = `*[_type == "contact"][0] {
  heading,
  intro,
  channels
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  greeting,
  authorName,
  subtitle,
  description,
  heroImage,
  instagramUrl,
  instagramHandle
}`
