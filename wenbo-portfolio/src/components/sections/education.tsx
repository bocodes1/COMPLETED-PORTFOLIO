import { Reveal } from "@/components/ui/reveal";
import { education } from "@/lib/site-data";

/** §3.8 */
export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <h2 className="font-display bloom mb-10 text-3xl font-light text-ink sm:text-4xl">
          Education
        </h2>
      </Reveal>
      <div className="divide-y divide-line border-y border-line">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 60}>
            <div className="grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline">
              <div>
                <h3 className="font-display text-lg text-ink">{e.school}</h3>
                <p className="mt-1 text-[12.5px] text-ink-mid">{e.credential}</p>
                <p className="mt-2 max-w-[60ch] text-[12px] leading-[1.7] text-ink-dim">
                  {e.note}
                </p>
              </div>
              <span className="meta-label">{e.status}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
