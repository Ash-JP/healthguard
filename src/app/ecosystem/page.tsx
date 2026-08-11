import EcosystemWorkflow from "@/components/ecosystem/EcosystemWorkflow";

export const metadata = {
  title: "CSSD Ecosystem | Healthguard",
  description: "End-to-End CSSD Sterilization Workflow & Consumables",
};

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ecosystem-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecosystem-grid)" />
          </svg>
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block bg-accent text-accent-foreground mb-4 uppercase tracking-widest px-3 py-1 font-semibold rounded-full text-xs">
            Interactive Blueprint
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            End-to-End CSSD Sterilization Workflow
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Explore our comprehensive Central Sterile Supply Department (CSSD) solutions portal. Navigate through real-time clinical workflows and discover our exhaustive consumables catalog.
          </p>
        </div>
      </section>

      {/* Main Workflow Section */}
      <section className="py-12 md:py-20">
        <EcosystemWorkflow />
      </section>
    </div>
  );
}
