# Status (2026-11-06)

The site builds, lints and type-checks. It was checked with screenshots on desktop (1440×900) and phone
(390×844), in English and French, with reduced motion, without WebGL, and on the 404 page: no horizontal
overflow and no console errors.

## Left to do

- **Pages setting** (repository admin only): Settings → Pages → Source: GitHub Actions. The deploy workflow
  publishes `main` once that is on.
- **Facts to confirm with Hamza** (none of these is in either CV):
  - LinkedIn URL (`profile.linkedin` in `src/data/portfolio.ts`; LinkedIn is hidden while it is empty).
  - Whether to publish the CV PDFs. Both include his phone number, so they are not on the site. See README, "Add the CV".
  - His role on zIArat (the case study omits the Role row and the "My contribution" chapter).
  - Years of the two university projects (shown without a year).
  - What "ESS" and "Bako" are (shown as the CV writes them).
  - Any repository, demo or real screenshot for the three projects.
- The gallery images are English-only concept boards, also shown on the French pages.
