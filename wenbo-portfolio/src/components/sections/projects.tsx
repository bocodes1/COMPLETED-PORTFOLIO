"use client";

import { useEffect, useRef, useState } from "react";
import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { projects, type ProjectEntry } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  onOpen,
}: {
  project: ProjectEntry;
  onOpen: (p: ProjectEntry, trigger: HTMLElement) => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      className="h-full cursor-pointer outline-none"
      onClick={(e) => onOpen(project, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project, e.currentTarget);
        }
      }}
    >
      <MacWindow title={project.windowTitle} className="hover-lift h-full">
        <div className="flex h-full flex-col p-6 sm:p-7">
          <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[64ch] text-[12.5px] leading-[1.75] text-ink-mid">
            {project.description}
          </p>
          <dl className="mt-6 space-y-1.5 border-t border-line pt-4 text-[12px]">
            {project.meta.map((m) => (
              <div key={m.label} className="flex gap-3">
                <dt className="meta-label w-16 shrink-0 pt-[3px]">{m.label}</dt>
                <dd className="text-ink-mid">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="quiet-link mt-4 text-[12px]">open →</p>
        </div>
      </MacWindow>
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectEntry;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-bg/75 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="modal-enter relative w-full max-w-2xl">
        <MacWindow
          title={project.windowTitle}
          titlebarEnd={
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="px-1 text-[13px] leading-none text-ink-mid transition-colors hover:text-ink"
            >
              ✕
            </button>
          }
        >
          <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8">
            <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.8] text-ink-mid">
              {project.description}
            </p>

            {project.detail && (
              <div className="mt-6 border-t border-line pt-4">
                <p className="meta-label mb-3">detail</p>
                <ul className="space-y-2.5 text-[12.5px] leading-[1.7] text-ink-mid">
                  {project.detail.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="select-none text-ink-dim" aria-hidden="true">
                        —
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <dl className="mt-6 space-y-1.5 border-t border-line pt-4 text-[12px]">
              {project.meta.map((m) => (
                <div key={m.label} className="flex gap-3">
                  <dt className="meta-label w-16 shrink-0 pt-[3px]">{m.label}</dt>
                  <dd className="text-ink-mid">{m.value}</dd>
                </div>
              ))}
            </dl>

            <figure className="mt-6">
              <figcaption className="meta-label mb-2">demo</figcaption>
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full rounded-[4px] border border-line bg-bg"
                />
              ) : (
                <div className="flex h-28 items-center justify-center rounded-[4px] border border-dashed border-line bg-bg">
                  <span className="meta-label">demo footage — coming soon</span>
                </div>
              )}
            </figure>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              {project.link ? (
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quiet"
                >
                  View on GitHub ↗
                </a>
              ) : project.privateRepo ? (
                <span className="meta-label">source: private repo</span>
              ) : null}
            </div>
          </div>
        </MacWindow>
      </div>
    </div>
  );
}

/** §3.4 — personal builds, framed as engineering. Cards open a detail window. */
export function Projects() {
  const [active, setActive] = useState<ProjectEntry | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function open(p: ProjectEntry, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setActive(p);
  }

  function close() {
    setActive(null);
    triggerRef.current?.focus();
  }

  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 className="font-display bloom text-3xl font-light text-ink sm:text-4xl">
            Projects
          </h2>
          <p className="meta-label">what I build to prove I can</p>
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 70} className={cn(p.featured && "md:col-span-2")}>
            <ProjectCard project={p} onOpen={open} />
          </Reveal>
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}
