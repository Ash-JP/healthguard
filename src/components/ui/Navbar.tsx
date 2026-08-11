"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "CSSD Ecosystem", path: "/ecosystem" },
  { name: "Catalog", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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

          {/* Interactive Magnetic Links — Desktop only */}
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

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Breathing CTA Button — Desktop only */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group hidden md:block"
            >
              {/* Subtle pulse behind button */}
              <div className="absolute inset-0 bg-white/30 rounded-lg blur-md group-hover:bg-white/50 transition-colors duration-500 animate-pulse"></div>
              
              <Button variant="default" className="relative bg-white text-[#713D87] hover:bg-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all" asChild>
                <Link href="/contact">Request Catalog</Link>
              </Button>
            </motion.div>

            {/* Mobile Hamburger Button */}
            <motion.button
              className="md:hidden relative z-50 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-Down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-[80px] left-0 right-0 z-40 md:hidden bg-grad-nav border-b border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              <nav className="container py-4 flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-white/15 text-white font-bold"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A8DD]" />
                        )}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-white text-[#713D87] hover:bg-white/90 font-bold"
                    asChild
                  >
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Request Catalog
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
