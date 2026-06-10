import { Reveal } from "@/components/ui/reveal";
import { contact } from "@/lib/site-data";

/** §3.9 — simple and real. Footer lives here too. */
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-16 sm:px-8">
      <Reveal>
        <h2 className="font-display bloom text-3xl font-light text-ink sm:text-4xl">
          Get in touch
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 text-[14px]">
          <a href={`mailto:${contact.email}`} className="quiet-link">
            {contact.email}
          </a>
        </p>
      </Reveal>
      <Reveal delay={140}>
        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[12.5px]">
          {contact.links.map((l) => (
            <li key={l.name}>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <p className="meta-label normal-case tracking-[0.08em]">
          Wen Bo Zhao · Toronto / Vancouver, Canada · © Wen Bo Zhao.
        </p>
      </div>
    </footer>
  );
}
