"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { profile } from "@/data/portfolio";
import { useLocale } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/motion";
import { langs, translatePath } from "@/locales";
import Magnetic from "../ui/Magnetic";

/** Each language is named in itself. */
const names = { en: "English", fr: "Français" } as const;

/**
 * Minimal navigation. It is drawn in difference blend, so it inverts against
 * whatever passes beneath it — shader, picture or black.
 */
export default function Nav() {
  const { lang, t, href } = useLocale();
  const pathname = usePathname();
  const bare = pathname.replace(/\/$/, "") || "/";
  const home = bare === href("/");
  const indicator = useRef<HTMLSpanElement>(null);

  const links = [
    { label: t.nav.work, hash: "work", optional: true },
    { label: t.nav.experience, hash: "experience", optional: true },
    { label: t.nav.skills, hash: "expertise", optional: true },
    { label: t.nav.about, hash: "about", optional: true },
  ];

  // Current-section readout.
  useEffect(() => {
    const out = indicator.current;
    if (!out) return;
    out.textContent = "";
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) out.textContent = (entry.target as HTMLElement).dataset.section ?? "";
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const go = (hash: string) => (e: MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    scrollToTarget(`#${hash}`);
  };

  return (
    <>
      <header className="nav">
        <Magnetic strength={0.18}>
          <Link
            className="nav__mark"
            href={href("/")}
            onClick={(e) => home && (e.preventDefault(), scrollToTarget(0))}
            aria-label={`${profile.name} — ${t.a11y.home}`}
          >
            {profile.mark}
          </Link>
        </Magnetic>
        <nav className="nav__links" aria-label={t.a11y.primary}>
          {links.map((l) => (
            <Magnetic key={l.hash} strength={0.18} className={l.optional ? "nav__optional" : undefined}>
              <Link className="nav__link" href={`${href("/")}#${l.hash}`} onClick={go(l.hash)}>
                {l.label}
              </Link>
            </Magnetic>
          ))}
        </nav>
        <div className="nav__end">
          {/* The same page in the other language. Each language has its own root layout, so this is a full load. */}
          <p className="nav__lang" role="group" aria-label={t.a11y.language}>
            {langs.map((code) =>
              code === lang ? (
                <span key={code} className="nav__link is-current" aria-current="true" lang={code}>
                  {code.toUpperCase()}
                  <span className="sr-only"> — {names[code]}</span>
                </span>
              ) : (
                <Link key={code} className="nav__link" href={translatePath(bare, code)} hrefLang={code} lang={code}>
                  {code.toUpperCase()}
                  <span className="sr-only"> — {names[code]}</span>
                </Link>
              ),
            )}
          </p>
          <Magnetic strength={0.18}>
            <Link className="nav__link nav__contact" href={`${href("/")}#contact`} onClick={go("contact")}>
              {t.nav.contact} <span aria-hidden="true">↗</span>
            </Link>
          </Magnetic>
        </div>
      </header>
      <p className="nav__section mono" aria-hidden="true">
        <span ref={indicator} />
      </p>
    </>
  );
}
