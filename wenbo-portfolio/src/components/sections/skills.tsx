import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** §3.7 — monochrome chips, mono type, Programming/Systems first.
 *  Bright chips = used across many builds; dim = single-project exposure. */
export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 className="font-display bloom text-3xl font-light text-ink sm:text-4xl">
            Skills
          </h2>
          <p className="meta-label">bright — daily drivers · dim — used once, learned fast</p>
        </div>
      </Reveal>
      <div className="divide-y divide-line border-y border-line">
        {skillGroups.map((g, i) => (
          <Reveal key={g.group} delay={i * 60}>
            <div className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
              <h3 className="meta-label pt-1.5">{g.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      "rounded-[3px] border px-2.5 py-1 text-[11.5px] transition-all duration-200 hover:-translate-y-0.5",
                      item.core
                        ? "border-ink-dim bg-titlebar font-medium text-ink hover:border-ink-mid"
                        : "border-line bg-panel text-ink-dim hover:border-ink-dim hover:text-ink-mid"
                    )}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
