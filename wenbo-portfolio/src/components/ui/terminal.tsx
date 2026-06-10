"use client";

import { useEffect, useRef, useState } from "react";

/** A terminal-style section eyebrow: `~/path $ command` */
export function Prompt({
  path = "~",
  command,
  className = "",
}: {
  path?: string;
  command: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-tight ${className}`}
    >
      <span className="text-accent-2">{path}</span>
      <span className="text-accent">$</span>
      <span className="text-fg-dim">{command}</span>
    </span>
  );
}

/**
 * Typewriter: types the given string once when `start` is true.
 * Calls onDone when finished. Respects reduced motion (instant).
 */
export function useTypewriter(text: string, start: boolean, speed = 34) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);

  return { out, done };
}
