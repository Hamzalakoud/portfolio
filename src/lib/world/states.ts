/**
 * Scene states for the shader world. The vocabulary follows ShaderGradient
 * (three colours, uStrength / uDensity / uFrequency / uAmplitude / uSpeed,
 * camera angles) with one addition: `morph` moves a single mesh continuously
 * between a sphere (0) and a plane (1), so states blend instead of swapping.
 */
export type WorldState = {
  c1: string;
  c2: string;
  c3: string;
  /** 0 sphere → 1 plane. */
  morph: number;
  /** Rolling wave layer on the plane (the waterPlane feel). */
  water: number;
  /** Sphere diameter as a fraction of the viewport's shorter side. */
  scale: number;
  /** Centre offset in half-viewports: 1 is the right / top edge. */
  x: number;
  y: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  strength: number;
  density: number;
  frequency: number;
  amplitude: number;
  speed: number;
  /** Camera orbit, radians. */
  azimuth: number;
  polar: number;
  brightness: number;
  opacity: number;
  grain: number;
  /** Directional court-like lines across the surface. */
  lines: number;
  /** Technical scanning band. */
  scan: number;
  /** Fresnel rim light. */
  rim: number;
  /** How far the third colour reaches into the body (0 keeps it to the rim). */
  tint: number;
};

export const NUMERIC = [
  "morph",
  "water",
  "scale",
  "x",
  "y",
  "rotX",
  "rotY",
  "rotZ",
  "strength",
  "density",
  "frequency",
  "amplitude",
  "speed",
  "azimuth",
  "polar",
  "brightness",
  "opacity",
  "grain",
  "lines",
  "scan",
  "rim",
  "tint",
] as const satisfies readonly (keyof WorldState)[];

const base: WorldState = {
  c1: "#3a5bff",
  c2: "#0c1757",
  c3: "#f2e4cc",
  morph: 0,
  water: 0,
  scale: 0.86,
  x: 0,
  y: 0,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  strength: 0.26,
  density: 1.25,
  frequency: 2.2,
  amplitude: 0.3,
  speed: 0.11,
  azimuth: 0,
  polar: 0,
  brightness: 1,
  opacity: 1,
  grain: 0.05,
  lines: 0,
  scan: 0,
  rim: 0.5,
  tint: 1,
};

type Preset = Partial<WorldState> & { narrow?: Partial<WorldState> };

