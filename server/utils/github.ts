const GITHUB_GRAPHQL = 'https://api.github.com/graphql'


//les mots de clé de detection des profiles etudiants

const STUDENT_KEYWORDS = [
  'étudiant', 'étudiante', 'etudiant', 'etudiante','student'
]

//typage des donnés qui seront recu

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

const YEAR = new Date().getFullYear()

// La requette qui sera envoyé à l'api graphql de github
function buildQuery(from: string): string {
  return `
query {
  search(type: USER, query: "location:Burkina Faso sort:followers-desc", first: 100) {
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

//detection des profiles etudiant via leur bio github
function isStudent(bio: string | null, company: string | null): boolean {
  const text = `${bio ?? ''} ${company ?? ''}`.toLowerCase()
  return STUDENT_KEYWORDS.some(k => text.includes(k))
}

//calcul du totale des etoiles de chacun à partir de ses repos
function totalStars(repos: { stargazerCount: number }[]): number {
  return repos.reduce((sum, r) => sum + r.stargazerCount, 0)
}

//netoyagge du nom recu
function cleanName(raw: string | null, login: string): string {
  if (!raw) return login
  return raw.trim()
}

//typage des donné qui seront renvoyer au frontend

export interface Contributor {
  rank: number
  name: string
  pseudo: string
  status: 'contributeur' | 'étudiant'
  commits: number
  repos: number
  stars: number
  avatar: string
}

//Fonction principale , classement et trie 
export async function fetchGithubContributors(): Promise<Contributor[]> {
  const { githubToken } = useRuntimeConfig()
  const from = `${YEAR}-01-01T00:00:00Z`

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: buildQuery(from) }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error(`GitHub API error: ${JSON.stringify(json.errors)}`)
  }

  const edges = json.data.search.edges as { node: GithubUser }[]
  const users = edges.map(e => e.node)

  // Trier par contributions totales (descendant)
  users.sort((a, b) => {
    const aContribs = a.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
    const bContribs = b.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
    return bContribs - aContribs
  })

  return users.map((user, index) => ({
    rank: index + 1,
    name: cleanName(user.name, user.login),
    pseudo: `@${user.login}`,
    status: isStudent(user.bio, user.company) ? 'étudiant' : 'contributeur',
    commits: user.contributionsCollection?.totalCommitContributions ?? 0,
    repos: user.repositories?.totalCount ?? 0,
    stars: totalStars(user.repositories?.nodes ?? []),
    avatar: user.avatarUrl,
  }))
}
