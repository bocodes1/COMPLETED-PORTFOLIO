"use client";

/**
 * Global atmosphere: grid + grain + scanlines + vignette.
 * Fixed behind all content. Pure CSS, GPU-cheap.
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden scanlines"
    >
      {/* whisper-faint grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* a single, barely-there pink wash */}
      <div className="absolute -top-48 left-1/4 w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_60%)] opacity-[0.07] blur-3xl" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

      {/* grain */}
      <div
        className="absolute inset-0 grain mix-blend-overlay"
        style={{ opacity: "var(--grain-opacity)" }}
      />
    </div>
  );
}
