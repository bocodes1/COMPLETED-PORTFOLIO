"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { skills } from "@/lib/project-data";
import Image from "next/image";
import { useMagnetic } from "@/hooks/use-magnetic";

export function About() {
  const magnetic = useMagnetic(0.2);

  return (
    <section id="about" className="relative py-32 md:py-40">
      {/* Subtle gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: About content */}
            <div>
              <RevealItem>
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400 mb-4">
                  About
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-8">
                  About
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-base text-white/45 leading-relaxed mb-6">
                  I&apos;m a business builder based in Toronto who bridges the gap between
                  strategy and execution. Rather than just advising, I get my hands
                  dirty — building the systems, creating the assets, and implementing
                  the infrastructure that makes businesses work.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="text-base text-white/45 leading-relaxed mb-10">
                  My focus is on business building, marketing strategy, creative
                  direction, and front-end execution. I believe in moving fast,
                  testing relentlessly, and building things that actually generate
                  results.
                </p>
              </RevealItem>
              <RevealItem>
                <a
                  href="#contact"
                  ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
                  onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                  onMouseLeave={magnetic.onMouseLeave}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-300 overflow-hidden relative"
                >
                  <span className="relative z-10">Let&apos;s Work Together</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300" />
                </a>
              </RevealItem>
            </div>

            {/* Right: Skills */}
            <div>
              <RevealItem>
                <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-white/30 mb-8">
                  Skills
                </h3>
              </RevealItem>

              <div className="space-y-8">
                {Object.entries(skills).map(([group, items]) => (
                  <RevealItem key={group}>
                    <div>
                      <h4 className="text-sm font-medium text-white/50 mb-4 tracking-wide">
                        {group}
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {items.map((skill) => (
                          <motion.span
                            key={skill.name}
                            whileHover={{ y: -2, scale: 1.03 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                          >
                            <Image
                              src={skill.icon}
                              alt=""
                              width={16}
                              height={16}
                              className="opacity-50"
                              aria-hidden="true"
                            />
                            <span className="text-xs font-medium text-white/50">
                              {skill.name}
                            </span>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
