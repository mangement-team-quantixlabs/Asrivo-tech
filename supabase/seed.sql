-- ========================================================
-- 1. Create Default Admin User in Supabase Auth
-- ========================================================

-- We insert the user into auth.users using a static UUID.
-- Password is encrypted with 'AscirvoAdmin2026!'
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4',
  'authenticated',
  'authenticated',
  'admin.ascirvo@gmail.com',
  crypt('AscirvoAdmin2026!', gen_salt('bf')),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"System Admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Insert user identity for authentication compatibility
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4',
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4',
  '{"sub":"fc948332-9ecb-43d9-959c-85a2abfc6fe4","email":"admin.ascirvo@gmail.com"}',
  'email',
  now(),
  now(),
  now()
)
ON CONFLICT (id, provider) DO NOTHING;

-- ========================================================
-- 2. Seed Admin Profiles
-- ========================================================
INSERT INTO admin_profiles (id, full_name, role, avatar_url, created_at)
VALUES (
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4',
  'System Admin',
  'super_admin',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  now()
)
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- 3. Seed Site Settings
-- ========================================================
INSERT INTO site_settings (id, config, updated_by)
VALUES (
  1,
  '{
    "company_name": "ASCIRVO",
    "tagline": "Engineering Tomorrow''s Digital Enterprise",
    "address": "100 Pine Street, San Francisco, CA 94111",
    "phone": "+1 (555) 019-2834",
    "email": "info@ascirvo.com",
    "socials": {
      "github": "https://github.com/ascirvo",
      "twitter": "https://twitter.com/ascirvo",
      "linkedin": "https://linkedin.com/company/ascirvo"
    },
    "seo_defaults": {
      "title_suffix": "| ASCIRVO",
      "description": "ASCIRVO is a leading global technology consulting and services firm helping companies undergo digital transformation."
    }
  }'::jsonb,
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4'
)
ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config;

-- ========================================================
-- 4. Seed Navigation Config
-- ========================================================
INSERT INTO navigation_config (id, config, updated_by)
VALUES (
  1,
  '{
    "links": [
      { "label": "Home", "url": "/" },
      { "label": "About", "url": "/about" },
      { "label": "Services", "url": "/services" },
      { "label": "Case Studies", "url": "/case-studies" },
      { "label": "Insights", "url": "/insights" },
      { "label": "Careers", "url": "/careers" },
      { "label": "Contact", "url": "/contact" }
    ],
    "footer": [
      {
        "title": "Company",
        "items": [
          { "label": "About Us", "url": "/about" },
          { "label": "Leadership", "url": "/about/leadership" },
          { "label": "Careers", "url": "/careers" },
          { "label": "Partners", "url": "/partners" }
        ]
      },
      {
        "title": "Services",
        "items": [
          { "label": "AI & Machine Learning", "url": "/services/ai-ml" },
          { "label": "Cloud Solutions", "url": "/services/cloud" },
          { "label": "Cybersecurity", "url": "/services/cybersecurity" },
          { "label": "Data & Analytics", "url": "/services/data-analytics" }
        ]
      }
    ]
  }'::jsonb,
  'fc948332-9ecb-43d9-959c-85a2abfc6fe4'
)
ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config;

