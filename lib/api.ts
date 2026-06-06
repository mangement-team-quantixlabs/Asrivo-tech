import { getPublishedBlogPosts, getActiveTeamMembers, getActiveJobCount } from '@/lib/supabase/queries'

export async function fetchDashboardStats() {
  const [blogs, team, jobCount] = await Promise.all([
    getPublishedBlogPosts(),
    getActiveTeamMembers(),
    getActiveJobCount(),
  ])
  return {
    totalBlogs: blogs?.length ?? 0,
    totalTeamMembers: team?.length ?? 0,
    totalJobs: jobCount ?? 0,
  }
}

export async function fetchUsers() {
  const team = await getActiveTeamMembers()
  return team ?? []
}