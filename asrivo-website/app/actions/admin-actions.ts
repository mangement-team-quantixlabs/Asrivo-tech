"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  loginSchema,
  blogPostSchema,
  jobListingSchema,
  caseStudySchema,
} from "@/lib/validations/admin";

// ============================================
// Auth Actions
// ============================================

export async function loginAction(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ============================================
// Lead Actions
// ============================================

export async function updateLeadStatus(
  id: string,
  status: string,
  leadNotes?: string
) {
  const supabase = await createClient();
  const updateData: Record<string, unknown> = { status };
  if (leadNotes !== undefined) updateData.lead_notes = leadNotes;

  const { error } = await supabase
    .from("contact_leads")
    .update(updateData)
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_leads")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  return { success: true };
}

// ============================================
// Blog Post Actions
// ============================================

export async function createBlogPost(formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || undefined,
    content: (formData.get("content") as string) || undefined,
    category: (formData.get("category") as string) || undefined,
    tags: (formData.get("tags") as string) || undefined,
    author_name: (formData.get("author_name") as string) || undefined,
    author_avatar_url: (formData.get("author_avatar_url") as string) || undefined,
    cover_image_url: (formData.get("cover_image_url") as string) || undefined,
    read_time_minutes: formData.get("read_time_minutes")
      ? Number(formData.get("read_time_minutes"))
      : undefined,
    is_published: formData.get("is_published") === "true",
  };

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();

  const insertData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt || null,
    content: parsed.data.content
      ? { type: "markdown", body: parsed.data.content }
      : null,
    category: parsed.data.category || null,
    tags: parsed.data.tags
      ? parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : null,
    author_name: parsed.data.author_name || null,
    author_avatar_url: parsed.data.author_avatar_url || null,
    cover_image_url: parsed.data.cover_image_url || null,
    read_time_minutes: parsed.data.read_time_minutes || null,
    is_published: parsed.data.is_published,
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
  };

  const { error } = await supabase.from("blog_posts").insert(insertData);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/blogs");
  revalidatePath("/insights");
  return { success: true };
}

export async function updateBlogPost(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || undefined,
    content: (formData.get("content") as string) || undefined,
    category: (formData.get("category") as string) || undefined,
    tags: (formData.get("tags") as string) || undefined,
    author_name: (formData.get("author_name") as string) || undefined,
    author_avatar_url: (formData.get("author_avatar_url") as string) || undefined,
    cover_image_url: (formData.get("cover_image_url") as string) || undefined,
    read_time_minutes: formData.get("read_time_minutes")
      ? Number(formData.get("read_time_minutes"))
      : undefined,
    is_published: formData.get("is_published") === "true",
  };

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const updateData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt || null,
    content: parsed.data.content
      ? { type: "markdown", body: parsed.data.content }
      : null,
    category: parsed.data.category || null,
    tags: parsed.data.tags
      ? parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : null,
    author_name: parsed.data.author_name || null,
    author_avatar_url: parsed.data.author_avatar_url || null,
    cover_image_url: parsed.data.cover_image_url || null,
    read_time_minutes: parsed.data.read_time_minutes || null,
    is_published: parsed.data.is_published,
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/blogs");
  revalidatePath("/insights");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/blogs");
  revalidatePath("/insights");
  return { success: true };
}

export async function toggleBlogPublish(id: string, isPublished: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/blogs");
  revalidatePath("/insights");
  return { success: true };
}

// ============================================
// Job Listing Actions
// ============================================

export async function createJobListing(formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    department: formData.get("department") as string,
    location: formData.get("location") as string,
    employment_type: formData.get("employment_type") as string,
    experience_level: formData.get("experience_level") as string,
    description: (formData.get("description") as string) || undefined,
    responsibilities: (formData.get("responsibilities") as string) || undefined,
    requirements_must: (formData.get("requirements_must") as string) || undefined,
    requirements_nice: (formData.get("requirements_nice") as string) || undefined,
    benefits: (formData.get("benefits") as string) || undefined,
    is_active: formData.get("is_active") === "true",
    closes_at: (formData.get("closes_at") as string) || undefined,
  };

  const parsed = jobListingSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const splitLines = (s?: string) =>
    s ? s.split("\n").map((l) => l.trim()).filter(Boolean) : null;

  const insertData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    department: parsed.data.department,
    location: parsed.data.location,
    employment_type: parsed.data.employment_type,
    experience_level: parsed.data.experience_level,
    description: parsed.data.description || null,
    responsibilities: splitLines(parsed.data.responsibilities),
    requirements_must: splitLines(parsed.data.requirements_must),
    requirements_nice: splitLines(parsed.data.requirements_nice),
    benefits: splitLines(parsed.data.benefits),
    is_active: parsed.data.is_active,
    closes_at: parsed.data.closes_at || null,
  };

  const { error } = await supabase.from("job_listings").insert(insertData);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateJobListing(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    department: formData.get("department") as string,
    location: formData.get("location") as string,
    employment_type: formData.get("employment_type") as string,
    experience_level: formData.get("experience_level") as string,
    description: (formData.get("description") as string) || undefined,
    responsibilities: (formData.get("responsibilities") as string) || undefined,
    requirements_must: (formData.get("requirements_must") as string) || undefined,
    requirements_nice: (formData.get("requirements_nice") as string) || undefined,
    benefits: (formData.get("benefits") as string) || undefined,
    is_active: formData.get("is_active") === "true",
    closes_at: (formData.get("closes_at") as string) || undefined,
  };

  const parsed = jobListingSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const splitLines = (s?: string) =>
    s ? s.split("\n").map((l) => l.trim()).filter(Boolean) : null;

  const updateData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    department: parsed.data.department,
    location: parsed.data.location,
    employment_type: parsed.data.employment_type,
    experience_level: parsed.data.experience_level,
    description: parsed.data.description || null,
    responsibilities: splitLines(parsed.data.responsibilities),
    requirements_must: splitLines(parsed.data.requirements_must),
    requirements_nice: splitLines(parsed.data.requirements_nice),
    benefits: splitLines(parsed.data.benefits),
    is_active: parsed.data.is_active,
    closes_at: parsed.data.closes_at || null,
  };

  const { error } = await supabase
    .from("job_listings")
    .update(updateData)
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return { success: true };
}