-- ========================================================
-- 5. Seed Partners
-- ========================================================
DELETE FROM partners;
INSERT INTO partners (company_name, logo_url, website_url, category, display_order, is_active)
VALUES
  ('Microsoft', 'https://images.unsplash.com/photo-1625014020993-ba3c9b9af02f?w=120&auto=format&fit=crop&q=60', 'https://microsoft.com', 'Technology Partner', 1, true),
  ('Amazon Web Services', 'https://images.unsplash.com/photo-1647427017067-8f33ccbae493?w=120&auto=format&fit=crop&q=60', 'https://aws.amazon.com', 'Technology Partner', 2, true),
  ('Google Cloud', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&auto=format&fit=crop&q=60', 'https://cloud.google.com', 'Technology Partner', 3, true),
  ('Salesforce', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60', 'https://salesforce.com', 'Alliance Partner', 4, true),
  ('Snowflake', 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=120&auto=format&fit=crop&q=60', 'https://snowflake.com', 'Technology Partner', 5, true);

-- ========================================================
-- 6. Seed Testimonials
-- ========================================================
DELETE FROM testimonials;
INSERT INTO testimonials (quote, client_name, client_title, company, photo_url, display_order, is_active)
VALUES
  ('ASCIRVO delivered our cloud migration project on schedule with zero downtime. Their technical knowledge in microservices and AWS architecture is unmatched.', 'Robert Vance', 'Chief Information Officer', 'Apex Global Logistics', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80', 1, true),
  ('The generative AI solution created by ASCIRVO''s engineering team has reduced our manual content review cycles by over 70%. A truly transformational partner.', 'Linda Thorne', 'VP of Product Engineering', 'Kinetix Media Group', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80', 2, true),
  ('With ASCIRVO''s Zero-Trust cybersecurity consulting, we successfully modernized our SOC and achieved compliance across all European operations.', 'Marcus Aurelius', 'Head of Security Operations', 'Imperium Bank', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80', 3, true);

-- ========================================================
-- 7. Seed Team Members
-- ========================================================
DELETE FROM team_members;
INSERT INTO team_members (full_name, job_title, department, bio, photo_url, linkedin_url, display_order, is_featured, is_active)
VALUES
  ('Dr. Sarah Chen', 'Chief Technology Officer & Founder', 'Executive', 'Sarah leads our technical vision. With a PhD in Machine Learning from Stanford, she spent a decade leading AI initiatives in Silicon Valley.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80', 'https://linkedin.com/in/sarahchen', 1, true, true),
  ('James Mitchell', 'Chief Information Security Officer', 'Security', 'James has over 20 years of experience managing cybersecurity posture for Fortune 500 banks and federal agencies.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', 'https://linkedin.com/in/jamesmitchell', 2, true, true),
  ('Priya Sharma', 'Head of Cloud & DevOps Infrastructure', 'Cloud', 'Priya is an AWS Certified Solutions Architect Professional and specializes in multi-cloud cost optimization and zero-downtime migrations.', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80', 'https://linkedin.com/in/priyasharma', 3, true, true),
  ('David Okonkwo', 'Lead Architect, Data & AI', 'Engineering', 'David is a contributor to several open-source big data projects and has built real-time analytics pipelines handling petabytes of daily events.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', 'https://linkedin.com/in/davidokonkwo', 4, true, true);

-- ========================================================
-- 8. Seed Job Listings
-- ========================================================
DELETE FROM job_listings;
INSERT INTO job_listings (title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements_must, requirements_nice, benefits, is_active)
VALUES
  (
    'Senior AI/ML Engineer',
    'senior-ai-ml-engineer',
    'Data & AI',
    'San Francisco / Remote',
    'Full-time',
    'Senior',
    'We are looking for a Senior AI/ML Engineer to lead the design and implementation of generative AI systems for enterprise clients.',
    ARRAY['Design, build, and deploy production LLM-based pipelines and fine-tune open-source models.', 'Collaborate with product and infrastructure teams to integrate AI models securely.', 'Provide technical leadership and mentor junior engineers.'],
    ARRAY['5+ years of software engineering experience with 3+ years focused on ML/NLP pipelines.', 'Strong programming skills in Python and experience with PyTorch, HuggingFace, or LangChain.', 'Experience deploying models in production environments (AWS/GCP/Kubernetes).'],
    ARRAY['PhD or MS in Computer Science, AI, or equivalent quantitative field.', 'Contributions to open-source AI libraries or papers.'],
    ARRAY['Competitive salary and equity package.', 'Premium medical, dental, and vision insurance.', 'Annual $2,000 learning and certification budget.', 'Flexible hybrid/remote working arrangements.'],
    true
  ),
  (
    'Cloud Solutions Architect',
    'cloud-solutions-architect',
    'Cloud',
    'London / Remote',
    'Full-time',
    'Lead',
    'Help enterprise organizations transition to robust, secure, and cost-effective multi-cloud environments.',
    ARRAY['Design enterprise-scale cloud migrations and cloud-native architecture plans.', 'Conduct architectural reviews and optimize infrastructure cost, security, and performance.', 'Create Terraform modules and IAC structures for automated delivery.'],
    ARRAY['7+ years architecting and developing distributed systems.', 'Professional level certification in AWS, Azure, or GCP.', 'Expertise in Terraform, Kubernetes, and CI/CD pipelines.'],
    ARRAY['Experience with hybrid cloud migrations for financial institutions.'],
    ARRAY['High competitive compensation and bonus.', 'Flexible hours and work from anywhere options.', 'Paid parental leave and wellness subscription.'],
    true
  ),
  (
    'Cybersecurity Analyst',
    'cybersecurity-analyst',
    'Security',
    'Bangalore',
    'Full-time',
    'Mid',
    'Monitor, detect, and mitigate threats across client infrastructures and support SOC operations.',
    ARRAY['Monitor security events (SIEM) and investigate security incidents.', 'Perform vulnerability scans and compliance reviews.', 'Create response playbooks and automate threat detection workflows.'],
    ARRAY['3+ years in security operations or threat analyst roles.', 'Hands-on experience with SIEM platforms (Splunk, Sentinel) and firewalls.', 'Relevant certifications like Security+, CEH, or CySA+.'],
    ARRAY['Understanding of cloud security concepts (AWS/Azure security controls).'],
    ARRAY['Health insurance covering family.', 'Free transport and gym allowances.', 'Mentorship from senior security specialists.'],
    true
  );

-- ========================================================
-- 9. Seed Blog Posts
-- ========================================================
DELETE FROM blog_posts;
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author_name, author_avatar_url, cover_image_url, read_time_minutes, is_published, published_at)
VALUES
  (
    'How Generative AI Is Reshaping Enterprise Software Development',
    'generative-ai-enterprise-software',
    'Explore how LLMs and code generation tools are transforming the way enterprises build and maintain software at scale.',
    '{
      "type": "doc",
      "content": [
        { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "The Shift to AI-Assisted Engineering" }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "Software engineering is undergoing its biggest paradigm shift since the introduction of high-level languages. Large Language Models (LLMs) are no longer just coding assistants; they are becoming core partners in design, testing, and system maintenance." }] },
        { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Measuring Real-World Efficiency Gains" }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "According to studies across enterprise development organizations, developers using AI tools write code 35-45% faster. Crucially, the biggest time savings are seen in writing unit tests, generating boilerplate structure, and explaining complex legacy code." }] }
      ]
    }'::jsonb,
    'AI',
    ARRAY['Generative AI', 'Software Engineering', 'Enterprise'],
    'Dr. Sarah Chen',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    8,
    true,
    now() - INTERVAL '3 days'
  ),
  (
    'Zero Trust Architecture: A CISO''s Complete Implementation Guide',
    'zero-trust-architecture-guide',
    'A step-by-step blueprint for implementing zero-trust security across your organization''s infrastructure and applications.',
    '{
      "type": "doc",
      "content": [
        { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Why Perimeter Security is Dead" }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "The traditional \"castle-and-moat\" security model is obsolete. With remote work and distributed cloud workloads, there is no longer a corporate perimeter to defend. Zero Trust is the mandate: never trust, always verify." }] }
      ]
    }'::jsonb,
    'Security',
    ARRAY['Zero Trust', 'CISO', 'Cybersecurity'],
    'James Mitchell',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    12,
    true,
    now() - INTERVAL '7 days'
  ),
  (
    'Multi-Cloud Strategy: Avoiding Vendor Lock-In in 2026',
    'multi-cloud-strategy-2026',
    'Learn proven strategies for building resilient multi-cloud architectures that maximize flexibility and minimize risk.',
    '{
      "type": "doc",
      "content": [
        { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "The Reality of Modern Multi-Cloud" }] },
        { "type": "paragraph", "content": [{ "type": "text", "text": "Deploying across multiple public clouds reduces outage risks and lets teams use specialized tooling from Google, AWS, and Azure. However, without abstracting compute layers, multi-cloud can lead to fragmented configurations." }] }
      ]
    }'::jsonb,
    'Cloud',
    ARRAY['Multi-Cloud', 'AWS', 'Google Cloud', 'Azure'],
    'Priya Sharma',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    6,
    true,
    now() - INTERVAL '12 days'
  );

