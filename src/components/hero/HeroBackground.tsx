"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Deterministic pseudo-random values — no Math.random() to avoid hydration mismatch
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left:     ((i * 43 + 11) % 95) + 2,      // 2–97 %
  top:      ((i * 67 + 17) % 90) + 5,      // 5–95 %
  size:     ((i % 3) * 0.8 + 1.2),         // 1.2–3.6 px
  duration: 7 + (i % 5) * 1.4,             // 7–12.6 s
  delay:    (i * 0.55) % 6,                // 0–5.5 s
  opacity:  0.3 + (i % 4) * 0.08,          // 0.3–0.54
}));

// Soft radial pulse blobs placed at fixed positions
const BLOBS = [
  { left: "18%",  top: "22%", size: 180, delay: 0   },
  { left: "72%",  top: "60%", size: 220, delay: 2.5 },
  { left: "45%",  top: "78%", size: 150, delay: 1.2 },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Base blueprint grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.065 }}
      >
        <defs>
          <pattern id="hg-bg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hg-bg-grid)" />
      </svg>

      {/* Soft radial pulse blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left:      b.left,
            top:       b.top,
            width:     b.size,
            height:    b.size,
            background:"radial-gradient(circle, rgba(155,95,176,0.18) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 8,
            repeat:   Infinity,
            delay:    b.delay,
            ease:     "easeInOut",
          }}
        />
      ))}

      {/* Tiny floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left:       `${p.left}%`,
            top:        `${p.top}%`,
            width:      p.size,
            height:     p.size,
            background: "rgba(201, 168, 221, 0.55)",
          }}
          animate={{
            opacity: [0, p.opacity, 0],
            y:       [0, -22, 0],
            scale:   [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat:   Infinity,
            delay:    p.delay,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
