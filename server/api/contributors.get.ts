import { fetchGithubContributors } from '~~/server/utils/github'
import type { Contributor } from '~~/server/utils/github'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const cached = await storage.getItem<{ timestamp: number; data: Contributor[] }>('github-contributors')

  if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
    return cached.data
  }

  const data = await fetchGithubContributors()
  await storage.setItem('github-contributors', { timestamp: Date.now(), data })
  return data
})