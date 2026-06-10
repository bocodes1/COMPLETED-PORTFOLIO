import { Reveal } from "@/components/ui/reveal";

/** §3.2 — the thesis. One blinking cursor, two quiet links. */
export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pt-44 pb-28 sm:px-8 sm:pt-52 sm:pb-36">
      <Reveal>
        <p className="meta-label mb-7">Builder &middot; Quant-Track Developer</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="font-display bloom max-w-[17ch] text-[clamp(2.6rem,7vw,4.6rem)] font-light leading-[1.06] text-ink">
          I ship businesses — and systems that trade in{" "}
          <em className="font-normal">milliseconds</em>
          <span className="caret" aria-hidden="true" />
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-10 max-w-[58ch] text-[13.5px] leading-[1.8] text-ink-mid">
          Wen Bo Zhao. Commerce at UofT. I build and ship real things end-to-end
          — a low-latency trading engine, a multi-agent ops platform, full
          products. Technical depth, business judgment, fast execution.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-10 flex items-center gap-8 text-[13px]">
          <a href="#work" className="quiet-link">
            View Work ↓
          </a>
          <a href="#contact" className="quiet-link">
            Contact →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
