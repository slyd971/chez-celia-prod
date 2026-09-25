import { brand, contactInfo, footer, navLinks } from "@/content/celia";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="fmark">{brand.name}</span>
          <p>{brand.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Navigation du pied de page">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-social">
          <a href={contactInfo.instagram.url} target="_blank" rel="noopener">
            {contactInfo.instagram.label}
            <span className="sr-only"> sur Instagram (nouvel onglet)</span>
          </a>
          <a href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>
          © {new Date().getFullYear()} {brand.name}
        </p>
        <p>
          <a href={footer.credit.href} target="_blank" rel="noopener">
            {footer.credit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}
