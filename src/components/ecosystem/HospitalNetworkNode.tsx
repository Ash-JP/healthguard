"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Role } from "./InteractiveRoleSelector";
import Link from "next/link";

interface NodeProps {
  id: string;
  label: string;
  slug: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  relevantRoles: Role[];
  activeRole: Role | null;
}

const nodes: NodeProps[] = [
  { id: "cssd", label: "CSSD", slug: "cssd", x: 20, y: 30, relevantRoles: ["CSSD Manager", "Administrator"], activeRole: null },
  { id: "ot", label: "Operation Theatre", slug: "operation-theatre", x: 50, y: 20, relevantRoles: ["Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
  { id: "icu", label: "ICU", slug: "icu", x: 80, y: 30, relevantRoles: ["Nurse", "Biomedical Engineer", "Administrator"], activeRole: null },
  { id: "nursing", label: "Nursing Wards", slug: "nursing", x: 35, y: 70, relevantRoles: ["Nurse", "Procurement Officer"], activeRole: null },
  { id: "lab", label: "Laboratory", slug: "laboratory", x: 65, y: 70, relevantRoles: ["Biomedical Engineer", "Procurement Officer", "Administrator"], activeRole: null },
];

export function HospitalNetworkNode({ activeRole }: { activeRole: Role }) {
  // Update nodes with active role context
  const populatedNodes = nodes.map(n => ({ ...n, activeRole }));

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] bg-secondary/30 rounded-3xl overflow-hidden border border-border my-16">
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      
      {/* Network Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path 
          d="M 20% 30% L 50% 20% L 80% 30% L 65% 70% L 35% 70% Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-primary/20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Cross connections */}
        <motion.path 
          d="M 20% 30% L 35% 70% M 50% 20% L 65% 70%" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          className="text-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </svg>

      {/* Nodes */}
      {populatedNodes.map((node, index) => {
        const isHighlighted = node.activeRole === null || node.relevantRoles.includes(node.activeRole);
        
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
          >
            <Link href={`/departments/${node.slug}`}>
              <div 
                className={`relative group cursor-pointer p-4 rounded-full transition-all duration-500 ${
                  isHighlighted 
                    ? "bg-white shadow-xl border-2 border-primary scale-110" 
                    : "bg-white/50 border border-border opacity-50 scale-90"
                }`}
              >
                {/* Pulse ring for highlighted items */}
                {isHighlighted && node.activeRole !== null && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-accent/20" />
                )}
                
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center w-32 pointer-events-none">
                  <Badge variant={isHighlighted ? "default" : "secondary"} className={`font-semibold shadow-sm ${isHighlighted ? 'bg-primary' : ''}`}>
                    {node.label}
                  </Badge>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
