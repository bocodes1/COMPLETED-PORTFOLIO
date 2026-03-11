"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { projects, type Project } from "@/lib/project-data";
import { SectionReveal, RevealItem } from "@/components/ui/section-reveal";
import { useIntensity } from "@/lib/intensity-context";
import { X, ArrowRight } from "lucide-react";

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isOverdrive } = useIntensity();

  // Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  // Light sweep position
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const xPos = (e.clientX - rect.left) / rect.width - 0.5;
      const yPos = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(xPos);
      y.set(yPos);
      lightX.set((e.clientX - rect.left) / rect.width * 100);
      lightY.set((e.clientY - rect.top) / rect.height * 100);
    },
    [x, y, lightX, lightY]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    lightX.set(50);
    lightY.set(50);
    // Pause video on card leave
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [x, y, lightX, lightY]);

  const handleMouseEnter = useCallback(() => {
    // Play video on card hover
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <RevealItem>
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
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
          transformPerspective: 800,
        }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden cursor-pointer hover:border-white/15 transition-colors duration-500"
        aria-label={`View ${project.shortTitle} case study`}
      >
        {/* Card image / video thumbnail area */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          {/* Gradient fallback — only visible for cards without video */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
          />

          {/* Project number — shown only when no video */}
          {!project.hasVideo && (
            <span className="absolute top-5 left-6 text-6xl font-bold text-white/[0.06] tracking-tighter">
              {project.number}
            </span>
          )}

          {/* Video thumbnail — always visible showing first frame, plays on card hover */}
          {project.hasVideo && project.videoFile && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={`${project.mediaPath}/${project.videoFile}`}
              muted
              loop
              playsInline
              preload="auto"
            />
          )}

          {/* Subtle dark overlay for text readability — lightens on hover */}
          {project.hasVideo && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500 pointer-events-none" />
          )}

          {/* Light sweep effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at ${lightX.get()}% ${lightY.get()}%, rgba(255,255,255,0.06), transparent 60%)`,
            }}
          />

          {/* Edge glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-cyan-500/20 rounded-t-2xl" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <span className="text-xs font-medium tracking-wider uppercase text-cyan-400/70 mb-2 block">
            {project.category}
          </span>
          <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
            {project.shortTitle}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed mb-5 line-clamp-2">
            {project.overview}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full border border-white/8 text-white/35 bg-white/[0.02]"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full border border-white/8 text-white/25">
                +{project.tools.length - 4}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm text-white/50 group-hover:text-cyan-400 transition-colors duration-300">
            <span>View Case Study</span>
            <ArrowRight
              size={14}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
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
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl mx-4 my-16 md:my-24 rounded-3xl border border-white/10 bg-[#0a0a0b] overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header gradient */}
        <div className={`h-32 bg-gradient-to-br ${project.gradient} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
        </div>

        <div className="px-8 pb-10 -mt-8 relative">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-cyan-400/70 mb-2 block">
            {project.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
            {project.title}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-8">
            {project.overview}
          </p>

          {/* Timeline */}
          {project.timeline && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
                Timeline
              </h3>
              <p className="text-sm text-white/60">{project.timeline}</p>
            </div>
          )}

          {/* Role */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
              My Role
            </h3>
            <p className="text-sm text-white/60">{project.role}</p>
          </div>

          {/* Tools */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
              Tools & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/[0.03]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Problem */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
              The Problem
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
              The Solution
            </h3>
            <ul className="space-y-2.5">
              {project.solution.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
              Outcomes
            </h3>
            <ul className="space-y-2.5">
              {project.outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-emerald-400/60 mt-2 shrink-0" />
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

export function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal>
          <RevealItem>
            <div className="text-center mb-20">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400 mb-4">
                Portfolio
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="mt-4 text-base text-white/40 max-w-md mx-auto">
                Selected projects showcasing strategy and execution
              </p>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={() => openModal(project)}
              />
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
