"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LiveTelemetry } from "@/components/ui/LiveTelemetry";
import { FloatingStats } from "./FloatingStats";
import { ShipmentTicker } from "./ShipmentTicker";
import { TrustMetrics } from "./TrustMetrics";
import { HeroBackground } from "./HeroBackground";
import { DELAYS } from "./HeroAnimations";

// Dynamic import keeps Three.js/R3F out of the SSR bundle
const Globe = dynamic(() => import("./Globe"), {
  ssr:     false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="rounded-full border border-[#713D87]/40"
        style={{ width: 180, height: 180 }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  ),
});

// ─── Animation phase state ────────────────────────────────────────────────────

interface AnimPhase {
  globe:    boolean;
  markers:  boolean;
  routes:   boolean;
  cards:    boolean;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const [phase, setPhase] = useState<AnimPhase>({
    globe:   false,
    markers: false,
    routes:  false,
    cards:   false,
  });

  // Respect prefers-reduced-motion
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (prefersReduced.current) {
      // Instantly show everything if user prefers reduced motion
      setPhase({ globe: true, markers: true, routes: true, cards: true });
      return;
    }

    const timers = [
      setTimeout(() => setPhase((p) => ({ ...p, globe:   true })), DELAYS.globe    * 1000),
      setTimeout(() => setPhase((p) => ({ ...p, markers: true })), DELAYS.markers  * 1000),
      setTimeout(() => setPhase((p) => ({ ...p, routes:  true })), DELAYS.routes   * 1000),
      setTimeout(() => setPhase((p) => ({ ...p, cards:   true })), DELAYS.cards    * 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="snap-start scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center relative overflow-hidden bg-grad-hero text-white"
      aria-label="Healthguard — Global Medical Supply Ecosystem"
    >
      {/* Enhanced animated background */}
      <HeroBackground />

      {/* Live telemetry ticker strip */}
      <LiveTelemetry />

      {/* ── Two-column layout ── */}
      <div className="container relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-16 items-center py-14 pt-18">

        {/* ─── LEFT COLUMN — Content ─────────────────────────────────────── */}
        <div className="flex flex-col justify-center lg:max-w-xl">

          {/* Overline badge */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(201,168,221,0.12)",
                border:     "1px solid rgba(201,168,221,0.25)",
                color:      "#C9A8DD",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#9B5FB0", boxShadow: "0 0 6px #9B5FB0" }}
              />
              Global Medical Ecosystem
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-heading-hero), serif" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: DELAYS.headline, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Complete Healthcare Supply Solutions For Every{" "}
            <span className="text-white underline decoration-[#C9A8DD] underline-offset-4">
              Department
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-lg xl:text-xl text-white/75 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: DELAYS.paragraph, duration: 0.8 }}
          >
            Premium enterprise-grade medical equipment tailored to the exact
            workflows of modern hospital facilities.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: DELAYS.buttons, duration: 0.7, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="bg-white text-[#713D87] hover:bg-white/92 font-semibold shadow-[0_0_28px_rgba(255,255,255,0.18)] hover:shadow-[0_0_36px_rgba(255,255,255,0.28)] transition-all"
              asChild
            >
              <Link href="#ecosystem">Explore Ecosystem</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-[#C9A8DD]/60 text-[#C9A8DD] hover:bg-[#C9A8DD]/10 hover:border-[#C9A8DD] transition-all"
              asChild
            >
              <Link href="/departments">View Departments</Link>
            </Button>
          </motion.div>

          {/* Trust metrics — ISO badge + count-up numbers */}
          <TrustMetrics />
        </div>

        {/* ─── RIGHT COLUMN — 3D Globe ───────────────────────────────────── */}
        <div
          className="relative hidden lg:block"
          style={{ height: "min(640px, 68vh)" }}
        >
          {/* Globe canvas */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={
              phase.globe
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Globe
              markersVisible={phase.markers}
              routesVisible={phase.routes}
            />
          </motion.div>

          {/* Glassmorphism stat cards floating around the globe */}
          <FloatingStats visible={phase.cards} />

          {/* Live shipment status ticker at bottom */}
          <ShipmentTicker visible={phase.routes} />
        </div>
      </div>
    </section>
  );
}
