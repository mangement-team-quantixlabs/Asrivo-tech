-- ASCIRVO Database — Schema Enhancements
-- Version: 1.4.0
-- Purpose: Add missing columns identified by cross-referencing the PRD (Section 6 & 7)
--          against the initial schema in migration 001.
--
-- Changes:
--   blog_posts          → +view_count, +featured_image_alt, +meta_description
--   newsletter_subs     → +unsubscribed_at
--   job_applications    → +resume_url (Supabase Storage public URL)
--   contact_leads       → +referrer_url (track which page the form was submitted from)
--   case_studies        → +featured (boolean for homepage spotlight)
--   newsroom_posts      → +external_url (for media coverage links)
--   admin_profiles      → +last_login_at, +is_active

-- =========================================================================
-- 1. blog_posts — analytics & SEO columns
-- =========================================================================

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS view_count        INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS featured          BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS meta_description  TEXT,
  ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;

COMMENT ON COLUMN blog_posts.view_count IS
  'Incremented on each public page view; used for "most read" sorting.';
COMMENT ON COLUMN blog_posts.featured IS
  'When TRUE the post appears in the homepage Insights preview section.';
COMMENT ON COLUMN blog_posts.meta_description IS
  'SEO meta description — overrides excerpt for <meta name="description">.';
COMMENT ON COLUMN blog_posts.featured_image_alt IS
  'Accessibility alt text for the cover image; improves Lighthouse score.';

-- =========================================================================
-- 2. newsletter_subscribers — unsubscribe support
-- =========================================================================

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS unsubscribed_at   TIMESTAMPTZ;

COMMENT ON COLUMN newsletter_subscribers.unsubscribed_at IS
  'Timestamp of the last unsubscribe event. NULL means still active.';

-- Partial index speeds up the "get all active subscribers" query
CREATE INDEX IF NOT EXISTS idx_newsletter_active
  ON newsletter_subscribers(subscribed_at DESC)
  WHERE is_active = TRUE;

-- =========================================================================
-- 3. job_applications — Supabase Storage URL
-- =========================================================================

ALTER TABLE job_applications
  ADD COLUMN IF NOT EXISTS resume_url        TEXT;

COMMENT ON COLUMN job_applications.resume_url IS
  'Full Supabase Storage path for the uploaded resume PDF (resumes/ bucket).
   Use storage.createSignedUrl() to generate a short-lived download link.
   resume_path is kept as the legacy column; resume_url is the canonical reference.';

-- =========================================================================
-- 4. contact_leads — referrer tracking
-- =========================================================================

ALTER TABLE contact_leads
  ADD COLUMN IF NOT EXISTS referrer_url      TEXT,
  ADD COLUMN IF NOT EXISTS utm_source        TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign      TEXT;

COMMENT ON COLUMN contact_leads.referrer_url IS
  'The page URL the visitor was on when they submitted the contact form.';
COMMENT ON COLUMN contact_leads.utm_source IS
  'UTM source extracted from the referring URL (e.g. "google", "linkedin").';
COMMENT ON COLUMN contact_leads.utm_campaign IS
  'UTM campaign tag for marketing attribution.';

-- =========================================================================
-- 5. case_studies — homepage featured flag
-- =========================================================================

ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS featured          BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN case_studies.featured IS
  'When TRUE, the case study appears in the Homepage "Featured Case Studies" section (max 3).';

-- Partial index for the homepage query
CREATE INDEX IF NOT EXISTS idx_case_studies_featured
  ON case_studies(created_at DESC)
  WHERE featured = TRUE AND is_published = TRUE;

-- =========================================================================
-- 6. newsroom_posts — external coverage URL
-- =========================================================================

ALTER TABLE newsroom_posts
  ADD COLUMN IF NOT EXISTS external_url      TEXT;

COMMENT ON COLUMN newsroom_posts.external_url IS
  'For media_coverage type entries: the URL of the external article/coverage.';

-- =========================================================================
-- 7. admin_profiles — audit & access columns
-- =========================================================================

ALTER TABLE admin_profiles
  ADD COLUMN IF NOT EXISTS last_login_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_active         BOOLEAN DEFAULT TRUE;

COMMENT ON COLUMN admin_profiles.last_login_at IS
  'Timestamp of the user''s last successful login. Updated by the auth trigger.';
COMMENT ON COLUMN admin_profiles.is_active IS
  'FALSE = account suspended. Checked by middleware before granting dashboard access.';

-- Update the trigger to record last_login_at on every sign-in
CREATE OR REPLACE FUNCTION public.handle_admin_login()
RETURNS trigger AS $$
BEGIN
  UPDATE public.admin_profiles
  SET last_login_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_sign_in ON auth.users;
CREATE TRIGGER on_auth_user_sign_in
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at)
  EXECUTE FUNCTION public.handle_admin_login();

-- =========================================================================
-- 8. Auto-increment view_count helper function
-- =========================================================================
-- Called from the blog post detail page via a server action or API route.
-- Usage: SELECT increment_blog_view_count('post-uuid-here');

CREATE OR REPLACE FUNCTION public.increment_blog_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
