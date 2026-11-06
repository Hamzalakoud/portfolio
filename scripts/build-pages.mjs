// Static export for GitHub Pages (works the same on Windows, macOS and Linux).
//   node scripts/build-pages.mjs                  → base path /portfolio
//   node scripts/build-pages.mjs another-repo     → another repository name
//   node scripts/build-pages.mjs root             → a user site or custom domain (no base path)
// The name may be given with or without a leading slash. (Git Bash on Windows
// rewrites arguments that start with "/", so prefer the bare name there.)
import { spawnSync } from "node:child_process";
import { copyFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const arg = (process.argv[2] ?? "portfolio").replace(/^\/+|\/+$/g, "");
const base = arg === "" || arg === "root" ? "" : `/${arg}`;
if (base.includes(":") || base.includes("\\")) {
  console.error(`"${process.argv[2]}" is not a base path. Pass the repository name, for example: portfolio`);
  process.exit(1);
}

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, GITHUB_PAGES: "1", BASE_PATH: base },
});
if (result.status !== 0) process.exit(result.status ?? 1);

// Route groups ("(en)", "(fr)") make the export write segment prefetch data as
// __next.<group>/<segment>/__PAGE__.txt, while the client asks for the flat
// name __next.<group>.<segment>.__PAGE__.txt. Write the flat copies too, so
// prefetches do not 404 on GitHub Pages.
let flattened = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(full, dir, name);
    else walk(full);
  }
};
const flatten = (root, parent, prefix, rel = []) => {
  for (const name of readdirSync(path.join(root, ...rel))) {
    const full = path.join(root, ...rel, name);
    if (statSync(full).isDirectory()) flatten(root, parent, prefix, [...rel, name]);
    else {
      copyFileSync(full, path.join(parent, [prefix, ...rel, name].join(".")));
      flattened++;
    }
  }
};
walk("out");
console.log(`Flattened ${flattened} segment prefetch files.`);
