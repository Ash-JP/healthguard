import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Healthguard | Premium Medical Supplies',
  description: 'Global B2B distributor of premium medical supplies and surgical equipment.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="container flex items-center justify-between">
            <Link href="/" className="logo">
              Healthguard
            </Link>
            <nav className="nav-links flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/departments">Departments</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer section">
          <div className="container grid grid-cols-4 gap-8">
            <div>
              <h3 className="h3">Healthguard</h3>
              <p className="text-muted">Premium medical supplies for top-tier healthcare facilities worldwide.</p>
            </div>
            <div>
              <h4>Company</h4>
              <ul className="text-muted">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4>Departments</h4>
              <ul className="text-muted">
                <li><Link href="/departments/cssd">CSSD</Link></li>
                <li><Link href="/departments/endoscopy">Endoscopy</Link></li>
                <li><Link href="/departments/radiology">Radiology</Link></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul className="text-muted">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
