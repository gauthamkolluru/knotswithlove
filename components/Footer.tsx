export default function Footer({ brandName }: { brandName?: string }) {
  return (
    <footer>
      <span className="footer-brand brand-name">{brandName || 'Knots with Love'}</span>
      <p className="footer-copy">© {new Date().getFullYear()} Knots with Love. All rights reserved.</p>
    </footer>
  )
}
