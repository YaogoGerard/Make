import https from "node:https";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const COMMITTERS_TOP_URL = "https://committers.top/rank_only/burkina_faso.json";
const BATCH_SIZE = 30;
const CONCURRENCY = 3;

const STUDENT_KEYWORDS = [
  "étudiant",
  "étudiante",
  "etudiant",
  "etudiante",
  "student",
];

interface GithubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  followers: { totalCount: number };
  repositories?: {
    totalCount: number;
    nodes: { stargazerCount: number }[];
  };
  contributionsCollection: {
    contributionCalendar: { totalContributions: number };
    totalCommitContributions: number;
  };
}

export interface Contributor {
  rank: number;
  name: string;
  pseudo: string;
  status: "contributeur" | "étudiant";
  contributions: number;
  repos: number;
  stars: number;
  avatar: string;
}

const YEAR = new Date().getFullYear();

function buildBatchQuery(logins: string[], from: string): string {
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

function isStudent(bio: string | null, company: string | null): boolean {
  const text = `${bio ?? ""} ${company ?? ""}`.toLowerCase();
  return STUDENT_KEYWORDS.some((k) => text.includes(k));
}

function totalStars(repos: ({ stargazerCount: number } | null)[]): number {
  return repos.reduce((sum, r) => sum + (r?.stargazerCount ?? 0), 0);
}

function cleanName(raw: string | null, login: string): string {
  if (!raw) return login;
  return raw.trim();
}

function httpsGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function fetchRankedLogins(): Promise<string[]> {
  try {
    const body = await httpsGet(COMMITTERS_TOP_URL);
    const json = JSON.parse(body);
    const logins: string[] = json.user ?? [];
    console.log(
      `[github] ${logins.length} logins récupérés depuis committers.top`,
    );
    return logins;
  } catch (err) {
    throw new Error(`Impossible de contacter committers.top : ${err}`);
  }
}

async function fetchBatch(
  logins: string[],
  from: string,
  token: string,
): Promise<GithubUser[]> {
  let res: Response;
  try {
    res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: buildBatchQuery(logins, from) }),
    });
  } catch (err) {
    throw new Error(`Réseau inaccessible : ${err}`);
  }

  const json = await res.json();

  if (!json.data) {
    throw new Error(`Réponse GitHub vide : ${JSON.stringify(json)}`);
  }

  return logins
    .map((_, i) => json.data[`u${i}`] as GithubUser | null)
    .filter(
      (u): u is GithubUser =>
        !!u &&
        !!u.login &&
        !!u.contributionsCollection &&
        !!u.contributionsCollection.contributionCalendar,
    );
}

export async function fetchGithubContributors(): Promise<Contributor[]> {
  const { githubToken } = useRuntimeConfig();
  const from = `${YEAR}-01-01T00:00:00Z`;

  // étape 1 : liste des logins depuis committers.top
  const rankedLogins = await fetchRankedLogins();

  // étape 2 : enrichissement par batch (BATCH_SIZE) via GitHub GraphQL
  // les batchs sont parallélisés par paquets de CONCURRENCY
  const allUsers: GithubUser[] = [];
  const batches: string[][] = [];

  for (let i = 0; i < rankedLogins.length; i += BATCH_SIZE) {
    batches.push(rankedLogins.slice(i, i + BATCH_SIZE));
  }

  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map((batch) => fetchBatch(batch, from, githubToken)),
    );
    for (const users of results) {
      allUsers.push(...users);
    }
    console.log(
      `[github] paquet ${Math.floor(i / CONCURRENCY) + 1} : ${allUsers.length} / ${rankedLogins.length} enrichis`,
    );
  }

  // étape 3 : tri par contributions GitHub en temps réel (pas par classement committers.top)
  allUsers.sort((a, b) => {
    const aC =
      a.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    const bC =
      b.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    return bC - aC;
  });

  console.log(`[github] classement final : ${allUsers.length} contributeurs`);

  return allUsers.map((user, index) => ({
    rank: index + 1,
    name: cleanName(user.name, user.login),
    pseudo: `@${user.login}`,
    status: isStudent(user.bio, user.company) ? "étudiant" : "contributeur",
    contributions:
      user.contributionsCollection?.contributionCalendar?.totalContributions ??
      0,
    repos: user.repositories?.totalCount ?? 0,
    stars: totalStars(user.repositories?.nodes ?? []),
    avatar: user.avatarUrl,
  }));
}
