"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { Prompt } from "@/components/ui/terminal";
import { skills } from "@/lib/project-data";
import Image from "next/image";
import { useMagnetic } from "@/hooks/use-magnetic";

const groupKeys = Object.keys(skills) as (keyof typeof skills)[];

export function About() {
  const magnetic = useMagnetic(0.25);

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <RevealItem>
            <div className="mb-14">
              <Prompt path="~/about" command="cat about.md" />
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* bio */}
            <div className="lg:col-span-7">
              <RevealItem>
                <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground mb-8">
                  Strategy <span className="text-accent glow-accent">×</span> Execution
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-base text-fg-dim leading-relaxed mb-6 pl-4 border-l border-border">
                  I&apos;m a business builder based in Toronto who bridges the gap
                  between strategy and execution. Rather than just advising, I get
                  my hands dirty — building the systems, creating the assets, and
                  implementing the infrastructure that makes businesses work.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="text-base text-fg-dim leading-relaxed mb-10 pl-4 border-l border-border">
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
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-accent text-background rounded-sm hover:shadow-[0_0_32px_var(--accent-glow)] transition-shadow"
                >
                  <span className="text-background/70">$</span>
                  ./lets_work
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>
                </a>
              </RevealItem>
            </div>

            {/* skills tree */}
            <div className="lg:col-span-5">
              <RevealItem>
                <div className="font-mono text-xs text-fg-faint mb-5 flex items-center gap-2">
                  <span className="text-accent-2">$</span> tree ~/skills
                </div>
              </RevealItem>

              <div className="space-y-6">
                {groupKeys.map((group, gi) => {
                  const items = skills[group];
                  const last = gi === groupKeys.length - 1;
                  return (
                    <RevealItem key={group}>
                      <div>
                        <h3 className="font-mono text-sm text-foreground mb-3 flex items-center gap-2">
                          <span className="text-fg-faint">{last ? "└─" : "├─"}</span>
                          <span className="text-accent-2">{group.toLowerCase().replace(/[\s&/]+/g, "_")}/</span>
                        </h3>
                        <div className="flex flex-wrap gap-2 pl-6">
                          {items.map((skill) => (
                            <motion.span
                              key={skill.name}
                              whileHover={{ y: -2 }}
                              className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background hover:border-accent/50 transition-colors duration-300 cursor-default"
                            >
                              <Image
                                src={skill.icon}
                                alt=""
                                width={14}
                                height={14}
                                className="opacity-60"
                                aria-hidden="true"
                              />
                              <span className="font-mono text-[11px] text-fg-dim">{skill.name}</span>
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
