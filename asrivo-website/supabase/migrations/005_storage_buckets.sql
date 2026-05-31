-- ASCIRVO Database — Supabase Storage Bucket Provisioning
-- Version: 1.3.0
-- Purpose: Create the 5 storage buckets defined in the PRD (Section 7)
--          and apply matching RLS policies on the storage.objects table.
--
-- Bucket Overview:
--   public-assets      → Hero images, service icons, logos          (PUBLIC read)
--   blog-images        → Blog cover images and inline images        (PUBLIC read)
--   case-study-assets  → Case study visuals and attachments         (PUBLIC read)
--   team-photos        → Leadership and team member photos          (PUBLIC read)
--   resumes            → Job application resumes                    (PRIVATE — admin only)

-- =========================================================================
-- 1. Create Buckets
-- =========================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'public-assets',
    'public-assets',
    TRUE,                    -- publicly accessible
    5242880,                 -- 5 MB max per file
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
  ),
  (
    'blog-images',
    'blog-images',
    TRUE,
    10485760,                -- 10 MB max (cover images can be larger)
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'case-study-assets',
    'case-study-assets',
    TRUE,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  ),
  (
    'team-photos',
    'team-photos',
    TRUE,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'resumes',
    'resumes',
    FALSE,                   -- PRIVATE bucket — never publicly accessible
    10485760,                -- 10 MB max (resume PDFs)
    ARRAY['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  )
ON CONFLICT (id) DO NOTHING;

-- =========================================================================
-- 2. RLS Policies — Public buckets (public-assets, blog-images, case-study-assets, team-photos)
-- =========================================================================
-- DROP IF EXISTS before each CREATE makes this script fully idempotent
-- (PostgreSQL has no CREATE POLICY IF NOT EXISTS syntax).

-- Allow anyone to read objects from public buckets
DROP POLICY IF EXISTS "Public read — public-assets"     ON storage.objects;
DROP POLICY IF EXISTS "Public read — blog-images"       ON storage.objects;
DROP POLICY IF EXISTS "Public read — case-study-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read — team-photos"       ON storage.objects;

CREATE POLICY "Public read — public-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-assets');

CREATE POLICY "Public read — blog-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Public read — case-study-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-study-assets');

CREATE POLICY "Public read — team-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-photos');

-- Authenticated admins can upload/update/delete in public buckets
DROP POLICY IF EXISTS "Admins manage — public-assets"      ON storage.objects;
DROP POLICY IF EXISTS "Admins manage — blog-images"        ON storage.objects;
DROP POLICY IF EXISTS "Admins manage — case-study-assets"  ON storage.objects;
DROP POLICY IF EXISTS "Admins manage — team-photos"        ON storage.objects;

CREATE POLICY "Admins manage — public-assets"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'public-assets'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'public-assets'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Admins manage — blog-images"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Admins manage — case-study-assets"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'case-study-assets'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'case-study-assets'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Admins manage — team-photos"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'team-photos'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'team-photos'
    AND auth.role() = 'authenticated'
  );

-- =========================================================================
-- 3. RLS Policies — Private bucket (resumes)
-- =========================================================================

-- Public applicants can INSERT only (upload their own resume when applying)
-- They cannot LIST or SELECT other resumes
DROP POLICY IF EXISTS "Applicants can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admins manage — resumes"       ON storage.objects;

CREATE POLICY "Applicants can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resumes'
  );

-- Authenticated admins have full access to resumes
CREATE POLICY "Admins manage — resumes"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'resumes'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'resumes'
    AND auth.role() = 'authenticated'
  );

-- =========================================================================
-- 4. Helper function — Generate signed URL for resume download (admin only)
-- =========================================================================
-- Usage: SELECT storage.foldername(name) FROM storage.objects WHERE bucket_id = 'resumes';
-- Signed URLs are generated client-side via: supabase.storage.from('resumes').createSignedUrl(path, 3600)
-- This is documented here for reference; no SQL function is needed.
