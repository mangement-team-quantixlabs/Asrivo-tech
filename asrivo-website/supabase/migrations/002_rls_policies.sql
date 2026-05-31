-- ASCIRVO Row-Level Security Policies
-- Enables RLS on all tables with appropriate access control
--
-- NOTE: Each CREATE POLICY is preceded by DROP POLICY IF EXISTS
--       making this file fully idempotent — safe to re-run at any time.
--       (PostgreSQL has no CREATE POLICY IF NOT EXISTS syntax.)

-- =============================================
-- contact_leads: Public INSERT, Admin full access
-- =============================================
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_leads;
DROP POLICY IF EXISTS "Admins can manage leads"        ON contact_leads;
CREATE POLICY "Anyone can submit contact form" ON contact_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage leads"        ON contact_leads FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- blog_posts: Public read published, Admin full access
-- =============================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins manage posts"         ON blog_posts;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage posts"         ON blog_posts FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- case_studies: Public read published, Admin full access
-- =============================================
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published cases" ON case_studies;
DROP POLICY IF EXISTS "Admins manage cases"         ON case_studies;
CREATE POLICY "Public read published cases" ON case_studies FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage cases"         ON case_studies FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- job_listings: Public read active, Admin full access
-- =============================================
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active jobs" ON job_listings;
DROP POLICY IF EXISTS "Admins manage jobs"      ON job_listings;
CREATE POLICY "Public read active jobs" ON job_listings FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage jobs"      ON job_listings FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- job_applications: Public INSERT, Admin full access
-- =============================================
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can apply"            ON job_applications;
DROP POLICY IF EXISTS "Admins manage applications"  ON job_applications;
CREATE POLICY "Anyone can apply"           ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage applications" ON job_applications FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- newsletter_subscribers: Public INSERT, Admin full access
-- =============================================
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe"      ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins manage subscribers" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"      ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON newsletter_subscribers FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- testimonials: Public read active, Admin full access
-- =============================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins manage testimonials"      ON testimonials;
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage testimonials"      ON testimonials FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- partners: Public read active, Admin full access
-- =============================================
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active partners" ON partners;
DROP POLICY IF EXISTS "Admins manage partners"      ON partners;
CREATE POLICY "Public read active partners" ON partners FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage partners"      ON partners FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- team_members: Public read active, Admin full access
-- =============================================
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active team" ON team_members;
DROP POLICY IF EXISTS "Admins manage team"      ON team_members;
CREATE POLICY "Public read active team" ON team_members FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage team"      ON team_members FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- newsroom_posts: Public read published, Admin full access
-- =============================================
ALTER TABLE newsroom_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published news" ON newsroom_posts;
DROP POLICY IF EXISTS "Admins manage news"         ON newsroom_posts;
CREATE POLICY "Public read published news" ON newsroom_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage news"         ON newsroom_posts FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- page_content: Public read, Admin full access
-- =============================================
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read page content" ON page_content;
DROP POLICY IF EXISTS "Admins manage pages"      ON page_content;
CREATE POLICY "Public read page content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Admins manage pages"      ON page_content FOR ALL   USING (auth.role() = 'authenticated');

-- =============================================
-- admin_profiles: Authenticated only
-- =============================================
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins access profiles" ON admin_profiles;
CREATE POLICY "Admins access profiles" ON admin_profiles FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- admin_audit_log: Admin read only
-- =============================================
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins read audit log"   ON admin_audit_log;
DROP POLICY IF EXISTS "System inserts audit log" ON admin_audit_log;
CREATE POLICY "Admins read audit log"    ON admin_audit_log FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "System inserts audit log" ON admin_audit_log FOR INSERT WITH CHECK (true);

-- =============================================
-- site_settings: Admin access only
-- =============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins manage settings" ON site_settings;
CREATE POLICY "Admins manage settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- navigation_config: Public read, Admin write
-- =============================================
ALTER TABLE navigation_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read navigation"  ON navigation_config;
DROP POLICY IF EXISTS "Admins manage navigation" ON navigation_config;
CREATE POLICY "Public read navigation"   ON navigation_config FOR SELECT USING (true);
CREATE POLICY "Admins manage navigation" ON navigation_config FOR ALL   USING (auth.role() = 'authenticated');
