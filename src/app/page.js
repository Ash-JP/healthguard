import FadeIn from '@/components/motion/FadeIn';
import HoverScale from '@/components/motion/HoverScale';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import inventory from '@/data/inventory.json';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { departments } = inventory;

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-secondary" style={{ backgroundColor: 'var(--secondary)', padding: '4rem 0' }}>
        <div className="container flex flex-col items-center justify-center text-center">
          <FadeIn>
            <h1 className="h1">Premium Medical Supplies for Top-Tier Facilities</h1>
            <p className="text-lead max-w-2xl mx-auto">
              Equip your healthcare institution with industry-leading CSSD, Endoscopy, and Radiology solutions. 
              Reliable, compliant, and ready for global delivery.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button href="/departments/cssd" variant="primary">View CSSD Catalog</Button>
              <Button href="/contact" variant="outline">Contact Us</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="section container">
        <FadeIn delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="h2">Why Choose Healthguard?</h2>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-3">
          <HoverScale>
            <Card className="h-full">
              <CardContent className="text-center">
                <h3 className="h3 mt-4">Quality Compliance</h3>
                <p className="text-muted">All our products meet rigorous ISO and CE standards for absolute patient safety.</p>
              </CardContent>
            </Card>
          </HoverScale>

          <HoverScale>
            <Card className="h-full">
              <CardContent className="text-center">
                <h3 className="h3 mt-4">Supply Reliability</h3>
                <p className="text-muted">Robust global supply chains ensuring you never run out of critical inventory.</p>
              </CardContent>
            </Card>
          </HoverScale>

          <HoverScale>
            <Card className="h-full">
              <CardContent className="text-center">
                <h3 className="h3 mt-4">Responsiveness</h3>
                <p className="text-muted">24/7 dedicated B2B support for procurement and technical assistance.</p>
              </CardContent>
            </Card>
          </HoverScale>
        </div>
      </section>

      {/* Dynamic Department Preview */}
      <section className="section container bg-muted rounded-xl" style={{ backgroundColor: 'var(--muted)', padding: '5rem 2rem', borderRadius: '1rem' }}>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="h2">Our Departments</h2>
            <p className="text-muted">Explore our comprehensive range of specialized medical equipment.</p>
          </div>
          <Button href="/departments" variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-2">
          {departments.map((dept, index) => (
            <FadeIn key={dept.id} delay={0.1 * index}>
              <div className="card overflow-hidden group">
                <div className="relative h-64 w-full bg-border">
                  <Image 
                    src={dept.image} 
                    alt={dept.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!dept.isActive && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="badge">Upcoming</span>
                    </div>
                  )}
                </div>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="h3 mb-0">{dept.name}</h3>
                    {dept.isActive && <span className="badge active">Active</span>}
                  </div>
                  <p className="text-muted mb-4">{dept.description}</p>
                  {dept.isActive ? (
                    <Link href={`/departments/${dept.slug}`} className="text-primary font-medium hover:underline">
                      Explore {dept.name} &rarr;
                    </Link>
                  ) : (
                    <span className="text-muted font-medium cursor-not-allowed">
                      In Development
                    </span>
                  )}
                </CardContent>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
