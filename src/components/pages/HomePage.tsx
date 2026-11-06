import { ViewTransition } from "react";
import Beyond from "@/components/home/Beyond";
import Contact from "@/components/home/Contact";
import Credentials from "@/components/home/Credentials";
import Experience from "@/components/home/Experience";
import Expertise from "@/components/home/Expertise";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ProjectScene from "@/components/home/ProjectScene";
import Stack from "@/components/home/Stack";
import WorkIntro from "@/components/home/WorkIntro";
import { projectsFor } from "@/data/portfolio";
import type { Lang } from "@/locales";

export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <ViewTransition enter={{ "to-home": "page-in", default: "none" }} exit={{ "to-project": "page-out", default: "none" }} default="none">
      <main className="home">
        <Hero />
        <Manifesto />
        <WorkIntro />
        <div className="projects">
          {projectsFor(lang).map((project) => (
            <ProjectScene key={project.slug} project={project} />
          ))}
        </div>
        <Experience />
        <Expertise />
        <Stack />
        <Credentials />
        <Beyond />
        <Contact />
      </main>
    </ViewTransition>
  );
}
