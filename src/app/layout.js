import Link from 'next/link';
import "./globals.css";

export const metadata = {
  title: "HealthGuard Pharmaceuticals",
  description: "High-quality pharmaceutical manufacturing and formulation development compliant with global regulatory guidelines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#0f5132' }}>
            HealthGuard Pharma
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>
              Home
            </Link>
            <Link href="/about" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>
              About
            </Link>
            <Link href="/services" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>
              Services
            </Link>
            <Link href="/products" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>
              Products
            </Link>
            <Link href="/contact" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>
              Contact
            </Link>
          </nav>
        </header>

        <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {children}
        </main>

        <footer style={{
          textAlign: 'center',
          padding: '1.5rem',
          borderTop: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} HealthGuard Pharmaceuticals. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
