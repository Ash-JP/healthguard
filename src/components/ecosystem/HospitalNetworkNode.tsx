"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  { id: "cssd", label: "CSSD Processing", slug: "cssd", x: 20, y: 25, icon: ShieldPlus, relevantRoles: ["CSSD Manager", "Administrator", "Nurse", "Procurement Officer"], activeRole: null },
  { id: "lab", label: "Diagnostic Lab", slug: "laboratory", x: 20, y: 75, icon: FlaskConical, relevantRoles: ["Biomedical Engineer", "Procurement Officer", "Administrator"], activeRole: null },
  { id: "ot", label: "Operation Theatre", slug: "operation-theatre", x: 50, y: 25, icon: Activity, relevantRoles: ["CSSD Manager", "Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
  { id: "nursing", label: "Nursing Wards", slug: "nursing", x: 50, y: 75, icon: Bed, relevantRoles: ["Nurse", "Procurement Officer", "CSSD Manager", "Administrator"], activeRole: null },
  { id: "icu", label: "Intensive Care", slug: "icu", x: 80, y: 50, icon: HeartPulse, relevantRoles: ["Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
];

export function HospitalNetworkNode({ activeRole }: { activeRole: Role }) {
  const populatedNodes = nodes.map(n => ({ ...n, activeRole }));

  // Defines the paths that should light up based on role
  const getActivePaths = () => {
    if (!activeRole) return [];
    if (activeRole === "CSSD Manager") return [
      "M 20% 25% L 50% 25%", // CSSD -> OT
      "M 20% 25% L 50% 75%"  // CSSD -> Nursing
    ];
    if (activeRole === "Nurse") return [
      "M 50% 75% L 50% 25%", // Nursing -> OT
      "M 50% 75% L 80% 50%", // Nursing -> ICU
      "M 20% 25% L 50% 75%"  // CSSD -> Nursing
    ];
    if (activeRole === "Biomedical Engineer") return [
      "M 20% 75% L 50% 25%", // Lab -> OT
      "M 50% 25% L 80% 50%", // OT -> ICU
      "M 20% 75% L 80% 50%"  // Lab -> ICU (Direct)
    ];
    if (activeRole === "Procurement Officer") return [
      "M 20% 25% L 20% 75%", // CSSD <-> Lab
      "M 20% 75% L 50% 75%"  // Lab -> Nursing
    ];
    
    // Administrator sees the entire network pipeline
    return [
      "M 20% 25% L 50% 25%", // CSSD to OT
      "M 20% 75% L 50% 75%", // Lab to Nursing
      "M 50% 25% L 80% 50%", // OT to ICU
      "M 50% 75% L 80% 50%", // Nursing to ICU
      "M 20% 25% L 50% 75%", // CSSD to Nursing
      "M 20% 75% L 50% 25%", // Lab to OT
      "M 50% 25% L 50% 75%"  // OT to Nursing
    ]; 
  };

  const activePaths = getActivePaths();

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-3xl overflow-hidden glass-card">
      {/* Soft overlay matching glassmorphism properties slightly to enforce readability */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Network Data Beams (Base Lines) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d="M 20% 25% L 50% 25% M 20% 75% L 50% 75% M 50% 25% L 80% 50% M 50% 75% L 80% 50% M 20% 25% L 50% 75% M 20% 75% L 50% 25% M 50% 25% L 50% 75% M 20% 25% L 20% 75% M 20% 75% L 80% 50%" 
              fill="none" stroke="#C9A8DD" strokeWidth="2" strokeDasharray="6 6" className="opacity-40" />

        {/* Animated Fluid Lines - Mid Orchid */}
        <AnimatePresence>
          {activeRole && activePaths.map((path, i) => (
            <motion.path
              key={activeRole + i}
              d={path}
              fill="none"
              stroke="#9B5FB0" // Mid orchid
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(155,95,176,0.4)]"
              strokeDasharray="16 16" // Simulates fluid or pulse
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Interactive Clinical Nodes */}
      {populatedNodes.map((node, index) => {
        const isHighlighted = node.activeRole === null || node.relevantRoles.includes(node.activeRole);
        
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: isHighlighted ? 1 : 0.9, opacity: isHighlighted ? 1 : 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href={`/departments/${node.slug}`}>
              <div className={`relative group cursor-pointer flex flex-row items-center gap-4 w-56 h-20 px-4 rounded-2xl transition-all duration-500 bg-white border ${
                  isHighlighted 
                    ? "border-[#C9A8DD] shadow-lg shadow-[#9B5FB0]/10 ring-1 ring-[#9B5FB0] z-20 scale-105" 
                    : "border-white/50 shadow-sm hover:border-[#C9A8DD] hover:shadow-md hover:bg-[#F6F0FA]"
                }`}
              >
                {/* Status Ping */}
                {isHighlighted && node.activeRole !== null && (
                  <div className="absolute -top-1.5 -right-1.5 z-50">
                    <span className="flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9B5FB0] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#713D87] border-2 border-white"></span>
                    </span>
                  </div>
                )}
                
                {/* Clean Side Bar Indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full transition-colors ${isHighlighted ? 'bg-[#713D87]' : 'bg-[#C9A8DD]/40'}`} />

                {/* Department Icon */}
                <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isHighlighted ? 'bg-[#F6F0FA] text-[#713D87]' : 'bg-slate-50 text-[#C9A8DD] group-hover:bg-[#F6F0FA] group-hover:text-[#9B5FB0]'}`}>
                  <node.icon size={24} strokeWidth={2} />
                </div>
                
                {/* Department Label */}
                <span className={`text-[13px] font-semibold leading-tight pr-2 ${isHighlighted ? 'text-[#211428]' : 'text-[#6B5876] group-hover:text-[#4A2358]'}`}>
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
