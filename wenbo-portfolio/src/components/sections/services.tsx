"use client";

import { motion } from "framer-motion";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { Prompt } from "@/components/ui/terminal";
import { useIntensity } from "@/lib/intensity-context";
import { Zap, BarChart3, Video, ShoppingCart, Code2, Terminal } from "lucide-react";

const services = [
  {
    title: "business_building",
    description:
      "From concept to launch — validating ideas, building MVPs, and creating systems that scale. I focus on what actually moves the needle.",
    icon: Zap,
    span: "md:col-span-2",
    accent: true,
  },
  {
    title: "marketing_strategy",
    description:
      "Data-driven campaigns across Google Ads and Meta Ads, creative testing frameworks, and conversion optimization.",
    icon: BarChart3,
    span: "",
  },
  {
    title: "creative_direction",
    description:
      "UGC direction, hook testing, and rapid creative iteration that drives performance.",
    icon: Video,
    span: "",
  },
  {
    title: "ecommerce_growth",
    description:
      "Shopify builds, conversion-focused storefronts, and full tracking implementation.",
    icon: ShoppingCart,
    span: "",
  },
  {
    title: "frontend_execution",
    description:
      "Modern web development with React, Next.js, and clean, performant code.",
    icon: Code2,
    span: "",
  },
  {
    title: "full_stack_capability",
    description:
      "Not just strategy — I execute. From design to deployment, analytics to automation.",
    icon: Terminal,
    span: "md:col-span-2",
    accent: true,
  },
];

export function Services() {
  const { isOverdrive } = useIntensity();

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          {/* header */}
          <RevealItem>
            <div className="mb-14 flex flex-col gap-4">
              <Prompt path="~/capabilities" command="ls -la" />
              <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
                  What I Do
                </h2>
                <span className="hidden sm:block font-mono text-xs text-fg-faint tabular">
                  {String(services.length).padStart(2, "0")} modules
                </span>
              </div>
            </div>
          </RevealItem>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/60 border border-border">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.title} className={service.span}>
                  <motion.div
                    whileHover={{ y: isOverdrive ? -6 : -3 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`group relative h-full p-6 md:p-8 bg-background overflow-hidden transition-colors duration-500 ${
                      service.accent
                        ? "hover:bg-[#0e0a0d]"
                        : "hover:bg-elev"
                    }`}
                  >
                    {/* corner index */}
                    <span className="absolute top-4 right-5 font-mono text-xs text-fg-faint tabular group-hover:text-accent transition-colors">
                      [{String(i).padStart(2, "0")}]
                    </span>

                    {/* top accent line on hover */}
                    <span className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-500 shadow-[0_0_12px_var(--accent-glow)]" />

                    <div
                      className={`w-10 h-10 rounded-sm border flex items-center justify-center mb-6 transition-colors duration-500 ${
                        service.accent
                          ? "border-accent/40 text-accent bg-accent/5"
                          : "border-border text-fg-dim group-hover:text-accent group-hover:border-accent/40"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-mono text-base md:text-lg text-foreground mb-2 tracking-tight">
                      <span className="text-accent">{">"}</span> {service.title}
                    </h3>
                    <p className="text-sm text-fg-dim leading-relaxed group-hover:text-fg-dim/90 transition-colors">
                      {service.description}
                    </p>
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
