import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerGrid';
import HoverScale from '@/components/motion/HoverScale';
import Card, { CardContent } from '@/components/ui/Card';
import inventory from '@/data/inventory.json';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Departments Directory | Healthguard',
  description: 'Explore our complete directory of medical supply departments including CSSD, Endoscopy, Radiology, and upcoming specialties.',
};

export default function DepartmentsDirectory() {
  const { departments } = inventory;

  return (
    <>
      <section className="section bg-secondary" style={{ backgroundColor: 'var(--secondary)', padding: '5rem 0' }}>
        <div className="container text-center">
          <h1 className="h1">Medical Departments</h1>
          <p className="text-lead max-w-2xl mx-auto">
            Comprehensive equipment portfolios tailored for specialized healthcare units.
          </p>
        </div>
      </section>

      <section className="section container">
        <StaggerContainer className="grid grid-cols-2">
          {departments.map((dept) => {
            const cardContent = (
              <Card className="h-full overflow-hidden group border-2 hover:border-primary transition-colors">
                <div className="relative h-64 w-full bg-border">
                  <Image 
                    src={dept.image} 
                    alt={dept.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {!dept.isActive && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="badge bg-background text-foreground shadow-lg px-4 py-2 text-sm">Under Development</span>
                    </div>
                  )}
                </div>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="h2 text-2xl mb-0">{dept.name}</h2>
                    {dept.isActive && <span className="badge active">Active</span>}
                  </div>
                  <p className="text-muted">{dept.description}</p>
                </CardContent>
              </Card>
            );

            return (
              <StaggerItem key={dept.id}>
                {dept.isActive ? (
                  <HoverScale>
                    <Link href={`/departments/${dept.slug}`} className="block h-full">
                      {cardContent}
                    </Link>
                  </HoverScale>
                ) : (
                  <div className="h-full opacity-80 cursor-not-allowed">
                    {cardContent}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>
    </>
  );
}
