import { getBlogPostById } from "@/lib/supabase/admin-queries";
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

  return <BlogForm post={post} />;
}
