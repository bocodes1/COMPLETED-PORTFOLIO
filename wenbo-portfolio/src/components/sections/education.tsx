"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { Prompt } from "@/components/ui/terminal";
import { education } from "@/lib/project-data";
import { GraduationCap, Building } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <RevealItem>
            <div className="mb-14 flex flex-col gap-4">
              <Prompt path="~/background" command="tail -f edu.log" />
              <div className="border-b border-border pb-5">
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
                  Education
                </h2>
              </div>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {education.map((edu) => (
              <RevealItem key={edu.school}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative h-full p-7 border border-border bg-card hover:border-accent/50 transition-colors duration-500"
                >
                  <span className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-500 shadow-[0_0_12px_var(--accent-glow)]" />

                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-sm border border-border bg-background flex items-center justify-center text-fg-dim group-hover:text-accent group-hover:border-accent/40 transition-colors duration-500">
                      {edu.isCurrent ? (
                        <GraduationCap size={20} strokeWidth={1.5} />
                      ) : (
                        <Building size={20} strokeWidth={1.5} />
                      )}
                    </div>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm border ${
                        edu.isCurrent
                          ? "border-accent/40 text-accent bg-accent/5"
                          : "border-border text-fg-dim bg-background"
                      }`}
                    >
                      {edu.isCurrent && <span className="inline-block w-1.5 h-1.5 bg-accent pulse-dot mr-1.5 align-middle" />}
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="font-mono text-lg text-foreground mb-1 tracking-tight">{edu.school}</h3>
                  <p className="font-mono text-sm text-accent-2/80 mb-3">{edu.degree}</p>
                  <p className="text-sm text-fg-dim leading-relaxed">{edu.description}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
