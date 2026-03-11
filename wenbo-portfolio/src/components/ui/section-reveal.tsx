"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function SectionReveal({ children, className = "", staggerDelay = 0.1 }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(staggerDelay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
