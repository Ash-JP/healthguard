import inventory from '@/data/inventory.json';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  return inventory.products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = inventory.products.find(p => p.slug === resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Healthguard Enterprise`,
    description: product.description,
    openGraph: {
      images: [product.image],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = inventory.products.find(p => p.slug === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const department = inventory.departments.find(d => d.id === product.departmentId);

  return (
    <div className="container py-24 max-w-6xl mx-auto">
      <div className="mb-8">
        <Link 
          href={department ? `/departments/${department.slug}` : '/departments'} 
          className="text-sm font-semibold text-accent hover:underline mb-2 inline-block"
        >
          &larr; Back to {department?.name || 'Departments'}
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Product Image */}
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-muted border-2 border-border shadow-lg">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col h-full justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            {department && (
              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10">
                {department.name}
              </Badge>
            )}
            {product.workflowStage && (
              <Badge variant="default" className="bg-accent text-white hover:bg-accent/90">
                Stage: {product.workflowStage}
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {product.name}
          </h1>
          
          <div className="prose prose-lg text-muted-foreground mb-10">
            <p>{product.description}</p>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/30 border border-border mb-10">
            <h3 className="font-semibold text-primary mb-2">Enterprise Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This equipment is part of the standardized {department?.name || 'hospital'} workflow. Speak with an integration specialist for custom layout planning and procurement details.
            </p>
            <Button size="lg" className="w-full md:w-auto text-lg px-8 h-14 bg-primary hover:bg-primary/90" asChild>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                Request Integration Quote
              </Link>
            </Button>
          </div>
          
          {/* Metadata for SEO / Verification */}
          <div className="mt-auto pt-8 border-t border-border text-xs text-muted-foreground flex justify-between">
            <span>SKU: {product.id.toUpperCase()}</span>
            <span>Category: Premium Medical Equipment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