export async function deleteJobListing(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_listings")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return { success: true };
}

export async function toggleJobActive(id: string, isActive: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_listings")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateApplicationStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_applications")
    .update({ status })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/jobs/applications");
  return { success: true };
}

// ============================================
// Case Study Actions
// ============================================

export async function createCaseStudy(formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    client_name: (formData.get("client_name") as string) || undefined,
    client_logo_url: (formData.get("client_logo_url") as string) || undefined,
    industry: (formData.get("industry") as string) || undefined,
    service: (formData.get("service") as string) || undefined,
    region: (formData.get("region") as string) || undefined,
    challenge: (formData.get("challenge") as string) || undefined,
    solution: (formData.get("solution") as string) || undefined,
    results: (formData.get("results") as string) || undefined,
    technologies: (formData.get("technologies") as string) || undefined,
    testimonial: (formData.get("testimonial") as string) || undefined,
    cover_image_url: (formData.get("cover_image_url") as string) || undefined,
    is_published: formData.get("is_published") === "true",
  };

  const parsed = caseStudySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();

  let resultsJson = null;
  if (parsed.data.results) {
    try {
      resultsJson = JSON.parse(parsed.data.results);
    } catch {
      resultsJson = [{ stat: parsed.data.results, label: "Result" }];
    }
  }

  const insertData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    client_name: parsed.data.client_name || null,
    client_logo_url: parsed.data.client_logo_url || null,
    industry: parsed.data.industry || null,
    service: parsed.data.service || null,
    region: parsed.data.region || null,
    challenge: parsed.data.challenge || null,
    solution: parsed.data.solution || null,
    results: resultsJson,
    technologies: parsed.data.technologies
      ? parsed.data.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : null,
    testimonial: parsed.data.testimonial || null,
    cover_image_url: parsed.data.cover_image_url || null,
    is_published: parsed.data.is_published,
  };

  const { error } = await supabase.from("case_studies").insert(insertData);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}

export async function updateCaseStudy(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    client_name: (formData.get("client_name") as string) || undefined,
    client_logo_url: (formData.get("client_logo_url") as string) || undefined,
    industry: (formData.get("industry") as string) || undefined,
    service: (formData.get("service") as string) || undefined,
    region: (formData.get("region") as string) || undefined,
    challenge: (formData.get("challenge") as string) || undefined,
    solution: (formData.get("solution") as string) || undefined,
    results: (formData.get("results") as string) || undefined,
    technologies: (formData.get("technologies") as string) || undefined,
    testimonial: (formData.get("testimonial") as string) || undefined,
    cover_image_url: (formData.get("cover_image_url") as string) || undefined,
    is_published: formData.get("is_published") === "true",
  };

  const parsed = caseStudySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();

  let resultsJson = null;
  if (parsed.data.results) {
    try {
      resultsJson = JSON.parse(parsed.data.results);
    } catch {
      resultsJson = [{ stat: parsed.data.results, label: "Result" }];
    }
  }

  const updateData: Record<string, unknown> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    client_name: parsed.data.client_name || null,
    client_logo_url: parsed.data.client_logo_url || null,
    industry: parsed.data.industry || null,
    service: parsed.data.service || null,
    region: parsed.data.region || null,
    challenge: parsed.data.challenge || null,
    solution: parsed.data.solution || null,
    results: resultsJson,
    technologies: parsed.data.technologies
      ? parsed.data.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : null,
    testimonial: parsed.data.testimonial || null,
    cover_image_url: parsed.data.cover_image_url || null,
    is_published: parsed.data.is_published,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("case_studies")
    .update(updateData)
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("case_studies")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}

export async function toggleCaseStudyPublish(
  id: string,
  isPublished: boolean
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("case_studies")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}

// ============================================
// Newsletter Actions
// ============================================

export async function deleteSubscriber(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/newsletter");
  return { success: true };
}

export async function exportSubscribersCSV() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email, source, is_active, subscribed_at")
    .eq("is_active", true)
    .order("subscribed_at", { ascending: false });

  if (error) return { success: false, error: error.message, csv: "" };

  const rows = data ?? [];
  const header = "Email,Source,Status,Subscribed At\n";
  const csvBody = rows
    .map(
      (r) =>
        `${r.email},${r.source ?? ""},Active,${r.subscribed_at}`
    )
    .join("\n");

  return { success: true, csv: header + csvBody };
}
