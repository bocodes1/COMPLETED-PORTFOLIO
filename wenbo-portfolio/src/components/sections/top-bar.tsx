const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/** §3.1 — name left, minimal nav right, location. No status text. */
export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="text-[13px] font-medium tracking-tight text-ink">
          Wen&nbsp;Bo&nbsp;Zhao
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-block text-[12px] text-ink-mid transition-all duration-200 hover:-translate-y-px hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <span className="meta-label hidden lg:inline" aria-label="Location">
            Toronto / Vancouver, Canada
          </span>
        </nav>
      </div>
    </header>
  );
}
