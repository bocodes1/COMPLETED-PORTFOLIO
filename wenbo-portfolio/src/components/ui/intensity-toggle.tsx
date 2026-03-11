"use client";

import { useIntensity } from "@/lib/intensity-context";
import { motion } from "framer-motion";

export function IntensityToggle() {
  const { mode, toggle, isOverdrive } = useIntensity();

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-xs font-medium tracking-wider uppercase text-white/70 hover:text-white hover:border-white/25 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isOverdrive ? "standard" : "overdrive"} mode`}
    >
      <span
        className={`w-2 h-2 rounded-full transition-all duration-500 ${
          isOverdrive
            ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            : "bg-white/40"
        }`}
      />
      <span>{isOverdrive ? "Overdrive" : "Standard"}</span>
      <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors">
        ⚡
      </span>
    </motion.button>
  );
}
