/**
 * Server-side layout for the /contact route.
 * The contact page itself is "use client" so it cannot export metadata directly.
 * Next.js allows metadata to be exported from a layout that wraps the page.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Partnerships | Healthguard',
  description: 'Connect with our ecosystem specialists to build a tailored medical supply solution for your hospital department. Request a quote today.',
  openGraph: {
    title: 'Enterprise Partnerships | Healthguard',
    description: 'Connect with our ecosystem specialists to build a tailored medical supply solution for your hospital department.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