-- ========================================================
-- 10. Seed Case Studies
-- ========================================================
DELETE FROM case_studies;
INSERT INTO case_studies (title, slug, client_name, client_logo_url, industry, service, region, challenge, solution, results, technologies, testimonial, cover_image_url, is_published)
VALUES
  (
    'Modernizing Supply Chain Operations with AI',
    'supply-chain-ai-modernization',
    'Apex Global Logistics',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    'Manufacturing',
    'AI/ML',
    'North America',
    'Apex experienced severe inventory forecasting discrepancies resulting in $12M annually in lost goods and excess warehousing costs.',
    'ASCIRVO integrated a machine learning pipeline parsing real-time transit times, local market demand shifts, and weather data to forecast inventory levels.',
    '[{"stat": "40%", "label": "Forecasting Accuracy Improvement"}, {"stat": "$4.2M", "label": "Annual Storage Savings"}, {"stat": "3 Weeks", "label": "Implementation Time"}]'::jsonb,
    ARRAY['Python', 'PyTorch', 'AWS SageMaker', 'PostgreSQL'],
    'The system designed by ASCIRVO exceeded our targets. We now predict shipping delays hours before they occur, allowing rerouting.',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'Transitioning to Zero-Trust Compliance',
    'banking-zero-trust-transformation',
    'Imperium Bank',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
    'Banking',
    'Cybersecurity',
    'Europe',
    'A growing remote work force and stricter EU bank regulatory rules meant Imperium had to modernize user access control without interrupting banking activities.',
    'Designed a zero-trust network topology introducing multi-factor adaptive authentication, micro-segmentation of central databases, and a real-time SOC.',
    '[{"stat": "100%", "label": "Compliance Audit Cleared"}, {"stat": "0", "label": "Breach Incidents in 12 months"}, {"stat": "100ms", "label": "Max Auth Overhead"}]'::jsonb,
    ARRAY['OAuth 2.0', 'Cloudflare Access', 'Splunk SIEM', 'Kubernetes'],
    'Compliance is usually a bottleneck. ASCIRVO helped us meet all requirements while improving worker login convenience.',
    'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&auto=format&fit=crop&q=80',
    true
  );

