# BUILD_LOG — monotone Mac-UI/CRT redesign

Append-only decision log per build spec §7.3.

## 2026-06-10

- **Target**: rewrite the existing Next.js app in place (spec §5 says match current stack). Old terminal/pink theme is committed at `1bbcf32`, so this pass can replace it wholesale.
- **Prototype**: `portfolio-draft.html` does not exist on this machine. Spec §0 says spec wins over prototype; building from spec alone. Gengar console behavior implemented from §3.10 description.
- **Type pairing**: Fraunces (variable, SOFT axis) for display; IBM Plex Mono for body/UI/metadata. Chakra Petch + JetBrains (old theme) removed.
- **Tokens**: exactly the §2 palette, exposed as CSS vars + Tailwind v4 `@theme inline` colors. One `--signal` gray for the single live dot. No other accent.
- **Dark only**: spec defaults to dark; light mode skipped deliberately (pick ONE mode, execute precisely).
- **Dropped from old build**: Lenis smooth scroll (native `scroll-behavior` is enough; JS minimal per §5), custom block cursor (`cursor: none` hurts usability and reads as theater), R3F/three hero scene, digital rain, marquee status bar, intensity/overdrive mode, framer-motion (reveals are CSS + one IntersectionObserver).
- **Reveals**: single `Reveal` wrapper adds `.is-visible`; transition is opacity + 10px translate, 0.55s. `prefers-reduced-motion` kills it globally.
- **Mac chrome**: `MacWindow` component — 6px radius, hairline `--line` border, titlebar with three outlined gray dots (no red/yellow/green per §2), mono path label, single soft drop shadow.
- **CRT**: one fixed overlay — scanlines at 3% white every 3px (overlay blend) + radial vignette. Heading bloom = soft white text-shadow utility, used on hero + section titles only.
- **Bot telemetry**: all numbers marked `TODO:` in code and labeled "illustrative" in the visible UI (spec §6.1 — do not ship fake data as real). PnL curve is an inline SVG polyline in `--ink` gray.
- **GUYU dates**: reused the real timeline from the old site's data ("June 2025 — January 2026") — satisfies §6.2 without inventing anything.
- **Repo links**: gh CLI is unauthenticated on this machine, so repo visibility could not be verified. Added the returnclip link given verbatim in §6.6; other cards carry `TODO:` comments instead of guessed URLs.
- **Gengar sprite**: hand-built pixel grid rendered as SVG rects, grayscale phosphor (white/gray) per the spec default, with shadow-fade-up materialize + dissolve. Purple variant deliberately not used.
- **Contrast fix**: spec §2's `--ink-dim #6e6e70` measures ~3.3:1 on `--bg` — fails the §4 WCAG AA floor for the metadata text that uses it. §4 is a hard constraint, so ink-dim shipped as `#8e8e90` (≥4.6:1 on bg, panel, titlebar). Mac titlebar labels use ink-mid for the same reason.
- **Gengar eyes**: first sprite pass read as horizontal slits; reshaped to inward-slanting wedges (rows 6–8) for the angry Gengar look.
- **projects vs experience data**: old `project-data.ts` replaced by `site-data.ts` — 5 personal projects (§3.4) + 1 paid experience (§3.5). "Refined Concept" removed per §6.5. "Ads + Growth Engine" / "Conversion UI" agency-style cards killed per §1.