const presets: Record<string, Preset> = {
  // — Opening: a slow liquid sphere, Mediterranean cobalt with sand highlights.
  hero: {
    c1: "#3a5bff",
    c2: "#0c1757",
    c3: "#f2e4cc",
    scale: 0.92,
    x: 0.2,
    y: -0.02,
    rotZ: -0.25,
    narrow: { x: 0.1, y: 0.02, scale: 1.05 },
  },
  "hero-build": {
    c1: "#4d6bff",
    c2: "#2a137a",
    c3: "#ffb36b",
    scale: 1.3,
    x: 0,
    y: -0.02,
    strength: 0.36,
    density: 1.05,
    rotZ: 0.2,
    azimuth: 0.12,
    narrow: { scale: 1.5 },
  },
  "hero-statement": {
    c1: "#f0dcbd",
    c2: "#3a5bff",
    c3: "#ff7a3d",
    morph: 0.34,
    scale: 1.45,
    x: 0.42,
    y: -0.3,
    strength: 0.42,
    density: 0.9,
    rotY: -0.5,
    rotZ: 0.35,
    brightness: 0.82,
    azimuth: -0.1,
    narrow: { x: 0.2, y: -0.5, scale: 1.7 },
  },
  // — The sphere stretches into an abstract plane and steps back for reading.
  manifesto: {
    c1: "#13258f",
    c2: "#1fa6b8",
    c3: "#e8833a",
    morph: 0.86,
    water: 0.35,
    scale: 1.05,
    x: 0.62,
    y: 0.0,
    rotX: -0.6,
    rotY: -0.8,
    rotZ: 0.35,
    strength: 0.62,
    density: 1.15,
    speed: 0.09,
    brightness: 0.66,
    opacity: 0.9,
    narrow: { x: 0.45, brightness: 0.4 },
  },
  about: {
    c1: "#0e1a52",
    c2: "#2a4bc8",
    c3: "#a3461c",
    morph: 0.95,
    water: 0.4,
    scale: 1.1,
    x: -0.5,
    y: -0.75,
    rotX: -1.12,
    rotZ: 0.3,
    strength: 0.5,
    density: 1.1,
    speed: 0.08,
    brightness: 0.42,
    opacity: 0.85,
  },
  // — The surface takes over the screen; it is seen through the word WORK.
  "work-intro": {
    c1: "#3a5bff",
    c2: "#f3e7d3",
    c3: "#ff8a3d",
    morph: 1,
    water: 0.7,
    scale: 1.3,
    rotX: -0.2,
    rotZ: 0.15,
    strength: 0.6,
    density: 0.62,
    speed: 0.14,
    brightness: 1.08,
    grain: 0.06,
  },
  // — Project worlds.
  // zIArat: whitewash, Sidi Bou Said blue and terracotta, a tiled floor.
  "p-ziarat": {
    c1: "#2a62e8",
    c2: "#f1e6d2",
    c3: "#c8643c",
    morph: 1,
    water: 0.55,
    scale: 1.3,
    y: -0.28,
    rotX: -0.95,
    rotZ: -0.12,
    strength: 0.42,
    density: 0.6,
    speed: 0.11,
    lines: 0.25,
    brightness: 0.85,
    polar: 0.05,
    narrow: { brightness: 0.5 },
  },
  // Car components: a graphite sphere under a scanning band, signal orange at the rim.
  "p-cars": {
    c1: "#d7dde4",
    c2: "#2a3038",
    c3: "#ff6a1a",
    morph: 0.08,
    scale: 1.15,
    x: 0.62,
    y: 0.1,
    strength: 0.13,
    density: 2.1,
    frequency: 5,
    amplitude: 0.08,
    speed: 0.07,
    scan: 1,
    brightness: 0.74,
    rim: 0.9,
    narrow: { x: 0.2, y: 0.5 },
  },
  // SWIFT: a ruled navy ledger with teal and a little gold.
  "p-swift": {
    c1: "#16b39a",
    c2: "#0b1f4a",
    c3: "#e6c27a",
    morph: 1,
    water: 0.2,
    scale: 1.3,
    y: -0.32,
    rotX: -1.0,
    rotZ: 0.22,
    strength: 0.2,
    density: 0.6,
    speed: 0.07,
    lines: 0.7,
    brightness: 0.72,
    rim: 0.3,
    narrow: { brightness: 0.5 },
  },
  // — Experience: calm, parked at the edge; a hovered row lends its palette.
  experience: {
    c1: "#2a2f38",
    c2: "#3a5bff",
    c3: "#f1e6d2",
    scale: 0.74,
    x: 1.04,
    y: -0.12,
    strength: 0.2,
    speed: 0.07,
    brightness: 0.5,
    opacity: 0.9,
    narrow: { x: 1.1, y: -0.5, scale: 1.1 },
  },
  expertise: {
    c1: "#3a5bff",
    c2: "#ff7a3d",
    c3: "#f2e4cc",
    morph: 1,
    water: 0.9,
    scale: 1.35,
    y: -0.5,
    rotX: -1.2,
    rotZ: 0.5,
    strength: 0.5,
    density: 0.5,
    speed: 0.13,
    brightness: 0.7,
    opacity: 0.9,
  },
  stack: {
    c1: "#8f9bff",
    c2: "#16206b",
    c3: "#f1e6d2",
    morph: 0.62,
    scale: 1.5,
    x: -0.3,
    y: 0.1,
    rotY: 0.9,
    rotZ: -0.4,
    strength: 0.5,
    density: 0.8,
    speed: 0.1,
    brightness: 0.34,
    opacity: 0.9,
  },
  // — Education: a quiet sphere on the left, gold for the certification.
  credentials: {
    c1: "#e6c27a",
    c2: "#1a2a6b",
    c3: "#f2e4cc",
    scale: 0.9,
    x: -1.08,
    y: 0.05,
    strength: 0.24,
    density: 1.4,
    speed: 0.08,
    brightness: 0.5,
    opacity: 0.9,
    narrow: { x: -1.2, y: -0.6, scale: 1.2 },
  },
  // — Beyond the code: a pitch at dusk, lines across the grass.
  beyond: {
    c1: "#2e9a5a",
    c2: "#06120c",
    c3: "#f2e4cc",
    morph: 1,
    water: 0.15,
    scale: 1.35,
    y: -0.3,
    rotX: -1.08,
    rotZ: 0.3,
    strength: 0.16,
    density: 0.5,
    speed: 0.08,
    lines: 1,
    brightness: 0.7,
    rim: 0.2,
    narrow: { brightness: 0.45 },
  },
  // — Ending: the sphere returns, enormous and calm, only its crown in view.
  contact: {
    c1: "#0c1757",
    c2: "#3a5bff",
    c3: "#ffb27a",
    scale: 2.5,
    x: 0,
    y: -2.2,
    strength: 0.1,
    density: 1.0,
    amplitude: 0.1,
    speed: 0.06,
    brightness: 0.86,
    rim: 1.15,
    tint: 0.12,
    narrow: { scale: 3.2, y: -1.3 },
  },
  resume: {
    c1: "#2a2f38",
    c2: "#3a5bff",
    c3: "#f1e6d2",
    scale: 1.4,
    x: 0.7,
    y: -0.6,
    strength: 0.2,
    speed: 0.06,
    brightness: 0.4,
  },
  // — Experience rows: palettes lent on hover.
  "x-biat": { c1: "#4d6bff", c2: "#0c1757", c3: "#f1e6d2" },
  "x-value": { c1: "#ff8a3d", c2: "#3a5bff", c3: "#f1e6d2" },
  "x-delights": { c1: "#e6c27a", c2: "#7a2f18", c3: "#f4ead6" },
  "x-comedy": { c1: "#ff4d6d", c2: "#2a0e3a", c3: "#ffd27a" },
};

