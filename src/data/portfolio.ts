import type { StaticImageData } from "next/image";
import { dict, type Lang } from "@/locales";
import type { ProjectCopy } from "@/locales/types";

import ziaratCover from "@/assets/projects/ziarat-cover.jpg";
import ziaratQuest from "@/assets/projects/ziarat-quest.jpg";
import carsCover from "@/assets/projects/cars-cover.jpg";
import carsDashboard from "@/assets/projects/cars-dashboard.jpg";
import swiftCover from "@/assets/projects/swift-cover.jpg";
import swiftMonitor from "@/assets/projects/swift-monitor.jpg";

/**
 * Who Hamza is, in one place. Everything a visitor reads in a particular
 * language lives in `src/locales/`; this file holds the facts that do not change.
 */
export type Profile = {
  name: string;
  /** The hero sets the name on two lines. */
  first: string;
  last: string;
  /** Top-left mark in the navigation. */
  mark: string;
  email: string;
  github: string;
  githubLabel: string;
  /** Not in either CV. Paste the full profile URL to show LinkedIn everywhere; empty hides it. */
  linkedin: string;
  coords: string;
  year: string;
  /** Public address of the deployed site, including the base path. */
  url: string;
  /** PDF résumés served from `public/cv/`. An empty path hides the download link. */
  cv: Record<Lang, string>;
};

export const profile: Profile = {
  name: "Hamza Lakoud",
  first: "HAMZA",
  last: "LAKOUD",
  mark: "HAMZA.L",
  email: "hamzalakoud01@gmail.com",
  github: "https://github.com/Hamzalakoud",
  githubLabel: "github.com/Hamzalakoud",
  linkedin: "",
  // Ariana, Tunisia.
  coords: "36.86° N — 10.19° E",
  year: "2026",
  url: "https://hamzalakoud.github.io/portfolio",
  cv: { en: "", fr: "" },
};

/** Whether a picture is a capture of running software or artwork made for the portfolio. */
export type ShotKind = "capture" | "concept";

export type ProjectData = {
  slug: string;
  num: string;
  /** Left out when the CV gives no year. */
  year?: string;
  /** Key into the shader world's scene states. */
  world: string;
  /** Where the picture starts before it expands to fill the stage. */
  layout: "right" | "left" | "rise";
  /** Bespoke overlay drawn over the picture on the home page. */
  stage: "ziarat" | "cars" | "swift";
  /** zIArat keeps its own capitalisation: the IA in the middle is the point. */
  keepCase?: boolean;
  cover: { src: StaticImageData; kind: ShotKind; focus?: string };
  /** Extra pictures for the case study, captioned in the locale files (`gallery`, same order). */
  shots: { src: StaticImageData; kind: ShotKind }[];
  /** Repository or demo links. None are public yet; add them here when they are. */
  links: { label: string; href: string }[];
};

export const projectData: ProjectData[] = [
  {
    slug: "ziarat",
    num: "01",
    world: "p-ziarat",
    layout: "right",
    stage: "ziarat",
    keepCase: true,
    cover: { src: ziaratCover, kind: "concept" },
    shots: [{ src: ziaratQuest, kind: "concept" }],
    links: [],
  },
  {
    slug: "car-components",
    num: "02",
    world: "p-cars",
    layout: "left",
    stage: "cars",
    cover: { src: carsCover, kind: "concept" },
    shots: [{ src: carsDashboard, kind: "concept" }],
    links: [],
  },
  {
    slug: "swift-mt-mx",
    num: "03",
    year: "2025",
    world: "p-swift",
    layout: "rise",
    stage: "swift",
    cover: { src: swiftCover, kind: "concept" },
    shots: [{ src: swiftMonitor, kind: "concept" }],
    links: [],
  },
];

export type Project = ProjectData & ProjectCopy;

export const projectsFor = (lang: Lang): Project[] => projectData.map((p) => ({ ...p, ...dict(lang).projects[p.slug] }));

export const slugs = projectData.map((p) => p.slug);

export function projectFor(lang: Lang, slug: string): Project | undefined {
  const data = projectData.find((p) => p.slug === slug);
  return data && { ...data, ...dict(lang).projects[slug] };
}

export function nextProjectFor(lang: Lang, slug: string): Project {
  const i = projectData.findIndex((p) => p.slug === slug);
  return projectsFor(lang)[(i + 1) % projectData.length];
}
