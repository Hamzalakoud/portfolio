import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

// Display and text: one variable family, animated on its weight and width axes.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

// A static ExtraBold Condensed cut of the same family with overlapping contours
// merged. Variable fonts keep their contours separate, which shows as stray inner
// lines the moment type is drawn as an outline.
const outline = localFont({
  src: "../assets/fonts/BricolageGrotesque-ExtraBoldCondensed.woff2",
  weight: "800",
  variable: "--font-outline",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${display.variable} ${outline.variable} ${serif.variable} ${mono.variable}`;
