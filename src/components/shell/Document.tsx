import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import WorldMount from "@/components/world/WorldMount";
import { profile } from "@/data/portfolio";
import { fontVariables } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/i18n";
import { dict, localize, type Lang } from "@/locales";
import Shell from "./Shell";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
};

/** Site-wide metadata for one language. Pages add their own title and description. */
export function documentMetadata(lang: Lang): Metadata {
  const t = dict(lang);
  return {
    metadataBase: new URL(profile.url),
    title: { default: t.meta.title, template: `%s — ${profile.name}` },
    description: t.meta.description,
    authors: [{ name: profile.name }],
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: t.meta.locale,
      siteName: profile.name,
    },
  };
}

/** Canonical and hreflang links for a page that exists in both languages. */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  const slash = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  return {
    canonical: slash(localize(lang, path)),
    languages: { en: slash(localize("en", path)), fr: slash(localize("fr", path)), "x-default": slash(path) },
  };
}

// Runs before first paint: choreographed layouts only apply when motion is welcome.
const preflight = `(function(){var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');})();`;

/** The whole document, shared by the English and French root layouts. */
export default function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = dict(lang);
  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
        <noscript>
          <style>{`.loader{display:none!important}`}</style>
        </noscript>
        <a className="skip" href="#content">
          {t.a11y.skip}
        </a>
        <LocaleProvider lang={lang}>
          <WorldMount />
          <Shell>{children}</Shell>
        </LocaleProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
