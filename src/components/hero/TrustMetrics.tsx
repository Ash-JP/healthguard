"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DELAYS, TRUST_METRICS } from "./HeroAnimations";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, started: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800; // ms
    const start    = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target]);

  return count;
}

// ─── Single metric tile ───────────────────────────────────────────────────────

function MetricTile({
  label,
  value,
  suffix,
  started,
}: {
  label:   string;
  value:   number;
  suffix:  string;
  started: boolean;
}) {
  const count = useCountUp(value, started);

  return (
    <div className="text-center min-w-[56px]">
      <div className="text-2xl font-bold text-white tabular-nums leading-none">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function TrustMetrics() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger count-up when element enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: DELAYS.trust, duration: 0.7, ease: "easeOut" }}
      className="mt-8 flex flex-col gap-5"
    >
      {/* ISO badge */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(134,239,172,0.12)",
            border:     "1px solid rgba(134,239,172,0.3)",
            color:      "#86efac",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ISO 13485 Certified
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(147,197,253,0.12)",
            border:     "1px solid rgba(147,197,253,0.25)",
            color:      "#93c5fd",
          }}
        >
          CE Marked
        </span>
      </div>

      {/* Count-up metrics row */}
      <div className="flex items-center gap-6 flex-wrap">
        {TRUST_METRICS.map((m, i) => (
          <MetricTile
            key={m.label}
            label={m.label}
            value={m.value}
            suffix={m.suffix}
            started={started}
          />
        ))}
      </div>
    </motion.div>
  );
}
