import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties, type ReactNode } from "react";
import Architecture from "@/components/study/Architecture";
import Reveals from "@/components/study/Reveals";
import Magnetic from "@/components/ui/Magnetic";
import { Line } from "@/components/ui/Text";
import { BackLink, ProjectLink } from "@/components/ui/TransitionLink";
import { nextProjectFor, projectData, projectFor } from "@/data/portfolio";
import { dict, localize, type Lang } from "@/locales";

export function studyMetadata(lang: Lang, slug: string): Metadata {
  const project = projectFor(lang, slug);
  return project ? { title: project.name, description: project.summary } : {};
}

function Chapter({ id, n, label, children, wide }: { id: string; n: string; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={`chapter${wide ? " chapter--wide" : ""}`} aria-labelledby={`c-${id}-${n}`}>
      <h2 className="chapter__label mono" id={`c-${id}-${n}`} data-reveal>
        <span>{n}</span>
        <span>{label}</span>
      </h2>
      <div className="chapter__body">{children}</div>
    </section>
  );
}

export default function StudyPage({ lang, slug }: { lang: Lang; slug: string }) {
  const project = projectFor(lang, slug);
  if (!project) notFound();

  const t = dict(lang);
  const s = t.study;
  const home = localize(lang, "/");
  const next = nextProjectFor(lang, slug);
  const chars = Math.max(...project.title.map((l) => l.length));
  const total = String(projectData.length).padStart(2, "0");
  const cased = project.keepCase ? " is-cased" : "";

  // Chapters are numbered as they appear: some projects have no stated contribution.
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <ViewTransition enter={{ "to-project": "page-in", default: "none" }} exit={{ "to-home": "page-out", "to-project": "page-out", default: "none" }} default="none">
      <main className="study" style={{ "--chars": chars } as CSSProperties}>
        <Reveals />

        <header className="study__hero" data-world={`${project.world}:top`} data-section={`${project.num} — ${project.name}`}>
          <p className="study__crumbs mono">
            <Magnetic>
              <BackLink href={`${home}#p-${slug}`} data-cursor="open">
                <span aria-hidden="true">←</span> {s.back}
              </BackLink>
            </Magnetic>
            <span>
              {project.num} / {total}
            </span>
            <span>{project.category}</span>
          </p>

          <h1 className={`study__title display${cased}`} aria-label={project.name}>
            {project.title.map((line) => (
              <Line key={line}>
                <span aria-hidden="true">{line}</span>
              </Line>
            ))}
          </h1>

          <figure className="study__cover">
            <ViewTransition name={`media-${slug}`} share="morph" default="none">
              <div className="study__frame">
                <Image
                  src={project.cover.src}
                  alt={project.coverAlt}
                  sizes="(max-width: 860px) 100vw, 88vw"
                  quality={88}
                  placeholder="blur"
                  priority
                  style={{ objectPosition: project.cover.focus ?? "50% 50%" }}
                />
              </div>
            </ViewTransition>
            <figcaption className="mono">
              <i data-kind={project.cover.kind} aria-hidden="true" />
              {project.coverCaption}
            </figcaption>
          </figure>

          <div className="study__intro">
            <p className="study__summary">{project.summary}</p>
            <dl className="study__facts mono">
              {project.role && (
                <div>
                  <dt>{s.role}</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt>{s.year}</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              <div>
                <dt>{s.context}</dt>
                <dd>{project.context}</dd>
              </div>
              <div>
                <dt>{s.scope}</dt>
                <dd>{project.scope.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          {project.links.length > 0 && (
            <ul className="study__links mono" aria-label={s.links}>
              {project.links.map((link) => (
                <li key={link.href}>
                  <Magnetic>
                    <a className="button" href={link.href} target="_blank" rel="noopener noreferrer" data-cursor="ext">
                      {link.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> {t.a11y.newTab}</span>
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="study__body" data-world={`${project.world}:calm`}>
          <Chapter id={slug} n={num()} label={s.chapters.context}>
            <p className="chapter__statement" data-reveal>
              {project.problem}
            </p>
          </Chapter>

          <Chapter id={slug} n={num()} label={s.chapters.idea}>
            <p className="chapter__lede" data-reveal>
              {project.detail}
            </p>
            <p className="chapter__flow display" data-reveal aria-label={project.flow.join(" → ")}>
              {project.flow.map((step, i) => (
                <span key={step} aria-hidden="true">
                  {i > 0 && <i>→</i>}
                  {step}
                </span>
              ))}
            </p>
          </Chapter>

          <Chapter id={slug} n={num()} label={s.chapters.features}>
            <ol className="steps">
              {project.features.map((feature, i) => (
                <li key={feature} data-reveal>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <p>{feature}</p>
                </li>
              ))}
            </ol>
          </Chapter>

          <Chapter id={slug} n={num()} label={s.chapters.architecture} wide>
            <Architecture nodes={project.architecture} />
          </Chapter>

          {project.contribution && (
            <Chapter id={slug} n={num()} label={s.chapters.contribution}>
              <ul className="process">
                {project.contribution.map((item) => (
                  <li key={item} data-reveal>
                    {item}
                  </li>
                ))}
              </ul>
            </Chapter>
          )}

          <Chapter id={slug} n={num()} label={s.chapters.notes}>
            <p className="chapter__caveat" data-reveal>
              <span className="mono">{s.notesLabel}</span>
              {project.notes}
            </p>
            {project.shots.length > 0 && (
              <div className="gallery">
                {project.shots.map((shot, i) => (
                  <figure key={i} className="gallery__item" data-reveal>
                    <Image src={shot.src} alt={project.gallery[i]?.alt ?? ""} sizes="(max-width: 860px) 100vw, 70vw" placeholder="blur" />
                    <figcaption className="mono">
                      <i data-kind={shot.kind} aria-hidden="true" />
                      {project.gallery[i]?.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </Chapter>
        </div>

        <nav className="next" data-world={next.world} data-world-lead="1" aria-label={s.next}>
          <p className="mono">
            {s.next} — {next.num} / {total}
          </p>
          <ProjectLink className="next__link" href={localize(lang, `/work/${next.slug}`)} data-cursor="view">
            <span className={`next__title display${next.keepCase ? " is-cased" : ""}`}>{next.name}</span>
            <span className="next__go mono">
              {next.category} <span aria-hidden="true">↗</span>
            </span>
          </ProjectLink>
          <p className="next__home mono">
            <Magnetic>
              <BackLink href={`${home}#work`}>{s.all}</BackLink>
            </Magnetic>
          </p>
        </nav>
      </main>
    </ViewTransition>
  );
}
