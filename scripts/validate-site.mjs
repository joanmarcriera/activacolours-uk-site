import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const htmlFiles = fs
  .readdirSync(ROOT)
  .filter((file) => file.endsWith(".html"))
  .sort();

function re(...parts) {
  return new RegExp(parts.join(""), "i");
}

const bannedPublicClaimPatterns = [
  re("anti[\\s-]?mou?", "ld"),
  re("mou?", "ld[\\s-]?(resistant|killing|proof)"),
  re("anti[\\s-]?fun", "g\\w*"),
  re("fun", "gicid\\w*"),
  re("anti[\\s-]?bacter", "i\\w*"),
  re("antimicro", "bial"),
  re("bacter", "icid\\w*"),
  re("kills?\\s+(bacter", "ia|ger", "ms?|pathogens?)"),
  re("anti[\\s-]?vi", "r\\w*"),
  re("vir", "ucid\\w*"),
  re("dis", "infect\\w*"),
  re("saniti[sz]\\w*"),
  re("steril[iy][sz]\\w*"),
  re("(kills?|eliminat\\w*|removes?)\\s*(up\\s*to\\s*)?9?9\\.?9?\\s*%"),
  re("99\\.9\\s*%"),
  re("air[\\s-]?pur", "if\\w*"),
  re("pur", "if\\w*\\s+the\\s+air"),
  re("clean\\s+air"),
  re("res", "piratory"),
  re("ast", "hma"),
  re("all", "erg\\w*")
];

const requiredPages = new Set([
  "index.html",
  "science.html",
  "products.html",
  "trade.html",
  "contact.html",
  "privacy.html",
  "404.html"
]);

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function stripHash(href) {
  return href.split("#")[0];
}

function isExternal(href) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function attrValues(html, attr) {
  const values = [];
  const pattern = new RegExp(`${attr}=["']([^"']+)["']`, "gi");
  for (const match of html.matchAll(pattern)) values.push(match[1]);
  return values;
}

for (const page of requiredPages) {
  if (!fs.existsSync(path.join(ROOT, page))) fail(`Missing required page: ${page}`);
}

for (const file of htmlFiles) {
  const html = read(file);
  const lines = html.split(/\r?\n/);

  if (!/<html\s+lang="en-GB"/.test(html)) fail(`${file}: missing lang="en-GB"`);
  if (!/<meta\s+name="viewport"/.test(html)) fail(`${file}: missing viewport meta`);
  if (!/<title>[^<]{15,80}<\/title>/.test(html)) fail(`${file}: title missing or poor length`);
  if (!/<meta\s+name="description"\s+content="[^"]{50,180}"/.test(html)) {
    fail(`${file}: meta description missing or poor length`);
  }
  if (!/<h1\b/i.test(html)) fail(`${file}: missing h1`);
  if (!/<header\b/i.test(html)) fail(`${file}: missing header`);
  if (!/<footer\b/i.test(html)) fail(`${file}: missing footer`);
  if (!/id="main"/.test(html)) fail(`${file}: missing #main target`);

  for (const pattern of bannedPublicClaimPatterns) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        fail(`${file}:${index + 1}: public copy contains prohibited/borderline claim term: ${line.trim()}`);
      }
    });
  }

  for (const src of attrValues(html, "src")) {
    if (isExternal(src)) continue;
    const assetPath = stripHash(src);
    if (assetPath && !fs.existsSync(path.join(ROOT, assetPath))) {
      fail(`${file}: missing src target ${src}`);
    }
  }

  for (const href of attrValues(html, "href")) {
    if (!href || href === "#main" || href.startsWith("#") || isExternal(href)) continue;
    const target = stripHash(href);
    if (!target) continue;
    if (!fs.existsSync(path.join(ROOT, target))) {
      fail(`${file}: missing href target ${href}`);
    }
  }

  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  for (const tag of imageTags) {
    if (!/\salt=["'][^"']*["']/.test(tag)) fail(`${file}: image missing alt text: ${tag}`);
    if (!/\s(width|height)=["']/.test(tag)) fail(`${file}: image missing explicit dimensions: ${tag}`);
  }
}

const css = read("css/styles.css");
for (const customProperty of ["--blue", "--dark", "--paper", "--accent", "--radius"]) {
  if (!css.includes(customProperty)) fail(`css/styles.css: missing token ${customProperty}`);
}

if (!fs.existsSync(path.join(ROOT, ".github", "workflows", "ci.yml"))) {
  fail("Missing CI workflow: .github/workflows/ci.yml");
}
if (!fs.existsSync(path.join(ROOT, ".github", "workflows", "pages.yml"))) {
  fail("Missing Pages workflow: .github/workflows/pages.yml");
}
if (!fs.existsSync(path.join(ROOT, ".nojekyll"))) {
  fail("Missing .nojekyll for static GitHub Pages publishing");
}

if (failures.length) {
  console.error(`\n${failures.length} validation failure(s):\n`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages, local links, assets, metadata, CSS tokens and public claim boundaries.`);
