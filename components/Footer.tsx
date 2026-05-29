import { DEFAULT_BRAND_NAME } from '@/lib/constants'

export default function Footer({ brandName }: { brandName?: string }) {
  return (
    <footer>
      <span className="footer-brand brand-name">{brandName || DEFAULT_BRAND_NAME}</span>
      <p className="footer-copy">© {new Date().getFullYear()} Knots with Love. All rights reserved.</p>
    </footer>
  )
}
