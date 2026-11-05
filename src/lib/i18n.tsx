"use client";

import { createContext, useContext, type ReactNode } from "react";
import { dict, localize, type Lang } from "@/locales";

const LocaleContext = createContext<Lang>("en");

/** Each root layout (English at /, French at /fr) provides its language once. */
export function LocaleProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const lang = useContext(LocaleContext);
  return { lang, t: dict(lang), href: (path: string) => localize(lang, path) };
}
