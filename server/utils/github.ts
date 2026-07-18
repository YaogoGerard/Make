

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const COMMITTERS_TOP_URL = "https://committers.top/rank_only/burkina_faso.json";
const BATCH_SIZE = 10;
const BATCH_DELAY = 1000;

const STUDENT_KEYWORDS = ["étudiant","étudiante","etudiant","etudiante","student",];

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

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

let fetchPromise: Promise<Contributor[]> | null = null;

async function fetchRankedLogins(): Promise<string[]> {
  try {
    const res = await fetch(COMMITTERS_TOP_URL);
    if (!res.ok) throw new Error(`committers.top : ${res.status}`);
    const body = await res.text();
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
  retries = 3,
): Promise<GithubUser[]> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
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
        if (res.status === 403 || res.status === 429) {
          const wait = (attempt + 1) * 10000;
          console.log(`[github] rate limit, attente ${wait}ms (tentative ${attempt + 1}/${retries})`);
          await delay(wait);
          continue;
        }
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
    } catch (err) {
      if (attempt === retries - 1) throw err;
      const wait = (attempt + 1) * 5000;
      console.log(`[github] erreur, attente ${wait}ms (tentative ${attempt + 1}/${retries})`);
      await delay(wait);
    }
  }

  return [];
}

export async function fetchGithubContributors(): Promise<Contributor[]> {
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const { githubToken } = useRuntimeConfig();
      const from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();

      // étape 1 : liste des logins depuis committers.top
      const rankedLogins = await fetchRankedLogins();

      // étape 2 : enrichissement par batch via GitHub GraphQL
      const allUsers: GithubUser[] = [];

      for (let i = 0; i < rankedLogins.length; i += BATCH_SIZE) {
        if (i > 0) await delay(BATCH_DELAY);
        const batch = rankedLogins.slice(i, i + BATCH_SIZE);
        const users = await fetchBatch(batch, from, githubToken);
        allUsers.push(...users);
        console.log(
          `[github] batch ${Math.floor(i / BATCH_SIZE) + 1} : ${users.length}/${batch.length} enrichis | total: ${allUsers.length}`,
        );
      }

      // étape 3 : tri par contributions totales (commits + PRs + reviews = activité open source)
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
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
