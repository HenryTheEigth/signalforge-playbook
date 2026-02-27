"use strict";
const fs = require("fs/promises");
const path = require("path");

const workspace = process.env.OPENCLAW_WORKSPACE || path.resolve(__dirname, "..");
const credentialsPath = path.join(workspace, "credentials", "x-api.env");
const trendsPath = path.join(workspace, "knowledge", "trends.md");

async function loadEnv(file) {
  const text = await fs.readFile(file, "utf8");
  return Object.fromEntries(text
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("=").map((part) => part.trim())));
}

async function fetchTweets(bearer) {
  const query = encodeURIComponent("(AI sales) OR (AI workflow) OR #autonomousagent");
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=author_id,created_at,public_metrics&expansions=author_id&user.fields=verified,username`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${bearer}` },
  });
  if (!response.ok) {
    throw new Error(`Twitter fetch failed: ${response.status} ${await response.text()}`);
  }
  return response.json();
}

function summarizeTweets(data) {
  const users = (data.includes?.users || []).reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  return (data.data || []).map((tweet) => {
    const user = users[tweet.author_id];
    const metrics = tweet.public_metrics || {};
    return `- ${user?.username || "unknown"}: "${tweet.text.slice(0, 100)}..." (likes ${metrics.like_count}, replies ${metrics.reply_count})`;
  });
}

async function main() {
  const env = await loadEnv(credentialsPath);
  if (!env.TWITTER_BEARER_TOKEN) {
    throw new Error("Missing TWITTER_BEARER_TOKEN in credentials/x-api.env");
  }
  try {
    const data = await fetchTweets(env.TWITTER_BEARER_TOKEN);
    const lines = summarizeTweets(data);
    const timestamp = new Date().toISOString();
    const payload = [
      `## X agent update @ ${timestamp}`,
      `Latest tweets around AI sales/workflows:`,
      ...lines,
      "",
    ].join("\n");
    await fs.mkdir(path.dirname(trendsPath), { recursive: true });
    await fs.appendFile(trendsPath, payload, "utf8");
  } catch (err) {
    const timestamp = new Date().toISOString();
    const payload = [
      `## X agent update @ ${timestamp}`,
      `Failed to fetch tweets: ${err.message}`,
      "",
    ].join("\n");
    await fs.mkdir(path.dirname(trendsPath), { recursive: true });
    await fs.appendFile(trendsPath, payload, "utf8");
    throw err;
  }
}

main().catch((err) => {
  console.error("x-agent failed", err);
  process.exit(1);
});