# Design spec

The reference is Anis Chelly's portfolio (https://anischelly26.github.io/treasure-hunter/, source
`anischelly26/treasure-hunter`, folder `site/`). This site reuses its engine and visual system and swaps in
Hamza's content, palette and sections.

## System

- **Ground:** near-black `#07080c`, warm ink `#efe9dd` at 100 / 64 / 36 % for text levels, 1 px rules at 16 %.
- **Type:** Bricolage Grotesque (variable; display set uppercase at width 75, weight 800, animated on both axes),
  its ExtraBold Condensed static cut for outlines, Instrument Serif italic for one word per heading,
  Geist Mono 11 px uppercase for every label.
- **Shader world:** one mesh behind the page that morphs between a liquid sphere and a rippling sheet. Each section
  and project names a scene state (`data-world`); scroll position blends between them. Hamza's palette: cobalt
  `#3a5bff`, navy `#0c1757`, sand `#f2e4cc`, apricot accent `#ff7a3d`; each project has its own.
- **Motion:** Lenis smooth scroll and GSAP share one clock. Masked line reveals (`yPercent 108 → 0`, expo out),
  scroll-scrubbed pinned scenes, velocity skew on large type, magnetic links, a difference-blend nav and cursor,
  a grain overlay, and View Transitions that morph a project picture into its case study.
- **Loader:** a count that follows real readiness (fonts, first shader frame), capped at 2.4 s.

## Sections, reference → this site

| Reference | Here |
| --- | --- |
| Hero: name solid behind the sphere, outline in front; "I BUILD intelligent digital experiences." | Same, with HAMZA / LAKOUD and "SOFTWARE *engineer* in the making." (FR: "INGÉNIEUR *logiciel* en devenir.") |
| Manifesto + About | Manifesto from his work (automation, MT→MX standards, image recognition) + the brief's biography, facts, fields |
| WORK zoom into the R | Same; French zooms into the P of PROJETS |
| Pinned project stages with bespoke overlays | zIArat (artifact found, three pillars), car components (boxes + illustrative bars), SWIFT (pulse MT → MX, field mapping) |
| Project index with hover preview | Experience timeline in the index's row language: rail, widening names, palette on hover |
| Horizontal "Experiments" rail | Expertise rail: Languages, Web, Data, Automation, AI, Finance, Delivery |
| Drifting stack rows | Same, with his tools |
| — | Education and certifications: PSM I seal turning with the scroll, courses list |
| — | Beyond the code: four tilting cards on a pitch-lined surface |
| Contact: the sphere's crown, "Let's build something." | "Let's work *together.*" (FR: "Travaillons *ensemble.*") |
| Live demos | Left out: no public demos |

## Honesty rules the content follows

- Only facts from the two CVs (EN and FR). Where a CV says nothing (zIArat role, course-project years), the field is
  left out, not invented.
- No public screenshots exist, so project pictures are concept artwork and say so in the image, the caption and
  the alt text. Confidence bars are illustrative; no accuracy figures appear.
- The SWIFT project is presented as one component of a team's messaging hub, with generic public-format field tags
  and no bank data.
