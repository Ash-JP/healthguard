"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ALL_STAGES = [
  "Receiving",
  "Cleaning",
  "Disinfection",
  "Packing",
  "Sterilization",
  "Storage"
];

export function WorkflowJourney({ department, products }: { department: any, products: any[] }) {
  // Group products by workflow stage
  const productsByStage = ALL_STAGES.reduce((acc, stage) => {
    acc[stage] = products.filter(p => p.workflowStage === stage);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="container py-16 max-w-5xl">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Department Workflow</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore equipment categorized by the standard operational lifecycle of the {department.name} department.
        </p>
      </div>

      <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
        {/* Central timeline line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

        {ALL_STAGES.map((stage, index) => {
          const stageProducts = productsByStage[stage] || [];
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              key={stage}
              className={`relative mb-24 md:w-1/2 ${isEven ? 'md:pr-16 md:ml-auto md:pl-16' : 'md:pl-16 md:mr-auto md:pr-16 md:text-right'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline Node */}
              <div className={`absolute top-0 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-sm -left-[41px] md:left-[0] ${isEven ? 'md:-left-3' : 'md:-right-3 md:left-auto'}`} />
              
              <div className="mb-6">
                <Badge variant="outline" className="mb-2 border-primary/30 text-primary">{`Stage 0${index + 1}`}</Badge>
                <h3 className="text-2xl font-bold">{stage}</h3>
              </div>

              {stageProducts.length > 0 ? (
                <div className="grid gap-6">
                  {stageProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden group hover:border-accent transition-colors text-left">
                      <div className="relative h-48 w-full bg-muted">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                        <Button variant="secondary" className="w-full group-hover:bg-accent group-hover:text-white" asChild>
                          <Link href={`/products/${product.slug}`}>
                            View Product Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-secondary/50 border border-border border-dashed text-center md:text-left">
                  <p className="text-muted-foreground text-sm italic">Standardized equipment for this stage is currently under review by our biomedical team.</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
