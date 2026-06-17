"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InteractiveRoleSelector, Role } from "@/components/ecosystem/InteractiveRoleSelector";
import { HospitalNetworkNode } from "@/components/ecosystem/HospitalNetworkNode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, HeadphonesIcon, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import inventory from "@/data/inventory.json";
import { LiveTelemetry } from "@/components/ui/LiveTelemetry";

export default function HomeContent() {
  const [activeRole, setActiveRole] = useState<Role>(null);
  const featuredProducts = inventory.products.slice(0, 4);

  return (
    <>
      <div className="home-snap-container hidden" aria-hidden="true"></div>
      {/* Hero Section with Blueprint Pattern */}
      <section className="snap-start scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center relative overflow-hidden bg-grad-hero text-white py-12">
        {/* Animated Blueprint SVG Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint)" />
          </svg>
        </div>
        
        {/* Live Telemetry Background */}
        <LiveTelemetry />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading-hero), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Complete Healthcare Supply Solutions For Every <span className="text-white underline decoration-[#C9A8DD]">Department</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Premium enterprise-grade medical equipment tailored to the exact workflows of modern hospital facilities.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button size="lg" className="bg-white text-[#713D87] hover:bg-white/90 font-semibold" asChild>
              <Link href="#ecosystem">Explore Ecosystem</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-[#C9A8DD] text-[#C9A8DD] hover:bg-[#C9A8DD]/10" asChild>
              <Link href="/departments">View Departments</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Radical Interactive Ecosystem */}
      <section id="ecosystem" className="snap-start scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 relative overflow-hidden bg-transparent">
        <motion.div 
          className="container relative z-10 text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#211428] mb-4">Ecosystem Supply <span className="text-[#713D87]">Flow</span></h2>
          <p className="text-[#6B5876] text-lg max-w-2xl mx-auto">
            Discover how critical medical supplies move through our hospital network based on your specific role.
          </p>
        </motion.div>

        {/* Desktop View: Side-by-Side Layout */}
        <motion.div 
          className="hidden lg:flex flex-row items-center gap-8 relative w-full max-w-[1400px] mx-auto px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Sidebar / Dock */}
          <div className="z-50 w-1/4 flex flex-col justify-center">
            <InteractiveRoleSelector onSelectRole={setActiveRole} />
          </div>

          {/* New Grid */}
          <div className="w-3/4 h-[600px] relative">
            <HospitalNetworkNode activeRole={activeRole!} />
          </div>
        </motion.div>

        {/* Mobile View: Vertical Accordion */}
        <motion.div 
          className="block lg:hidden container"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <InteractiveRoleSelector onSelectRole={setActiveRole} />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="snap-start scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-transparent py-12">
        <div className="container">
          <motion.div 
            className="flex justify-between items-end mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-[#211428] mb-2">Featured <span className="text-[#713D87]">Solutions</span></h2>
              <p className="text-[#6B5876]">Industry-leading equipment across all departments.</p>
            </div>
            <Button variant="outline" className="border-[#713D87] text-[#713D87] hover:bg-[#713D87]/5" asChild>
              <Link href="/departments">View All</Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full group overflow-hidden transition-all duration-300 hover:border-[#C9A8DD]">
                  <div className="relative h-48 bg-muted w-full overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
                    <div>
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2 block">
                        {inventory.departments.find(d => d.id === product.departmentId)?.name}
                      </span>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 justify-between group-hover:text-accent" asChild>
                      <Link href={`/products/${product.slug}`}>
                        View Details <span>→</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="snap-start scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center container py-12">
        <motion.h2 
          className="text-3xl font-bold text-center text-[#211428] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Enterprise <span className="text-[#713D87]">Standards</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Quality Assurance", desc: "ISO and CE certified medical solutions." },
            { icon: Truck, title: "Fast Delivery", desc: "Global logistics network ensuring timely supply." },
            { icon: HeadphonesIcon, title: "Technical Support", desc: "24/7 dedicated assistance for all equipment." },
            { icon: Award, title: "Industry Expertise", desc: "Over two decades of healthcare supply chain experience." }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mx-auto w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <feature.icon size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
