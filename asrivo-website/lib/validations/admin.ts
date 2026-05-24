import { z } from "zod";

// ============================================
// Login
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================
// Lead Update
// ============================================

export const leadUpdateSchema = z.object({
  status: z.enum(["new", "read", "contacted", "closed"]),
  lead_notes: z.string().optional(),
});

export type LeadUpdateData = z.infer<typeof leadUpdateSchema>;

// ============================================
// Blog Post
// ============================================

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase with hyphens only"
  ),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  author_name: z.string().optional(),
  author_avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  cover_image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  read_time_minutes: z.coerce.number().int().positive().optional(),
  is_published: z.boolean().default(false),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// ============================================
// Job Listing
// ============================================

export const jobListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase with hyphens only"
  ),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employment_type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  experience_level: z.enum(["Entry", "Mid", "Senior", "Lead", "Director"]),
  description: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements_must: z.string().optional(),
  requirements_nice: z.string().optional(),
  benefits: z.string().optional(),
  is_active: z.boolean().default(true),
  closes_at: z.string().optional(),
});

export type JobListingFormData = z.infer<typeof jobListingSchema>;

// ============================================
// Case Study
// ============================================

export const caseStudySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase with hyphens only"
  ),
  client_name: z.string().optional(),
  client_logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  industry: z.string().optional(),
  service: z.string().optional(),
  region: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  technologies: z.string().optional(),
  testimonial: z.string().optional(),
  cover_image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  is_published: z.boolean().default(false),
});

export type CaseStudyFormData = z.infer<typeof caseStudySchema>;
