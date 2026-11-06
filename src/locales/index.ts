import { en } from "./en";
import { fr } from "./fr";
import type { Dict, Lang } from "./types";

export type { Dict, Lang } from "./types";

export const langs: Lang[] = ["en", "fr"];
export const dictionaries: Record<Lang, Dict> = { en, fr };
export const dict = (lang: Lang) => dictionaries[lang];

/** English lives at the root, French under /fr. Paths are app paths, without the base path. */
export function localize(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/fr" : `/fr${path.startsWith("/") ? path : `/${path}`}`;
}

/** The same page in the other language. */
export function translatePath(pathname: string, to: Lang) {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
  return localize(to, bare);
}

export const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
