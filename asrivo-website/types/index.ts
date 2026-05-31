// ============================================
// ASCIRVO TypeScript Types
// ============================================

// Database record types (matches Supabase schema)

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service_interest?: string;
  message?: string;
  lead_notes?: string;
  status: "new" | "read" | "contacted" | "closed";
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Record<string, unknown>;
  category?: string;
  tags?: string[];
  author_name?: string;
  author_avatar_url?: string;
  cover_image_url?: string;
  read_time_minutes?: number;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name?: string;
  client_logo_url?: string;
  industry?: string;
  service?: string;
  region?: string;
  challenge?: string;
  solution?: string;
  results?: { stat: string; label: string }[];
  technologies?: string[];
  testimonial?: string;
  cover_image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience_level: "Entry" | "Mid" | "Senior" | "Lead" | "Director";
  description?: string;
  responsibilities?: string[];
  requirements_must?: string[];
  requirements_nice?: string[];
  benefits?: string[];
  is_active: boolean;
  posted_at: string;
  closes_at?: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  resume_path?: string;
  cover_letter?: string;
  status: "received" | "reviewing" | "interview" | "offer" | "rejected";
  applied_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source?: string;
  is_active: boolean;
  subscribed_at: string;
}

export interface AdminProfile {
  id: string;
  full_name?: string;
  role: "super_admin" | "admin" | "editor";
  avatar_url?: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  job_title: string;
  department?: string;
  bio?: string;
  photo_url?: string;
  linkedin_url?: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  client_title?: string;
  company?: string;
  photo_url?: string;
  logo_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  company_name: string;
  logo_url: string;
  website_url?: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface NewsroomPost {
  id: string;
  headline: string;
  slug: string;
  type: "press_release" | "media_coverage" | "award" | "announcement";
  source?: string;
  source_url?: string;
  summary?: string;
  content?: Record<string, unknown>;
  cover_image_url?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content: Record<string, unknown>;
  updated_by?: string;
  updated_at: string;
}

export interface AuditLogEntry {
  id: string;
  admin_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  resource_title?: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}