const cache = new Map<string, WorldState>();

/**
 * Resolve a state key. A suffix adjusts a preset without redefining it:
 * `p-aura:calm` is the same world, stepped back so long-form text can sit over it.
 */
export function resolveState(key: string, narrow: boolean): WorldState {
  const id = `${key}|${narrow ? 1 : 0}`;
  const hit = cache.get(id);
  if (hit) return hit;

  const [name, mod] = key.split(":");
  const preset = presets[name] ?? presets.hero;
  const { narrow: narrowOverrides, ...rest } = preset;
  const state: WorldState = { ...base, ...rest, ...(narrow ? narrowOverrides : null) };

  // Phones have no picture behind the project copy, so project worlds step back.
  if (narrow && name.startsWith("p-") && !mod) {
    state.brightness *= 0.46;
    state.lines *= 0.6;
  }

  if (mod === "calm") {
    // Long-form reading: the project's world, small, dim and out at the edge.
    state.morph = Math.min(state.morph, 0.3);
    state.water = 0;
    state.scale = 1.0;
    state.x = 1.2;
    state.y = -0.85;
    state.rotX = 0;
    state.brightness *= 0.24;
    state.opacity *= 0.8;
    state.speed *= 0.7;
    state.lines *= 0.25;
    state.scan *= 0.4;
    if (narrow) {
      state.x = 0.9;
      state.y = -0.95;
    }
  }
  if (mod === "top") {
    // Case-study hero: the project's world, parked high and to the right.
    state.morph = Math.min(state.morph, 0.35);
    state.water = 0;
    state.scale = 1.2;
    state.x = 0.6;
    state.y = 0.45;
    state.rotX = 0;
    state.brightness *= 0.8;
    if (narrow) {
      state.x = 0.3;
      state.y = 0.6;
    }
  }

  cache.set(id, state);
  return state;
}

export const hasState = (key: string) => key.split(":")[0] in presets;
