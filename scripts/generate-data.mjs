import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const COMMITTERS_TOP_URL = "https://committers.top/rank_only/burkina_faso.json";
const BATCH_SIZE = 10;
const BATCH_DELAY = 200;

const STUDENT_KEYWORDS = [
  "étudiant", "étudiante", "etudiant", "etudiante", "student",
];

const YEAR = new Date().getFullYear();

function isStudent(bio, company) {
  const text = `${bio ?? ""} ${company ?? ""}`.toLowerCase();
  return STUDENT_KEYWORDS.some((k) => text.includes(k));
}

function totalStars(repos) {
  return repos.reduce((sum, r) => sum + (r?.stargazerCount ?? 0), 0);
}

function cleanName(raw, login) {
  return raw ? raw.trim() : login;
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https.get(
      { hostname: parsed.hostname, path: parsed.pathname, family: 4 },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      },
    ).on("error", reject);
  });
}

function buildBatchQuery(logins, from) {
  const aliases = logins
    .map(
      (login, i) => `
    u${i}: user(login: "${login}") {
      login
      name
      avatarUrl
      bio
      company
      followers { totalCount }
      repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes { stargazerCount }
      }
      contributionsCollection(from: "${from}") {
        contributionCalendar { totalContributions }
        totalCommitContributions
      }
    }
  `,
    )
    .join("\n");
  return `query { ${aliases} }`;
}

async function fetchRankedLogins() {
  const body = await httpsGet(COMMITTERS_TOP_URL);
  const json = JSON.parse(body);
  const logins = json.user ?? [];
  console.log(`[generate] ${logins.length} logins depuis committers.top`);
  return logins;
}

async function fetchBatch(logins, from, token) {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: buildBatchQuery(logins, from) }),
  });

  const json = await res.json();

  if (!json.data) {
    throw new Error(`Réponse GitHub vide : ${JSON.stringify(json)}`);
  }

  return logins
    .map((_, i) => json.data[`u${i}`])
    .filter(
      (u) =>
        u && u.login && u.contributionsCollection?.contributionCalendar,
    );
}

async function main() {
  const token = process.env.NUXT_GITHUB_TOKEN;
  if (!token) {
    console.error("NUXT_GITHUB_TOKEN manquant");
    process.exit(1);
  }

  const from = `${YEAR}-01-01T00:00:00Z`;

  const rankedLogins = await fetchRankedLogins();
  const allUsers = [];

  for (let i = 0; i < rankedLogins.length; i += BATCH_SIZE) {
    if (i > 0) await delay(BATCH_DELAY);
    const batch = rankedLogins.slice(i, i + BATCH_SIZE);
    const users = await fetchBatch(batch, from, token);
    allUsers.push(...users);
    console.log(
      `[generate] batch ${Math.floor(i / BATCH_SIZE) + 1} : ${users.length}/${batch.length} | total: ${allUsers.length}`,
    );
  }

  allUsers.sort((a, b) => {
    const aC = a.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    const bC = b.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    return bC - aC;
  });

  console.log(`[generate] classement final : ${allUsers.length} contributeurs`);

  const contributors = allUsers.map((user, index) => ({
    rank: index + 1,
    name: cleanName(user.name, user.login),
    pseudo: `@${user.login}`,
    status: isStudent(user.bio, user.company) ? "étudiant" : "contributeur",
    contributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 0,
    repos: user.repositories?.totalCount ?? 0,
    stars: totalStars(user.repositories?.nodes ?? []),
    avatar: user.avatarUrl,
  }));

  const outDir = path.resolve("public/data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "contributors.json"), JSON.stringify(contributors, null, 2));
  console.log(`[generate] Écrit public/data/contributors.json (${contributors.length} contributeurs)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
