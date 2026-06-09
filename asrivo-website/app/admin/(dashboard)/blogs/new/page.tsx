import BlogForm from "@/components/admin/BlogForm";
import { getAdminProfile } from "@/lib/supabase/admin-queries";

export default async function NewBlogPostPage() {
  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";
  return <BlogForm adminRole={role} />;
}
