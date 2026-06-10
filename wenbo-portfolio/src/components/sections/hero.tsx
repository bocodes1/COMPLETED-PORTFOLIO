"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useIntensity } from "@/lib/intensity-context";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useTypewriter } from "@/components/ui/terminal";
import { DigitalRain } from "@/components/ui/digital-rain";

const roles = [
  "business_builder",
  "creative_strategist",
  "growth_engineer",
  "frontend_developer",
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const lineV = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, delay: 0.1 + i * 0.14 },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { isOverdrive } = useIntensity();
  const { out: cmd, done } = useTypewriter("whoami", true, 65);

  const [roleIndex, setRoleIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const btn1 = useMagnetic(0.25);
  const btn2 = useMagnetic(0.25);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const par = isOverdrive ? 16 : 8;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Digital rain — faint texture only */}
      <div className="absolute inset-0 z-0 opacity-[0.35]">
        <DigitalRain />
      </div>
      {/* Overlays to keep text legible */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_45%,rgba(8,8,11,0.5),rgba(8,8,11,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-[1] bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-24"
      >
        {/* status line */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-8 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-fg-dim"
        >
          <span className="w-2 h-2 bg-accent-2 pulse-dot shadow-[0_0_12px_var(--accent-2-glow)]" />
          <span>conn established</span>
          <span className="text-fg-faint">//</span>
          <span>toronto, ca</span>
          <span className="text-fg-faint">//</span>
          <span className="text-accent-2">45.4°N</span>
        </motion.div>

        {/* prompt */}
        <div className="font-mono text-sm sm:text-base mb-5">
          <span className="text-accent-2">wenbo</span>
          <span className="text-fg-faint">@toronto</span>
          <span className="text-fg-dim">:~$ </span>
          <span className="text-foreground">{cmd}</span>
          {!done && <span className="caret" />}
        </div>

        {/* The big reveal */}
        <motion.div initial="hidden" animate={done ? "visible" : "hidden"}>
          {/* Giant name */}
          <motion.h1
            custom={0}
            variants={lineV}
            className="font-display font-bold leading-[0.82] tracking-tight mb-6 select-none"
            style={{
              transform: `translate(${mouse.x * par}px, ${mouse.y * par * 0.5}px)`,
              transition: "transform 0.18s ease-out",
            }}
          >
            <span
              className="glitch glow-accent block text-[clamp(3rem,13vw,11rem)] text-foreground"
              data-text="WENBO"
            >
              WENBO
            </span>
            <span
              className="glitch block text-[clamp(3rem,13vw,11rem)] text-foreground/90 -mt-[0.08em]"
              data-text="ZHAO"
            >
              ZHAO
            </span>
          </motion.h1>

          {/* role */}
          <motion.div
            custom={1}
            variants={lineV}
            className="font-mono text-base sm:text-lg mb-6 flex items-center gap-2 flex-wrap"
          >
            <span className="text-fg-faint">{">"}</span>
            <span className="text-fg-dim">role:</span>
            <span className="relative inline-block min-w-[16ch]">
              <motion.span
                key={roleIndex}
                initial={{ y: 16, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-accent glow-accent inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </span>
          </motion.div>

          {/* mission */}
          <motion.div custom={2} variants={lineV} className="font-mono text-sm sm:text-base mb-2">
            <span className="text-accent-2">wenbo</span>
            <span className="text-fg-faint">@toronto</span>
            <span className="text-fg-dim">:~$ </span>
            <span className="text-foreground">cat mission.txt</span>
          </motion.div>
          <motion.p
            custom={3}
            variants={lineV}
            className="text-fg-dim text-sm sm:text-base leading-relaxed max-w-xl mb-10 pl-4 border-l border-border"
          >
            I design and build businesses — combining marketing, creative
            strategy, and full-stack execution.
          </motion.p>

          {/* CTAs */}
          <motion.div custom={4} variants={lineV} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#work"
              ref={btn1.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={btn1.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={btn1.onMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-accent text-background rounded-sm hover:shadow-[0_0_32px_var(--accent-glow)] transition-shadow"
            >
              <span className="text-background/70">$</span>
              ./view_work
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>
            </a>
            <a
              href="#contact"
              ref={btn2.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={btn2.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={btn2.onMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border-strong text-fg-dim rounded-sm hover:border-accent hover:text-foreground transition-colors"
            >
              <span className="text-accent">$</span>
              ./contact
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">_</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-fg-faint">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
