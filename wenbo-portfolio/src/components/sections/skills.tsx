import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/lib/site-data";

/** §3.7 — monochrome chips, mono type, Programming/Systems first. */
export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <h2 className="font-display bloom mb-10 text-3xl font-light text-ink sm:text-4xl">
          Skills
        </h2>
      </Reveal>
      <div className="divide-y divide-line border-y border-line">
        {skillGroups.map((g, i) => (
          <Reveal key={g.group} delay={i * 60}>
            <div className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
              <h3 className="meta-label pt-1.5">{g.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[3px] border border-line bg-panel px-2.5 py-1 text-[11.5px] text-ink-mid"
                  >
                    {item}
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
