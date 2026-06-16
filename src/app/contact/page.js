import FadeIn from '@/components/motion/FadeIn';
import Card, { CardContent } from '@/components/ui/Card';
import ContactForm from '@/components/ui/ContactForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Contact Us | Healthguard',
  description: 'Get in touch with our B2B sales and procurement team for premium medical supply quotes.',
};

export default function Contact() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Healthguard',
    'image': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
    '@id': '',
    'url': 'https://healthguard.com',
    'telephone': '+1-800-555-0199',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Medical Plaza',
      'addressLocality': 'Healthcare City',
      'addressRegion': 'NY',
      'postalCode': '10001',
      'addressCountry': 'US'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section bg-secondary" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="h1">Contact Our Sales Team</h1>
            <p className="text-lead">
              Ready to upgrade your facility? Fill out the form below and our procurement specialists will get back to you within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section container max-w-6xl">
        <div className="grid grid-cols-2 gap-12">
          
          {/* Contact Form Section */}
          <FadeIn delay={0.2}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="h2 text-2xl mb-6">Send an Inquiry</h2>
                <Suspense fallback={<div className="spinner border-primary"></div>}>
                  <ContactForm />
                </Suspense>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Location & Info Section */}
          <FadeIn delay={0.4}>
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="h2 text-2xl mb-6">Global Headquarters</h2>
                <p className="text-muted mb-8 text-lg">
                  123 Medical Plaza<br/>
                  Healthcare City, NY 10001<br/>
                  United States
                </p>

                <div className="mb-8">
                  <h3 className="h3 text-xl mb-2">Direct Contact</h3>
                  <a href="tel:+18005550199" className="block text-primary text-lg mb-2 hover:underline">
                    +1 (800) 555-0199
                  </a>
                  <a href="mailto:procurement@healthguard.com" className="block text-primary text-lg hover:underline">
                    procurement@healthguard.com
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-muted rounded-xl border border-border flex items-center justify-center">
                <span className="text-muted font-medium flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Map Integration
                </span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
