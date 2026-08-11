import cssdProducts from '@/data/cssd-products.json';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ShieldCheck, Info } from 'lucide-react';

export async function generateStaticParams() {
  return cssdProducts.map((product) => ({
    slug: product.sku,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = cssdProducts.find(p => p.sku === resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.title} | Healthguard CSSD Ecosystem`,
    description: product.primary_application,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = cssdProducts.find(p => p.sku === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.primary_application,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Healthguard"
    }
  };

  return (
    <div className="container py-24 max-w-6xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="mb-8">
        <Link 
          href='/products' 
          className="text-sm font-semibold text-accent hover:underline mb-2 inline-block"
        >
          &larr; Back to Catalog
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Placeholder Product Image Area (since we lack images in data) */}
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-secondary border-2 border-border shadow-lg flex items-center justify-center p-8 text-center">
            <div>
              <ShieldCheck className="w-24 h-24 text-primary/30 mx-auto mb-6" />
              <p className="text-muted-foreground font-medium text-lg">{product.title}</p>
              <p className="text-sm text-muted-foreground/60">Image placeholder</p>
            </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col h-full justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10">
              {product.category}
            </Badge>
            {product.iso_class !== "N/A" && (
              <Badge variant="default" className="bg-accent text-white hover:bg-accent/90">
                {product.iso_class}
              </Badge>
            )}
            <Badge variant="outline" className="font-mono">
              SKU: {product.sku}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {product.title}
          </h1>
          
          <div className="prose prose-lg text-muted-foreground mb-10">
            <p>{product.primary_application}</p>
          </div>
          
          <div className="bg-card border rounded-2xl p-6 mb-10 shadow-sm">
            <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" /> Technical Specifications
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">CSSD Phase</span>
                <span className="font-medium">Phase {product.cssd_phase}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Sterilization Method</span>
                <span className="font-medium">{product.sterilization_method}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Packaging Specification</span>
                <span className="font-medium">{product.packaging_spec}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Compliance Standard</span>
                <span className="font-medium">{product.iso_class}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-lg h-14">
              Request Quotation
            </Button>
            <Button size="lg" variant="outline" className="flex-1 font-bold text-lg h-14">
              Download PDF Spec
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
