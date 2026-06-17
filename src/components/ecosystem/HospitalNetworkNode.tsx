"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Role } from "./InteractiveRoleSelector";
import Link from "next/link";
import { ShieldPlus, Activity, HeartPulse, Bed, FlaskConical, LucideIcon } from "lucide-react";

interface NodeProps {
  id: string;
  label: string;
  slug: string;
  x: number; // Percentage
  y: number; // Percentage
  icon: LucideIcon;
  relevantRoles: Role[];
  activeRole: Role | null;
}

const nodes: NodeProps[] = [
  { id: "cssd", label: "CSSD", slug: "cssd", x: 25, y: 40, icon: ShieldPlus, relevantRoles: ["CSSD Manager", "Administrator", "Nurse"], activeRole: null },
  { id: "ot", label: "Operation Theatre", slug: "operation-theatre", x: 50, y: 15, icon: Activity, relevantRoles: ["CSSD Manager", "Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
  { id: "icu", label: "ICU", slug: "icu", x: 75, y: 40, icon: HeartPulse, relevantRoles: ["Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
  { id: "nursing", label: "Nursing Wards", slug: "nursing", x: 35, y: 75, icon: Bed, relevantRoles: ["Nurse", "Procurement Officer", "CSSD Manager"], activeRole: null },
  { id: "lab", label: "Laboratory", slug: "laboratory", x: 65, y: 75, icon: FlaskConical, relevantRoles: ["Biomedical Engineer", "Procurement Officer", "Administrator"], activeRole: null },
];

export function HospitalNetworkNode({ activeRole }: { activeRole: Role }) {
  const populatedNodes = nodes.map(n => ({ ...n, activeRole }));

  // Defines the paths that should light up based on role
  const getActivePaths = () => {
    if (!activeRole) return [];
    if (activeRole === "CSSD Manager") return ["M 25% 40% L 50% 15%", "M 25% 40% L 35% 75%"];
    if (activeRole === "Nurse") return ["M 35% 75% L 50% 15%", "M 35% 75% L 75% 40%", "M 25% 40% L 35% 75%"];
    if (activeRole === "Biomedical Engineer") return ["M 65% 75% L 50% 15%", "M 65% 75% L 75% 40%"];
    if (activeRole === "Procurement Officer") return ["M 35% 75% L 65% 75%"];
    return ["M 25% 40% L 50% 15%", "M 50% 15% L 75% 40%", "M 75% 40% L 65% 75%", "M 65% 75% L 35% 75%", "M 35% 75% L 25% 40%"]; // Admin sees all
  };

  const activePaths = getActivePaths();

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl">
      {/* Premium Tech Grid Background */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `
          linear-gradient(to right, rgba(14, 165, 233, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(14, 165, 233, 0.08) 1px, transparent 1px)
        `, 
        backgroundSize: '60px 60px' 
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/80" />

      {/* Network Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Base faint lines connecting all nodes */}
        <path d="M 25% 40% L 50% 15% L 75% 40% L 65% 75% L 35% 75% Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/5" />
        <path d="M 25% 40% L 35% 75% M 50% 15% L 65% 75% M 35% 75% L 75% 40%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" className="text-primary/5" />

        {/* Animated Active Glowing Lines */}
        <AnimatePresence>
          {activeRole && activePaths.map((path, i) => (
            <motion.path
              key={activeRole + i}
              d={path}
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="4"
              className="drop-shadow-[0_0_12px_rgba(14,165,233,0.8)]"
              strokeDasharray="10 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
        
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(14, 165, 233)" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" />
            <stop offset="100%" stopColor="rgb(56, 189, 248)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Interactive App-Like Tiles (Nodes) */}
      {populatedNodes.map((node, index) => {
        const isHighlighted = node.activeRole === null || node.relevantRoles.includes(node.activeRole);
        
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: isHighlighted ? 1 : 0.85, opacity: isHighlighted ? 1 : 0.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href={`/departments/${node.slug}`}>
              <div className={`relative group cursor-pointer flex flex-col items-center justify-center w-36 h-36 rounded-3xl transition-all duration-500 backdrop-blur-2xl border ${
                  isHighlighted 
                    ? "bg-background/90 border-accent/50 shadow-[0_0_40px_rgba(14,165,233,0.3)] ring-1 ring-accent z-20 scale-105" 
                    : "bg-muted/50 border-border shadow-lg hover:bg-muted/80"
                }`}
              >
                {/* Status Ping */}
                {isHighlighted && node.activeRole !== null && (
                  <div className="absolute -top-2 -right-2 z-50">
                    <span className="flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-background"></span>
                    </span>
                  </div>
                )}
                
                {/* Department Icon */}
                <div className={`p-4 rounded-2xl mb-3 transition-colors duration-300 ${isHighlighted ? 'bg-accent/10 text-accent ring-1 ring-accent/20' : 'bg-secondary text-muted-foreground'}`}>
                  <node.icon size={28} strokeWidth={1.5} />
                </div>
                
                {/* Department Label inside the card */}
                <span className={`text-[11px] uppercase tracking-wider font-bold text-center px-2 ${isHighlighted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {node.label}
                </span>

              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
