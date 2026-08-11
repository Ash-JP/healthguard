"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { STAT_CARDS } from "./HeroAnimations";

// Card positions around the globe container (CSS, absolute)
const POSITIONS: React.CSSProperties[] = [
  { top: "6%",  left: "1%"  },   // 0 — top-left
  { top: "6%",  right: "1%" },   // 1 — top-right
  { top: "38%", left: "0%"  },   // 2 — mid-left
  { top: "38%", right: "0%" },   // 3 — mid-right
  { bottom: "14%", left: "2%"  },// 4 — bot-left
  { bottom: "14%", right: "2%" },// 5 — bot-right
];

// Floating y-keyframes per card (alternating direction)
const FLOAT_KF = [
  [0, -8, 0, 8, 0],
  [0, 8, 0, -8, 0],
  [0, -6, 0, 6, 0],
  [0, 6, 0, -6, 0],
  [0, -7, 0, 7, 0],
  [0, 7, 0, -7, 0],
];

interface StatCardProps {
  label:    string;
  value:    string;
  position: React.CSSProperties;
  delay:    number;
  floatKf:  number[];
  mouseX:   ReturnType<typeof useMotionValue<number>>;
  mouseY:   ReturnType<typeof useMotionValue<number>>;
}

function StatCard({ label, value, position, delay, floatKf, mouseX, mouseY }: StatCardProps) {
  const isRight = "right" in position;

  // Subtle parallax on mouse move
  const px = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const py = useSpring(mouseY, { stiffness: 50, damping: 18 });

  return (
    <motion.div
      className="absolute z-20"
      style={{ ...position, x: px, y: py }}
      initial={{ opacity: 0, x: isRight ? 16 : -16 }}
      animate={{
        opacity: 1,
        x: isRight ? 0 : 0,
        y: floatKf,
      }}
      transition={{
        opacity: { delay, duration: 0.7, ease: "easeOut" },
        x:       { delay, duration: 0.7, ease: "easeOut" },
        y: {
          delay: delay + 0.8,
          duration: 5 + (delay % 2),
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div
        className="rounded-2xl px-4 py-3 text-white select-none"
        style={{
          background:    "rgba(33, 14, 40, 0.62)",
          backdropFilter:"blur(22px) saturate(1.5)",
          WebkitBackdropFilter: "blur(22px) saturate(1.5)",
          border:        "1px solid rgba(201, 168, 221, 0.18)",
          boxShadow:     "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
          minWidth:      120,
        }}
      >
        <div
          className="font-bold tracking-tight text-white leading-none"
          style={{ fontSize: 20 }}
        >
          {value}
        </div>
        <div
          className="font-medium uppercase tracking-widest text-white/40 mt-1"
          style={{ fontSize: 9 }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function FloatingStats({ visible }: { visible: boolean }) {
  // Shared mouse motion values for all cards (subtle parallax)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      // ±6 px max parallax offset
      mouseX.set(((e.clientX - cx) / rect.width)  *  6);
      mouseY.set(((e.clientY - cy) / rect.height) *  6);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: "none" }}
    >
      {STAT_CARDS.map((card, i) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          position={POSITIONS[i] ?? POSITIONS[0]}
          delay={card.delay}
          floatKf={FLOAT_KF[i] ?? FLOAT_KF[0]}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
}
