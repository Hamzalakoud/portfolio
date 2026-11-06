"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { useLocale } from "@/lib/i18n";
import { gsap, motion, onFrame } from "@/lib/motion";
import { useScene } from "@/lib/useScene";
import Magnetic from "../ui/Magnetic";

export default function Manifesto() {
  const { t, href } = useLocale();
  const { manifesto, about } = t;
  const root = useRef<HTMLElement>(null);
  const sentence = manifesto.lines.map((l) => l.text).join(" ");
  // The longest line, indent included, sets the type size so no language overflows.
  const chars = Math.max(...manifesto.lines.map((l) => l.text.length + (l.indent ?? 0) * 1.15));

  useScene(root, ({ motion: animate }, el) => {
    if (!animate) return;
    const q = gsap.utils.selector(el);

    // Words light up in reading order as the block travels through the viewport.
    gsap.fromTo(
      q(".manifesto__word"),
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.6,
        scrollTrigger: { trigger: q(".manifesto__text")[0], start: "top 82%", end: "bottom 58%", scrub: true },
      },
    );

    gsap.from(q(".about__reveal"), {
      y: 28,
      autoAlpha: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger: q(".about")[0], start: "top 76%" },
    });

    // Fast scrolling leans the type; it settles when the scroll does.
    const text = q(".manifesto__text")[0] as HTMLElement;
    const skew = gsap.quickSetter(text, "skewY", "deg");
    return onFrame(() => skew(motion.v * -2.2));
  });

  const [lede, ...rest] = about.paragraphs;

  return (
    <section ref={root} className="manifesto" id="about" data-world="manifesto" data-section={t.sections.manifesto}>
      <p className="manifesto__label mono" aria-hidden="true">
        <span>01</span>
        <span>{manifesto.label}</span>
      </p>
      <h2 className="manifesto__text display" aria-label={sentence} style={{ "--chars": chars } as CSSProperties}>
        {manifesto.lines.map((line, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`manifesto__line${line.serif ? " is-serif" : ""}${line.hollow ? " is-hollow" : ""}`}
            style={{ "--indent": line.indent ?? 0 } as CSSProperties}
          >
            {line.text.split(" ").map((w, j) => (
              <span className="manifesto__word" key={j}>
                {w}{" "}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <div className="about" data-world="about">
        <p className="about__label mono about__reveal">
          <span>{about.label}</span>
          <span>{t.hero.location}</span>
        </p>
        <div className="about__body">
          <p className="about__lede about__reveal">{lede}</p>
          <div className="about__more">
            {rest.map((p) => (
              <p className="about__reveal" key={p}>
                {p}
              </p>
            ))}
          </div>
          <ul className="about__fields mono about__reveal" aria-label={about.fieldsLabel}>
            {about.fields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <dl className="about__facts">
            {about.facts.map((f) => (
              <div className="about__fact about__reveal" key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>
                  <span>{f.value}</span>
                  <small className="mono">{f.note}</small>
                </dd>
              </div>
            ))}
          </dl>
          <p className="about__reveal">
            <Magnetic>
              <Link className="textlink" href={href("/resume")} data-cursor="open">
                {about.resume} <span aria-hidden="true">↗</span>
              </Link>
            </Magnetic>
          </p>
        </div>
      </div>
    </section>
  );
}
