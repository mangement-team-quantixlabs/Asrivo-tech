-- ASCIRVO Database — Performance Indexes & Constraints
-- Version: 1.2.0
-- Purpose: Add missing indexes for all high-traffic query paths identified in
--          lib/supabase/queries.ts and lib/supabase/admin-queries.ts

-- =============================================
-- blog_posts indexes
-- =============================================

-- Slug lookup (public: getBlogPostBySlug, admin: getBlogPostById)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts(slug);

-- Published listing with sort (public: getPublishedBlogPosts)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
  ON blog_posts(is_published, published_at DESC);

-- Admin search by title/category (admin: getAllBlogPosts)
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_trgm
  ON blog_posts USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(category, '')));

-- =============================================
-- case_studies indexes
-- =============================================

-- Slug lookup
CREATE INDEX IF NOT EXISTS idx_case_studies_slug
  ON case_studies(slug);

-- Published listing (public: getPublishedCaseStudies)
CREATE INDEX IF NOT EXISTS idx_case_studies_published
  ON case_studies(is_published, created_at DESC);

-- Filter by industry, service, region
CREATE INDEX IF NOT EXISTS idx_case_studies_industry
  ON case_studies(industry);

CREATE INDEX IF NOT EXISTS idx_case_studies_service
  ON case_studies(service);

CREATE INDEX IF NOT EXISTS idx_case_studies_region
  ON case_studies(region);

-- =============================================
-- job_listings indexes
-- =============================================

-- Slug lookup
CREATE INDEX IF NOT EXISTS idx_job_listings_slug
  ON job_listings(slug);

-- Active listing with sort (public: getActiveJobListings)
CREATE INDEX IF NOT EXISTS idx_job_listings_active_posted
  ON job_listings(is_active, posted_at DESC);

-- Filter dimensions
CREATE INDEX IF NOT EXISTS idx_job_listings_department
  ON job_listings(department);

CREATE INDEX IF NOT EXISTS idx_job_listings_employment_type
  ON job_listings(employment_type);

CREATE INDEX IF NOT EXISTS idx_job_listings_experience_level
  ON job_listings(experience_level);

-- =============================================
-- contact_leads indexes
-- =============================================

-- Status filter + sort (admin: getAllContactLeads)
CREATE INDEX IF NOT EXISTS idx_contact_leads_status_created
  ON contact_leads(status, created_at DESC);

-- Full-text search on name, email, company
CREATE INDEX IF NOT EXISTS idx_contact_leads_search_trgm
  ON contact_leads USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(email, '') || ' ' || coalesce(company, '')));

-- =============================================
-- job_applications indexes
-- =============================================

-- Job ID lookup + sort (admin: getJobApplications)
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id
  ON job_applications(job_id, applied_at DESC);

-- Status filter
CREATE INDEX IF NOT EXISTS idx_job_applications_status
  ON job_applications(status);

-- =============================================
-- newsletter_subscribers indexes
-- =============================================

-- Email is already UNIQUE (implicitly indexed), add source filter
CREATE INDEX IF NOT EXISTS idx_newsletter_source
  ON newsletter_subscribers(source, is_active);

-- =============================================
-- newsroom_posts indexes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_newsroom_slug
  ON newsroom_posts(slug);

CREATE INDEX IF NOT EXISTS idx_newsroom_published
  ON newsroom_posts(is_published, published_at DESC);

-- =============================================
-- team_members indexes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_team_members_display
  ON team_members(is_active, display_order ASC);

-- =============================================
-- testimonials indexes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_testimonials_display
  ON testimonials(is_active, display_order ASC);

-- =============================================
-- partners indexes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_partners_display
  ON partners(is_active, display_order ASC);

-- =============================================
-- admin_audit_log indexes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_audit_log_admin
  ON admin_audit_log(admin_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_log_resource
  ON admin_audit_log(resource_type, resource_id);

-- Enable pg_trgm extension for GIN text search indexes (must run as superuser)
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
