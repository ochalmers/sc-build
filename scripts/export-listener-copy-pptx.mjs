#!/usr/bin/env node
/**
 * Export docs/listener-journey-copy.md → PowerPoint (.pptx).
 * Usage: node scripts/export-listener-copy-pptx.mjs
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = join(root, "docs/listener-journey-copy.md");
const pptxPath = join(root, "docs/listener-journey-copy.pptx");
const publicPptxPath = join(root, "public/listener-journey-copy.pptx");

const COLORS = {
  ink: "1A1A1A",
  muted: "5C5C5C",
  rule: "D0D0D0",
  soft: "F5F5F5",
  white: "FFFFFF",
  accent: "2A2A2A",
};

function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let section = null;
  let screen = null;
  let i = 0;

  const flushScreen = () => {
    if (screen && section) section.screens.push(screen);
    screen = null;
  };
  const flushSection = () => {
    flushScreen();
    if (section) sections.push(section);
    section = null;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^##\s+/.test(line) && !/^##\s+Notes/.test(line)) {
      flushSection();
      section = { title: line.replace(/^##\s+/, "").trim(), screens: [] };
      i += 1;
      continue;
    }

    if (/^###\s+/.test(line)) {
      flushScreen();
      screen = {
        title: line.replace(/^###\s+/, "").trim(),
        path: "",
        rows: [],
        bullets: [],
        notes: [],
        blocks: [],
      };
      i += 1;
      continue;
    }

    if (!section) {
      i += 1;
      continue;
    }

    // Path under section or screen
    const pathMatch = line.match(/^\*\*Path:\*\*\s*`([^`]+)`/);
    if (pathMatch) {
      if (screen) screen.path = pathMatch[1];
      else {
        flushScreen();
        screen = {
          title: section.title.replace(/^\d+\s*·\s*/, "").trim(),
          path: pathMatch[1],
          rows: [],
          bullets: [],
          notes: [],
          blocks: [],
        };
      }
      i += 1;
      continue;
    }

    if (!screen) {
      // Loose content under section (e.g. About Sonocea numbered slides)
      if (/^\*\*\d+\s*·/.test(line) || /^-\s+/.test(line) || line.trim()) {
        flushScreen();
        screen = {
          title: section.title.replace(/^\d+\s*·\s*/, "").trim(),
          path: "",
          rows: [],
          bullets: [],
          notes: [],
          blocks: [],
        };
        continue; // reprocess this line with screen set
      }
      i += 1;
      continue;
    }

    // Markdown table
    if (line.startsWith("|") && lines[i + 1]?.match(/^\|?\s*-+/)) {
      const header = splitRow(line);
      i += 2; // skip header + separator
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = splitRow(lines[i]);
        if (header.length === 2 && header[0].toLowerCase() === "element") {
          screen.rows.push({ label: cells[0] || "", value: cells[1] || "" });
        } else if (header.length === 2 && header[0].toLowerCase() === "state") {
          screen.rows.push({ label: cells[0] || "", value: cells[1] || "" });
        } else if (header.length >= 3 && header[0].toLowerCase() === "state") {
          screen.rows.push({
            label: cells[0] || "",
            value: [cells[1], cells[2], cells[3]].filter(Boolean).join(" · "),
          });
        } else if (header.length >= 3 && header[0].toLowerCase() === "organisation") {
          screen.rows.push({
            label: cells[0] || "",
            value: `${cells[1] || ""} — ${cells[2] || ""}`.trim(),
          });
        } else if (header.length >= 3 && header[0].toLowerCase() === "session") {
          screen.blocks.push({
            heading: cells[0] || "",
            lines: [
              cells[1] && `Headline: ${cells[1]}`,
              cells[2] && `Description: ${cells[2]}`,
              cells[3] && `Before: ${cells[3]}`,
            ].filter(Boolean),
          });
        } else {
          screen.rows.push({
            label: cells[0] || "",
            value: cells.slice(1).join(" · "),
          });
        }
        i += 1;
      }
      continue;
    }

    // Numbered about slides / bold mini-headers
    if (/^\*\*\d+\s*·/.test(line) || (/^\*\*[^*]+\*\*\s*$/.test(line) && !line.includes("Path"))) {
      const heading = line.replace(/\*\*/g, "").trim();
      const block = { heading, lines: [] };
      i += 1;
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim() || l.startsWith("#") || l.startsWith("|") || l.startsWith("---")) break;
        if (/^\*\*\d+\s*·/.test(l) || (/^\*\*[^*]+\*\*\s*$/.test(l) && !l.includes(":"))) break;
        if (l.startsWith("- ")) block.lines.push(l.replace(/^-\s+/, "").replace(/\*\*/g, ""));
        else block.lines.push(l.replace(/\*\*/g, "").trim());
        i += 1;
      }
      screen.blocks.push(block);
      continue;
    }

    if (line.startsWith("- ")) {
      screen.bullets.push(line.replace(/^-\s+/, "").replace(/\*\*/g, "").trim());
      i += 1;
      continue;
    }

    if (line.startsWith("**") && line.includes(":") && !line.startsWith("**Path")) {
      screen.notes.push(line.replace(/\*\*/g, "").trim());
      i += 1;
      continue;
    }

    if (/^---+$/.test(line) || !line.trim()) {
      i += 1;
      continue;
    }

    if (!line.startsWith("#")) {
      screen.notes.push(line.replace(/\*\*/g, "").replace(/`/g, "").trim());
    }
    i += 1;
  }

  flushSection();
  return sections.filter((s) => s.screens.some((sc) => sc.rows.length || sc.bullets.length || sc.blocks.length || sc.path));
}

function splitRow(line) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function addTitleSlide(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };
  slide.addText("Sonocea", {
    x: 0.6,
    y: 2.0,
    w: 12.1,
    h: 0.5,
    fontSize: 18,
    fontFace: "Arial",
    color: COLORS.muted,
    bold: true,
  });
  slide.addText("Listener journey — copy deck", {
    x: 0.6,
    y: 2.5,
    w: 12.1,
    h: 0.8,
    fontSize: 36,
    fontFace: "Arial",
    color: COLORS.ink,
    bold: true,
  });
  slide.addText(
    "Listener-facing only · Invite → listening loop\nDynamic bits as {Name}, {Partner}, {N} · Upload to Google Drive to edit in Slides",
    {
      x: 0.6,
      y: 3.5,
      w: 11,
      h: 1,
      fontSize: 14,
      fontFace: "Arial",
      color: COLORS.muted,
    },
  );
}

function addSectionSlide(pptx, sectionTitle, index, total) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.soft };
  slide.addText(`Section ${index} of ${total}`, {
    x: 0.6,
    y: 2.4,
    w: 12,
    h: 0.4,
    fontSize: 12,
    fontFace: "Arial",
    color: COLORS.muted,
  });
  slide.addText(sectionTitle, {
    x: 0.6,
    y: 2.9,
    w: 12,
    h: 0.9,
    fontSize: 32,
    fontFace: "Arial",
    color: COLORS.ink,
    bold: true,
  });
}

function addContentSlide(pptx, sectionTitle, screen, partLabel = "") {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText(sectionTitle, {
    x: 0.5,
    y: 0.28,
    w: 12.2,
    h: 0.28,
    fontSize: 11,
    fontFace: "Arial",
    color: COLORS.muted,
  });

  const title = partLabel ? `${screen.title} ${partLabel}` : screen.title;
  slide.addText(title, {
    x: 0.5,
    y: 0.55,
    w: 12.2,
    h: 0.45,
    fontSize: 22,
    fontFace: "Arial",
    color: COLORS.ink,
    bold: true,
  });

  if (screen.path) {
    slide.addText(screen.path, {
      x: 0.5,
      y: 1.0,
      w: 12.2,
      h: 0.28,
      fontSize: 11,
      fontFace: "Courier New",
      color: COLORS.muted,
    });
  }

  let y = screen.path ? 1.4 : 1.15;
  const maxY = 7.0;

  const pushRow = (label, value) => {
    if (y > maxY) return false;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y,
      w: 12.2,
      h: 0.42,
      fill: { color: COLORS.white },
      line: { color: COLORS.rule, width: 0.5 },
    });
    slide.addText(label, {
      x: 0.6,
      y: y + 0.05,
      w: 2.6,
      h: 0.32,
      fontSize: 11,
      fontFace: "Arial",
      color: COLORS.muted,
      bold: true,
      valign: "middle",
    });
    slide.addText(value, {
      x: 3.3,
      y: y + 0.05,
      w: 9.2,
      h: 0.32,
      fontSize: 12,
      fontFace: "Arial",
      color: COLORS.ink,
      valign: "middle",
    });
    y += 0.42;
    return true;
  };

  for (const row of screen.rows) {
    // Wrap long values onto taller rows
    const long = (row.value || "").length > 110;
    if (long) {
      if (y > maxY - 0.2) break;
      const h = Math.min(1.1, 0.42 + Math.ceil(row.value.length / 95) * 0.22);
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y,
        w: 12.2,
        h,
        fill: { color: COLORS.white },
        line: { color: COLORS.rule, width: 0.5 },
      });
      slide.addText(row.label, {
        x: 0.6,
        y: y + 0.06,
        w: 2.6,
        h: h - 0.1,
        fontSize: 11,
        fontFace: "Arial",
        color: COLORS.muted,
        bold: true,
        valign: "top",
      });
      slide.addText(row.value, {
        x: 3.3,
        y: y + 0.06,
        w: 9.2,
        h: h - 0.1,
        fontSize: 12,
        fontFace: "Arial",
        color: COLORS.ink,
        valign: "top",
      });
      y += h;
    } else if (!pushRow(row.label, row.value)) {
      break;
    }
  }

  if (screen.bullets.length) {
    if (y + 0.3 < maxY) {
      slide.addText(
        screen.bullets.map((b) => ({ text: b, options: { breakLine: true } })),
        {
          x: 0.6,
          y,
          w: 12,
          h: Math.min(maxY - y, screen.bullets.length * 0.32 + 0.2),
          fontSize: 13,
          fontFace: "Arial",
          color: COLORS.ink,
          bullet: true,
        },
      );
      y += Math.min(maxY - y, screen.bullets.length * 0.32 + 0.3);
    }
  }

  for (const block of screen.blocks) {
    if (y > maxY - 0.5) break;
    slide.addText(block.heading, {
      x: 0.55,
      y,
      w: 12,
      h: 0.32,
      fontSize: 13,
      fontFace: "Arial",
      color: COLORS.ink,
      bold: true,
    });
    y += 0.32;
    if (block.lines.length) {
      const h = Math.min(maxY - y, block.lines.length * 0.28 + 0.1);
      slide.addText(
        block.lines.map((l) => ({ text: l, options: { breakLine: true } })),
        {
          x: 0.7,
          y,
          w: 11.8,
          h,
          fontSize: 12,
          fontFace: "Arial",
          color: COLORS.muted,
        },
      );
      y += h + 0.1;
    }
  }

  if (screen.notes.length && y < maxY - 0.3) {
    slide.addText(screen.notes.join("\n"), {
      x: 0.55,
      y,
      w: 12,
      h: maxY - y,
      fontSize: 12,
      fontFace: "Arial",
      color: COLORS.muted,
    });
  }
}

function expandScreens(screen) {
  const items = [];
  const ROW_LIMIT = 11;
  const BLOCK_LIMIT = 4;

  if (screen.blocks.length > BLOCK_LIMIT && !screen.rows.length) {
    for (const group of chunk(screen.blocks, BLOCK_LIMIT)) {
      items.push({ ...screen, blocks: group, rows: [], bullets: [] });
    }
    if (screen.bullets.length) {
      items.push({ ...screen, blocks: [], rows: [], bullets: screen.bullets });
    }
    return items;
  }

  if (screen.rows.length > ROW_LIMIT) {
    const groups = chunk(screen.rows, ROW_LIMIT);
    groups.forEach((rows, idx) => {
      items.push({
        ...screen,
        rows,
        bullets: idx === groups.length - 1 ? screen.bullets : [],
        blocks: idx === groups.length - 1 ? screen.blocks : [],
        notes: idx === groups.length - 1 ? screen.notes : [],
        _part: `(${idx + 1}/${groups.length})`,
      });
    });
    return items;
  }

  return [screen];
}

const md = readFileSync(mdPath, "utf8");
const sections = parseMarkdown(md);

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "Sonocea";
pptx.title = "Listener journey — copy deck";
pptx.subject = "Listener-facing copy for review";

addTitleSlide(pptx);

const contentSections = sections.filter((s) => !/^Notes/i.test(s.title));
contentSections.forEach((section, idx) => {
  addSectionSlide(pptx, section.title, idx + 1, contentSections.length);
  for (const screen of section.screens) {
    const parts = expandScreens(screen);
    parts.forEach((part) => {
      addContentSlide(pptx, section.title, part, part._part || "");
    });
  }
});

// Closing notes
const notesSlide = pptx.addSlide();
notesSlide.background = { color: COLORS.white };
notesSlide.addText("Notes for editors", {
  x: 0.6,
  y: 1.8,
  w: 12,
  h: 0.5,
  fontSize: 28,
  fontFace: "Arial",
  color: COLORS.ink,
  bold: true,
});
notesSlide.addText(
  [
    "Prefer this deck / the Word file for copy review; keep Admin copy separate.",
    "{…} placeholders are dynamic — don’t hard-code demo names in final copy.",
    "Partner programme titles/bodies are organisation CMS fields.",
    "Upload this .pptx to Google Drive → Open with Google Slides to edit together.",
    "Source Markdown: docs/listener-journey-copy.md · Re-export: npm run export:copy-pptx",
  ].map((t) => ({ text: t, options: { breakLine: true } })),
  {
    x: 0.6,
    y: 2.6,
    w: 11.5,
    h: 3,
    fontSize: 14,
    fontFace: "Arial",
    color: COLORS.muted,
    bullet: true,
  },
);

mkdirSync(join(root, "docs"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

await pptx.writeFile({ fileName: pptxPath });
copyFileSync(pptxPath, publicPptxPath);

const bytes = readFileSync(pptxPath).byteLength;
console.log(`Wrote ${pptxPath} (${bytes} bytes, ~${pptx._slideCount ?? "?"} slides)`);
console.log(`Copied to ${publicPptxPath}`);
console.log(`Sections parsed: ${contentSections.length}`);
