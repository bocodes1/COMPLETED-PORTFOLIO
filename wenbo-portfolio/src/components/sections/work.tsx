"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { projects, type Project } from "@/lib/project-data";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { Prompt } from "@/components/ui/terminal";
import { useIntensity } from "@/lib/intensity-context";
import { X } from "lucide-react";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isOverdrive } = useIntensity();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), spring);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    },
    [x, y]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    videoRef.current?.pause();
  }, [x, y]);
  const onEnter = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <RevealItem>
      <motion.article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        style={{
          rotateX: isOverdrive ? rotateX : 0,
          rotateY: isOverdrive ? rotateY : 0,
          transformPerspective: 900,
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative border border-border bg-card overflow-hidden cursor-pointer hover:border-accent/50 transition-colors duration-500"
        aria-label={`Open ${project.shortTitle} case file`}
      >
        {/* window chrome bar */}
        <div className="flex items-center justify-between px-4 h-9 border-b border-border bg-background/60 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-fg-faint group-hover:bg-accent transition-colors" />
            <span className="text-fg-dim">
              ~/work/<span className="text-foreground">{project.number}_{project.id}</span>.proj
            </span>
          </span>
          <span className="text-fg-faint group-hover:text-accent transition-colors tabular">
            {project.hasVideo ? "● rec" : "[ • ]"}
          </span>
        </div>

        {/* media */}
        <div className="relative h-52 md:h-60 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
          {!project.hasVideo && (
            <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[7rem] text-foreground/[0.06] tracking-tighter">
              {project.number}
            </span>
          )}
          {project.hasVideo && project.videoFile && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              src={`${project.mediaPath}/${project.videoFile}`}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
          {/* scanline tint */}
          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
          {/* edge glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-accent/0 group-hover:bg-accent/70 group-hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-500" />
        </div>

        {/* content */}
        <div className="p-5 md:p-6">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent-2 mb-2 block">
            {project.category}
          </span>
          <h3 className="font-mono text-lg text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.shortTitle}
          </h3>
          <p className="text-sm text-fg-dim leading-relaxed mb-5 line-clamp-2">
            {project.overview}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="font-mono text-[10px] px-2 py-1 border border-border text-fg-dim bg-background"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="font-mono text-[10px] px-2 py-1 border border-border text-fg-faint">
                +{project.tools.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 font-mono text-sm text-fg-dim group-hover:text-accent transition-colors duration-300">
            <span className="text-accent">$</span>
            <span>cat case_study.md</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>
          </div>
        </div>
      </motion.article>
    </RevealItem>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl mx-4 my-16 md:my-24 border border-border-strong bg-card shadow-[0_0_60px_-12px_var(--accent-glow)]"
      >
        {/* window chrome */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-10 border-b border-border bg-background/90 backdrop-blur font-mono text-xs">
          <div className="flex items-center gap-2 text-fg-dim">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-2/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-fg-faint" />
            </span>
            <span className="ml-2 hidden sm:inline">
              ~/work/{project.number}_{project.id} — <span className="text-foreground">cat README.md</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-fg-dim hover:text-accent transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 md:px-9 py-8">
          {/* banner */}
          <div className={`h-24 -mx-6 md:-mx-9 -mt-8 mb-7 bg-gradient-to-br ${project.gradient} relative`}>
            <div className="absolute inset-0 scanlines opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>

          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-2 mb-2 block">
            {project.category}
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-3">
            {project.title}
          </h2>
          <p className="text-sm text-fg-dim leading-relaxed mb-8 pl-3 border-l border-border">
            {project.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {project.timeline && (
              <Field label="timeline" value={project.timeline} />
            )}
            <Field label="role" value={project.role} />
          </div>

          {/* tools */}
          <div className="mb-8">
            <FieldLabel>stack</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] px-2.5 py-1 border border-border text-fg-dim bg-background"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border-strong to-transparent mb-8" />

          {/* problem */}
          <div className="mb-8">
            <FieldLabel>// problem</FieldLabel>
            <p className="text-sm text-fg-dim leading-relaxed">{project.problem}</p>
          </div>

          {/* solution */}
          <div className="mb-8">
            <FieldLabel>// solution</FieldLabel>
            <ul className="space-y-2.5">
              {project.solution.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-fg-dim leading-relaxed">
                  <span className="text-accent font-mono mt-px shrink-0">{">"}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* outcomes */}
          <div>
            <FieldLabel>// outcomes</FieldLabel>
            <ul className="space-y-2.5">
              {project.outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-fg-dim leading-relaxed">
                  <span className="text-accent-2 font-mono mt-px shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-accent/80 mb-3">
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <p className="text-sm text-fg-dim">{value}</p>
    </div>
  );
}

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  const open = (p: Project) => {
    setSelected(p);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <RevealItem>
            <div className="mb-14 flex flex-col gap-4">
              <Prompt path="~/work" command="ls --case-studies" />
              <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
                  Featured Work
                </h2>
                <span className="hidden sm:block font-mono text-xs text-fg-faint tabular">
                  {String(projects.length).padStart(2, "0")} files
                </span>
              </div>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => open(project)} />
            ))}
          </div>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
