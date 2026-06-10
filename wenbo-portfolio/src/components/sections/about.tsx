import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/lib/site-data";

/** §3.6 — honest, concrete, no agency tone. */
export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="grid gap-8 md:grid-cols-[180px_1fr]">
        <Reveal>
          <h2 className="font-display bloom text-3xl font-light text-ink sm:text-4xl">About</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-[62ch] text-[14px] leading-[1.9] text-ink-mid md:pt-2">
            {aboutCopy}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
