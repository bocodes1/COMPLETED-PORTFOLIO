"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Interactive equity curve for the bot panel. Grayscale only.
 * TODO: data is ILLUSTRATIVE (spec §6.1) — replace with a recorded
 * backtest equity curve. Deterministic so SSR and client agree.
 */

const W = 600;
const H = 110;
const PAD = 8;
const N = 56;

const data: number[] = Array.from({ length: N }, (_, i) => {
  const drift = i * 0.62;
  const wave = Math.sin(i * 0.55) * 3.1 + Math.sin(i * 0.21) * 4.6;
  const drawdown = i > 18 && i < 26 ? -7 + Math.abs(i - 22) : 0;
  return 18 + drift + wave + drawdown;
});

const min = Math.min(...data);
const max = Math.max(...data);
const xAt = (i: number) => PAD + (i * (W - PAD * 2)) / (N - 1);
const yAt = (v: number) => H - PAD - ((v - min) * (H - PAD * 2)) / (max - min);
const linePath = data
  .map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`)
  .join(" ");

export function EquityChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const fx = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((fx - PAD) / (W - PAD * 2)) * (N - 1));
    setHover(Math.max(0, Math.min(N - 1, i)));
  }

  const last = N - 1;
  const gain = (i: number) => (data[i] - data[0]).toFixed(1);

  return (
    <div ref={wrapRef}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-24 w-full cursor-crosshair sm:h-28"
        preserveAspectRatio="none"
        role="img"
        aria-label="Illustrative equity curve trending upward with a mid-run drawdown"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {/* baseline + quarter gridlines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + t * (H - PAD * 2)}
            y2={PAD + t * (H - PAD * 2)}
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}
        <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="var(--line)" strokeWidth="1" />

        {/* area fill under the curve */}
        <path
          d={`${linePath} L${xAt(last).toFixed(1)},${H - PAD} L${xAt(0).toFixed(1)},${H - PAD} Z`}
          fill="var(--ink)"
          opacity={drawn ? 0.05 : 0}
          style={{ transition: "opacity 0.9s ease 0.9s" }}
        />

        {/* the curve, drawn in on reveal */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.85"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={drawn ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.4s ease" }}
        />

        {/* breathing endpoint */}
        {drawn && (
          <circle cx={xAt(last)} cy={yAt(data[last])} r="3" fill="var(--ink)" className="chart-pulse" />
        )}

        {/* hover crosshair */}
        {hover !== null && (
          <g pointerEvents="none">
            <line
              x1={xAt(hover)}
              x2={xAt(hover)}
              y1={PAD}
              y2={H - PAD}
              stroke="var(--ink-dim)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={xAt(hover)} cy={yAt(data[hover])} r="3.5" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5" />
          </g>
        )}
      </svg>
      <p className="tabular mt-1 flex justify-between text-[10.5px] text-ink-dim">
        <span>t+0</span>
        <span className="text-ink-mid">
          {hover !== null ? `window ${hover + 1} · +${gain(hover)} u` : `+${gain(last)} u cumulative`}
        </span>
        <span>t+{N}</span>
      </p>
    </div>
  );
}
