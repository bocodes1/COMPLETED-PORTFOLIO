"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Contact() {
  const magnetic = useMagnetic(0.15);

  return (
    <section id="contact" className="relative py-32 md:py-48">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <SectionReveal>
          <RevealItem>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400 mb-6">
              Connect
            </p>
          </RevealItem>

          <RevealItem>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-6">
              Let&apos;s Build Something
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="text-base md:text-lg text-white/40 max-w-md mx-auto mb-12 font-light">
              Have a project in mind? Let&apos;s talk about how we can work together.
            </p>
          </RevealItem>

          <RevealItem>
            <a
              href="mailto:wenbozhao.zhao@mail.utoronto.ca"
              ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
              onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={magnetic.onMouseLeave}
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black text-base font-medium tracking-wide hover:shadow-[0_0_60px_rgba(34,211,238,0.3)] transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Get in Touch
              </span>
              <motion.span
                className="relative z-10 group-hover:text-white transition-colors duration-300"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  );
}
