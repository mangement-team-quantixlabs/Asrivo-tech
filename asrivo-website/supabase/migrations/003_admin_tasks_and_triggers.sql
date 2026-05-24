-- ASCIRVO Database Setup — Admin Triggers, Profiles Sync & Mock Seed Data
-- Version: 1.1.0
-- Focus: Synchronizing profiles, provisioning default admin users, and seeding test data for dashboard validation.

-- =========================================================================
-- 1. Create Profile Synchronization Trigger (auth.users -> public.admin_profiles)
-- =========================================================================

-- Enable pgcrypto extension if not already enabled (typically enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Function to handle automated admin profile creation upon authentication signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger AS $$
DECLARE
  assigned_role TEXT;
BEGIN
  -- Default to 'admin' if email is admin@ascirvo.com, otherwise 'editor'
  IF NEW.email = 'admin@ascirvo.com' THEN
    assigned_role := 'super_admin';
  ELSE
    assigned_role := 'editor';
  END IF;

  INSERT INTO public.admin_profiles (id, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    assigned_role,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = CASE 
      WHEN public.admin_profiles.role = 'super_admin' THEN 'super_admin' 
      ELSE EXCLUDED.role 
    END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- =========================================================================
-- 2. Seed Default Administrator (Credentials: admin@ascirvo.com / Admin@12345)
-- =========================================================================

-- Insert default admin user into auth.users (Supabase Auth Schema)
-- Password hashed using Blowfish (bf) crypt function compatible with Supabase's authentication engine.
INSERT INTO auth.users (
  id,
  instance_id,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud
)
VALUES (
  'd4e8b0a9-2e02-4ec4-9d58-c2b6f12cdfb7',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'admin@ascirvo.com',
  extensions.crypt('Admin@12345', extensions.gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"ASCIRVO Admin"}',
  NOW(),
  NOW(),
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- Force the profile role of the newly seeded admin to super_admin (in case of override)
UPDATE public.admin_profiles 
SET role = 'super_admin', full_name = 'ASCIRVO Admin'
WHERE id = 'd4e8b0a9-2e02-4ec4-9d58-c2b6f12cdfb7';


-- =========================================================================
-- 3. Seed Mock Data for Dashboard Verification
-- =========================================================================

-- 3.1 Contact Leads Mock
INSERT INTO public.contact_leads (name, email, phone, company, country, service_interest, message, status)
VALUES 
('Sarah Jenkins', 'sjenkins@innovate-tech.com', '+1 (555) 234-5678', 'InnovateTech Systems', 'United States', 'AI & Machine Learning', 'We are looking to implement a predictive maintenance model for our retail supply chain.', 'new'),
('David Chen', 'dchen@healthhub.org', '+65 9123 4567', 'HealthHub Global', 'Singapore', 'Cloud Solutions', 'Interested in migrating our patient management system to a HIPAA-compliant AWS multi-cloud landing zone.', 'read'),
('Elena Rostova', 'e.rostova@cyberfinance.de', '+49 89 201938', 'CyberFinance AG', 'Germany', 'Cybersecurity', 'Requesting a vulnerability assessment and SOC compliance analysis for our new microservices banking core.', 'contacted')
ON CONFLICT DO NOTHING;

-- 3.2 Blog Posts Mock
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, author_name, author_avatar_url, cover_image_url, read_time_minutes, is_published, published_at)
VALUES 
(
  'Unlocking Next-Gen Enterprise AI: Architecture & Strategy', 
  'unlocking-next-gen-enterprise-ai', 
  'Discover the key technical hurdles and architectures needed to deploy generative AI at scale in regulated environments.',
  '{"type": "markdown", "body": "# Unlocking Next-Gen Enterprise AI\n\nArtificial Intelligence is transitioning from experimental prototypes to mission-critical core services. In this guide, we dive deep into building robust RAG pipelines and vector database integrations.\n\n### The Architecture\nMulti-layer agentic structures combined with low-latency embedding semantic caches are changing the game. We detail the operational framework in our full paper."}',
  'Artificial Intelligence', 
  ARRAY['AI', 'Enterprise', 'Architecture'], 
  'Dr. Marcus Vance', 
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800', 
  7, 
  TRUE, 
  NOW() - INTERVAL '2 days'
),
(
  'Building Zero-Trust Architectures for Distributed Microservices', 
  'building-zero-trust-microservices', 
  'An in-depth technical analysis on implementing mTLS, OPA gateway policies, and runtime threat detection in enterprise kubernetes.',
  '{"type": "markdown", "body": "# Zero Trust Microservices\n\nTraditional network-perimeter security is no longer sufficient. Modern architectures assume the network is already breached.\n\n## Core Pillars:\n1. Strict identity validation via mTLS.\n2. Policy-driven authorization with Open Policy Agent.\n3. Continuous observability."}',
  'Cybersecurity', 
  ARRAY['Security', 'Kubernetes', 'Cloud'], 
  'Elena Rostova', 
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', 
  10, 
  TRUE, 
  NOW() - INTERVAL '5 days'
)
ON CONFLICT (slug) DO NOTHING;

-- 3.3 Case Studies Mock
INSERT INTO public.case_studies (title, slug, client_name, client_logo_url, industry, service, region, challenge, solution, results, technologies, testimonial, cover_image_url, is_published)
VALUES 
(
  'Cloud Migration Reduces Operational Overhead by 40%', 
  'cloud-migration-case-study', 
  'Apex Logistics Corp', 
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200', 
  'Manufacturing & Logistics', 
  'Cloud Solutions', 
  'North America', 
  'Apex Corp was struggling with aging on-premise mainframe infrastructure that frequently failed during high-traffic peak logistics periods.', 
  'We designed and executed a seamless transition to a Serverless multi-region AWS setup utilizing Amazon ECS, Aurora Serverless, and CloudFront.', 
  '[{"stat": "40%", "label": "Infrastructure Savings"}, {"stat": "99.99%", "label": "Uptime Achieved"}, {"stat": "3x", "label": "Performance Speedup"}]'::jsonb, 
  ARRAY['AWS', 'Terraform', 'ECS', 'PostgreSQL'], 
  'ASCIRVO delivered the project on-time and completely transformed how we process warehouse queues.', 
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- 3.4 Job Listings Mock
INSERT INTO public.job_listings (title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements_must, requirements_nice, benefits, is_active, closes_at)
VALUES 
(
  'Senior Full-Stack Engineer (Next.js / Supabase)', 
  'senior-full-stack-engineer', 
  'Software Engineering', 
  'Singapore (Hybrid)', 
  'Full-time', 
  'Senior', 
  'Join our elite core platform engineering team in Singapore, designing next-generation applications with modern serverless stacks.', 
  ARRAY['Design, develop, and maintain clean scalable React and Next.js applications.', 'Optimize database queries, indices, and schema design in PostgreSQL.', 'Mentor junior engineers and champion code-review processes.'], 
  ARRAY['5+ years experience in professional web application development.', 'Deep understanding of Next.js, React Server Components, and Server Actions.', 'Proficiency in PostgreSQL, schema normalization, and complex queries.'], 
  ARRAY['Experience with Supabase Auth, Storage, and Realtime features.', 'Prior contributions to open-source UI libraries.'], 
  ARRAY['Highly competitive base salary.', 'Comprehensive private medical and dental coverage.', 'Generous home office equipment allowance.'], 
  TRUE, 
  NOW() + INTERVAL '30 days'
)
ON CONFLICT (slug) DO NOTHING;

-- 3.5 Job Applications Mock
INSERT INTO public.job_applications (job_id, applicant_name, email, phone, linkedin_url, resume_path, cover_letter, status)
VALUES 
(
  (SELECT id FROM public.job_listings WHERE slug = 'senior-full-stack-engineer' LIMIT 1),
  'Marcus Aurelius',
  'maurelius@stoicdev.com',
  '+65 8765 4321',
  'https://linkedin.com/in/stoic-dev',
  'resumes/marcus_aurelius_cv.pdf',
  'I am highly interested in helping ASCIRVO build world-class enterprise applications. Stacking server components and serverless endpoints is my primary specialty.',
  'received'
)
ON CONFLICT DO NOTHING;

-- 3.6 Newsletter Subscribers Mock
INSERT INTO public.newsletter_subscribers (email, source, is_active)
VALUES 
('newsletter-lead1@domain.com', 'footer', TRUE),
('newsletter-lead2@domain.com', 'blog', TRUE)
ON CONFLICT (email) DO NOTHING;
