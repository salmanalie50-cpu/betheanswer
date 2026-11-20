// Usage: node scripts/set-domain.mjs https://yourrealdomain.com
// Replaces the placeholder domain in canonical links, Open Graph tags, sitemap.xml and robots.txt.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const arg = process.argv[2];
if (!arg || !/^https?:\/\/[^/\s]+$/.test(arg.replace(/\/$/, ""))) {
  console.error("Usage: node scripts/set-domain.mjs https://yourrealdomain.com");
  process.exit(1);
}
const to = arg.replace(/\/$/, "");
const from = "https://yourdomain.com";
const root = new URL("..", import.meta.url).pathname;
let n = 0;
for (const f of readdirSync(root)) {
  if (!/\.(html|xml|txt)$/.test(f)) continue;
  const p = join(root, f), s = readFileSync(p, "utf8");
  if (s.includes(from)) { writeFileSync(p, s.split(from).join(to)); n++; }
}
console.log(`Updated ${n} file(s): ${from} -> ${to}`);
