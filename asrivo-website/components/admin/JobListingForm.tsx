"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingSchema, type JobListingFormData } from "@/lib/validations/admin";
import { createJobListing, updateJobListing } from "@/app/actions/admin-actions";
import type { JobListing } from "@/types";
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
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface JobListingFormProps {
  job?: JobListing;
}

export default function JobListingForm({ job }: JobListingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const isEdit = !!job;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(jobListingSchema) as any,
    defaultValues: {
      title: job?.title ?? "",
      slug: job?.slug ?? "",
      department: job?.department ?? "Engineering",
      location: job?.location ?? "Remote",
      employment_type: job?.employment_type ?? "Full-time",
      experience_level: job?.experience_level ?? "Mid",
      description: job?.description ?? "",
      responsibilities: job?.responsibilities?.join("\n") ?? "",
      requirements_must: job?.requirements_must?.join("\n") ?? "",
      requirements_nice: job?.requirements_nice?.join("\n") ?? "",
      benefits: job?.benefits?.join("\n") ?? "",
      is_active: job?.is_active ?? true,
      closes_at: job?.closes_at ? new Date(job.closes_at).toISOString().split("T")[0] : "",
    },
  });

  const titleValue = watch("title");
  const descriptionValue = watch("description") ?? "";
  const isActiveValue = watch("is_active");

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

  const onSubmit = (data: JobListingFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          formData.append(key, String(val));
        }
      });

      const res = isEdit
        ? await updateJobListing(job.id, formData)
        : await createJobListing(formData);

      if (res.success) {
        router.push("/admin/jobs");
        router.refresh();
      } else {
        alert(res.error || "Failed to save job opening");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/jobs">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-sora)]">
              {isEdit ? "Edit Job Opening" : "Post New Job Opening"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Draft or publish recruitment information and benefits for candidates
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/jobs">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending} className="bg-[#1B4FD8] hover:bg-[#0A2463]">
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? "Save Changes" : "Post Position"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Title & Description */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g. Senior Machine Learning Engineer"
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
                  <Eye className="h-3.5 w-3.5" /> Preview Description
                </TabsTrigger>
              </TabsList>
              <div className="text-xs text-muted-foreground">Markdown supported</div>
            </div>

            <TabsContent value="edit" className="mt-4">
              <div className="space-y-2">
                <Textarea
                  id="description"
                  placeholder="Provide an engaging role summary and outline how this position impacts ASCIRVO's growth..."
                  className="min-h-[300px] font-sans text-sm leading-relaxed p-4"
                  {...register("description")}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="min-h-[300px] p-6 border rounded-lg bg-white overflow-y-auto prose prose-slate max-w-none">
                {descriptionValue ? (
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{descriptionValue}</p>
                ) : (
                  <p className="text-muted-foreground italic text-center py-10">No description entered yet.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* List Criteria Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardContent className="pt-5 space-y-2">
                <Label htmlFor="responsibilities" className="text-xs font-bold text-slate-700">Responsibilities (One per line)</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="Design high-performance models&#10;Collaborate with data teams&#10;Optimize training scripts"
                  rows={6}
                  className="text-xs font-sans leading-relaxed"
                  {...register("responsibilities")}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-5 space-y-2">
                <Label htmlFor="requirements_must" className="text-xs font-bold text-slate-700">Must-Have Requirements (One per line)</Label>
                <Textarea
                  id="requirements_must"
                  placeholder="5+ years engineering experience&#10;Degree in CS or equivalent&#10;Proficient in Python and Go"
                  rows={6}
                  className="text-xs font-sans leading-relaxed"
                  {...register("requirements_must")}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-5 space-y-2">
                <Label htmlFor="requirements_nice" className="text-xs font-bold text-slate-700">Nice-to-Have Requirements (One per line)</Label>
                <Textarea
                  id="requirements_nice"
                  placeholder="Experience with Kubernetes&#10;Knowledge of FinTech patterns&#10;Open-source contributions"
                  rows={6}
                  className="text-xs font-sans leading-relaxed"
                  {...register("requirements_nice")}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-5 space-y-2">
                <Label htmlFor="benefits" className="text-xs font-bold text-slate-700">Benefits & Perks (One per line)</Label>
                <Textarea
                  id="benefits"
                  placeholder="Competitive equity package&#10;Premium health coverage&#10;Flexible learning budget"
                  rows={6}
                  className="text-xs font-sans leading-relaxed"
                  {...register("benefits")}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column — Sidebar Metadata */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="flex items-center gap-1.5 text-sm font-bold font-[family-name:var(--font-sora)]">
                  <Settings className="h-4 w-4 text-[#1B4FD8]" /> Position Metadata
                </span>
                <Badge className="bg-[#1B4FD8]/10 text-[#1B4FD8] font-semibold border-none">
                  {isActiveValue ? "Active" : "Closed"}
                </Badge>
              </div>

              {/* Status Switch */}
              <div className="flex items-center justify-between py-1 bg-muted/20 px-3 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active" className="text-xs font-semibold">Active Status</Label>
                  <p className="text-[10px] text-muted-foreground">Accept submissions publicly</p>
                </div>
                <Switch
                  id="is_active"
                  checked={isActiveValue}
                  onCheckedChange={(checked) => setValue("is_active", checked)}
                />
              </div>

              {/* Slug Input */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-xs font-semibold">Slug URL</Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">/careers/</span>
                  <Input
                    id="slug"
                    className="pl-20 text-xs"
                    placeholder="job-opening-slug"
                    {...register("slug")}
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs text-red-500 font-medium">{errors.slug.message as any}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-xs font-semibold">Department</Label>
                <select
                  id="department"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                  {...register("department")}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Cloud">Cloud Solutions</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR & Recruitment</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-semibold">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Remote / Singapore / Bangalore"
                  className="text-xs"
                  {...register("location")}
                />
                 {errors.location && (
                  <p className="text-xs text-red-500 font-medium">{errors.location.message as any}</p>
                )}
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <Label htmlFor="employment_type" className="text-xs font-semibold">Employment Type</Label>
                <select
                  id="employment_type"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                  {...register("employment_type")}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience_level" className="text-xs font-semibold">Experience Level</Label>
                <select
                  id="experience_level"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus:outline-none"
                  {...register("experience_level")}
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior Level</option>
                  <option value="Lead">Lead Level</option>
                  <option value="Director">Director Level</option>
                </select>
              </div>

              {/* Closing Date */}
              <div className="space-y-2">
                <Label htmlFor="closes_at" className="text-xs font-semibold flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-400" /> Closing Date
                </Label>
                <Input
                  id="closes_at"
                  type="date"
                  className="text-xs"
                  {...register("closes_at")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
