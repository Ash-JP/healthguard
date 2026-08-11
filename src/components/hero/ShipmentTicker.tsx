"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SHIPMENTS } from "./HeroAnimations";

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  "Delivered":   { bg: "rgba(134,239,172,0.15)", text: "#86efac" },
  "In Transit":  { bg: "rgba(253,230,138,0.15)", text: "#fde68a" },
  "Dispatching": { bg: "rgba(147,197,253,0.15)", text: "#93c5fd" },
};

interface ShipmentTickerProps {
  visible: boolean;
}

export function ShipmentTicker({ visible }: ShipmentTickerProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SHIPMENTS.length), 4200);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  const s      = SHIPMENTS[idx];
  const style  = STATUS_STYLE[s.status] ?? STATUS_STYLE["Delivered"];

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none select-none z-30"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{   opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            10,
            background:     "rgba(33, 14, 40, 0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:         "1px solid rgba(201, 168, 221, 0.22)",
            borderRadius:   12,
            padding:        "9px 16px",
            color:          "white",
            fontFamily:     "var(--font-body), Inter, sans-serif",
            fontSize:       11,
            whiteSpace:     "nowrap",
            boxShadow:      "0 8px 28px rgba(0,0,0,0.38)",
          }}
        >
          {/* Live indicator */}
          <span
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: "#9B5FB0",
              flexShrink: 0,
              boxShadow: "0 0 6px #9B5FB0",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />

          {/* Shipment ID */}
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>
            Shipment {s.id}
          </span>

          {/* Product */}
          <span style={{ fontWeight: 600 }}>{s.product}</span>

          {/* Route */}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            {s.from} → {s.to}
          </span>

          {/* Status badge */}
          <span
            style={{
              background:   style.bg,
              color:        style.text,
              padding:      "3px 9px",
              borderRadius: 6,
              fontWeight:   600,
              fontSize:     10,
              letterSpacing: "0.03em",
            }}
          >
            {s.status}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
