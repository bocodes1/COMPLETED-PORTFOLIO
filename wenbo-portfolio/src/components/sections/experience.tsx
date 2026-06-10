import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/lib/site-data";

/** §3.5 — paid work, one entry, full-width card (no lonely grid cell). */
export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 className="font-display bloom text-3xl font-light text-ink sm:text-4xl">
            Experience
          </h2>
          <p className="meta-label">shipped for others, paid</p>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <MacWindow title={experience.windowTitle} className="hover-lift">
          <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">
                {experience.title}
              </h3>
              <p className="mt-3 max-w-[68ch] text-[12.5px] leading-[1.75] text-ink-mid">
                {experience.description}
              </p>
              <dl className="mt-6 space-y-1.5 border-t border-line pt-4 text-[12px]">
                {experience.meta.map((m) => (
                  <div key={m.label} className="flex gap-3">
                    <dt className="meta-label w-16 shrink-0 pt-[3px]">{m.label}</dt>
                    <dd className="text-ink-mid">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="meta-label sm:pt-1 sm:text-right">{experience.timeline}</p>
          </div>
        </MacWindow>
      </Reveal>
    </section>
  );
}
