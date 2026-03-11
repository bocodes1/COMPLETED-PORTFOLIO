"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { heroTitle, heroSubtitle, duration, easing } from "@/lib/motion";
import { useIntensity } from "@/lib/intensity-context";
import { useMagnetic } from "@/hooks/use-magnetic";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const roles = [
  "Business Builder",
  "Creative Strategist",
  "Growth Engineer",
  "Front-End Developer",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const [roleIndex, setRoleIndex] = useState(0);
  const { isOverdrive } = useIntensity();
  const btnMagnetic = useMagnetic(0.2);
  const btnMagnetic2 = useMagnetic(0.2);

  // Mouse parallax for the name
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const parallaxStrength = isOverdrive ? 20 : 10;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[1]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.normal, ease: easing.snappy, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-white/60">
            Toronto, Canada
          </span>
        </motion.div>

        {/* Main headline with mouse parallax */}
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-6"
          style={{
            transform: `translate(${mousePos.x * parallaxStrength}px, ${mousePos.y * parallaxStrength * 0.5}px)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            Building Businesses
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            That Actually Work
          </span>
        </motion.h1>

        {/* Role text transition */}
        <motion.div
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="h-8 mb-6 overflow-hidden"
        >
          <motion.p
            key={roleIndex}
            initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: duration.normal, ease: easing.snappy }}
            className="text-lg md:text-xl font-light tracking-wide text-white/50"
          >
            {roles[roleIndex]}
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.snappy, delay: 0.5 }}
          className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          I design and build businesses — combining marketing, creative strategy,
          and full-stack execution.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.snappy, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            ref={btnMagnetic.ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={btnMagnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            onMouseLeave={btnMagnetic.onMouseLeave}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-8 py-3.5 rounded-full bg-white text-black text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300" />
          </a>

          <a
            href="#contact"
            ref={btnMagnetic2.ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={btnMagnetic2.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            onMouseLeave={btnMagnetic2.onMouseLeave}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full border border-white/15 text-white/70 text-sm font-medium tracking-wide hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
