import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { projects, type ProjectEntry } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <MacWindow
      title={project.windowTitle}
      className={cn("h-full", project.featured && "md:col-span-2")}
    >
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
        {project.link && (
          <p className="mt-4 text-[12px]">
            <a
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link"
            >
              {project.link.label} →
            </a>
          </p>
        )}
      </div>
    </MacWindow>
  );
}

/** §3.4 — personal builds, framed as engineering. */
export function Projects() {
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
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
