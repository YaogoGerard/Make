const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const MAX_PAGES = 5

const STUDENT_KEYWORDS = [
  'étudiant', 'étudiante', 'etudiant', 'etudiante', 'student'
]

interface GithubUser {
  login: string
  name: string | null
  avatarUrl: string
  bio: string | null
  company: string | null
  followers: { totalCount: number }
  repositories?: {
    totalCount: number
    nodes: { stargazerCount: number }[]
  }
  contributionsCollection: {
    contributionCalendar: { totalContributions: number }
    totalCommitContributions: number
  }
}

interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

interface SearchResult {
  edges: { node: GithubUser }[]
  pageInfo: PageInfo
}

const YEAR = new Date().getFullYear()

function buildQuery(from: string): string {
  return `
query($after: String) {
  search(type: USER, query: "location:Burkina Faso repos:>=1 followers:>=1", first: 100, after: $after) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        ... on User {
          login
          name
          avatarUrl
          bio
          company
          followers { totalCount }
          repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes { stargazerCount }
          }
          contributionsCollection(from: "${from}") {
            contributionCalendar { totalContributions }
            totalCommitContributions
          }
        }
      }
    }
  }
}
`}

function isStudent(bio: string | null, company: string | null): boolean {
  const text = `${bio ?? ''} ${company ?? ''}`.toLowerCase()
  return STUDENT_KEYWORDS.some(k => text.includes(k))
}

function totalStars(repos: { stargazerCount: number }[]): number {
  return repos.reduce((sum, r) => sum + r.stargazerCount, 0)
}

function cleanName(raw: string | null, login: string): string {
  if (!raw) return login
  return raw.trim()
}

export interface Contributor {
  rank: number
  name: string
  pseudo: string
  status: 'contributeur' | 'étudiant'
  contributions: number
  repos: number
  stars: number
  avatar: string
}

async function fetchPage(from: string, after: string | null, token: string): Promise<SearchResult> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: buildQuery(from),
      variables: { after },
    }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error(`GitHub API error: ${JSON.stringify(json.errors)}`)
  }

  return json.data.search as SearchResult
}

export async function fetchGithubContributors(): Promise<Contributor[]> {
  const { githubToken } = useRuntimeConfig()
  const from = `${YEAR}-01-01T00:00:00Z`

  let after: string | null = null
  const allUsers: GithubUser[] = []

  for (let i = 0; i < MAX_PAGES; i++) {
    const result = await fetchPage(from, after, githubToken)
    const users = result.edges.map(e => e.node)
    allUsers.push(...users)

    if (!result.pageInfo.hasNextPage || !result.pageInfo.endCursor) break
    after = result.pageInfo.endCursor
  }

  allUsers.sort((a, b) => {
    const aContribs = a.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
    const bContribs = b.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
    return bContribs - aContribs
  })

  return allUsers.map((user, index) => ({
    rank: index + 1,
    name: cleanName(user.name, user.login),
    pseudo: `@${user.login}`,
    status: isStudent(user.bio, user.company) ? 'étudiant' : 'contributeur',
    contributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 0,
    repos: user.repositories?.totalCount ?? 0,
    stars: totalStars(user.repositories?.nodes ?? []),
    avatar: user.avatarUrl,
  }))
}
