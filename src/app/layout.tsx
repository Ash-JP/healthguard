import './globals.css';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Inter, Poppins, Cormorant_Garamond } from 'next/font/google';

import type { Metadata } from 'next';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading-hero',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthguard-ecosystem.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Healthguard Ecosystem',
    default: 'Healthguard | Premium Medical Ecosystem',
  },
  description: 'Global B2B interactive ecosystem for premium medical supplies and surgical equipment.',
  openGraph: {
    title: 'Healthguard | Premium Medical Ecosystem',
    description: 'Global B2B interactive ecosystem for premium medical supplies and surgical equipment.',
    url: '/',
    siteName: 'Healthguard',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthguard Ecosystem',
    description: 'Premium medical supplies and surgical equipment.',
  },
  alternates: {
    canonical: '/',
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Healthguard Ecosystem",
  "url": baseUrl,
  "logo": `${baseUrl}/favicon.ico`,
  "description": "Global B2B interactive ecosystem for premium medical supplies and surgical equipment."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${cormorant.variable} min-h-screen flex flex-col bg-background selection:bg-accent/20 relative`}>
        {/* Background Blobs for Glassmorphism */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blob-1" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blob-2" />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-grad-footer mt-auto py-12 text-white snap-start">
          <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-white">Healthguard</h3>
              <p className="text-white/70 text-sm">Premium interactive medical supply ecosystems for top-tier healthcare facilities worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Catalog</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Ecosystem</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/departments/cssd" className="hover:text-white transition-colors">CSSD Pipeline</Link></li>
                <li><Link href="/departments/endoscopy" className="hover:text-white transition-colors">Endoscopy Suite</Link></li>
                <li><Link href="/departments/radiology" className="hover:text-white transition-colors">Radiology</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="container mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} Healthguard Ecosystem. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
