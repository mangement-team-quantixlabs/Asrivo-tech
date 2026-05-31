"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { deleteBlogPost, toggleBlogPublish } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, FileText,
} from "lucide-react";

export default function BlogPostsTable({
  posts,
  adminRole = "admin",
}: {
  posts: BlogPost[];
  adminRole?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/blogs?${params.toString()}`);
  }

  function handleTogglePublish(id: string, current: boolean) {
    if (adminRole === "editor") return;
    startTransition(async () => {
      await toggleBlogPublish(id, !current);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (adminRole === "editor") return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    startTransition(async () => {
      await deleteBlogPost(id);
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const t = setTimeout(() => updateFilters("search", e.target.value), 400);
              return () => clearTimeout(t);
            }}
            className="pl-9"
          />
        </div>
        <Select value={currentStatus} onValueChange={(v) => updateFilters("status", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No blog posts found</p>
          <p className="text-xs mt-1">Create your first blog post to get started.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{post.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.category ? (
                      <Badge variant="outline" className="text-[11px]">{post.category}</Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] ${
                        post.is_published
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/20"
                          : "bg-amber-500/15 text-amber-700 border-amber-500/20"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blogs/edit/${post.id}`}>
                            <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        {adminRole !== "editor" && (
                          <DropdownMenuItem onClick={() => handleTogglePublish(post.id, post.is_published)} disabled={isPending}>
                            {post.is_published ? <><EyeOff className="h-3.5 w-3.5 mr-2" /> Unpublish</> : <><Eye className="h-3.5 w-3.5 mr-2" /> Publish</>}
                          </DropdownMenuItem>
                        )}
                        {adminRole !== "editor" && (
                          <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
