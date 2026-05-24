import { Suspense } from "react";
import { getAllBlogPosts } from "@/lib/supabase/admin-queries";
import BlogPostsTable from "@/components/admin/BlogPostsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const posts = await getAllBlogPosts({
    status: params.status,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
            Blog Posts CMS
          </h1>
          <p className="text-muted-foreground mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button asChild className="sm:self-start">
          <Link href="/admin/blogs/new">
            <Plus className="h-4 w-4 mr-2" /> New Blog Post
          </Link>
        </Button>
      </div>

      <Suspense fallback={<BlogsTableSkeleton />}>
        <BlogPostsTable posts={posts} />
      </Suspense>
    </div>
  );
}

function BlogsTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-muted/50 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
