// Renders the concept boards in design/concepts/*.html to src/assets/projects/*.jpg.
//   node scripts/render-concepts.mjs              → every board
//   node scripts/render-concepts.mjs cars-cover   → one board
// Needs Google Chrome (playwright-core drives the installed browser) and a network
// connection for the board fonts.
import { chromium } from "playwright-core";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const boards = path.join(root, "design", "concepts");
const out = path.join(root, "src", "assets", "projects");

const only = process.argv[2];
const names = (await readdir(boards)).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, ""));
const todo = only ? names.filter((n) => n === only) : names;
if (!todo.length) {
  console.error(only ? `No board named "${only}". Boards: ${names.join(", ")}` : "No boards found.");
  process.exit(1);
}

const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL ?? "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 2400, height: 1500 }, deviceScaleFactor: 1 });

for (const name of todo) {
  await page.goto(pathToFileURL(path.join(boards, `${name}.html`)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const file = path.join(out, `${name}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 86 });
  console.log(path.relative(root, file));
}

await browser.close();
