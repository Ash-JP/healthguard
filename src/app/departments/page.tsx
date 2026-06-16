import inventory from '@/data/inventory.json';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
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
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10" />
        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Ecosystem</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Comprehensive equipment portfolios tailored for specialized healthcare units.
          </p>
        </div>
      </section>

      <section className="container py-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const cardContent = (
              <Card className={`h-full overflow-hidden group border-2 transition-all duration-300 ${dept.isActive ? 'hover:border-accent hover:shadow-lg' : 'opacity-70 grayscale'}`}>
                <div className="relative h-64 w-full bg-muted">
                  <Image 
                    src={dept.image} 
                    alt={dept.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${dept.isActive ? 'group-hover:scale-105' : ''}`}
                  />
                  {!dept.isActive && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Badge variant="secondary" className="px-4 py-2 text-sm bg-white text-black">Under Development</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{dept.name}</h2>
                    {dept.isActive && <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">Active</Badge>}
                  </div>
                  <p className="text-muted-foreground">{dept.description}</p>
                </CardContent>
              </Card>
            );

            return (
              <div key={dept.id} className="h-full">
                {dept.isActive ? (
                  <Link href={`/departments/${dept.slug}`} className="block h-full">
                    {cardContent}
                  </Link>
                ) : (
                  <div className="h-full cursor-not-allowed">
                    {cardContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
