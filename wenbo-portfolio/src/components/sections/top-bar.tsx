"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/** §3.1 — name left, minimal nav right, location. No status text.
 *  Scrollspy: the section under the viewport center lights its nav link. */
export function TopBar() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="text-[13px] font-medium tracking-tight text-ink">
          Wen&nbsp;Bo&nbsp;Zhao
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "inline-block text-[12px] transition-all duration-200 hover:-translate-y-px hover:text-ink",
                active === item.id
                  ? "text-ink underline decoration-ink-dim underline-offset-[6px]"
                  : "text-ink-mid"
              )}
            >
              {item.label}
            </a>
          ))}
          <span className="meta-label hidden lg:inline" aria-label="Location">
            Toronto / Vancouver, Canada
          </span>
        </nav>
      </div>
    </header>
  );
}
