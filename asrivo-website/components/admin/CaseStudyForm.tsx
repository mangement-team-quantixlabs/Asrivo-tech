"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseStudySchema, type CaseStudyFormData } from "@/lib/validations/admin";
import { createCaseStudy, updateCaseStudy } from "@/app/actions/admin-actions";
import type { CaseStudy } from "@/types";
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
  Plus,
  Trash2,
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

interface CaseStudyFormProps {
  caseStudy?: CaseStudy;
  adminRole?: string;
}

export default function CaseStudyForm({ caseStudy, adminRole = "admin" }: CaseStudyFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const isEdit = !!caseStudy;

  // Handle dynamic results repeater state
  const [resultsList, setResultsList] = useState<{ stat: string; label: string }[]>(
    caseStudy?.results && Array.isArray(caseStudy.results)
      ? caseStudy.results
      : [{ stat: "", label: "" }]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(caseStudySchema) as any,
    defaultValues: {
      title: caseStudy?.title ?? "",
      slug: caseStudy?.slug ?? "",
      client_name: caseStudy?.client_name ?? "",
      client_logo_url: caseStudy?.client_logo_url ?? "",
      industry: caseStudy?.industry ?? "Banking",
      service: caseStudy?.service ?? "AI/ML",
      region: caseStudy?.region ?? "Global",
      challenge: caseStudy?.challenge ?? "",
      solution: caseStudy?.solution ?? "",
      results: caseStudy?.results ? JSON.stringify(caseStudy.results) : "[]",
      technologies: caseStudy?.technologies?.join(", ") ?? "",
      testimonial: caseStudy?.testimonial ?? "",
      cover_image_url: caseStudy?.cover_image_url ?? "",
      is_published: caseStudy?.is_published ?? false,
    },
  });

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const challengeValue = watch("challenge") ?? "";
  const solutionValue = watch("solution") ?? "";
  const isPublishedValue = watch("is_published");
  const coverImageValue = watch("cover_image_url") ?? "";

  // Auto-generate slug
  useEffect(() => {
    if (!isEdit && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [titleValue, setValue, isEdit]);

  // Sync resultsList with form results field
  useEffect(() => {
    setValue("results", JSON.stringify(resultsList.filter((r) => r.stat && r.label)));
  }, [resultsList, setValue]);

  const addResult = () => {
    setResultsList([...resultsList, { stat: "", label: "" }]);
  };

  const removeResult = (index: number) => {
    const updated = resultsList.filter((_, i) => i !== index);
    setResultsList(updated.length ? updated : [{ stat: "", label: "" }]);
  };

  const updateResultField = (index: number, field: "stat" | "label", value: string) => {
    const updated = [...resultsList];
    updated[index][field] = value;
    setResultsList(updated);
  };

  const onSubmit = (data: CaseStudyFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          formData.append(key, String(val));
        }
      });

      const res = isEdit
        ? await updateCaseStudy(caseStudy.id, formData)
        : await createCaseStudy(formData);

      if (res.success) {
        router.push("/admin/case-studies");
        router.refresh();
      } else {
        alert(res.error || "Failed to save case study");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/case-studies">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-sora)]">
              {isEdit ? "Edit Case Study" : "New Case Study"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Publish key client transformation results and technologies used
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/case-studies">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending} className="bg-[#1B4FD8] hover:bg-[#0A2463]">
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Case Study"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Text editors */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Case Study Title</Label>
            <Input
              id="title"
              placeholder="e.g. Modernizing Core Banking Infrastructure for a Global Lender"
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
                  <Eye className="h-3.5 w-3.5" /> Preview Content
                </TabsTrigger>
              </TabsList>
              <div className="text-xs text-muted-foreground">Markdown supported</div>
            </div>

            <TabsContent value="edit" className="mt-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="challenge" className="text-xs font-bold text-slate-700">The Challenge</Label>
                <Textarea
                  id="challenge"
                  placeholder="Describe the client's business problems, legacy pain points, and needs..."
                  className="min-h-[220px] font-sans text-sm leading-relaxed p-4"
                  {...register("challenge")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution" className="text-xs font-bold text-slate-700">Our Solution</Label>
                <Textarea
                  id="solution"
                  placeholder="Detail ASCIRVO's engineering process, architectures designed, and solutions deployed..."
                  className="min-h-[220px] font-sans text-sm leading-relaxed p-4"
                  {...register("solution")}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="min-h-[500px] p-6 border rounded-lg bg-white overflow-y-auto prose prose-slate max-w-none space-y-6">
                <div>
                  <h3 className="text-lg font-bold border-b pb-2 text-[#0A2463]">The Challenge</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mt-2">{challengeValue || "No challenge content entered yet."}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold border-b pb-2 text-[#0A2463]">Our Solution</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mt-2">{solutionValue || "No solution content entered yet."}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Dynamic Results Repeater */}
          <Card className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <Label className="text-sm font-bold text-slate-700">Key Results / Metrics</Label>
                <Button type="button" variant="outline" size="sm" onClick={addResult}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Metric
                </Button>
              </div>

              <div className="space-y-3">
                {resultsList.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-[120px]">
                      <Input
                        placeholder="e.g. 40% or 2.5x"
                        value={item.stat}
                        onChange={(e) => updateResultField(index, "stat", e.target.value)}
                        className="font-bold text-center"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="e.g. Cost savings in operations"
                        value={item.label}
                        onChange={(e) => updateResultField(index, "label", e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeResult(index)}
                      className="text-red-500 hover:bg-red-50"
                      disabled={resultsList.length === 1 && !item.stat && !item.label}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column — Sidebar Metadata */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="flex items-center gap-1.5 text-sm font-bold font-[family-name:var(--font-sora)]">
                  <Settings className="h-4 w-4 text-[#1B4FD8]" /> Case Study Info
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
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">/case-studies/</span>
                  <Input
                    id="slug"
                    className="pl-28 text-xs"
                    placeholder="project-slug"
                    {...register("slug")}
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs text-red-500 font-medium">{errors.slug.message as any}</p>
                )}
              </div>

              {/* Client Info */}
              <div className="space-y-2">
                <Label htmlFor="client_name" className="text-xs font-semibold">Client Name</Label>
                <Input
                  id="client_name"
                  placeholder="e.g. Standard Chartered"
                  className="text-xs"
                  {...register("client_name")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="client_logo_url" className="text-xs font-semibold">Client Logo URL</Label>
                  <ImageUploadButton
                    bucket="case-study-assets"
                    label="Upload logo"
                    onUpload={(url) => setValue("client_logo_url", url, { shouldValidate: true })}
                  />
                </div>
                <Input
                  id="client_logo_url"
                  placeholder="https://logo.example.com/logo.svg"
                  className="text-xs"
                  {...register("client_logo_url")}
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cover_image_url" className="text-xs font-semibold">Cover Image URL</Label>
                  <ImageUploadButton
                    bucket="case-study-assets"
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

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs font-semibold">Industry</Label>
                  <select
                    id="industry"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                    {...register("industry")}
                  >
                    <option value="Banking">Banking & Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Energy">Energy</option>
                    <option value="Government">Public Sector</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-xs font-semibold">Service</Label>
                  <select
                    id="service"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                    {...register("service")}
                  >
                    <option value="AI/ML">AI/ML</option>
                    <option value="Cloud">Cloud Solutions</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Data">Data & Analytics</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Engineering">Software Engineering</option>
                    <option value="Consulting">Business Consulting</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region" className="text-xs font-semibold">Region</Label>
                <select
                  id="region"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                  {...register("region")}
                >
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Global">Global</option>
                </select>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label htmlFor="technologies" className="text-xs font-semibold">Technologies Used</Label>
                <Input
                  id="technologies"
                  placeholder="AWS, PyTorch, Kubernetes, React"
                  className="text-xs"
                  {...register("technologies")}
                />
              </div>

              {/* Testimonial Quote */}
              <div className="space-y-2">
                <Label htmlFor="testimonial" className="text-xs font-semibold">Testimonial Quote</Label>
                <Textarea
                  id="testimonial"
                  placeholder="Optional quote from a client stakeholder..."
                  rows={3}
                  className="text-xs"
                  {...register("testimonial")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
