"use client";

import { useEffect, useRef, useState } from "react";
import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { GengarSprite } from "@/components/ui/gengar-sprite";
import { contact, projects } from "@/lib/site-data";

/*
 * §3.10 — interactive console easter egg. Visible commands: help, whoami,
 * projects, stack, contact, clear. Hidden: catch / pokedex / gengar summon
 * the sprite. The only hint allowed is the single faint comment line below.
 */

type Line = { kind: "cmd" | "out" | "dim"; text: string };

const PROMPT = "guest@wenbozhao ~ %";

const INITIAL: Line[] = [
  { kind: "out", text: "wenbozhao console — type `help` to start" },
  { kind: "dim", text: "// some commands aren't on the list" },
];

const COMMANDS: Record<string, string[]> = {
  help: [
    "available commands:",
    "  help      show this list",
    "  whoami    who is this guy",
    "  projects  what he builds",
    "  stack     what he builds with",
    "  contact   how to reach him",
    "  clear     wipe the screen",
  ],
  whoami: [
    "Wenbo Zhao — builder · quant-track developer.",
    "Commerce at UofT. Toronto / Vancouver, Canada.",
    "Ships end-to-end: trading systems, agent platforms, full products.",
  ],
  projects: projects.map((p) => `  ${p.id.padEnd(14)} ${p.title}`),
  stack: [
    "Python · asyncio · FastAPI · websockets",
    "TypeScript · Next.js · React · SwiftUI",
    "SQLite/Supabase · MCP · Shopify Liquid",
  ],
  contact: [`email: ${contact.email}`, `github: ${contact.links[0].url}`],
};

const GENGAR_TRIGGERS = new Set(["catch", "pokedex", "gengar"]);

export function GengarConsole() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [value, setValue] = useState("");
  const [gengar, setGengar] = useState<"hidden" | "enter" | "exit">("hidden");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function summonGengar() {
    setGengar("enter");
    timers.current.push(
      setTimeout(() => setGengar("exit"), 3400),
      setTimeout(() => setGengar("hidden"), 4300)
    );
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const echo: Line = { kind: "cmd", text: raw.trim() };

    if (GENGAR_TRIGGERS.has(cmd)) {
      setLines((prev) => [
        ...prev,
        echo,
        { kind: "out", text: "a wild GENGAR appeared." },
        { kind: "out", text: "GENGAR used Shadow Ball. It's super effective." },
      ]);
      summonGengar();
      return;
    }

    const out = COMMANDS[cmd];
    setLines((prev) => [
      ...prev,
      echo,
      ...(out
        ? out.map((text): Line => ({ kind: "out", text }))
        : [{ kind: "out", text: `command not found: ${cmd} — try \`help\`` } as Line]),
    ]);
  }

  return (
    <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8 sm:pb-32">
      <Reveal>
        <MacWindow title="guest@wenbozhao — zsh" className="relative">
          <div
            className="cursor-text p-5 sm:p-6"
            onClick={() => inputRef.current?.focus()}
            role="presentation"
          >
            <div
              ref={outputRef}
              className="max-h-64 space-y-1 overflow-y-auto text-[12px] leading-relaxed"
              aria-live="polite"
            >
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.kind === "cmd"
                      ? "text-ink"
                      : line.kind === "dim"
                        ? "text-ink-dim"
                        : "text-ink-mid"
                  }
                >
                  {line.kind === "cmd" && (
                    <span className="mr-2 text-ink-dim">{PROMPT}</span>
                  )}
                  <span className="whitespace-pre-wrap">{line.text}</span>
                </p>
              ))}
            </div>
            <form
              className="mt-2 flex items-center gap-2 text-[12px]"
              onSubmit={(e) => {
                e.preventDefault();
                run(value);
                setValue("");
              }}
            >
              <label htmlFor="console-input" className="shrink-0 text-ink-dim">
                {PROMPT}
              </label>
              <input
                id="console-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent text-ink caret-[var(--ink)] outline-none placeholder:text-ink-dim/60"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Console input"
              />
            </form>
          </div>

          {gengar !== "hidden" && (
            <div
              className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-bg/40 ${
                gengar === "enter" ? "gengar-enter" : "gengar-exit"
              }`}
            >
              <GengarSprite />
            </div>
          )}
        </MacWindow>
      </Reveal>
    </section>
  );
}