-- ========================================================
-- 11. Seed Newsroom Posts
-- ========================================================
DELETE FROM newsroom_posts;
INSERT INTO newsroom_posts (headline, slug, type, source, source_url, summary, cover_image_url, published_at, is_published)
VALUES
  (
    'ASCIRVO Named Among Fastest-Growing Digital Transformation Agencies in 2026',
    'ascirvo-fastest-growing-agency-2026',
    'award',
    'Global Tech Review',
    'https://example.com/awards',
    'ASCIRVO has been recognized for its rapid growth and delivery excellence in engineering next-generation AI and multi-cloud solutions for mid-market clients.',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    now() - INTERVAL '15 days',
    true
  ),
  (
    'ASCIRVO Launches New Enterprise Cybersecurity Practice',
    'ascirvo-cybersecurity-practice-launch',
    'press_release',
    'ASCIRVO PR Team',
    null,
    'Announcing a dedicated cybersecurity consulting practice focused on helping financial and manufacturing industries implement Zero-Trust network topologies.',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    now() - INTERVAL '25 days',
    true
  );

-- ========================================================
-- 12. Seed Page Content
-- ========================================================
DELETE FROM page_content;
INSERT INTO page_content (page_key, section_key, content, updated_by)
VALUES
  (
    'home',
    'hero',
    '{
      "headline": "Engineering Tomorrow''s Digital Enterprise",
      "subtext": "ASCIRVO delivers world-class AI/ML solutions, cloud architectures, and cybersecurity platforms that drive growth and secure enterprise operations.",
      "primary_cta": "Explore Services",
      "secondary_cta": "Talk to an Expert"
    }'::jsonb,
    'fc948332-9ecb-43d9-959c-85a2abfc6fe4'
  ),
  (
    'home',
    'stats',
    '{
      "stats": [
        { "value": "500+", "label": "Clients Globally" },
        { "value": "15+", "label": "Countries Served" },
        { "value": "99.9%", "label": "SLA Uptime" },
        { "value": "10+", "label": "Years of Engineering" }
      ]
    }'::jsonb,
    'fc948332-9ecb-43d9-959c-85a2abfc6fe4'
  );
