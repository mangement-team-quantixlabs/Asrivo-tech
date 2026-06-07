import { getPublishedBlogPosts, getActiveTeamMembers, getActiveJobCount } from '@/lib/supabase/queries'

export default async function DashboardPage() {
  const [blogs, team, jobCount] = await Promise.all([
    getPublishedBlogPosts(),
    getActiveTeamMembers(),
    getActiveJobCount(),
  ])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '30px' }}>📊 User Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ background: '#4F46E5', color: 'white', padding: '30px', borderRadius: '12px', minWidth: '150px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', margin: 0 }}>{blogs?.length ?? 0}</h2>
          <p>Total Blogs</p>
        </div>
        <div style={{ background: '#10B981', color: 'white', padding: '30px', borderRadius: '12px', minWidth: '150px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', margin: 0 }}>{team?.length ?? 0}</h2>
          <p>Team Members</p>
        </div>
        <div style={{ background: '#F59E0B', color: 'white', padding: '30px', borderRadius: '12px', minWidth: '150px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', margin: 0 }}>{jobCount ?? 0}</h2>
          <p>Active Jobs</p>
        </div>
      </div>
    </div>
  )
}