"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { education } from "@/lib/project-data";
import { GraduationCap, Building } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <RevealItem>
            <div className="text-center mb-20">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400 mb-4">
                Background
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                Education
              </h2>
              <p className="mt-4 text-base text-white/40 max-w-md mx-auto">
                Academic background and learning journey
              </p>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {education.map((edu, i) => (
              <RevealItem key={edu.school}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all duration-500 h-full"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-500">
                    {edu.isCurrent ? (
                      <GraduationCap size={22} strokeWidth={1.5} />
                    ) : (
                      <Building size={22} strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full mb-4 ${
                      edu.isCurrent
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "bg-white/5 text-white/40 border border-white/10"
                    }`}
                  >
                    {edu.status}
                  </span>

                  <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-white/40 mb-3">{edu.degree}</p>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
