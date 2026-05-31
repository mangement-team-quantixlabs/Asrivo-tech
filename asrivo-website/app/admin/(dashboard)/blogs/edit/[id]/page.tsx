import { getBlogPostById, getAdminProfile } from "@/lib/supabase/admin-queries";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";

  return <BlogForm post={post} adminRole={role} />;
}
