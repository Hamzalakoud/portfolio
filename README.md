# Hamza Lakoud — Portfolio

Bilingual (English / French) portfolio, published at **https://hamzalakoud.github.io/portfolio/**.
English lives at `/portfolio/`, French at `/portfolio/fr/`.

Next.js 16 (static export) · React 19 · GSAP + ScrollTrigger · Lenis · React Three Fiber (one shader surface) · plain CSS.
The design is adapted, with permission, from [Anis Chelly's portfolio](https://anischelly26.github.io/treasure-hunter/);
[docs/DESIGN-SPEC.md](docs/DESIGN-SPEC.md) describes it.

## Run it

Needs Node 22.

```bash
npm ci
npm run dev          # http://localhost:3000 (no base path in development)
```

Checks:

```bash
npm run lint
npm run typecheck
```

## Build for production

```bash
node scripts/build-pages.mjs            # static site in out/, base path /portfolio
node scripts/serve-out.mjs              # serve it like GitHub Pages: http://localhost:4173/portfolio/
```

For another repository name pass it as the first argument (`node scripts/build-pages.mjs my-site`), or `root`
for a user site or custom domain with no base path.

## Deploy

`.github/workflows/deploy.yml` lints, type-checks and builds every push and pull request, and publishes `main` to
GitHub Pages. One-time setup in the repository: **Settings → Pages → Source: GitHub Actions**.

## Edit the content

| What | Where |
| --- | --- |
| Name, email, GitHub, LinkedIn, coordinates, site URL, CV PDFs | `src/data/portfolio.ts` (`profile`) |
| Every sentence a visitor reads, in English | `src/locales/en.ts` |
| The same, in French | `src/locales/fr.ts` |
| Project facts that do not depend on language (slug, year, images, links, layout) | `src/data/portfolio.ts` (`projectData`) |
| Colours of the shader per section and project | `src/lib/world/states.ts` |

Both locale files share one type (`src/locales/types.ts`), so `npm run typecheck` fails if a translation is missing.

### Add LinkedIn

Set `profile.linkedin` to the full profile URL. It then appears in the contact links and the résumé.

### Add a project

1. Add an entry to `projectData` in `src/data/portfolio.ts` (new `slug`, next `num`, a `world`, a `layout` of
   `right`, `left` or `rise`, a `cover`, optional `shots` and `links`).
2. Add its copy under `projects["<slug>"]` in **both** `src/locales/en.ts` and `src/locales/fr.ts`.
3. Add a shader state for its `world` in `src/lib/world/states.ts`.
4. `stage` picks the overlay drawn over the picture on the home page (`src/components/home/Stages.tsx`).
   Reuse one or add a new one there and in `addStage` in `ProjectScene.tsx`.

The home page, the case study (`/work/<slug>/`, `/fr/work/<slug>/`) and the résumé pick it up automatically.

### Replace images

Project pictures live in `src/assets/projects/`. The current ones are **concept artwork**, not screenshots: they
are rendered from `design/concepts/*.html` by `node scripts/render-concepts.mjs` (needs Google Chrome).

- To use a real screenshot, drop the file in `src/assets/projects/`, import it in `src/data/portfolio.ts` and set
  `kind: "capture"` (the caption marker turns solid). Update `coverAlt` / `coverCaption` in both locale files.
- The home-page overlays are drawn in the concept images' 2400×1500 space. With a different picture, adjust the
  coordinates in `Stages.tsx` or remove the overlay.

### Add the CV

The CV PDFs are not published because they include a phone number. To offer a download, put the files in
`public/cv/` (for example `public/cv/Hamza_Lakoud_CV_EN.pdf`) and set `profile.cv` to
`{ en: "/cv/Hamza_Lakoud_CV_EN.pdf", fr: "/cv/Hamza_Lakoud_CV_FR.pdf" }`. A download link appears on the résumé pages.
The printable résumé (`/resume/`, `/fr/resume/`) is built from the same content as the site.

### Languages

The switch in the navigation opens the same page in the other language. Each language has its own root layout
(`src/app/(en)/`, `src/app/(fr)/fr/`), so each page ships its own `<html lang>`, title, description and
`hreflang` links. To change a word, edit the locale files only.

## Accessibility and motion

- `prefers-reduced-motion`: no smooth scrolling, no pinned or scrubbed scenes; every section reads as a document.
- No WebGL: the shader is replaced by a CSS gradient driven by the same states.
- Touch devices keep native scrolling and get no custom cursor.
