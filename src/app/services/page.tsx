import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, ShieldAlert, HeartPulse, HardDrive, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LiveTelemetry } from "@/components/ui/LiveTelemetry";

export const metadata = {
  title: "Professional Services | Healthguard Ecosystem",
  description: "Explore our enterprise B2B integration services, clinical consulting, and preventative maintenance for medical networks.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Clinical Workflow Integration",
      description: "Complete spatial and process integration for CSSD, endoscopy suites, and radiology departments. We align physical layout planning with high-efficiency clinical pathways.",
      icon: Settings,
      badge: "Turnkey Integration"
    },
    {
      title: "Biomedical Engineering & Consulting",
      description: "Comprehensive consulting for facility readiness, including electrical load calibration, radiation shielding validation, and specialized HVAC requirements for infection control.",
      icon: HeartPulse,
      badge: "Technical Planning"
    },
    {
      title: "SLA Technical Support & Maintenance",
      description: "Guaranteed uptime SLAs with 24/7 remote monitoring, rapid on-site troubleshooting, spare parts lifecycle management, and mandatory biennial calibrations.",
      icon: HardDrive,
      badge: "24/7 Operations"
    }
  ];

  return (
    <>
      {/* Services Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Live Telemetry Background */}
        <LiveTelemetry />

        <div className="container relative z-10 text-center max-w-3xl mx-auto px-4">
          <Badge className="bg-accent text-accent-foreground mb-4 uppercase tracking-widest px-3 py-1 font-semibold">
            Enterprise Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ecosystem Integration Services
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Ensuring high-availability, safety, and operational excellence across all hospital departments through specialized technical support.
          </p>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container py-16 lg:py-24 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="h-full flex flex-col justify-between border-2 hover:border-accent transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <IconComponent size={28} />
                  </div>
                  <Badge variant="secondary" className="mb-4 bg-primary/5 text-primary border-primary/10">
                    {service.badge}
                  </Badge>
                  <h3 className="font-bold text-2xl text-primary mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
                
                <div className="px-8 pb-8">
                  <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-accent font-semibold p-0 h-10 border-t border-border pt-4 rounded-none" asChild>
                    <Link href={`/contact?inquiry=${encodeURIComponent(`I am interested in learning more about your ${service.title} services.`)}`}>
                      Learn More <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SLA Callout */}
      <section className="bg-secondary/40 border-t border-b border-border py-16">
        <div className="container max-w-4xl mx-auto text-center px-4">
          <ShieldAlert className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">Uptime Guaranteed SLAs</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We provide structured, binding service agreements specifying strict response times, preventive inspection cycles, and parts availability to maintain continuous hospital operations.
          </p>
          <Button className="bg-primary text-white hover:bg-accent h-12 px-8 text-base font-semibold" asChild>
            <Link href="/contact">
              Consult an Integration Specialist
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
