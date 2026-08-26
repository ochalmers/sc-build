#!/usr/bin/env node
/**
 * Export docs/listener-journey-copy.md → DOCX (Drive-friendly) + PDF.
 * Requires: pandoc (DOCX), Google Chrome (PDF).
 * Usage: node scripts/export-listener-copy-pdf.mjs
 */
import { execFileSync, execSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = join(root, "docs/listener-journey-copy.md");
const htmlPath = join(root, "docs/listener-journey-copy.html");
const pdfPath = join(root, "docs/listener-journey-copy.pdf");
const docxPath = join(root, "docs/listener-journey-copy.docx");
const publicPdfPath = join(root, "public/listener-journey-copy.pdf");
const publicDocxPath = join(root, "public/listener-journey-copy.docx");

const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
];

function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      if (candidate.startsWith("/")) {
        execFileSync(candidate, ["--version"], { stdio: "ignore" });
        return candidate;
      }
      execSync(`command -v ${candidate}`, { stdio: "ignore" });
      return candidate;
    } catch {
      /* try next */
    }
  }
  throw new Error("Google Chrome / Chromium not found. Install Chrome to export the PDF.");
}

function findPandoc() {
  try {
    execSync("command -v pandoc", { stdio: "ignore" });
    return "pandoc";
  } catch {
    try {
      execFileSync("/opt/homebrew/bin/pandoc", ["--version"], { stdio: "ignore" });
      return "/opt/homebrew/bin/pandoc";
    } catch {
      throw new Error("pandoc not found. Install with: brew install pandoc");
    }
  }
}

mkdirSync(join(root, "docs"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

const pandoc = findPandoc();
execFileSync(
  pandoc,
  [
    mdPath,
    "-o",
    docxPath,
    "--from",
    "markdown",
    "--to",
    "docx",
    "--metadata",
    "title=Sonocea — Listener journey copy",
  ],
  { stdio: "inherit" },
);
copyFileSync(docxPath, publicDocxPath);
console.log(`Wrote ${docxPath} (${readFileSync(docxPath).byteLength} bytes)`);
console.log(`Copied to ${publicDocxPath}`);

const bodyHtml = execSync(`npx --yes marked@15.0.7 "${mdPath}"`, {
  encoding: "utf8",
  cwd: root,
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Sonocea — Listener journey copy</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.45;
    color: #1a1a1a;
  }
  h1 {
    font-size: 22pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 8pt;
    page-break-after: avoid;
  }
  h2 {
    font-size: 14pt;
    font-weight: 700;
    margin: 22pt 0 10pt;
    padding-top: 8pt;
    border-top: 1.5pt solid #1a1a1a;
    page-break-after: avoid;
  }
  h3 {
    font-size: 11.5pt;
    font-weight: 700;
    margin: 16pt 0 6pt;
    page-break-after: avoid;
  }
  p { margin: 0 0 8pt; }
  strong { font-weight: 650; }
  hr {
    border: none;
    border-top: 0.5pt solid #ccc;
    margin: 16pt 0;
  }
  ul, ol {
    margin: 0 0 10pt;
    padding-left: 18pt;
  }
  li { margin: 0 0 3pt; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 12pt;
    font-size: 9.5pt;
  }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  th, td {
    border: 0.5pt solid #bbb;
    padding: 5pt 7pt;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #f3f3f3;
    font-weight: 650;
  }
  th:first-child, td:first-child { width: 28%; }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 8.5pt;
    background: #f4f4f4;
    padding: 1pt 3pt;
  }
  a { color: inherit; text-decoration: none; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

writeFileSync(htmlPath, html);

const chrome = findChrome();
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "inherit" },
);

copyFileSync(pdfPath, publicPdfPath);

console.log(`Wrote ${pdfPath} (${readFileSync(pdfPath).byteLength} bytes)`);
console.log(`Copied to ${publicPdfPath}`);
