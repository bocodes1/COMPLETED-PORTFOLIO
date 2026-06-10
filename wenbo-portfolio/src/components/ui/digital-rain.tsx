"use client";

import { useEffect, useRef } from "react";
import { useIntensity } from "@/lib/intensity-context";

/**
 * Katakana digital rain — Ghost-in-the-Shell / Matrix flavored.
 * Deliberately subtle: low opacity, slow fall, leading glyph in accent.
 */
export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isOverdrive } = useIntensity();
  const overdriveRef = useRef(isOverdrive);
  overdriveRef.current = isOverdrive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ0123456789<>=/\\$#*+".split("");

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
      speeds = Array.from({ length: columns }, () => 0.25 + Math.random() * 0.5);
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      // throttle ~ every 55ms (normal) / 36ms (overdrive)
      const interval = overdriveRef.current ? 36 : 55;
      if (t - last < interval) return;
      last = t;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // fade trail
      ctx.fillStyle = "rgba(8, 8, 11, 0.16)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px ${getComputedStyle(document.body).getPropertyValue("--font-jetbrains") || "monospace"}, monospace`;

      const od = overdriveRef.current;
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const ch = glyphs[(Math.random() * glyphs.length) | 0];

        // mostly monochrome; a rare pink lead glyph
        if (Math.random() > 0.994) {
          ctx.fillStyle = od ? "rgba(255,46,136,0.7)" : "rgba(255,46,136,0.4)";
        } else {
          ctx.fillStyle = od ? "rgba(190,190,200,0.13)" : "rgba(170,170,180,0.08)";
        }
        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
        drops[i] += speeds[i] * (od ? 1.5 : 1);
      }
    };

    if (!reduce) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}
