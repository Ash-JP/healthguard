import ScrollReveal from '@/components/motion/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerGrid';
import Card, { CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'About Us | Healthguard Corporate Profile',
  description: 'Learn about Healthguard\'s mission, corporate values, and rigorous medical distribution compliance standards including ISO and CE certifications.',
};

export default function About() {
  return (
    <>
      {/* Corporate Profile Header */}
      <section className="section bg-secondary" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="h1">About Healthguard</h1>
            <p className="text-lead">
              Our mission is to elevate global healthcare standards by providing uncompromising quality in medical supplies and surgical equipment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="section container">
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="h2">Our Corporate Values</h2>
            <p className="text-muted">
              Built on a foundation of trust, integrity, and relentless pursuit of excellence, we partner with top-tier facilities worldwide.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 max-w-4xl mx-auto">
          <StaggerItem>
            <div className="p-6 border-l-4 border-primary bg-muted rounded-r-lg">
              <h3 className="h3">Integrity First</h3>
              <p className="text-muted">Transparency in every transaction and absolute adherence to global healthcare laws.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-6 border-l-4 border-primary bg-muted rounded-r-lg">
              <h3 className="h3">Patient-Centric Quality</h3>
              <p className="text-muted">Every product we distribute is evaluated on its final impact on patient outcomes and safety.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Compliance & Certification */}
      <section className="section container bg-muted rounded-xl" style={{ backgroundColor: 'var(--muted)', padding: '5rem 2rem', borderRadius: '1rem' }}>
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="h2">Compliance & Certifications</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We operate under strict quality control frameworks. Our entire supply chain and inventory are fully audited and certified.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-3">
          <StaggerItem>
            <Card className="text-center h-full">
              <CardContent>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground flex items-center justify-center rounded-full font-bold text-xl">
                  ISO
                </div>
                <h3 className="h3 text-lg">ISO 13485:2016</h3>
                <p className="text-muted text-sm">Certified Quality Management System for Medical Devices.</p>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="text-center h-full">
              <CardContent>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground flex items-center justify-center rounded-full font-bold text-xl">
                  CE
                </div>
                <h3 className="h3 text-lg">CE Mark Compliance</h3>
                <p className="text-muted text-sm">Full adherence to European Union health, safety, and environmental protection standards.</p>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="text-center h-full">
              <CardContent>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground flex items-center justify-center rounded-full font-bold text-xl">
                  FDA
                </div>
                <h3 className="h3 text-lg">FDA Registered</h3>
                <p className="text-muted text-sm">Facilities and distribution channels registered and compliant with US FDA regulations.</p>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </>
  );
}
