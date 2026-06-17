"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Ecosystem", path: "/departments" },
  { name: "Catalog", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-grad-nav shadow-xl text-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Animated Lifelike Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight flex items-center gap-3 text-white group">
          <motion.div 
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white text-[#713D87] w-10 h-10 rounded-xl font-black text-2xl shadow-lg flex items-center justify-center group-hover:shadow-white/20"
          >
            +
          </motion.div>
          <span className="relative overflow-hidden">
            <motion.span
              className="inline-block"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Healthguard
            </motion.span>
          </span>
        </Link>

        {/* Interactive Magnetic Links */}
        <nav className="hidden md:flex items-center gap-1 relative" onMouseLeave={() => setHoveredPath(null)}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const isHovered = hoveredPath === link.path;

            return (
              <Link 
                key={link.path} 
                href={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className="relative px-5 py-2.5 text-sm font-medium transition-colors rounded-full overflow-hidden"
              >
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'}`}>
                  {link.name}
                </span>

                {/* Floating pill background on hover */}
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/10 rounded-full z-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                
                {/* Active indicator dot */}
                {isActive && !isHovered && (
                  <motion.div
                    layoutId="nav-active-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Breathing CTA Button */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Subtle pulse behind button */}
          <div className="absolute inset-0 bg-white/30 rounded-lg blur-md group-hover:bg-white/50 transition-colors duration-500 animate-pulse"></div>
          
          <Button variant="default" className="relative bg-white text-[#713D87] hover:bg-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all" asChild>
            <Link href="/contact">Request Catalog</Link>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
