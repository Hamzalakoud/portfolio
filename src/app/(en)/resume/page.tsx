import type { Metadata } from "next";
import { alternates } from "@/components/shell/Document";
import ResumePage, { resumeMetadata } from "@/components/pages/ResumePage";

export const metadata: Metadata = { ...resumeMetadata("en"), alternates: alternates("en", "/resume") };

export default function Page() {
  return <ResumePage lang="en" />;
}
