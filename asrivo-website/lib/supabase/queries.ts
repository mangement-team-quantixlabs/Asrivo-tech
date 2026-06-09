import { createClient } from "./server";
import { withCache, CacheKeys, TTL } from "@/lib/cache";
import type {
  BlogPost,
  CaseStudy,
  JobListing,
  Testimonial,
  Partner,
  TeamMember,
  NewsroomPost,
  PageContent,
} from "@/types";

// ============================================
// Blog Posts
// ============================================

export async function getPublishedBlogPosts(limit?: number) {
  return withCache(
    CacheKeys.blogAll(limit),
    async () => {
      const supabase = await createClient();
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      // Use > 0 guard to avoid treating 0 as "no limit"
      if (limit !== undefined && Number.isInteger(limit) && limit > 0) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching blog posts:", error);
        return [];
      }
      return (data as BlogPost[]) ?? [];
    },
    TTL.MEDIUM
  );
}

export async function getBlogPostBySlug(slug: string) {
  return withCache(
    CacheKeys.blogSlug(slug),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) return null;
      return data as BlogPost;
    },
    TTL.MEDIUM
  );
}

// ============================================
// Case Studies
// ============================================

export async function getPublishedCaseStudies(filters?: {
  industry?: string;
  service?: string;
  region?: string;
  limit?: number;
}) {
  return withCache(
    CacheKeys.caseStudyAll(filters),
    async () => {
      const supabase = await createClient();
      let query = supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (filters?.industry) query = query.eq("industry", filters.industry);
      if (filters?.service) query = query.eq("service", filters.service);
      if (filters?.region) query = query.eq("region", filters.region);
      if (filters?.limit !== undefined && filters.limit > 0) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching case studies:", error);
        return [];
      }
      return (data as CaseStudy[]) ?? [];
    },
    TTL.MEDIUM
  );
}

export async function getCaseStudyBySlug(slug: string) {
  return withCache(
    CacheKeys.caseStudySlug(slug),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) return null;
      return data as CaseStudy;
    },
    TTL.MEDIUM
  );
}

// ============================================
// Job Listings
// ============================================

export async function getActiveJobListings(filters?: {
  department?: string;
  employment_type?: string;
  experience_level?: string;
}) {
  return withCache(
    CacheKeys.jobAll(filters),
    async () => {
      const supabase = await createClient();
      let query = supabase
        .from("job_listings")
        .select("*")
        .eq("is_active", true)
        .order("posted_at", { ascending: false });

      if (filters?.department) query = query.eq("department", filters.department);
      if (filters?.employment_type) query = query.eq("employment_type", filters.employment_type);
      if (filters?.experience_level) query = query.eq("experience_level", filters.experience_level);

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching job listings:", error);
        return [];
      }
      return (data as JobListing[]) ?? [];
    },
    TTL.MEDIUM
  );
}

export async function getJobBySlug(slug: string) {
  return withCache(
    CacheKeys.jobSlug(slug),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) return null;
      return data as JobListing;
    },
    TTL.SHORT
  );
}

export async function getActiveJobCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("job_listings")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  if (error) return 0;
  return count ?? 0;
}

// ============================================
// Testimonials
// ============================================

export async function getActiveTestimonials() {
  return withCache(
    CacheKeys.testimonials(),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
      }
      return (data as Testimonial[]) ?? [];
    },
    TTL.LONG
  );
}

// ============================================
// Partners
// ============================================

export async function getActivePartners() {
  return withCache(
    CacheKeys.partners(),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching partners:", error);
        return [];
      }
      return (data as Partner[]) ?? [];
    },
    TTL.LONG
  );
}

// ============================================
// Team Members
// ============================================

export async function getActiveTeamMembers() {
  return withCache(
    CacheKeys.teamMembers(),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
        return [];
      }
      return (data as TeamMember[]) ?? [];
    },
    TTL.STATIC
  );
}

// ============================================
// Newsroom
// ============================================

export async function getPublishedNewsroomPosts() {
  return withCache(
    CacheKeys.newsroom(),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("newsroom_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching newsroom posts:", error);
        return [];
      }
      return (data as NewsroomPost[]) ?? [];
    },
    TTL.MEDIUM
  );
}

// ============================================
// Page Content
// ============================================

export async function getPageContent(pageKey: string, sectionKey: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey)
    .single();

  if (error) return null;
  return data as PageContent;
}

// ============================================
// Site Settings
// ============================================

export async function getSiteSettings() {
  return withCache(
    CacheKeys.siteSettings(),
    async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("config")
        .eq("id", 1)
        .single();

      if (error) return null;
      return data?.config as Record<string, unknown> | null;
    },
    TTL.STATIC
  );
}
