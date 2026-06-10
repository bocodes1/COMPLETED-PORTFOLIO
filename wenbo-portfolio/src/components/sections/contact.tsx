"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

const EMAIL = "wenbozhao.zhao@mail.utoronto.ca";

export function Contact() {
  const magnetic = useMagnetic(0.2);

  return (
    <section id="contact" className="relative py-32 md:py-44">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

      {/* ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_60%)] opacity-[0.18] blur-[110px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionReveal>
          {/* terminal window */}
          <div className="border border-border-strong bg-card/70 backdrop-blur-sm">
            {/* chrome */}
            <RevealItem>
              <div className="flex items-center gap-2 px-4 h-10 border-b border-border font-mono text-xs text-fg-dim">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-2/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-fg-faint" />
                </span>
                <span className="ml-2">wenbo@toronto: ~/contact</span>
              </div>
            </RevealItem>

            <div className="px-6 md:px-12 py-12 md:py-16">
              <RevealItem>
                <div className="font-mono text-sm text-fg-dim mb-6">
                  <span className="text-accent-2">$</span> ./contact.sh --init
                </div>
              </RevealItem>

              <RevealItem>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6 leading-[0.95]">
                  Let&apos;s build
                  <br />
                  something <span className="text-accent glow-accent">real</span>
                  <span className="caret align-middle" />
                </h2>
              </RevealItem>

              <RevealItem>
                <p className="text-base text-fg-dim max-w-md mb-10 leading-relaxed">
                  Have a project in mind? Let&apos;s talk about how we can work together.
                </p>
              </RevealItem>

              <RevealItem>
                <a
                  href={`mailto:${EMAIL}`}
                  ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
                  onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                  onMouseLeave={magnetic.onMouseLeave}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-background text-base font-medium rounded-sm hover:shadow-[0_0_50px_var(--accent-glow)] transition-shadow duration-500"
                >
                  <span className="text-background/70">$</span>
                  mail --to wenbo
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </a>
              </RevealItem>

              <RevealItem>
                <p className="font-mono text-xs text-fg-faint mt-6">
                  <span className="text-accent-2">{">"}</span> {EMAIL}
                </p>
              </RevealItem>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
