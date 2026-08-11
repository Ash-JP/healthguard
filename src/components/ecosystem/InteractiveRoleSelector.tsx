"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Boxes, Syringe, Cpu, Building2, ArrowDown } from "lucide-react";
import Link from "next/link";

export type Role = "CSSD Manager" | "Decontamination Technician" | "Assembly & Packaging Tech" | "Sterilization Operator" | "Logistics Coordinator" | null;

const roles = [
  { 
    id: "CSSD Manager", icon: ShieldCheck, desc: "Overall Workflow Control", 
    flow: [
      { name: "Receiving & Decontam", link: "/ecosystem" },
      { name: "Packaging & Sealing", link: "/ecosystem" },
      { name: "Sterilization QA", link: "/ecosystem" },
      { name: "Logistics & Storage", link: "/ecosystem" }
    ]
  },
  { 
    id: "Decontamination Technician", icon: Syringe, desc: "Bioburden Removal",
    flow: [
      { name: "Receiving & Decontam", link: "/ecosystem" }
    ]
  },
  { 
    id: "Assembly & Packaging Tech", icon: Boxes, desc: "Instrument Protection",
    flow: [
      { name: "Packaging & Sealing", link: "/ecosystem" }
    ]
  },
  { 
    id: "Sterilization Operator", icon: Cpu, desc: "Lethality Verification",
    flow: [
      { name: "Sterilization QA", link: "/ecosystem" }
    ]
  },
  { 
    id: "Logistics Coordinator", icon: Building2, desc: "Inventory & Traceability",
    flow: [
      { name: "Logistics & Storage", link: "/ecosystem" },
      { name: "Solutions Catalog", link: "/products" }
    ]
  },
];

export function InteractiveRoleSelector({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleSelect = (roleId: Role) => {
    const newRole = selectedRole === roleId ? null : roleId;
    setSelectedRole(newRole);
    onSelectRole(newRole);
  };

  return (
    <>
      {/* Desktop View: Sleek Vertical Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 p-4 rounded-3xl glass-card w-full">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.05, x: 8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(role.id as Role)}
              className={`relative cursor-pointer flex flex-row items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? "bg-[#713D87] text-white shadow-2xl shadow-[#2D1638]/40 ring-2 ring-[#713D87]/50 scale-[1.02]" 
                  : "bg-white/80 hover:bg-[#F6F0FA] text-[#6B5876] shadow-sm hover:shadow-xl border border-[#C9A8DD]/40 hover:border-[#C9A8DD]"
              }`}
            >
              <role.icon size={28} className={`transition-colors flex-shrink-0 ${isSelected ? "text-white" : "text-[#C9A8DD]"}`} strokeWidth={1.5} />
              <div className="flex flex-col text-left">
                <span className={`text-sm font-bold leading-tight ${isSelected ? "text-white" : "text-[#211428]"}`}>{role.id}</span>
                <span className={`text-xs mt-0.5 ${isSelected ? "text-white/80" : "text-[#6B5876]"}`}>{role.desc}</span>
              </div>
              
              {/* Active Indicator Line */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    layoutId="dock-indicator" 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-[#9B5FB0] shadow-[0_0_8px_#9B5FB0]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile View: Vertical Expandable Accordion */}
      <div className="lg:hidden flex flex-col gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <div key={role.id} className="flex flex-col">
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(role.id as Role)}
                className={`flex items-center p-4 rounded-3xl cursor-pointer border-2 transition-all duration-300 ${
                  isSelected ? "bg-[#713D87] text-white border-[#713D87] shadow-xl shadow-[#2D1638]/20" : "bg-white/80 backdrop-blur-md border-white shadow-sm"
                }`}
              >
                <div className={`p-3 rounded-full mr-4 transition-colors ${isSelected ? "bg-white/20" : "bg-[#F6F0FA] text-[#C9A8DD]"}`}>
                  <role.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold">{role.id}</h3>
                  <p className={`text-xs mt-1 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>{role.desc}</p>
                </div>
              </motion.div>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 ml-8 mt-2 border-l-[3px] border-[#C9A8DD]/40 relative">
                      <h4 className="font-semibold text-[10px] text-[#713D87] mb-5 uppercase tracking-[0.2em] opacity-70">Workflow Timeline</h4>
                      <div className="flex flex-col gap-8">
                        {role.flow.map((step, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.15, type: "spring", stiffness: 200 }}
                            className="relative"
                          >
                            {/* Node Dot */}
                            <div className="absolute -left-[35px] top-1.5 w-[14px] h-[14px] rounded-full bg-[#9B5FB0] ring-4 ring-background shadow-sm" />
                            
                            {/* Clickable Node Content */}
                            <Link href={step.link}>
                              <div className="bg-white hover:bg-[#F6F0FA] transition-colors backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-[#C9A8DD]/40 inline-flex items-center gap-2 group cursor-pointer">
                                <span className="font-semibold text-sm text-[#211428] group-hover:text-[#713D87] transition-colors">{step.name}</span>
                                <span className="text-[#9B5FB0] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">→</span>
                              </div>
                            </Link>

                            {/* Arrow to next step */}
                            {idx < role.flow.length - 1 && (
                              <ArrowDown size={16} className="text-muted-foreground/40 absolute -bottom-6 left-4" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
