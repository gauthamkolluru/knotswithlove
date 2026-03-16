import type { Metadata } from 'next'
import '@fontsource/mulish/300.css'
import '@fontsource/mulish/400.css'
import '@fontsource/mulish/500.css'
import '@fontsource/mulish/600.css'
import '@fontsource/mulish/700.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Knots with Love',
  description: 'Knots with Love – Handcrafted crochet by Harshita Sreepada.',
  openGraph: {
    title: 'Knots with Love',
    description: 'Knots with Love – Handcrafted crochet by Harshita Sreepada.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
