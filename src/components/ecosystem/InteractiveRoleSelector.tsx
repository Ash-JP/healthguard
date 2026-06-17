"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Boxes, Syringe, Cpu, Building2, ArrowDown } from "lucide-react";
import Link from "next/link";

export type Role = "CSSD Manager" | "Procurement Officer" | "Nurse" | "Biomedical Engineer" | "Administrator" | null;

const roles = [
  { 
    id: "CSSD Manager", icon: ShieldCheck, desc: "Sterilization Control", 
    flow: [
      { name: "CSSD Department", link: "/departments/cssd" },
      { name: "Surgical Instruments", link: "/departments/surgery" },
      { name: "Endoscopy", link: "/departments/endoscopy" }
    ]
  },
  { 
    id: "Procurement Officer", icon: Boxes, desc: "Sourcing & Supply",
    flow: [
      { name: "Radiology", link: "/departments/radiology" },
      { name: "CSSD Department", link: "/departments/cssd" },
      { name: "All Departments", link: "/departments" }
    ]
  },
  { 
    id: "Nurse", icon: Syringe, desc: "Patient Care",
    flow: [
      { name: "Endoscopy", link: "/departments/endoscopy" },
      { name: "Surgical Instruments", link: "/departments/surgery" },
      { name: "All Departments", link: "/departments" }
    ]
  },
  { 
    id: "Biomedical Engineer", icon: Cpu, desc: "Maintenance",
    flow: [
      { name: "Radiology", link: "/departments/radiology" },
      { name: "Endoscopy", link: "/departments/endoscopy" },
      { name: "CSSD Department", link: "/departments/cssd" }
    ]
  },
  { 
    id: "Administrator", icon: Building2, desc: "Operations",
    flow: [
      { name: "Analytics Overview", link: "/departments" },
      { name: "Global Supply Chain", link: "/departments" }
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
      <div className="hidden lg:flex flex-col gap-4 p-4 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.1)] w-full">
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
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/40 ring-2 ring-primary/50 scale-[1.02]" 
                  : "bg-background/80 hover:bg-muted/80 text-foreground shadow-sm hover:shadow-xl border border-border"
              }`}
            >
              <role.icon size={28} className={`transition-colors flex-shrink-0 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={1.5} />
              <div className="flex flex-col text-left">
                <span className={`text-sm font-bold leading-tight ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>{role.id}</span>
                <span className={`text-xs mt-0.5 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{role.desc}</span>
              </div>
              
              {/* Active Indicator Line */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    layoutId="dock-indicator" 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-accent shadow-[0_0_8px_rgba(var(--accent),1)]"
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
                  isSelected ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-white/80 backdrop-blur-md border-white shadow-sm"
                }`}
              >
                <div className={`p-3 rounded-full mr-4 transition-colors ${isSelected ? "bg-white/20" : "bg-secondary text-accent"}`}>
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
                    <div className="p-6 ml-8 mt-2 border-l-[3px] border-accent/40 relative">
                      <h4 className="font-semibold text-[10px] text-primary mb-5 uppercase tracking-[0.2em] opacity-70">Workflow Timeline</h4>
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
                            <div className="absolute -left-[35px] top-1.5 w-[14px] h-[14px] rounded-full bg-accent ring-4 ring-background shadow-sm" />
                            
                            {/* Clickable Node Content */}
                            <Link href={step.link}>
                              <div className="bg-card hover:bg-accent/10 transition-colors backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-border inline-flex items-center gap-2 group cursor-pointer">
                                <span className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{step.name}</span>
                                <span className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">→</span>
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
