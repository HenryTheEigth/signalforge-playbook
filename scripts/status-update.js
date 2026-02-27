"use strict";
const fs = require("fs/promises");
const path = require("path");

const workspace = process.env.OPENCLAW_WORKSPACE || path.resolve(__dirname, "..");
const pendingPath = path.join(workspace, "memory", "pending-actions.md");
const trendsPath = path.join(workspace, "knowledge", "trends.md");
const outputPath = path.join(workspace, "knowledge", "status-log.md");

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (err) {
    return "[saknas]";
  }
}

async function main() {
  const pending = await readFile(pendingPath);
  const trends = await readFile(trendsPath);
  const now = new Date().toISOString();
  const payload = `## Status @ ${now}\n\n### Pending actions\n${pending.split("\n").slice(0, 10).join("\n")}\n\n### Trendöversikt\n${trends.split("\n").slice(0, 12).join("\n")}\n\n---\n`;
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.appendFile(outputPath, payload, "utf8");
}

main().catch((err) => {
  console.error("status-update failed", err);
  process.exit(1);
});
