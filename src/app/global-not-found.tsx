import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { dict } from "@/locales";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Hamza Lakoud",
  robots: { index: false },
};

const en = dict("en").notFound;
const fr = dict("fr").notFound;
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Two root layouts (English at /, French at /fr) leave no single layout to
 * build a 404 from, so this page stands alone and speaks both languages.
 * GitHub Pages serves it for any address, at any depth, so links are absolute.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="lost">
          <p className="mono">404</p>
          <h1 className="display">
            {en.title[0]}
            <br />
            {en.title[1]}
          </h1>
          <p className="lost__fr display" lang="fr" aria-hidden="true">
            {fr.title.join(" ")}
          </p>
          <p className="lost__links">
            <a className="button" href={`${base}/`}>
              {en.back} <span aria-hidden="true">↗</span>
            </a>
            <a className="button" href={`${base}/fr/`} lang="fr">
              {fr.back} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
