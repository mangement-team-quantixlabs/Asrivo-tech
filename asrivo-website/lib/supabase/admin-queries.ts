import { createClient } from "./server";
import type {
  ContactLead,
  BlogPost,
  CaseStudy,
  JobListing,
  JobApplication,
  NewsletterSubscriber,
  AdminProfile,
} from "@/types";

// ============================================
// Admin Profile
// ============================================

export async function getAdminProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as AdminProfile | null;
}

// ============================================
// Dashboard Stats
// ============================================

export async function getAdminDashboardStats() {
  const supabase = await createClient();

  const [leads, blogs, jobs, applications, subscribers] = await Promise.all([
    supabase.from("contact_leads").select("id, status", { count: "exact" }),
    supabase.from("blog_posts").select("id, is_published", { count: "exact" }),
    supabase
      .from("job_listings")
      .select("id, is_active", { count: "exact" }),
    supabase
      .from("job_applications")
      .select("id", { count: "exact" }),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact" })
      .eq("is_active", true),
  ]);

  const leadsData = leads.data ?? [];
  const blogsData = blogs.data ?? [];

  return {
    totalLeads: leads.count ?? 0,
    newLeads: leadsData.filter((l) => l.status === "new").length,
    totalBlogPosts: blogs.count ?? 0,
    publishedPosts: blogsData.filter((b) => b.is_published).length,
    draftPosts: blogsData.filter((b) => !b.is_published).length,
    totalJobs: jobs.count ?? 0,
    activeJobs: (jobs.data ?? []).filter((j) => j.is_active).length,
    totalApplications: applications.count ?? 0,
    totalSubscribers: subscribers.count ?? 0,
  };
}

// ============================================
// Contact Leads (Admin — full access)
// ============================================

export async function getAllContactLeads(filters?: {
  status?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
  return (data as ContactLead[]) ?? [];
}

export async function getLeadById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_leads")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ContactLead;
}

// ============================================
// Blog Posts (Admin — all statuses)
// ============================================

export async function getAllBlogPosts(filters?: {
  status?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status === "published") query = query.eq("is_published", true);
  if (filters?.status === "draft") query = query.eq("is_published", false);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,category.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  return (data as BlogPost[]) ?? [];
}

export async function getBlogPostById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as BlogPost;
}

// ============================================
// Case Studies (Admin — all statuses)
// ============================================

export async function getAllCaseStudies(filters?: {
  status?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status === "published") query = query.eq("is_published", true);
  if (filters?.status === "draft") query = query.eq("is_published", false);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,client_name.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
  return (data as CaseStudy[]) ?? [];
}

export async function getCaseStudyById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as CaseStudy;
}

// ============================================
// Job Listings (Admin — all statuses)
// ============================================

export async function getAllJobListings(filters?: {
  status?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("job_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status === "active") query = query.eq("is_active", true);
  if (filters?.status === "closed") query = query.eq("is_active", false);
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,department.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
  return (data as JobListing[]) ?? [];
}

export async function getJobListingById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as JobListing;
}

// ============================================
// Job Applications (Admin)
// ============================================

export async function getJobApplications(filters?: {
  job_id?: string;
  status?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("job_applications")
    .select("*, job_listings(title)")
    .order("applied_at", { ascending: false });

  if (filters?.job_id) query = query.eq("job_id", filters.job_id);
  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
  return data ?? [];
}

// ============================================
// Newsletter Subscribers (Admin)
// ============================================

export async function getAllNewsletterSubscribers(filters?: {
  search?: string;
  source?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (filters?.source && filters.source !== "all") {
    query = query.eq("source", filters.source);
  }
  if (filters?.search) {
    query = query.ilike("email", `%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
  return (data as NewsletterSubscriber[]) ?? [];
}

// ============================================
// Recent Leads (Dashboard)
// ============================================

export async function getRecentLeads(limit = 5) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as ContactLead[]) ?? [];
}
