"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { useIntensity } from "@/lib/intensity-context";
import {
  Zap,
  BarChart3,
  Video,
  ShoppingCart,
  Code2,
  Shield,
} from "lucide-react";

const services = [
  {
    title: "Business Building",
    description:
      "From concept to launch — validating ideas, building MVPs, and creating systems that scale. I focus on what actually moves the needle.",
    icon: Zap,
    span: "col-span-1 md:col-span-2",
    accent: true,
  },
  {
    title: "Marketing Strategy",
    description:
      "Data-driven campaigns across Google Ads and Meta Ads, creative testing frameworks, and conversion optimization.",
    icon: BarChart3,
    span: "col-span-1",
  },
  {
    title: "Creative Direction",
    description:
      "UGC direction, hook testing, and rapid creative iteration that drives performance.",
    icon: Video,
    span: "col-span-1",
  },
  {
    title: "Ecommerce Growth",
    description:
      "Shopify builds, conversion-focused storefronts, and full tracking implementation.",
    icon: ShoppingCart,
    span: "col-span-1",
  },
  {
    title: "Front-End Execution",
    description:
      "Modern web development with React, Next.js, and clean, performant code.",
    icon: Code2,
    span: "col-span-1",
  },
  {
    title: "Full-Stack Capability",
    description:
      "Not just strategy — I execute. From design to deployment, analytics to automation.",
    icon: Shield,
    span: "col-span-1 md:col-span-2",
    accent: true,
  },
];

export function Services() {
  const { isOverdrive } = useIntensity();

  return (
    <section id="services" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          {/* Section header */}
          <RevealItem>
            <div className="text-center mb-20">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400 mb-4">
                Capabilities
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                What I Do
              </h2>
              <p className="mt-4 text-base text-white/40 max-w-md mx-auto">
                End-to-end capabilities for building and growing businesses
              </p>
            </div>
          </RevealItem>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.title} className={service.span}>
                  <motion.div
                    whileHover={{
                      y: isOverdrive ? -8 : -4,
                      scale: isOverdrive ? 1.02 : 1.01,
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`group relative h-full p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                      service.accent
                        ? "border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-transparent hover:border-cyan-500/40"
                        : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500 ${
                          service.accent
                            ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"
                            : "bg-white/5 text-white/50 group-hover:text-cyan-400 group-hover:bg-cyan-500/10"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </RevealItem>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
