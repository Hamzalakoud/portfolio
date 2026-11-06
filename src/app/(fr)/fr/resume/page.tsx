import type { Metadata } from "next";
import { alternates } from "@/components/shell/Document";
import ResumePage, { resumeMetadata } from "@/components/pages/ResumePage";

export const metadata: Metadata = { ...resumeMetadata("fr"), alternates: alternates("fr", "/resume") };

export default function Page() {
  return <ResumePage lang="fr" />;
}
