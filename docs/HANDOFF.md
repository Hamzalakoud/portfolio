# Handoff — work in progress (2026-11-05)

Branch `build/cinematic-portfolio`, local only. Nothing has been pushed to `Hamzalakoud/portfolio` yet.
**The site has not been built or run yet.** Expect type and CSS gaps until the steps below are done.

## What this is

Hamza Lakoud's portfolio, adapted from Anis Chelly's portfolio
(source: `C:\Users\Mega-Pc\projects\treasure-hunter\site`, live: https://anischelly26.github.io/treasure-hunter/).
Same stack and engine: Next.js 16.4 static export, React 19.3, GSAP + ScrollTrigger, Lenis, React Three Fiber shader world.
Plain CSS (as in the reference), not Tailwind.

## Done

- Engine copied from the reference: `src/lib/motion.ts`, `useScene.ts`, `math.ts`, `lib/world/*`, `components/world/*`,
  `components/ui/*`, `components/shell/{Shell,Loader,Cursor}.tsx`, `components/study/*`, `src/styles/*.css`, fonts.
- Content, from the two CVs only:
  - `src/locales/types.ts`, `en.ts`, `fr.ts`: every visible string, both languages.
  - `src/data/portfolio.ts`: identity, links, project facts and images.
- Bilingual routing: two root layouts. English at `/` (`src/app/(en)/`), French at `/fr` (`src/app/(fr)/fr/`).
  Shared document in `src/components/shell/Document.tsx` (fonts, metadata, hreflang). `src/app/global-not-found.tsx`
  is the 404 for both (needs `experimental.globalNotFound`, set in `next.config.ts`).
- Nav with an EN/FR switch (`components/shell/Nav.tsx`), localized loader and cursor.
- Home sections (`src/components/home/`): Hero, Manifesto + About, WorkIntro (WORK / PROJETS zoom), ProjectScene + Stages
  (overlays per project), Experience (timeline), Expertise (horizontal rail), Stack, Credentials (education, PSM I seal,
  courses), Beyond (leadership + sport cards), Contact.
- Pages (`src/components/pages/`): HomePage, StudyPage (case studies), ResumePage (printable, no phone number).
- Shader palette for Hamza (cobalt, sand, apricot) in `src/lib/world/states.ts`, one preset per section and project.
- Six concept images, rendered from `design/concepts/*.html` by `scripts/render-concepts.mjs` into `src/assets/projects/`.
  Each is labelled as concept or schematic art in the picture, its caption and its alt text.

## To do next, in order

1. CSS for everything new. The copied stylesheets only cover the reference's sections. Needed:
   `.nav__end`, `.nav__lang`; `.hero__note`, `.hero__supporting`, `.hero__intro`; manifesto size from `--chars`;
   `.workintro__word` size from `--letters`; `.is-cased` (zIArat keeps its case); overlays `.cv--ziarat`, `.zi__scan`,
   `.zi__trail`, `.cars__scan`, `.swift__pulse`, `.swift__ring`, `.readout__bar`, `.readout__map`, `.readout__soft`;
   `.experience`, `.timeline`, `.job*`; `.lab__word` size from `--chars`; `.creds`, `.schools`, `.school*`, `.seal*`,
   `.certs*`, `.courses`, `.course*`; `.beyond`, `.cards`, `.card*`; `.contact__mail a`; `.lost__fr`, `.lost__links`;
   `.resume__actions`, `.resume__list`. Add the new sections to the z-index list at the top of `home.css`.
2. Delete reference-only CSS: index, demos, typefilter, eclipse, sound, padel/vermeg/sql stage rules.
3. Fix the comment on `world.audio` in `src/lib/world/store.ts` (it mentions AURA; nothing feeds it now).
4. `npm run typecheck`, `npm run lint`, `npm run build:pages` (static export to `out/`, base path `/portfolio`). Fix errors.
   Check that `global-not-found` produces `out/404.html` under static export; if not, fall back to a not-found page per layout.
5. Check that the outline font (`BricolageGrotesque-ExtraBoldCondensed.woff2`) has French accents: it draws the case-study
   flow line ("Reconnaître", "Préserver"). If not, set `.chapter__flow` in the variable display font.
6. QA with `scripts/shot.mjs` (desktop 1440×900, phone 390×844, EN and FR, reduced motion, no WebGL): overlaps, horizontal
   overflow, console errors, links. Re-capture the reference for side-by-side (the earlier captures were in a session scratchpad).
7. Write `.github/workflows/deploy.yml` (build with `node scripts/build-pages.mjs portfolio`, upload `out/`,
   `actions/deploy-pages`), `README.md` (install, dev, build, deploy, editing content, adding projects, replacing images,
   CV, languages) and `docs/DESIGN-SPEC.md` (the reference's visual system and how each section maps).
8. Publishing: this machine's git credentials are Anis's (`anischelly26`). Pushing to `Hamzalakoud/portfolio` needs Hamza to
   add `anischelly26` as a collaborator, or Hamza pushes himself. The repo is empty, so a pull request needs a `main` to
   exist first. `gh` is not installed. Pages must be set to "GitHub Actions" in the repo settings.

## Facts to confirm with Hamza (not in either CV)

- LinkedIn URL (`profile.linkedin` is empty, so LinkedIn is hidden everywhere).
- CV PDFs: not published, because both include his phone number. To offer a download, put PDFs in `public/cv/` and set
  `profile.cv` in `src/data/portfolio.ts`.
- zIArat: his role (the case study leaves the Role row and the "My contribution" chapter out).
- Years of the two course projects (shown without a year).
- What "ESS" and "Bako" are (shown exactly as the CV writes them).
- Any repository, demo or real screenshots for the three projects (`links` and images in `src/data/portfolio.ts`).
