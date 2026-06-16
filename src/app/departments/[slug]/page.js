import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerGrid';
import HoverScale from '@/components/motion/HoverScale';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import inventory from '@/data/inventory.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { departments } = inventory;
  return departments
    .filter((dept) => dept.isActive)
    .map((dept) => ({
      slug: dept.slug,
    }));
}

export function generateMetadata({ params }) {
  const department = inventory.departments.find(d => d.slug === params.slug);
  if (!department) return { title: 'Not Found' };
  
  return {
    title: `${department.name} Equipment | Healthguard`,
    description: department.description,
  };
}

export default function DepartmentTemplate({ params }) {
  const department = inventory.departments.find(d => d.slug === params.slug);
  
  if (!department) {
    notFound();
  }

  const departmentProducts = inventory.products.filter(p => p.departmentId === department.id);

  // Generate JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': departmentProducts.map((product, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': product.name,
        'description': product.description,
        'image': product.image,
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Department Header */}
      <section className="section bg-secondary" style={{ backgroundColor: 'var(--secondary)', padding: '6rem 0 4rem' }}>
        <div className="container text-center max-w-3xl mx-auto">
          <span className="badge active mb-4">Department Overview</span>
          <h1 className="h1">{department.name}</h1>
          <p className="text-lead">{department.description}</p>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="section container">
        <div className="mb-10 border-b border-border pb-4">
          <h2 className="h2 text-2xl">Available Catalog</h2>
          <p className="text-muted">Explore our curated selection of {department.name} equipment.</p>
        </div>

        {departmentProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-3">
            {departmentProducts.map((product) => (
              <StaggerItem key={product.id}>
                <HoverScale className="h-full">
                  <Card className="h-full flex flex-col group border-2 hover:border-primary transition-all">
                    <div className="relative h-56 w-full bg-muted border-b border-border">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-col flex-grow">
                      <h3 className="h3 text-xl mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-muted text-sm mb-6 flex-grow line-clamp-3">
                        {product.description}
                      </p>
                      <Button 
                        href={`/contact?product=${encodeURIComponent(product.name)}`} 
                        variant="primary" 
                        className="w-full mt-auto"
                      >
                        Request Quote
                      </Button>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-16 bg-muted rounded-xl">
            <h3 className="h3">No products available</h3>
            <p className="text-muted">We are currently updating our catalog for this department.</p>
          </div>
        )}
      </section>
    </>
  );
}
