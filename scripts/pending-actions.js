"use strict";
const fs = require("fs/promises");
const path = require("path");

const workspace = process.env.OPENCLAW_WORKSPACE || path.resolve(__dirname, "..");
const memoryDir = path.join(workspace, "memory");
const knowledgeDir = path.join(workspace, "knowledge");
const outputPath = path.join(memoryDir, "pending-actions.md");
const keywords = [/todo/i, /pending/i, /action item/i, /needs/i, /follow up/i];

async function listFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => path.join(dir, entry.name));
  } catch (err) {
    return [];
  }
}

async function extractLines(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    return text.split("\n").map((line, index) => ({
      line: line.trim(),
      index: index + 1,
      file: path.relative(workspace, filePath),
    }));
  } catch (err) {
    return [];
  }
}

function matches(line) {
  if (!line) return false;
  return keywords.some((regex) => regex.test(line));
}

async function scan(dir) {
  const files = await listFiles(dir);
  const items = [];
  for (const file of files) {
    const lines = await extractLines(file);
    lines.forEach((entry) => {
      if (matches(entry.line)) {
        items.push({
          text: entry.line,
          file: entry.file,
          line: entry.index,
        });
      }
    });
  }
  return items;
}

async function main() {
  const pendingMemory = await scan(memoryDir);
  const pendingKnowledge = await scan(knowledgeDir);
  const now = new Date();
  const sections = [];

  if (pendingMemory.length) {
    sections.push("## Från memory/*.md (dagliga loggar)");
    pendingMemory.forEach((item) => sections.push(`- ${item.text} (${item.file}#${item.line})`));
  }

  if (pendingKnowledge.length) {
    sections.push("## Från knowledge/");
    pendingKnowledge.forEach((item) => sections.push(`- ${item.text} (${item.file}#${item.line})`));
  }

  if (!sections.length) {
    sections.push("Inga explicita \"pending\"-rader hittades i memory- eller knowledge-filer.");
  }

  const payload = `# Pending action items\n\nGenererat automatiskt ${now.toISOString()}\n\n${sections.join("\n")}\n`;
  await fs.mkdir(memoryDir, { recursive: true });
  await fs.writeFile(outputPath, payload, "utf8");
}

main().catch((err) => {
  console.error("pending-actions failed", err);
  process.exit(1);
});
