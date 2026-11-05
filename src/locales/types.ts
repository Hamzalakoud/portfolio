/**
 * Everything a visitor reads, per language. Facts that do not change between
 * languages (links, years, images, slugs) live in `src/data/portfolio.ts`.
 */
export type Lang = "en" | "fr";

export type Fact = { label: string; value: string; note: string };
export type ArchNode = { label: string; note: string };

/** One display line. `serif` sets it in the italic serif, `hollow` as an outline. */
export type DisplayLine = { text: string; serif?: boolean; hollow?: boolean; indent?: number };

export type ProjectCopy = {
  name: string;
  /** Display title, one entry per line. */
  title: string[];
  category: string;
  context: string;
  summary: string;
  /** The second half of the description, shown on the case study. */
  detail: string;
  /** Three-step essence, shown as A → B → C. */
  flow: string[];
  /** What the system is made of, from the CV. Replaces a technology list the CV does not give. */
  scope: string[];
  features: string[];
  /** Left out when the CV does not say what Hamza's part was. */
  role?: string;
  contribution?: string[];
  problem: string;
  architecture: ArchNode[];
  /** What the page does and does not show — stated plainly. */
  notes: string;
  coverAlt: string;
  coverCaption: string;
  /** One entry per extra picture in `src/data/portfolio.ts`, in the same order. */
  gallery: { alt: string; caption: string }[];
};

export type Job = {
  period: string;
  org: string;
  role: string;
  points: string[];
  /** Work outside software, shown as such. */
  other?: boolean;
  /** Slug of the case study that tells this story in full. */
  study?: string;
  /** Shader palette lent to the page while the row is hovered. */
  world: string;
};

export type Panel = { word: string; text: string; from: string };

export type Dict = {
  meta: { title: string; description: string; locale: string };
  a11y: { skip: string; loading: string; newTab: string; primary: string; language: string; home: string };
  nav: { work: string; experience: string; skills: string; about: string; contact: string };
  cursor: { view: string; open: string; drag: string };
  loader: { mark: string; note: string };
  sections: {
    hero: string;
    manifesto: string;
    work: string;
    experience: string;
    expertise: string;
    stack: string;
    credentials: string;
    beyond: string;
    contact: string;
  };
  hero: {
    roles: string[];
    location: string;
    status: string;
    statusPeriod: string;
    scroll: string;
    tagline: string;
    build: string;
    rest: DisplayLine[];
    supporting: string;
    intro: string;
  };
  manifesto: { label: string; lines: DisplayLine[] };
  about: {
    label: string;
    paragraphs: string[];
    fields: string[];
    fieldsLabel: string;
    facts: Fact[];
    resume: string;
  };
  work: {
    /** The word the shader is seen through, and the index of the letter whose stem the zoom enters. */
    word: string;
    stem: number;
    selected: string;
    srWork: string;
    hint: string;
    category: string;
    context: string;
    scope: string;
    year: string;
    enter: string;
    open: string;
  };
  projects: Record<string, ProjectCopy>;
  /** Labels drawn over the project pictures on the home page. */
  stages: {
    concept: string;
    recognised: string;
    scan: string;
    illustrative: string;
    parts: { wheel: string; headlight: string; mirror: string; door: string };
    mapping: string;
    generic: string;
  };
  experience: { title: string; lede: string; beyond: string; study: string; jobs: Job[] };
  expertise: { label: string; heading: string[]; hint: string; panels: Panel[] };
  stack: { label: string; rows: string[][] };
  credentials: {
    title: string;
    education: { school: string; full: string; degree: string; period: string; note: string }[];
    certTitle: string;
    featured: { name: string; short: string; issuer: string; year: string; ring: string };
    courses: { name: string; issuer: string }[];
    coursesLabel: string;
  };
  beyond: {
    title: string[];
    lede: string;
    cards: { kicker: string; word: string; title: string; text: string }[];
  };
  contact: {
    location: string;
    title: DisplayLine[];
    cta: string;
    focus: string;
    email: string;
    resume: string;
    built: string;
  };
  study: {
    back: string;
    role: string;
    year: string;
    context: string;
    scope: string;
    chapters: { context: string; idea: string; features: string; architecture: string; contribution: string; notes: string };
    notesLabel: string;
    links: string;
    next: string;
    all: string;
  };
  resume: {
    title: string;
    back: string;
    print: string;
    role: string;
    profileLabel: string;
    profile: string;
    experienceLabel: string;
    projectsLabel: string;
    skillsLabel: string;
    skills: string[];
    educationLabel: string;
    certificationsLabel: string;
    languagesLabel: string;
    languages: string;
    activitiesLabel: string;
    activities: string[];
    download: string;
  };
  notFound: { title: string[]; back: string };
};
