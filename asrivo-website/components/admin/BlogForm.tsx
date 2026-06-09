"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, type BlogPostFormData } from "@/lib/validations/admin";
import { createBlogPost, updateBlogPost } from "@/app/actions/admin-actions";
import type { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Eye,
  Settings,
  ChevronLeft,
  Loader2,
  Globe,
  Upload,
} from "lucide-react";
import Link from "next/link";

// ── Inline upload widget ──────────────────────────────────────────────────────
interface ImageUploadButtonProps {
  bucket: "blog-images" | "public-assets" | "case-study-assets" | "team-photos";
  onUpload: (url: string) => void;
  label?: string;
}

function ImageUploadButton({ bucket, onUpload, label = "Upload" }: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("bucket", bucket);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error ?? "Upload failed");
      } else {
        onUpload(json.url);
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setUploading(false);
      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs h-7 px-2 gap-1.5"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Upload className="h-3 w-3" />
        )}
        {uploading ? "Uploading…" : label}
      </Button>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

interface BlogFormProps {
  post?: BlogPost;
  adminRole?: string;
}

export default function BlogForm({ post, adminRole = "admin" }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const isEdit = !!post;

  // Extract initial markdown body if content exists
  const initialContent = post?.content && typeof post.content === "object" && "body" in post.content
    ? (post.content.body as string)
    : "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(blogPostSchema) as any,
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: initialContent,
      category: post?.category ?? "AI",
      tags: post?.tags?.join(", ") ?? "",
      author_name: post?.author_name ?? "ASCIRVO Editorial",
      author_avatar_url: post?.author_avatar_url ?? "",
      cover_image_url: post?.cover_image_url ?? "",
      read_time_minutes: post?.read_time_minutes ?? 5,
      is_published: post?.is_published ?? false,
    },
  });

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const contentValue = watch("content") ?? "";
  const excerptValue = watch("excerpt") ?? "";
  const isPublishedValue = watch("is_published");
  const coverImageValue = watch("cover_image_url") ?? "";
  const categoryValue = watch("category") ?? "General";

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [titleValue, setValue, isEdit]);

  // Auto-calculate read time from content
  useEffect(() => {
    if (contentValue) {
      const words = contentValue.trim().split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(words / 200));
      setValue("read_time_minutes", readTime);
    }
  }, [contentValue, setValue]);

  const onSubmit = (data: BlogPostFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          formData.append(key, String(val));
        }
      });

      const res = isEdit
        ? await updateBlogPost(post.id, formData)
        : await createBlogPost(formData);

      if (res.success) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        alert(res.error || "Failed to save post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/blogs">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-sora)]">
              {isEdit ? "Edit Blog Post" : "New Blog Post"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create, style, and manage your thought leadership content
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/blogs">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending} className="bg-[#1B4FD8] hover:bg-[#0A2463]">
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Title & Content Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Post Title</Label>
            <Input
              id="title"
              placeholder="e.g. Navigating the Era of Generative AI in Banking"
              className="text-lg font-medium h-12"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500 font-medium">{errors.title.message as any}</p>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <div className="flex items-center justify-between border-b pb-2">
              <TabsList className="bg-muted/50 p-0.5">
                <TabsTrigger value="edit" className="flex items-center gap-1.5 px-3 py-1.5 text-xs">
                  <FileText className="h-3.5 w-3.5" /> Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1.5 px-3 py-1.5 text-xs">
                  <Eye className="h-3.5 w-3.5" /> Live Preview
                </TabsTrigger>
              </TabsList>
              <div className="text-xs text-muted-foreground">
                Markdown supported
              </div>
            </div>

            <TabsContent value="edit" className="mt-4">
              <div className="space-y-2">
                <Textarea
                  id="content"
                  placeholder="Write your post content in Markdown format here..."
                  className="min-h-[500px] font-mono text-sm leading-relaxed p-4 bg-muted/20"
                  {...register("content")}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="min-h-[500px] p-6 border rounded-lg bg-white overflow-y-auto prose prose-slate max-w-none">
                {contentValue ? (
                  <div className="space-y-4">
                    {/* Basic Markdown Rendering */}
                    {contentValue.split("\n\n").map((para: string, i: number) => {
                      if (para.startsWith("# ")) {
                        return <h1 key={i} className="text-3xl font-bold font-[family-name:var(--font-sora)] mt-6 mb-4">{para.slice(2)}</h1>;
                      }
                      if (para.startsWith("## ")) {
                        return <h2 key={i} className="text-2xl font-bold font-[family-name:var(--font-sora)] mt-5 mb-3">{para.slice(3)}</h2>;
                      }
                      if (para.startsWith("### ")) {
                        return <h3 key={i} className="text-xl font-bold font-[family-name:var(--font-sora)] mt-4 mb-2">{para.slice(4)}</h3>;
                      }
                      if (para.startsWith("> ")) {
                        return <blockquote key={i} className="border-l-4 border-[#00C6BE] pl-4 italic my-4 text-muted-foreground">{para.slice(2)}</blockquote>;
                      }
                      if (para.startsWith("- ") || para.startsWith("* ")) {
                        return (
                          <ul key={i} className="list-disc pl-5 my-2 space-y-1">
                            {para.split("\n").map((li: string, j: number) => (
                              <li key={j}>{li.slice(2)}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i} className="leading-relaxed text-slate-700 whitespace-pre-wrap">{para}</p>;
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-center py-20">Nothing to preview yet. Start typing in the editor!</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column — Sidebar Metadata */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="flex items-center gap-1.5 text-sm font-bold font-[family-name:var(--font-sora)]">
                  <Settings className="h-4 w-4 text-[#1B4FD8]" /> Metadata Settings
                </span>
                <Badge className="bg-[#1B4FD8]/10 text-[#1B4FD8] font-semibold border-none">
                  {isPublishedValue ? "Published" : "Draft"}
                </Badge>
              </div>

              {/* Status Switch */}
              <div className="flex items-center justify-between py-1 bg-muted/20 px-3 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="is_published" className="text-xs font-semibold">Publish Post</Label>
                  <p className="text-[10px] text-muted-foreground">Make visible on public site</p>
                </div>
                <Switch
                  id="is_published"
                  checked={isPublishedValue}
                  onCheckedChange={(checked) => setValue("is_published", checked)}
                  disabled={adminRole === "editor"}
                />
              </div>

              {/* Slug Input */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-xs font-semibold">Slug URL</Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">/insights/</span>
                  <Input
                    id="slug"
                    className="pl-20 text-xs"
                    placeholder="post-slug"
                    {...register("slug")}
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs text-red-500 font-medium">{errors.slug.message as any}</p>
                )}
              </div>

              {/* Category dropdown */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-semibold">Category</Label>
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  {...register("category")}
                >
                  <option value="AI">AI & Machine Learning</option>
                  <option value="Cloud">Cloud Solutions</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Data">Data & Analytics</option>
                  <option value="Digital Transformation">Digital Transformation</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Company News">Company News</option>
                </select>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-xs font-semibold">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Short introduction for cards and SEO descriptions (recommended: under 160 characters)"
                  rows={3}
                  className="text-xs resize-none"
                  {...register("excerpt")}
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cover_image_url" className="text-xs font-semibold">Cover Image URL</Label>
                  <ImageUploadButton
                    bucket="blog-images"
                    label="Upload image"
                    onUpload={(url) => setValue("cover_image_url", url, { shouldValidate: true })}
                  />
                </div>
                <Input
                  id="cover_image_url"
                  placeholder="https://images.unsplash.com/..."
                  className="text-xs"
                  {...register("cover_image_url")}
                />
                {coverImageValue && (
                  <div className="aspect-[16/9] w-full rounded-md border border-border/60 overflow-hidden bg-muted mt-2 relative">
                    <img
                      src={coverImageValue}
                      alt="Cover Preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-xs font-semibold">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="AI, fintech, digital-banking"
                  className="text-xs"
                  {...register("tags")}
                />
              </div>

              {/* Author Details */}
              <div className="space-y-2">
                <Label htmlFor="author_name" className="text-xs font-semibold">Author Name</Label>
                <Input
                  id="author_name"
                  placeholder="e.g. John Doe"
                  className="text-xs"
                  {...register("author_name")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="author_avatar_url" className="text-xs font-semibold">Author Avatar URL</Label>
                  <ImageUploadButton
                    bucket="public-assets"
                    label="Upload photo"
                    onUpload={(url) => setValue("author_avatar_url", url, { shouldValidate: true })}
                  />
                </div>
                <Input
                  id="author_avatar_url"
                  placeholder="e.g. https://images.unsplash.com/..."
                  className="text-xs"
                  {...register("author_avatar_url")}
                />
              </div>

              {/* Read Time */}
              <div className="space-y-2">
                <Label htmlFor="read_time_minutes" className="text-xs font-semibold">Read Time (minutes)</Label>
                <Input
                  id="read_time_minutes"
                  type="number"
                  className="text-xs"
                  {...register("read_time_minutes")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Google SERP SEO Preview */}
          <Card className="border-border/50 shadow-sm bg-slate-50">
            <CardContent className="pt-5 space-y-3">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-600 font-[family-name:var(--font-sora)]">
                <Globe className="h-3.5 w-3.5 text-[#00C6BE]" /> Google Search Result Preview
              </span>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 truncate">
                  https://ascirvo.com/insights/{slugValue || "slug"}
                </p>
                <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight truncate">
                  {titleValue || "Post Title Goes Here..."} | ASCIRVO
                </h4>
                <p className="text-xs text-slate-600 leading-normal line-clamp-2">
                  {excerptValue || "Add an excerpt to control the description snippet Google displays for this post in search results."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
