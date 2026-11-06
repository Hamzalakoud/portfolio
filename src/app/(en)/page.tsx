import type { Metadata } from "next";
import { alternates } from "@/components/shell/Document";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = { alternates: alternates("en", "/") };

export default function Page() {
  return <HomePage lang="en" />;
}
