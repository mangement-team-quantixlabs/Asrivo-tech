// ============================================
// ASCIRVO TypeScript Types
// ============================================
// Last updated: migration 006_schema_enhancements

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
  // Marketing attribution (migration 006)
  referrer_url?: string;
  utm_source?: string;
  utm_campaign?: string;
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
  featured_image_alt?: string;
  read_time_minutes?: number;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  // Analytics & SEO (migration 006)
  view_count: number;
  featured: boolean;
  meta_description?: string;
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
  // Homepage spotlight (migration 006)
  featured: boolean;
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
  /** @deprecated Use resume_url (Supabase Storage path). Kept for backwards compat. */
  resume_path?: string;
  /** Canonical Supabase Storage path in the resumes/ bucket (migration 006) */
  resume_url?: string;
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
  /** Set when user clicks unsubscribe; is_active is also set to false (migration 006) */
  unsubscribed_at?: string;
}

export interface AdminProfile {
  id: string;
  full_name?: string;
  role: "super_admin" | "admin" | "editor";
  avatar_url?: string;
  created_at: string;
  /** Updated by auth trigger on every successful sign-in (migration 006) */
  last_login_at?: string;
  /** FALSE = suspended account; middleware denies access (migration 006) */
  is_active: boolean;
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
  /** For media_coverage type: URL of the external article (migration 006) */
  external_url?: string;
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

// ============================================
// Storage Types
// ============================================

export type StorageBucket =
  | "public-assets"
  | "blog-images"
  | "case-study-assets"
  | "team-photos"
  | "resumes";

/** Shape returned by supabase.storage.from(bucket).upload() */
export interface StorageUploadResult {
  path: string;
  fullPath: string;
  bucket: StorageBucket;
}

// ============================================
// API Response Helpers
// ============================================

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
