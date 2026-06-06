import { getPublishedBlogPosts, getActiveTeamMembers, getActiveJobCount } from '@/lib/supabase/queries'

export default async function DashboardPage() {
  const [blogs, team, jobCount] = await Promise.all([
    getPublishedBlogPosts(),
    getActiveTeamMembers(),
    getActiveJobCount(),
  ])

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Total Blogs: {blogs?.length ?? 0}</p>
      <p>Total Team Members: {team?.length ?? 0}</p>
      <p>Total Jobs: {jobCount ?? 0}</p>
    </div>
  )
}