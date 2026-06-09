import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminProfile } from "@/lib/supabase/admin-queries";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const profile = await getAdminProfile();

  // Only users with an admin profile can access the dashboard
  if (!profile) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      adminName={profile?.full_name ?? user.email ?? "Admin"}
      adminRole={profile?.role ?? "admin"}
    >
      {children}
    </AdminShell>
  );
}
