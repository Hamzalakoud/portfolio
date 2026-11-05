"use client";

import Link from "next/link";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { useLocale } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { useScene } from "@/lib/useScene";
import Magnetic from "../ui/Magnetic";
import { Line } from "../ui/Text";

/** The ending. The sphere comes back, far too large for the screen; only its crown shows. */
export default function Contact() {
  const { t, href } = useLocale();
  const { contact } = t;
  const root = useRef<HTMLElement>(null);

  const socials = [
    { label: "GitHub", href: profile.github, external: true },
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin, external: true }] : []),
    { label: contact.email, href: `mailto:${profile.email}`, external: true },
    { label: contact.resume, href: href("/resume"), external: false },
  ];

  useScene(root, ({ motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 58%" } })
      .from(q(".contact__title .line__inner"), { yPercent: 108, duration: 1.4, ease: "expo.out", stagger: 0.11 }, 0)
      .from(q(".contact__reveal"), { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.07 }, 0.5);
  });

  const title = contact.title.map((l) => l.text).join(" ");

  return (
    <section ref={root} className="contact" id="contact" data-world="contact" data-world-lead="1" data-section={t.sections.contact} aria-labelledby="contact-title">
      <p className="contact__label mono contact__reveal">
        <span>08</span>
        <span>{contact.location}</span>
      </p>

      <h2 className="contact__title display" id="contact-title" aria-label={title}>
        {contact.title.map((line) => (
          <Line key={line.text} className={line.serif ? "contact__serif" : undefined}>
            <span aria-hidden="true">{line.text}</span>
          </Line>
        ))}
      </h2>

      <div className="contact__actions">
        <Magnetic strength={0.3} className="contact__reveal">
          <a className="cta" href={`mailto:${profile.email}`} data-cursor="ext">
            <span>{contact.cta}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
        <p className="contact__mail mono contact__reveal">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <br />
          {contact.focus}
        </p>
        <ul className="contact__social mono contact__reveal">
          {socials.map((s) => (
            <li key={s.label}>
              <Magnetic>
                {s.external ? (
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="ext"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                    {s.href.startsWith("http") && <span className="sr-only"> {t.a11y.newTab}</span>}
                  </a>
                ) : (
                  <Link href={s.href} data-cursor="open">
                    {s.label} <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer mono">
        <p>
          {profile.name} <span>{profile.year}</span>
        </p>
        <p>{profile.coords}</p>
        <p>
          {contact.built} <span>Next.js × WebGL × Lenis</span>
        </p>
      </footer>
    </section>
  );
}
