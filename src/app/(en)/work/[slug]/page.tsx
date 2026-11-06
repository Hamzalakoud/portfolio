import type { Metadata } from "next";
import { Suspense } from "react";
import { alternates } from "@/components/shell/Document";
import StudyPage, { studyMetadata } from "@/components/pages/StudyPage";
import { slugs } from "@/data/portfolio";

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { ...studyMetadata("en", slug), alternates: alternates("en", `/work/${slug}`) };
}

/**
 * The slug is URL data, so it is read inside a Suspense boundary. Every case
 * study is prerendered and its links prefetch the whole page, so in practice
 * the boundary never shows: the content arrives with the navigation.
 */
export default function Page({ params }: PageProps<"/work/[slug]">) {
  return <Suspense fallback={null}>{params.then(({ slug }) => <StudyPage lang="en" slug={slug} />)}</Suspense>;
}
