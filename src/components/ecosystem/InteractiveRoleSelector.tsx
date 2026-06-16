"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Settings, Syringe, Activity, Building } from "lucide-react";

export type Role = "CSSD Manager" | "Procurement Officer" | "Nurse" | "Biomedical Engineer" | "Administrator" | null;

const roles = [
  { id: "CSSD Manager", icon: Settings, desc: "Sterilization & Infection Control" },
  { id: "Procurement Officer", icon: Building, desc: "Sourcing & Supply Chain" },
  { id: "Nurse", icon: Syringe, desc: "Patient Care & Ward Management" },
  { id: "Biomedical Engineer", icon: Activity, desc: "Equipment Maintenance" },
  { id: "Administrator", icon: Stethoscope, desc: "Hospital Operations" },
];

export function InteractiveRoleSelector({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleSelect = (roleId: Role) => {
    const newRole = selectedRole === roleId ? null : roleId;
    setSelectedRole(newRole);
    onSelectRole(newRole);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Choose Your Role</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Personalize your healthcare supply ecosystem experience based on your professional focus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto px-4">
        {roles.map((role, index) => {
          const isSelected = selectedRole === role.id;
          const isFaded = selectedRole !== null && !isSelected;

          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 border-2 ${
                  isSelected ? "border-accent bg-accent/5 scale-105 shadow-xl" : 
                  isFaded ? "opacity-50 hover:opacity-100 border-transparent" : "hover:border-primary/30 hover:shadow-md"
                }`}
                onClick={() => handleSelect(role.id as Role)}
              >
                <CardContent className="flex flex-col items-center text-center p-6 pt-8">
                  <div className={`p-4 rounded-full mb-4 ${isSelected ? 'bg-accent text-white' : 'bg-secondary text-primary'}`}>
                    <role.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{role.id}</h3>
                  <p className="text-sm text-muted-foreground">{role.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
