/**
 * __tests__/validations/admin.test.ts
 *
 * Unit tests for all Zod validation schemas defined in lib/validations/admin.ts
 * These are pure functions — no mocking required.
 */

import {
  loginSchema,
  blogPostSchema,
  jobListingSchema,
  caseStudySchema,
  leadUpdateSchema,
} from "@/lib/validations/admin";

// ============================================================
// loginSchema
// ============================================================
describe("loginSchema", () => {
  it("accepts valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "admin@ascirvo.com",
      password: "Admin@12345",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "Admin@12345",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/valid email/i);
  });

  it("rejects a password shorter than 6 characters", () => {
    const result = loginSchema.safeParse({
      email: "admin@ascirvo.com",
      password: "abc",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/6 characters/i);
  });

  it("rejects when email is missing", () => {
    const result = loginSchema.safeParse({ password: "Admin@12345" });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// leadUpdateSchema
// ============================================================
describe("leadUpdateSchema", () => {
  it("accepts all valid statuses", () => {
    const validStatuses = ["new", "read", "contacted", "closed"] as const;
    validStatuses.forEach((status) => {
      const result = leadUpdateSchema.safeParse({ status });
      expect(result.success).toBe(true);
    });
  });

  it("accepts status with optional lead_notes", () => {
    const result = leadUpdateSchema.safeParse({
      status: "contacted",
      lead_notes: "Followed up via email on 2026-05-31",
    });
    expect(result.success).toBe(true);
    expect(result.data?.lead_notes).toBe("Followed up via email on 2026-05-31");
  });

  it("rejects an invalid status value", () => {
    const result = leadUpdateSchema.safeParse({ status: "spam" });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// blogPostSchema
// ============================================================
describe("blogPostSchema", () => {
  const validBlogPost = {
    title: "How to Build Scalable APIs",
    slug: "how-to-build-scalable-apis",
    is_published: false,
  };

  it("accepts a minimal valid blog post", () => {
    const result = blogPostSchema.safeParse(validBlogPost);
    expect(result.success).toBe(true);
  });

  it("accepts a fully populated blog post", () => {
    const result = blogPostSchema.safeParse({
      ...validBlogPost,
      excerpt: "A deep dive into API design",
      content: "## Introduction\n\nAPIs are everywhere...",
      category: "Engineering",
      tags: "API, REST, Node.js",
      author_name: "Dr. Marcus Vance",
      author_avatar_url: "https://example.com/avatar.jpg",
      cover_image_url: "https://example.com/cover.jpg",
      read_time_minutes: 8,
      is_published: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a title shorter than 3 characters", () => {
    const result = blogPostSchema.safeParse({ ...validBlogPost, title: "AB" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/3 characters/i);
  });

  it("rejects an invalid slug format (with spaces)", () => {
    const result = blogPostSchema.safeParse({
      ...validBlogPost,
      slug: "my blog post",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/lowercase with hyphens/i);
  });

  it("rejects an invalid slug format (with uppercase)", () => {
    const result = blogPostSchema.safeParse({
      ...validBlogPost,
      slug: "My-Blog-Post",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-URL author_avatar_url", () => {
    const result = blogPostSchema.safeParse({
      ...validBlogPost,
      author_avatar_url: "not-a-url",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/valid URL/i);
  });

  it("accepts an empty string for optional URL fields", () => {
    const result = blogPostSchema.safeParse({
      ...validBlogPost,
      author_avatar_url: "",
      cover_image_url: "",
    });
    expect(result.success).toBe(true);
  });

  it("defaults is_published to false when not provided", () => {
    const result = blogPostSchema.safeParse({
      title: "My Article",
      slug: "my-article",
    });
    expect(result.success).toBe(true);
    expect(result.data?.is_published).toBe(false);
  });
});

// ============================================================
// jobListingSchema
// ============================================================
describe("jobListingSchema", () => {
  const validJob = {
    title: "Senior Frontend Engineer",
    slug: "senior-frontend-engineer",
    department: "Engineering",
    location: "Singapore (Hybrid)",
    employment_type: "Full-time" as const,
    experience_level: "Senior" as const,
    is_active: true,
  };

  it("accepts a minimal valid job listing", () => {
    const result = jobListingSchema.safeParse(validJob);
    expect(result.success).toBe(true);
  });

  it("accepts all valid employment_type values", () => {
    const types = ["Full-time", "Part-time", "Contract", "Internship"] as const;
    types.forEach((employment_type) => {
      const result = jobListingSchema.safeParse({ ...validJob, employment_type });
      expect(result.success).toBe(true);
    });
  });

  it("accepts all valid experience_level values", () => {
    const levels = ["Entry", "Mid", "Senior", "Lead", "Director"] as const;
    levels.forEach((experience_level) => {
      const result = jobListingSchema.safeParse({ ...validJob, experience_level });
      expect(result.success).toBe(true);
    });
  });

  it("rejects an invalid employment_type", () => {
    const result = jobListingSchema.safeParse({
      ...validJob,
      employment_type: "Freelance",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid experience_level", () => {
    const result = jobListingSchema.safeParse({
      ...validJob,
      experience_level: "God-level",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when department is missing", () => {
    const { department: _dep, ...rest } = validJob;
    const result = jobListingSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects an empty department string", () => {
    const result = jobListingSchema.safeParse({ ...validJob, department: "" });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// caseStudySchema
// ============================================================
describe("caseStudySchema", () => {
  const validCaseStudy = {
    title: "Cloud Migration for Apex Corp",
    slug: "cloud-migration-apex-corp",
    is_published: false,
  };

  it("accepts a minimal valid case study", () => {
    const result = caseStudySchema.safeParse(validCaseStudy);
    expect(result.success).toBe(true);
  });

  it("accepts a fully populated case study", () => {
    const result = caseStudySchema.safeParse({
      ...validCaseStudy,
      client_name: "Apex Logistics Corp",
      client_logo_url: "https://example.com/logo.png",
      industry: "Manufacturing & Logistics",
      service: "Cloud Solutions",
      region: "North America",
      challenge: "Aging on-premise mainframe infrastructure",
      solution: "Migrated to AWS serverless multi-region setup",
      results: '[{"stat": "40%", "label": "Cost Savings"}]',
      technologies: "AWS, Terraform, ECS",
      testimonial: "ASCIRVO delivered on time and transformed our operations.",
      cover_image_url: "https://example.com/cover.jpg",
      is_published: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a title shorter than 3 characters", () => {
    const result = caseStudySchema.safeParse({ ...validCaseStudy, title: "AB" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-URL client_logo_url", () => {
    const result = caseStudySchema.safeParse({
      ...validCaseStudy,
      client_logo_url: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty string for optional URL fields", () => {
    const result = caseStudySchema.safeParse({
      ...validCaseStudy,
      client_logo_url: "",
      cover_image_url: "",
    });
    expect(result.success).toBe(true);
  });

  it("defaults is_published to false", () => {
    const result = caseStudySchema.safeParse({
      title: "My Case Study",
      slug: "my-case-study",
    });
    expect(result.success).toBe(true);
    expect(result.data?.is_published).toBe(false);
  });
});
