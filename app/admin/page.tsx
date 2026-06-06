import { getActiveTeamMembers } from '@/lib/supabase/queries'

export default async function AdminPage() {
  const team = await getActiveTeamMembers()

  return (
    <div>
      <h1>Internal Admin Portal</h1>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {team?.map((member: any) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}