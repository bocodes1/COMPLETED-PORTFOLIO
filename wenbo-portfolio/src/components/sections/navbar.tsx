"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useCallback } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

const navItems = [
  { label: "services", href: "#services" },
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "edu", href: "#education" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const magnetic = useMagnetic(0.2);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 md:h-16 flex items-center justify-between">
        {/* prompt logo */}
        <a
          href="#home"
          onClick={(e) => go(e, "#home")}
          className="group font-mono text-sm tracking-tight"
        >
          <span className="text-accent-2">wenbo</span>
          <span className="text-fg-faint">@toronto</span>
          <span className="text-fg-dim">:~$</span>
          <span className="caret align-middle" />
        </a>

        {/* desktop nav */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-sm">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-fg-dim hover:text-foreground transition-colors"
              >
                <span className="text-fg-faint group-hover:text-accent transition-colors tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-fg-faint group-hover:text-accent transition-colors">/</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={magnetic.onMouseLeave}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent text-background rounded-sm hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow"
            >
              <span className="text-background/70">$</span>
              ./contact
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          aria-label="Toggle navigation"
        >
          <span className={`w-6 h-px bg-foreground transition-all duration-300 ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`w-6 h-px bg-foreground transition-all duration-300 ${open ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </div>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <ul className="px-6 py-6 flex flex-col gap-1 font-mono">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="flex items-center gap-3 py-3 text-base text-fg-dim hover:text-foreground transition-colors"
              >
                <span className="text-accent text-sm tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-fg-faint">/</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-accent text-background rounded-sm"
            >
              <span className="text-background/70">$</span>
              ./contact
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}
