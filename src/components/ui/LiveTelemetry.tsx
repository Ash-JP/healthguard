"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LiveTelemetry() {
  const [cycles, setCycles] = useState(4102830);
  const [latency, setLatency] = useState(12);
  const [activeSessions, setActiveSessions] = useState(2304);
  const [surgicalSets, setSurgicalSets] = useState(14023);
  const [icuModules, setIcuModules] = useState(892);

  useEffect(() => {
    // Simulate live data ticking
    const interval = setInterval(() => {
      // Increment sterilization cycles
      setCycles(prev => prev + Math.floor(Math.random() * 3));
      
      // Fluctuate latency between 8ms and 15ms
      setLatency(Math.floor(Math.random() * 8) + 8);

      // Fluctuate active diagnostic sessions slightly
      setActiveSessions(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return prev + change;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 
        Scrolling ticker tape of data. 
        Using framer-motion to create an infinite horizontal scroll.
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden border-b border-white/10 bg-black/20 backdrop-blur-md py-1.5 z-20">
        {/* 
          Seamless ticker: content is duplicated, and we animate by -50% of the total width.
          This means we slide exactly one copy's width, then loop — works at any screen size.
        */}
        <div className="flex overflow-hidden relative">
          <motion.div 
            className="flex items-center text-[11px] uppercase tracking-wider font-mono text-white/70 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {/* Content duplicated twice for seamless looping */}
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-16 items-center px-8">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5FB0] animate-pulse" />
                  Global Sterilization Cycles: <span className="font-bold text-white">{cycles.toLocaleString("en-US")}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A8DD] animate-pulse" />
                  Surgical Sets Deployed: <span className="font-bold text-white">{surgicalSets.toLocaleString("en-US")}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5FB0] animate-pulse" />
                  Active ICU Modules: <span className="font-bold text-white">{icuModules.toLocaleString("en-US")}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A8DD] animate-pulse" />
                  Network Latency: <span className="font-bold text-white">{latency}ms</span>
                </span>
                <span className="flex items-center gap-2">
                  Active Diagnostic Sessions: <span className="font-bold text-white">{activeSessions.toLocaleString("en-US")}</span>
                </span>
                <span className="flex items-center gap-2">
                  Data Integrity: <span className="font-bold text-[#C9A8DD]">Verified</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating subtle data points in the background */}
      <motion.div 
        className="absolute top-[20%] left-[10%] text-[10px] font-mono text-[#C9A8DD]/40 hidden md:block"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        [NODE_ALPHA: CONNECTED]
      </motion.div>
      <motion.div 
        className="absolute top-[40%] right-[15%] text-[10px] font-mono text-white/20 hidden md:block"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        SYNCING_STATUS: REALTIME
      </motion.div>
    </div>
  );
}
