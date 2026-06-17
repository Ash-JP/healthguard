"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LiveTelemetry() {
  const [cycles, setCycles] = useState(4102830);
  const [latency, setLatency] = useState(12);
  const [activeSessions, setActiveSessions] = useState(2304);

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-40">
      {/* 
        Scrolling ticker tape of data. 
        Using framer-motion to create an infinite horizontal scroll.
      */}
      <div className="absolute bottom-4 left-0 w-full flex whitespace-nowrap text-[10px] md:text-xs font-mono text-primary/40 uppercase tracking-widest">
        <motion.div
          className="flex gap-16 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {/* We duplicate the content twice to ensure seamless infinite scrolling */}
          {[1, 2].map((group) => (
            <div key={group} className="flex gap-16 items-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Global Sterilization Cycles: <span className="font-bold text-primary/60">{cycles.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-2">
                System Uptime: <span className="font-bold text-primary/60">99.998%</span>
              </span>
              <span className="flex items-center gap-2">
                Active Ecosystem Nodes: <span className="font-bold text-primary/60">142</span>
              </span>
              <span className="flex items-center gap-2">
                Network Latency: <span className="font-bold text-primary/60">{latency}ms</span>
              </span>
              <span className="flex items-center gap-2">
                Active Diagnostic Sessions: <span className="font-bold text-primary/60">{activeSessions.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-2">
                Data Integrity: <span className="font-bold text-primary/60">Verified</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating subtle data points in the background */}
      <motion.div 
        className="absolute top-[20%] left-[10%] text-[10px] font-mono text-emerald-600/30 hidden md:block"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        [NODE_ALPHA: CONNECTED]
      </motion.div>
      <motion.div 
        className="absolute top-[40%] right-[15%] text-[10px] font-mono text-primary/20 hidden md:block"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        SYNCING_STATUS: REALTIME
      </motion.div>
    </div>
  );
}
