"use client";

import Image from "next/image";
import { useEffect, useRef, ViewTransition, type CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { useLocale } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { prime, useScene } from "@/lib/useScene";
import { fill } from "@/locales";
import Magnetic from "../ui/Magnetic";
import { Line } from "../ui/Text";
import { ProjectLink } from "../ui/TransitionLink";
import { CarsOverlay, SwiftOverlay, ZiaratOverlay } from "./Stages";

/** Where the picture starts, per layout, before it expands to fill the stage. */
const origins = {
  right: { x: 27, y: 15, rotateY: -24, rotateX: 7, rotateZ: 1.5 },
  left: { x: -27, y: 15, rotateY: 24, rotateX: 7, rotateZ: -1.5 },
  rise: { x: 0, y: 30, rotateY: 0, rotateX: 38, rotateZ: 0 },
} as const;

/** The stage-specific part of the pinned timeline: the system doing its work on the picture. */
function addStage(tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc, stage: Project["stage"]) {
  const readout = (at: number) =>
    tl
      .fromTo(q(".readout"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.07, ease: "power2.out" }, at)
      .fromTo(q(".readout__row"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.08, stagger: 0.04, ease: "none" }, at + 0.04);

  if (stage === "ziarat") {
    tl.fromTo(q(".zi__scan"), { y: 470, opacity: 1 }, { y: 1150, duration: 0.18, ease: "none" }, 0.46)
      .to(q(".zi__scan"), { opacity: 0, duration: 0.03 }, 0.64)
      .fromTo(q(".cv__box rect"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12, ease: "power2.out" }, 0.56)
      .fromTo(q(".cv__box path, .cv__box text"), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.62);
    readout(0.66);
  }
  if (stage === "cars") {
    tl.fromTo(q(".cars__scan"), { x: 0, opacity: 1 }, { x: 1500, duration: 0.22, ease: "none" }, 0.44)
      .to(q(".cars__scan"), { opacity: 0, duration: 0.03 }, 0.66)
      .fromTo(q(".cv__box rect"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.1, stagger: 0.035, ease: "power2.out" }, 0.48)
      .fromTo(q(".cv__box text"), { opacity: 0 }, { opacity: 1, duration: 0.04, stagger: 0.035 }, 0.54);
    readout(0.64);
    tl.fromTo(q(".readout__bar b"), { scaleX: 0 }, { scaleX: 1, duration: 0.1, stagger: 0.03, ease: "power2.out" }, 0.7);
  }
  if (stage === "swift") {
    tl.fromTo(q(".swift__pulse"), { strokeDashoffset: 0.08 }, { strokeDashoffset: -1, duration: 0.14, stagger: 0.12, ease: "none" }, 0.46)
      .fromTo(q(".swift__ring"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.12, ease: "power2.inOut" }, 0.54);
    readout(0.62);
  }
}

export default function ProjectScene({ project }: { project: Project }) {
  const { t, href } = useLocale();
  const root = useRef<HTMLElement>(null);
  const { slug, layout, stage, cover } = project;
  const chars = Math.max(...project.title.map((l) => l.length));

  // Fetch and decode the picture a viewport and a half early, off the main
  // thread, so its first frame on screen costs nothing.
  useEffect(() => {
    const el = root.current;
    const img = el?.querySelector<HTMLImageElement>(".project__picture");
    if (!el || !img) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        img.loading = "eager";
        img.decode?.().catch(() => {});
      },
      { rootMargin: "150% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useScene(root, ({ wide, motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    const titleLines = q(".project__title .line__inner");
    const media = q(".project__media")[0];

    if (!wide) {
      // Narrow screens: a document, not a pinned stage. One reveal and a gentle drift.
      gsap.from(titleLines, {
        yPercent: 108,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
      gsap.fromTo(
        q(".project__fit"),
        { yPercent: -5, scale: 1.12 },
        { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } },
      );
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: media, start: "top 70%", end: "bottom 45%", scrub: true },
      });
      tl.to({}, { duration: 1 }, 0);
      addStage(tl, q, stage);
      return;
    }

    const from = origins[layout];
    const vw = () => window.innerWidth / 100;
    const vh = () => window.innerHeight / 100;

    // Entering: the title rises out of its mask and the picture appears small, tilted in space.
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true } })
      .fromTo(q(".project__num"), { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.16)
      .fromTo(titleLines, { yPercent: 108 }, { yPercent: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, 0.22)
      .fromTo(media, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "power2.out" }, 0.5);

    // Pinned: the picture flattens and expands; the title slips behind it; the facts arrive.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true, onRefresh: () => prime(tl) },
    });
    tl.fromTo(
      media,
      { x: () => from.x * vw(), y: () => from.y * vh(), scale: 0.4, rotateY: from.rotateY, rotateX: from.rotateX, rotateZ: from.rotateZ },
      { x: 0, y: 0, scale: 1, rotateY: 0, rotateX: 0, rotateZ: 0, duration: 0.5, ease: "power2.inOut" },
      0,
    )
      .to(q(".project__title"), { yPercent: layout === "rise" ? -74 : -46, opacity: 0.32, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(q(".project__num"), { opacity: 0, duration: 0.2 }, 0.05)
      .fromTo(q(".project__fit"), { scale: 1.18 }, { scale: 1, duration: 1, ease: "none" }, 0)
      .fromTo(q(".project__scrim"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.4)
      .fromTo(q(".project__caption"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.46)
      .fromTo(q(".project__meta > *"), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12, stagger: 0.03, ease: "power2.out" }, 0.44)
      .to({}, { duration: 0.04 }, 0.96);
    addStage(tl, q, stage);
    prime(tl);

    // Leaving: the picture keeps a little of its own momentum.
    gsap.to(q(".project__stage"), {
      yPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: el, start: "bottom bottom", end: "bottom top", scrub: true },
    });
  });

  const study = href(`/work/${slug}`);

  return (
    <article
      ref={root}
      className={`project project--${layout} project--${stage}`}
      id={`p-${slug}`}
      data-world={project.world}
      data-section={`${project.num} — ${project.name}`}
      style={{ "--chars": chars } as CSSProperties}
      aria-labelledby={`t-${slug}`}
    >
      <div className="project__stage">
        <span className="project__num display" aria-hidden="true">
          {project.num}
        </span>

        <h3 className={`project__title display${project.keepCase ? " is-cased" : ""}`} id={`t-${slug}`} aria-label={project.name}>
          {project.title.map((line) => (
            <Line key={line}>
              <span aria-hidden="true">{line}</span>
            </Line>
          ))}
        </h3>

        <ProjectLink className="project__media" href={study} data-cursor="view" aria-label={fill(t.work.open, { name: project.name })}>
          <ViewTransition name={`media-${slug}`} share="morph" default="none">
            <div className="project__frame">
              <div className="project__fit" style={{ "--focus": cover.focus ?? "50% 50%" } as CSSProperties}>
                <Image
                  className="project__picture"
                  src={cover.src}
                  alt={project.coverAlt}
                  sizes="(max-width: 860px) 100vw, 78vw"
                  quality={88}
                  placeholder="blur"
                />
                {stage === "ziarat" && <ZiaratOverlay project={project} />}
                {stage === "cars" && <CarsOverlay />}
                {stage === "swift" && <SwiftOverlay />}
              </div>
              <span className="project__scrim" aria-hidden="true" />
            </div>
          </ViewTransition>
          <span className="project__caption mono">
            <i data-kind={cover.kind} aria-hidden="true" />
            {project.coverCaption}
          </span>
        </ProjectLink>

        <div className="project__meta">
          <p className="project__flow mono">{project.flow.join(" → ")}</p>
          <dl className="project__facts mono">
            <div>
              <dt>{t.work.category}</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>{t.work.context}</dt>
              <dd>{project.context}</dd>
            </div>
            {project.year && (
              <div>
                <dt>{t.work.year}</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div>
              <dt>{t.work.scope}</dt>
              <dd>{project.scope.join(" · ")}</dd>
            </div>
          </dl>
          <p className="project__summary">{project.summary}</p>
          <p className="project__actions">
            <Magnetic>
              <ProjectLink className="button" href={study} data-cursor="view">
                {t.work.enter} <span aria-hidden="true">↗</span>
              </ProjectLink>
            </Magnetic>
          </p>
        </div>
      </div>
    </article>
  );
}
