"use client";

import { useEffect, useState } from "react";
import { useIntensity } from "@/lib/intensity-context";

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** vim/tmux-style fixed status line at the bottom of the viewport. */
export function StatusBar() {
  const { isOverdrive, toggle } = useIntensity();
  const time = useClock();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-7 flex items-stretch text-[11px] tabular border-t border-border bg-background/80 backdrop-blur-md select-none">
      {/* mode segment */}
      <button
        onClick={toggle}
        aria-label={`Switch to ${isOverdrive ? "normal" : "overdrive"} mode`}
        className={`flex items-center gap-2 px-3 font-semibold uppercase tracking-[0.18em] transition-colors ${
          isOverdrive
            ? "bg-accent text-background"
            : "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1]"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 ${isOverdrive ? "bg-background" : "bg-accent pulse-dot"}`}
        />
        {isOverdrive ? "OVERDRIVE" : "NORMAL"}
      </button>

      {/* path */}
      <div className="flex items-center px-3 text-fg-dim border-r border-border">
        <span className="text-accent-2">wenbo</span>
        <span className="text-fg-faint">@toronto</span>
        <span className="text-fg-dim">:~$</span>
      </div>

      {/* spacer */}
      <div className="flex-1 flex items-center px-3 text-fg-faint hidden sm:flex">
        <span>open to work</span>
      </div>

      {/* clock */}
      <div className="flex items-center gap-3 px-3 text-fg-dim border-l border-border">
        <span className="hidden md:inline text-fg-faint">utf-8</span>
        <span className="text-fg-dim tabular">{time}</span>
      </div>
    </div>
  );
}
