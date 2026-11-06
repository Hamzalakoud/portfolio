"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useScene } from "@/lib/useScene";
import { setOverride } from "@/lib/world/store";
import { Line } from "../ui/Text";
import { ProjectLink } from "../ui/TransitionLink";

/**
 * The timeline, in the index's language: one row per role, the organisation
 * set large. A rail draws itself down the list as it is read; on a mouse, the
 * row under the pointer widens and lends the shader its palette.
 */
export default function Experience() {
  const { t, href } = useLocale();
  const { experience } = t;
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useScene(root, ({ motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap.from(q(".experience__title .line__inner"), {
      yPercent: 108,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 72%" },
    });
    gsap.from(q(".experience__lede"), { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 66%" } });
    gsap.from(q(".job"), {
      yPercent: 30,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: { trigger: q(".timeline")[0], start: "top 80%" },
    });
    gsap.fromTo(
      q(".timeline__rail i"),
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(".timeline")[0], start: "top 62%", end: "bottom 62%", scrub: true } },
    );
    // Each dot lights once the rail has reached it.
    for (const job of q(".job")) {
      ScrollTrigger.create({ trigger: job, start: "top 62%", toggleClass: { targets: job, className: "is-reached" } });
    }
  });

  const enter = (i: number) => {
    setActive(i);
    setOverride(experience.jobs[i].world);
  };
  const leave = () => {
    setActive(-1);
    setOverride(null);
  };

  useEffect(() => () => setOverride(null), []);

  return (
    <section ref={root} className="experience" id="experience" data-world="experience" data-section={t.sections.experience} aria-labelledby="experience-title">
      <header className="experience__head">
        <h2 className="experience__title display" id="experience-title">
          <Line>{experience.title}</Line>
        </h2>
        <p className="experience__lede">{experience.lede}</p>
      </header>

      <ol className="timeline" onPointerLeave={leave}>
        <span className="timeline__rail" aria-hidden="true">
          <i />
        </span>
        {experience.jobs.map((job, i) => (
          <li
            className={`job${job.other ? " is-other" : ""}${active === i ? " is-active" : ""}${active >= 0 && active !== i ? " is-dim" : ""}`}
            key={`${job.org}-${job.period}-${job.role}`}
            onPointerEnter={() => enter(i)}
            onFocus={() => enter(i)}
            onBlur={leave}
          >
            <span className="job__dot" aria-hidden="true" />
            <p className="job__period mono">{job.period}</p>
            <div className="job__main">
              <h3 className="job__org display">{job.org}</h3>
              <p className="job__role mono">
                {job.role}
                {job.other && <span className="job__tag">{experience.beyond}</span>}
              </p>
            </div>
            <div className="job__body">
              <ul className="job__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {job.study && (
                <ProjectLink className="textlink job__link" href={href(`/work/${job.study}`)} data-cursor="view">
                  {experience.study} <span aria-hidden="true">↗</span>
                </ProjectLink>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
