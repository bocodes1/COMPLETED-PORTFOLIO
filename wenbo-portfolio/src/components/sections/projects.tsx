import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { projects, type ProjectEntry } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: ProjectEntry }) {
  const card = (
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
        {project.video && (
          <figure className="mt-5">
            <figcaption className="meta-label mb-2">demo</figcaption>
            <video
              src={project.video}
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full rounded-[4px] border border-line bg-bg"
            />
          </figure>
        )}
        {project.link && (
          <p className="quiet-link mt-4 text-[12px]">{project.link.label} →</p>
        )}
      </div>
    </MacWindow>
  );

  // whole card links out when a public repo exists
  if (project.link) {
    return (
      <a
        href={project.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`${project.title} — ${project.link.label}`}
      >
        {card}
      </a>
    );
  }
  return card;
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
