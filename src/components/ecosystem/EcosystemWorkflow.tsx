"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Stethoscope, ArrowRight, CheckCircle2 } from "lucide-react";
import cssdProducts from "@/data/cssd-products.json";

const PHASES = [
  {
    id: 1,
    title: "Receiving & Decontam",
    zone: "Red / Dirty",
    purpose: "Bioburden Removal & Equipment Cleaning",
    standards: "EN ISO 15883",
    criticalControl: "Visual inspection for cleanliness, protein residue limits.",
  },
  {
    id: 2,
    title: "Packaging & Sealing",
    zone: "Blue / Clean",
    purpose: "Instrument Protection, SBS Barrier Assembly & Sealing Quality",
    standards: "EN ISO 11607-1, ISO 11140-1",
    criticalControl: "Visual inspection for packaging integrity, and heat-sealer temperature calibration.",
  },
  {
    id: 3,
    title: "Sterilization QA",
    zone: "Sterilization Core",
    purpose: "Verification of Air Removal, Steam Penetration & Lethality",
    standards: "EN ISO 11140-1, EN ISO 11138",
    criticalControl: "Biological Indicator readout, Chemical Indicator color change.",
  },
  {
    id: 4,
    title: "Logistics & Storage",
    zone: "Green / Clean Storage",
    purpose: "Maintenance of Sterility, Inventory Tracking & Patient Auditing",
    standards: "EN ISO 13485",
    criticalControl: "Shelf-life monitoring, storage temperature/humidity.",
  },
];

export default function EcosystemWorkflow() {
  const [activePhase, setActivePhase] = useState(1);
  
  // Currently, we only have data for Phase 1. 
  // In a real scenario, this would filter by phase.
  const activeProducts = cssdProducts.filter((p) => p.cssd_phase === activePhase);
  
  const currentPhaseData = PHASES.find(p => p.id === activePhase)!;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
      
      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {PHASES.map((phase, index) => (
          <div key={phase.id} className="flex items-center">
            <button
              onClick={() => setActivePhase(phase.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activePhase === phase.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Station {phase.id}: {phase.title}
            </button>
            {index < PHASES.length - 1 && (
              <ArrowRight className="w-5 h-5 mx-2 text-muted-foreground hidden md:block opacity-50" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Clinical Workflow Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
             
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-4">
              Station Workflow Details
            </h2>
            
            <div className="space-y-6 relative z-10">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Zone Class</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={activePhase === 1 ? "destructive" : "default"} className="text-sm py-1">
                    {currentPhaseData.zone}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Primary Purpose</h4>
                <p className="text-base font-medium flex items-start gap-2">
                  <Stethoscope className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  {currentPhaseData.purpose}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Standards</h4>
                <p className="text-base font-medium">{currentPhaseData.standards}</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-xl border border-secondary">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Critical Control Point
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {currentPhaseData.criticalControl}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Consumable Cards Grid */}
        <div className="lg:col-span-8">
          <div className="mb-6 flex justify-between items-end border-b pb-4">
             <div>
                <h3 className="text-2xl font-bold text-foreground">Consumables & Solutions</h3>
                <p className="text-muted-foreground text-sm mt-1">Showing recommended products for {currentPhaseData.title}</p>
             </div>
             <Badge variant="outline" className="text-sm">
                {activeProducts.length} Items
             </Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeProducts.length > 0 ? (
                activeProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all group border-border hover:border-primary/50">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                           <Badge variant="secondary" className="font-mono text-xs text-muted-foreground">
                              {product.sku}
                           </Badge>
                           {product.iso_class !== "N/A" && (
                             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                               {product.iso_class}
                             </Badge>
                           )}
                        </div>
                        <h4 className="font-bold text-lg mb-1 leading-tight group-hover:text-primary transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 font-medium">
                          {product.category}
                        </p>
                        
                        <div className="space-y-2 mt-4 bg-secondary/30 rounded-lg p-3">
                           <div className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-foreground/80">{product.primary_application}</span>
                           </div>
                           <div className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-foreground/80">{product.packaging_spec}</span>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 py-20 text-center bg-secondary/20 rounded-2xl border-2 border-dashed border-border">
                  <p className="text-muted-foreground text-lg">
                    Consumables for Phase {activePhase} have not been loaded yet.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    (Currently showcasing Phase 1: Receiving & Decontam)
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
