"use client";

import { useEffect, useState } from "react";

/*
 * Rolling tick-latency bars — updates ~every 700ms after mount.
 * TODO: ILLUSTRATIVE (spec §6.1) — wire to a recorded run.
 * Initial frame is deterministic so SSR and client agree.
 */

const N = 40;
const MIN = 26;
const MAX = 58;

const initial: number[] = Array.from(
  { length: N },
  (_, i) => 38 + Math.sin(i * 0.7) * 5 + Math.sin(i * 0.23) * 3
);

export function TickStream() {
  const [vals, setVals] = useState<number[]>(initial);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setVals((prev) => {
        const lastVal = prev[prev.length - 1];
        const next = Math.min(MAX, Math.max(MIN, lastVal + (Math.random() - 0.5) * 9));
        return [...prev.slice(1), next];
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const current = Math.round(vals[vals.length - 1]);

  return (
    <div>
      <div className="flex h-24 items-end gap-[2px] sm:h-28" aria-hidden="true">
        {vals.map((v, i) => (
          <span
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              height: `${((v - MIN + 6) / (MAX - MIN + 6)) * 100}%`,
              background: i === vals.length - 1 ? "var(--ink)" : "var(--line)",
              transition: "height 0.45s ease",
            }}
          />
        ))}
      </div>
      <p className="tabular mt-1 flex justify-between text-[10.5px] text-ink-dim">
        <span>rolling</span>
        <span className="text-ink-mid">{current} ms</span>
      </p>
    </div>
  );
}
