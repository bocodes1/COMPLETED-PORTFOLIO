"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const scale = useTransform(
    useSpring(useMotionValue(hovered ? 2.5 : 1), springConfig),
    (v) => v
  );

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      setHidden(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // Track hoverable elements
    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], .cursor-hover, input, textarea, select"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial scan
    const hoverables = document.querySelectorAll(
      "a, button, [role='button'], .cursor-hover, input, textarea, select"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: hovered ? 48 : clicking ? 8 : 12,
            height: hovered ? 48 : clicking ? 8 : 12,
            opacity: hovered ? 0.4 : 0.8,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
