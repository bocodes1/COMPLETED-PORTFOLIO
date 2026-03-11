"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useCallback } from "react";
import { navReveal } from "@/lib/motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What I Do", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const magnetic = useMagnetic(0.15);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <motion.nav
      variants={navReveal}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-lg font-semibold tracking-tight text-white hover:text-cyan-400 transition-colors duration-300"
        >
          Wenbo Zhao
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={magnetic.onMouseLeave}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          aria-label="Toggle navigation"
        >
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <ul className="px-6 py-8 flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block py-3 text-lg text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-block px-6 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-cyan-400 transition-all"
            >
              Get in Touch
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}
