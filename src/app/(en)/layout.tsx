import type { ReactNode } from "react";
import Document, { documentMetadata, viewport as documentViewport } from "@/components/shell/Document";

export const metadata = documentMetadata("en");
export const viewport = documentViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
