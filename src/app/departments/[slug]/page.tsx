import inventory from '@/data/inventory.json';
import { notFound } from 'next/navigation';
import { WorkflowJourney } from './WorkflowJourney';

export async function generateStaticParams() {
  const { departments } = inventory;
  return departments
    .filter((dept) => dept.isActive)
    .map((dept) => ({
      slug: dept.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const department = inventory.departments.find(d => d.slug === resolvedParams.slug);
  if (!department) return { title: 'Not Found' };
  
  return {
    title: `${department.name} Ecosystem | Healthguard`,
    description: department.description,
    alternates: {
      canonical: `/departments/${department.slug}`,
    }
  };
}

export default async function DepartmentTemplate({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const department = inventory.departments.find(d => d.slug === resolvedParams.slug);
  
  if (!department) {
    notFound();
  }

  const departmentProducts = inventory.products.filter(p => p.departmentId === department.id);

  return (
    <>
      {/* Department Hero */}
      <section className="relative bg-primary text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-5" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-wider">
            Department Overview
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{department.name}</h1>
          <p className="text-lg text-primary-foreground/80">{department.description}</p>
        </div>
      </section>

      {/* Interactive Workflow Journey */}
      <WorkflowJourney department={department} products={departmentProducts} />
    </>
  );
}
