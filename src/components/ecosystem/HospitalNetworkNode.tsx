"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Role } from "./InteractiveRoleSelector";
import Link from "next/link";
import { ShieldPlus, PackageCheck, Thermometer, Warehouse, LucideIcon } from "lucide-react";

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

// ViewBox is 1000 x 600. Node x/y are percentages mapped to these dimensions.
const nodes: NodeProps[] = [
  { id: "cssd-1", label: "Receiving & Decontam", slug: "ecosystem", x: 20, y: 30, icon: ShieldPlus, relevantRoles: ["CSSD Manager", "Decontamination Technician"], activeRole: null },
  { id: "cssd-2", label: "Inspection & Packaging", slug: "ecosystem", x: 40, y: 70, icon: PackageCheck, relevantRoles: ["CSSD Manager", "Assembly & Packaging Tech"], activeRole: null },
  { id: "cssd-3", label: "Sterilization QA", slug: "ecosystem", x: 60, y: 30, icon: Thermometer, relevantRoles: ["CSSD Manager", "Sterilization Operator"], activeRole: null },
  { id: "cssd-4", label: "Logistics & Storage", slug: "ecosystem", x: 80, y: 70, icon: Warehouse, relevantRoles: ["CSSD Manager", "Logistics Coordinator"], activeRole: null },
];

const toSvgCoord = (x: number, y: number) => ({ sx: x * 10, sy: y * 6 });
const makePath = (x1: number, y1: number, x2: number, y2: number) => {
  const { sx: sx1, sy: sy1 } = toSvgCoord(x1, y1);
  const { sx: sx2, sy: sy2 } = toSvgCoord(x2, y2);
  return `M ${sx1} ${sy1} L ${sx2} ${sy2}`;
};

export function HospitalNetworkNode({ activeRole }: { activeRole: Role }) {
  const populatedNodes = nodes.map(n => ({ ...n, activeRole }));

  const getActivePaths = () => {
    if (!activeRole) return [];
    
    // The main unidirectional flow of CSSD
    if (activeRole === "CSSD Manager") return [
      makePath(20, 30, 40, 70), // 1 -> 2
      makePath(40, 70, 60, 30), // 2 -> 3
      makePath(60, 30, 80, 70), // 3 -> 4
    ];
    if (activeRole === "Decontamination Technician") return [
      makePath(20, 30, 40, 70), // Handover to Packaging
    ];
    if (activeRole === "Assembly & Packaging Tech") return [
      makePath(40, 70, 60, 30), // Handover to Sterilization
    ];
    if (activeRole === "Sterilization Operator") return [
      makePath(60, 30, 80, 70), // Handover to Logistics
    ];
    
    return [];
  };

  const activePaths = getActivePaths();

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-3xl overflow-hidden glass-card">
      <div className="absolute inset-0 bg-white/20" />

      {/* Network Data Beams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        {/* Static base grid lines (The full CSSD flow) */}
        <path
          d={[
            makePath(20, 30, 40, 70),
            makePath(40, 70, 60, 30),
            makePath(60, 30, 80, 70),
          ].join(" ")}
          fill="none"
          stroke="#C9A8DD"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity={0.4}
        />

        {/* Animated Fluid Lines */}
        <AnimatePresence>
          {activeRole && activePaths.map((path, i) => (
            <motion.path
              key={activeRole + i}
              d={path}
              fill="none"
              stroke="#9B5FB0"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              strokeDasharray="40 40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Interactive Clinical Nodes */}
      {populatedNodes.map((node) => {
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
            <Link href={`/${node.slug}`}>
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
