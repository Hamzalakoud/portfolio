"use client";

import { useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { useScene } from "@/lib/useScene";
import { Line } from "../ui/Text";

/**
 * Education as two large entries, then the certifications: PSM I as a seal
 * whose ring turns with the scroll, and the courses as a quiet list.
 */
export default function Credentials() {
  const { t } = useLocale();
  const c = t.credentials;
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 70%" } })
      .from(q(".creds__title .line__inner"), { yPercent: 108, duration: 1.2, ease: "expo.out" }, 0)
      .from(q(".school"), { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.1 }, 0.2);
    gsap
      .timeline({ scrollTrigger: { trigger: q(".certs")[0], start: "top 72%" } })
      .from(q(".seal"), { scale: 0.6, rotate: -40, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, 0)
      .from(q(".certs__reveal"), { y: 26, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 }, 0.2);
    gsap.fromTo(
      q(".seal__ring"),
      { rotate: 0 },
      { rotate: 160, ease: "none", transformOrigin: "50% 50%", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  return (
    <section ref={root} className="creds" id="education" data-world="credentials" data-section={t.sections.credentials} aria-labelledby="creds-title">
      <header className="creds__head">
        <p className="creds__label mono">
          <span>06</span>
          <span>{c.title}</span>
        </p>
        <h2 className="creds__title display" id="creds-title">
          <Line>{c.title}</Line>
        </h2>
      </header>

      <ol className="schools">
        {c.education.map((e) => (
          <li className="school" key={e.school}>
            <p className="school__period mono">{e.period}</p>
            <h3 className="school__name display">{e.school}</h3>
            <div className="school__detail">
              <p className="school__degree">{e.degree}</p>
              {(e.full || e.note) && <p className="school__meta mono">{[e.full, e.note].filter(Boolean).join(" · ")}</p>}
            </div>
          </li>
        ))}
      </ol>

      <div className="certs">
        <h3 className="certs__title mono certs__reveal">{c.certTitle}</h3>

        <div className="certs__featured">
          <div className="seal" aria-hidden="true">
            <svg viewBox="0 0 400 400">
              <defs>
                <path id="seal-ring" d="M200 200 m-162 0 a162 162 0 1 1 324 0 a162 162 0 1 1 -324 0" />
              </defs>
              <circle cx="200" cy="200" r="196" className="seal__edge" />
              <circle cx="200" cy="200" r="128" className="seal__inner" />
              <g className="seal__ring">
                <text>
                  <textPath href="#seal-ring" textLength="1012" lengthAdjust="spacing">
                    {c.featured.ring.toUpperCase()}
                  </textPath>
                </text>
              </g>
              <text x="200" y="214" className="seal__short" textAnchor="middle">
                {c.featured.short}
              </text>
              <text x="200" y="262" className="seal__year" textAnchor="middle">
                {c.featured.year}
              </text>
            </svg>
          </div>
          <div className="certs__copy">
            <p className="certs__name display certs__reveal">{c.featured.name}</p>
            <p className="certs__issuer mono certs__reveal">
              {c.featured.issuer} · {c.featured.year}
            </p>
          </div>
        </div>

        <div className="courses">
          <p className="courses__label mono certs__reveal">{c.coursesLabel}</p>
          <ul className="courses__list">
            {c.courses.map((course) => (
              <li className="course certs__reveal" key={course.name}>
                <span className="course__name">{course.name}</span>
                <span className="course__issuer mono">{course.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
