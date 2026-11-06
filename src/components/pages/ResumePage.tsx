import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/study/PrintButton";
import Magnetic from "@/components/ui/Magnetic";
import { profile, projectsFor } from "@/data/portfolio";
import { dict, localize, type Lang } from "@/locales";

export function resumeMetadata(lang: Lang): Metadata {
  const t = dict(lang);
  return { title: t.resume.title, description: `${profile.name} — ${t.resume.role}. ${t.meta.description}` };
}

/** A printable résumé, from the same content as the portfolio. No phone number: the CV PDF carries that. */
export default function ResumePage({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const r = t.resume;
  const c = t.credentials;
  const pdf = profile.cv[lang];

  return (
    <main className="resume" data-world="resume" data-section={r.title}>
      <p className="resume__crumbs mono">
        <Magnetic>
          <Link href={localize(lang, "/")} data-cursor="open">
            <span aria-hidden="true">←</span> {r.back}
          </Link>
        </Magnetic>
        <span className="resume__actions">
          {pdf && (
            <a className="textlink" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${pdf}`} download>
              {r.download}
            </a>
          )}
          <PrintButton label={r.print} />
        </span>
      </p>

      <header className="resume__head">
        <h1 className="display">{profile.name}</h1>
        <p className="resume__role">{r.role}</p>
        <p className="mono">
          {t.hero.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            {profile.githubLabel}
          </a>
          {profile.linkedin && (
            <>
              {" "}
              ·{" "}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </>
          )}
        </p>
      </header>

      <section className="resume__section" aria-labelledby="r-profile">
        <h2 className="mono" id="r-profile">
          {r.profileLabel}
        </h2>
        <p className="resume__lede">{r.profile}</p>
      </section>

      <section className="resume__section" aria-labelledby="r-experience">
        <h2 className="mono" id="r-experience">
          {r.experienceLabel}
        </h2>
        <div>
          {t.experience.jobs.map((job) => (
            <article className="resume__item" key={`${job.org}-${job.period}-${job.role}`}>
              <h3>
                {job.role} — {job.org}
              </h3>
              <p className="mono">{job.period}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="r-projects">
        <h2 className="mono" id="r-projects">
          {r.projectsLabel}
        </h2>
        <div>
          {projectsFor(lang).map((project) => (
            <article className="resume__item" key={project.slug}>
              <h3>
                <Link href={localize(lang, `/work/${project.slug}`)}>{project.name}</Link>
              </h3>
              <p className="mono">{project.context}</p>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="r-skills">
        <h2 className="mono" id="r-skills">
          {r.skillsLabel}
        </h2>
        <div>
          {r.skills.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="r-education">
        <h2 className="mono" id="r-education">
          {r.educationLabel}
        </h2>
        <div>
          {c.education.map((e) => (
            <article className="resume__item" key={e.school}>
              <h3>
                {e.degree} — {e.full ? `${e.school}, ${e.full}` : e.school}
              </h3>
              <p className="mono">
                {e.period}
                {e.note && ` · ${e.note}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="r-certifications">
        <h2 className="mono" id="r-certifications">
          {r.certificationsLabel}
        </h2>
        <ul className="resume__list">
          <li>
            <strong>{c.featured.name}</strong> — {c.featured.issuer} ({c.featured.year})
          </li>
          {c.courses.map((course) => (
            <li key={course.name}>
              {course.name} — {course.issuer}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume__section" aria-labelledby="r-languages">
        <h2 className="mono" id="r-languages">
          {r.languagesLabel}
        </h2>
        <p>{r.languages}</p>
      </section>

      <section className="resume__section" aria-labelledby="r-activities">
        <h2 className="mono" id="r-activities">
          {r.activitiesLabel}
        </h2>
        <ul className="resume__list">
          {r.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
