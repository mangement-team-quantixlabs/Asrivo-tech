-- ASCIRVO — Local Development Seed Data
-- File: supabase/seed.sql
--
-- PURPOSE: Populate the local Supabase instance with realistic, varied data
--          so every developer gets a fully functional dashboard and frontend
--          on first `supabase start`.
--
-- USAGE:
--   supabase db reset          (runs all migrations + this file)
--   supabase db seed           (runs only this file)
--
-- NOTE: This file is for LOCAL DEVELOPMENT ONLY.
--       Production data is seeded via migration 003_admin_tasks_and_triggers.sql.
--       Do NOT commit real credentials, emails, or PII here.

-- =========================================================================
-- 0. Truncate all tables to ensure clean slate (order respects FK constraints)
--    Uses a DO block so this is safe to run even if some tables do not yet
--    exist (e.g. running seed.sql directly in Studio before migrations).
-- =========================================================================

DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'admin_audit_log',
    'job_applications',
    'job_listings',
    'contact_leads',
    'blog_posts',
    'case_studies',
    'newsletter_subscribers',
    'newsroom_posts',
    'testimonials',
    'partners',
    'team_members',
    'page_content',
    'site_settings',
    'navigation_config',
    'admin_profiles'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = tbl
    ) THEN
      EXECUTE format('TRUNCATE TABLE public.%I CASCADE', tbl);
    END IF;
  END LOOP;
END $$;

-- =========================================================================
-- PREFLIGHT: Verify migrations have been applied before seeding
-- =========================================================================
-- If migration 001 has not run, none of the public tables exist.
-- Raise a clear error now so the user knows exactly what to do,
-- rather than seeing cryptic "relation does not exist" errors later.
-- =========================================================================

DO $$
DECLARE
  missing TEXT[] := ARRAY[]::TEXT[];
  tbl     TEXT;
  required TEXT[] := ARRAY[
    'contact_leads', 'blog_posts', 'case_studies', 'job_listings',
    'job_applications', 'newsletter_subscribers', 'admin_profiles',
    'team_members', 'testimonials', 'partners', 'newsroom_posts',
    'page_content', 'admin_audit_log'
  ];
BEGIN
  FOREACH tbl IN ARRAY required LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = tbl
    ) THEN
      missing := array_append(missing, tbl);
    END IF;
  END LOOP;

  IF array_length(missing, 1) > 0 THEN
    RAISE EXCEPTION
      E'❌  Seed aborted — % table(s) missing: %\n\n'
      '    The database schema has not been initialised yet.\n'
      '    Run migrations first, then re-run the seed:\n\n'
      '      supabase db reset        ← runs migrations + seed in one step\n'
      '      supabase db seed         ← seed only (after migrations are applied)\n',
      array_length(missing, 1),
      array_to_string(missing, ', ');
  END IF;
END $$;

-- =========================================================================
-- 1. Admin Users (local dev only — password: DevAdmin@123)
-- =========================================================================

INSERT INTO auth.users (
  id, instance_id, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, aud
)
VALUES (
  'aaaaaaaa-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'admin@local.dev',
  extensions.crypt('DevAdmin@123', extensions.gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Local Admin"}',
  NOW(), NOW(), 'authenticated'
),
(
  'aaaaaaaa-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'editor@local.dev',
  extensions.crypt('DevAdmin@123', extensions.gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Local Editor"}',
  NOW(), NOW(), 'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- is_active column is added by migration 006; use it only if present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'admin_profiles' AND column_name = 'is_active'
  ) THEN
    INSERT INTO public.admin_profiles (id, full_name, role, is_active)
    VALUES
      ('aaaaaaaa-0000-0000-0000-000000000001', 'Local Admin',  'super_admin', TRUE),
      ('aaaaaaaa-0000-0000-0000-000000000002', 'Local Editor', 'editor',      TRUE)
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      role      = EXCLUDED.role,
      is_active = EXCLUDED.is_active;
  ELSE
    INSERT INTO public.admin_profiles (id, full_name, role)
    VALUES
      ('aaaaaaaa-0000-0000-0000-000000000001', 'Local Admin',  'super_admin'),
      ('aaaaaaaa-0000-0000-0000-000000000002', 'Local Editor', 'editor')
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      role      = EXCLUDED.role;
  END IF;
END $$;

-- =========================================================================
-- 2. Team Members
-- =========================================================================

INSERT INTO public.team_members (full_name, job_title, department, bio, photo_url, linkedin_url, display_order, is_featured, is_active)
VALUES
  ('Alexandra Reid',    'Chief Executive Officer',      'Executive',     'Alexandra brings 20 years of enterprise technology leadership, having previously served as VP of Digital Transformation at Accenture and IBM Global Services.',    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', 'https://linkedin.com/in/dev-placeholder', 1, TRUE, TRUE),
  ('James Whitfield',  'Chief Technology Officer',     'Executive',     'James is a former Google Principal Engineer who architected distributed systems serving 1B+ daily users. He leads ASCIRVO''s technical strategy and R&D.',        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', 'https://linkedin.com/in/dev-placeholder', 2, TRUE, TRUE),
  ('Priya Nambiar',    'Chief Operating Officer',      'Executive',     'Priya''s operational excellence background spans supply chain, FinTech, and SaaS scale-ups across Southeast Asia and the Middle East.',                           'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', 'https://linkedin.com/in/dev-placeholder', 3, TRUE, TRUE),
  ('Marcus Chen',      'VP of Engineering',            'Engineering',   'Marcus leads a 60-person engineering organisation, championing developer experience, platform reliability, and continuous delivery at velocity.',                   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://linkedin.com/in/dev-placeholder', 4, FALSE, TRUE),
  ('Fatima Al-Hassan', 'Head of AI & Machine Learning','Engineering',   'Fatima holds a PhD in Computational Linguistics from MIT and has published 18 peer-reviewed papers on applied machine learning in regulated industries.',       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'https://linkedin.com/in/dev-placeholder', 5, FALSE, TRUE),
  ('Daniel Park',      'Head of Cybersecurity',        'Cybersecurity', 'Daniel is a CISSP-certified architect who spent 8 years at CISA before joining ASCIRVO to lead our global security advisory and SOC practices.',               'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'https://linkedin.com/in/dev-placeholder', 6, FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 3. Partners / Technology Ecosystem
-- =========================================================================

INSERT INTO public.partners (company_name, logo_url, website_url, category, display_order, is_active)
VALUES
  ('Amazon Web Services',  'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',  'https://aws.amazon.com',        'Cloud Partner',        1, TRUE),
  ('Microsoft Azure',      'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',           'https://azure.microsoft.com',   'Cloud Partner',        2, TRUE),
  ('Google Cloud',         'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',          'https://cloud.google.com',      'Cloud Partner',        3, TRUE),
  ('Snowflake',            'https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg',             'https://snowflake.com',         'Data Partner',         4, TRUE),
  ('Databricks',           'https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png',            'https://databricks.com',        'Data Partner',         5, TRUE),
  ('Palo Alto Networks',   'https://upload.wikimedia.org/wikipedia/commons/e/e6/Palo_Alto_Networks_logo.svg',   'https://paloaltonetworks.com',  'Security Partner',     6, TRUE),
  ('HashiCorp',            'https://www.vectorlogo.zone/logos/hashicorp/hashicorp-icon.svg',                      'https://hashicorp.com',         'DevOps Partner',       7, TRUE),
  ('Confluent',            'https://upload.wikimedia.org/wikipedia/commons/5/53/Apache_kafka_wordtype.svg',       'https://confluent.io',          'Data Streaming',       8, TRUE)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 4. Testimonials
-- =========================================================================

INSERT INTO public.testimonials (quote, client_name, client_title, company, display_order, is_active)
VALUES
  ('ASCIRVO transformed our legacy infrastructure in under 6 months. The team''s cloud expertise and hands-on approach was unlike anything we experienced with larger consultancies.',
   'Hiroshi Tanaka', 'CTO', 'NovaPay Financial', 1, TRUE),
  ('Their AI team built a fraud detection model that reduced false positives by 68%. We went from idea to production in 10 weeks. Exceptional.',
   'Sarah Mitchell', 'VP of Engineering', 'Meridian HealthTech', 2, TRUE),
  ('The zero-trust architecture ASCIRVO designed has made our SOC-2 audit process dramatically smoother. They didn''t just solve a problem — they built us a competitive moat.',
   'Emmanuel Osei', 'Director of IT Security', 'CapBridge Group', 3, TRUE),
  ('We partnered with ASCIRVO for our APAC cloud expansion. The project came in on time, under budget, and the documentation quality was outstanding.',
   'Li Wei', 'Head of Digital', 'SinoLogistix Corp', 4, TRUE)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 5. Blog Posts (varied statuses and categories)
-- =========================================================================

-- Base columns only (migration 001)
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, category, tags,
  author_name, author_avatar_url, cover_image_url,
  read_time_minutes, is_published, published_at
)
VALUES
  (
    'Unlocking Next-Gen Enterprise AI: Architecture & Strategy',
    'unlocking-next-gen-enterprise-ai',
    'The key technical hurdles and reference architectures for deploying generative AI at scale in regulated industries.',
    '{"type":"markdown","body":"# Unlocking Next-Gen Enterprise AI\n\nArtificial Intelligence is no longer experimental — it''s mission-critical.\n\n## The Core Challenge\nRegulated industries demand auditability, explainability, and strict data residency. Standard GenAI approaches fail on all three.\n\n## Reference Architecture\nWe advocate a **multi-layer agentic stack** with:\n- Retrieval-Augmented Generation (RAG) pipeline\n- Vector database with access-controlled namespaces\n- PII-scrubbing middleware\n- Full audit trail via structured logging\n\n## Getting Started\nBegin with a discovery sprint to map your data estates and identify the highest-ROI RAG candidates."}',
    'Artificial Intelligence',
    ARRAY['AI', 'Enterprise Architecture', 'RAG', 'LLM'],
    'Dr. Fatima Al-Hassan',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=150',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200',
    8, TRUE, NOW() - INTERVAL '3 days'
  ),
  (
    'Zero-Trust Microservices: mTLS, OPA, and Runtime Threat Detection',
    'zero-trust-microservices-mtls-opa',
    'A deep technical analysis on building a Zero Trust security perimeter for Kubernetes-native microservice architectures.',
    '{"type":"markdown","body":"# Zero Trust for Microservices\n\nThe perimeter is dead. In 2026, every service call is a potential breach vector.\n\n## Three Pillars\n1. **Identity** — Strict mTLS between every pod\n2. **Policy** — Open Policy Agent (OPA) Gatekeeper for admission control\n3. **Observability** — Falco + Grafana for runtime anomaly detection\n\n## Implementation Roadmap\nWeek 1–2: Certificate authority setup with cert-manager\nWeek 3–4: OPA policy library\nWeek 5–6: Falco rule tuning and alerting"}',
    'Cybersecurity',
    ARRAY['Zero Trust', 'Kubernetes', 'mTLS', 'OPA', 'Security'],
    'Daniel Park',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200',
    12, TRUE, NOW() - INTERVAL '7 days'
  ),
  (
    'Data Lakehouse vs Data Warehouse: Choosing for 2026',
    'data-lakehouse-vs-data-warehouse-2026',
    'With Delta Lake, Apache Iceberg, and Snowflake competing, how do you choose the right data architecture for your organisation?',
    '{"type":"markdown","body":"# Lakehouse vs Warehouse\n\nThe answer is almost always: **both**. Here''s why and how."}',
    'Data & Analytics',
    ARRAY['Data Engineering', 'Lakehouse', 'Snowflake', 'Apache Iceberg'],
    'James Whitfield',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    10, TRUE, NOW() - INTERVAL '14 days'
  ),
  (
    'Building a Multi-Region Cloud Landing Zone on AWS',
    'multi-region-aws-landing-zone',
    'DRAFT: Step-by-step walkthrough of provisioning a production-grade multi-region AWS Landing Zone using Control Tower and Terraform.',
    '{"type":"markdown","body":"# Multi-Region Landing Zone\n\n[DRAFT — work in progress]"}',
    'Cloud Solutions',
    ARRAY['AWS', 'Terraform', 'Control Tower', 'Landing Zone'],
    'Marcus Chen',
    NULL,
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
    15, FALSE, NULL
  )
ON CONFLICT (slug) DO NOTHING;

-- Migration 006 columns: featured_image_alt, featured, view_count, meta_description
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'featured'
  ) THEN
    UPDATE public.blog_posts SET
      featured_image_alt = 'Abstract visualization of neural network architecture',
      featured           = TRUE,
      view_count         = 1284,
      meta_description   = 'Discover the reference architectures and governance frameworks needed to safely deploy generative AI in enterprise environments.'
    WHERE slug = 'unlocking-next-gen-enterprise-ai';

    UPDATE public.blog_posts SET
      featured_image_alt = 'Server room with network cables representing cybersecurity infrastructure',
      featured           = FALSE,
      view_count         = 876,
      meta_description   = 'Step-by-step guide to implementing mTLS, Open Policy Agent, and Falco-based runtime security for Kubernetes microservices.'
    WHERE slug = 'zero-trust-microservices-mtls-opa';

    UPDATE public.blog_posts SET
      featured_image_alt = 'Data visualisation dashboard on a monitor',
      featured           = FALSE,
      view_count         = 542,
      meta_description   = 'A practical framework for deciding between a Data Lakehouse and traditional Data Warehouse architecture in 2026.'
    WHERE slug = 'data-lakehouse-vs-data-warehouse-2026';

    UPDATE public.blog_posts SET
      featured_image_alt = 'Cloud server infrastructure',
      featured           = FALSE,
      view_count         = 0,
      meta_description   = NULL
    WHERE slug = 'multi-region-aws-landing-zone';
  END IF;
END $$;

-- =========================================================================
-- 6. Case Studies
-- =========================================================================

-- Base columns only (migration 001); 'featured' is added by migration 006
INSERT INTO public.case_studies (
  title, slug, client_name, client_logo_url, industry, service, region,
  challenge, solution, results, technologies, testimonial,
  cover_image_url, is_published
)
VALUES
  (
    'Cloud Migration Cuts Infrastructure Costs by 40%',
    'apex-logistics-cloud-migration',
    'Apex Logistics Corp',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
    'Manufacturing & Logistics',
    'Cloud Solutions',
    'North America',
    'Apex Logistics was operating a 15-year-old on-premise mainframe system that required 4 full-time operators, experienced monthly outages during peak seasons, and could not scale to meet 3x demand spikes.',
    'We designed and executed a phased migration to a serverless multi-region AWS architecture using Amazon ECS Fargate, Aurora Serverless v2, and CloudFront. All legacy ETL jobs were re-platformed as AWS Step Functions workflows.',
    '[{"stat":"40%","label":"Infrastructure cost reduction"},{"stat":"99.99%","label":"Uptime achieved (vs 97.1% before)"},{"stat":"3x","label":"Peak throughput capacity"},{"stat":"4 months","label":"Full migration timeline"}]',
    ARRAY['AWS ECS Fargate', 'Aurora Serverless v2', 'CloudFront', 'Terraform', 'Step Functions'],
    'ASCIRVO delivered the project on-time and completely transformed how we process warehouse queues. Our ops team went from firefighting to strategic work.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    TRUE
  ),
  (
    'AI Fraud Detection Reduces False Positives by 68%',
    'meridian-ai-fraud-detection',
    'Meridian HealthTech',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200',
    'Healthcare & Life Sciences',
    'AI & Machine Learning',
    'Europe',
    'Meridian''s legacy rules-based fraud engine was blocking 12% of legitimate transactions, causing patient payment failures and significant revenue leakage. The system had not been updated in 6 years.',
    'ASCIRVO built a real-time ML fraud scoring pipeline using XGBoost and a feature store (Feast) integrating 180+ behavioural signals. The model serves predictions in under 15ms at 10,000 TPS via a gRPC microservice.',
    '[{"stat":"68%","label":"Reduction in false positives"},{"stat":"15ms","label":"P99 prediction latency"},{"stat":"10K TPS","label":"Throughput capacity"},{"stat":"10 weeks","label":"Idea to production"}]',
    ARRAY['Python', 'XGBoost', 'Feast', 'Apache Kafka', 'gRPC', 'Kubernetes', 'MLflow'],
    'We went from idea to production in 10 weeks. The model quality and the ASCIRVO team''s domain knowledge of healthcare payments was exceptional.',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
    TRUE
  ),
  (
    'Zero-Trust Security Architecture for Banking Core',
    'capbridge-zero-trust-banking',
    'CapBridge Group',
    NULL,
    'Banking & Financial Services',
    'Cybersecurity',
    'Asia Pacific',
    'CapBridge was migrating its core banking platform to a Kubernetes-native microservices architecture but had no security framework for inter-service communication, no centralised policy enforcement, and a looming SOC-2 Type II audit.',
    'ASCIRVO designed and implemented a Zero Trust architecture: cert-manager for automatic mTLS certificate rotation, Open Policy Agent Gatekeeper for admission control, and Falco for runtime threat detection. We also established a Security Champions programme to embed security into each engineering team.',
    '[{"stat":"0","label":"Critical audit findings"},{"stat":"100%","label":"Service-to-service mTLS coverage"},{"stat":"SOC-2 Type II","label":"Certification achieved"},{"stat":"6 months","label":"End-to-end delivery"}]',
    ARRAY['Kubernetes', 'cert-manager', 'Open Policy Agent', 'Falco', 'Grafana', 'HashiCorp Vault'],
    'The zero-trust architecture ASCIRVO designed has made our SOC-2 audit process dramatically smoother. They didn''t just solve a problem — they built us a competitive moat.',
    'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=1200',
    TRUE
  ),
  (
    'Data Lakehouse Modernisation: 10x Query Performance',
    'sinologistix-data-lakehouse',
    'SinoLogistix Corp',
    NULL,
    'Manufacturing & Logistics',
    'Data & Analytics',
    'Asia Pacific',
    'DRAFT — placeholder for upcoming publication.',
    'DRAFT',
    '[{"stat":"10x","label":"Query performance improvement"}]',
    ARRAY['Databricks', 'Apache Iceberg', 'dbt', 'Tableau'],
    NULL,
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    FALSE
  )
ON CONFLICT (slug) DO NOTHING;

-- Migration 006 column: featured
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'case_studies' AND column_name = 'featured'
  ) THEN
    UPDATE public.case_studies SET featured = TRUE  WHERE slug IN ('apex-logistics-cloud-migration', 'meridian-ai-fraud-detection', 'capbridge-zero-trust-banking');
    UPDATE public.case_studies SET featured = FALSE WHERE slug = 'sinologistix-data-lakehouse';
  END IF;
END $$;

-- =========================================================================
-- 7. Job Listings (mix of active and closed)
-- =========================================================================

INSERT INTO public.job_listings (
  title, slug, department, location, employment_type, experience_level,
  description, responsibilities, requirements_must, requirements_nice,
  benefits, is_active, closes_at
)
VALUES
  (
    'Senior Full-Stack Engineer (Next.js / Supabase)',
    'senior-full-stack-engineer',
    'Software Engineering',
    'Singapore (Hybrid)',
    'Full-time', 'Senior',
    'Join our elite platform engineering team, designing next-generation enterprise applications with modern serverless stacks. You will work alongside world-class engineers on products used by Fortune 500 clients across Asia Pacific.',
    ARRAY[
      'Design, develop, and maintain scalable Next.js applications using App Router and Server Components.',
      'Optimise Supabase/PostgreSQL schema, queries, and RLS policies for performance and security.',
      'Champion code quality through thorough code reviews and pair programming sessions.',
      'Mentor junior engineers and contribute to architectural decision records (ADRs).',
      'Participate in on-call rotations for production incidents (low frequency, well-documented runbooks).'
    ],
    ARRAY[
      '5+ years of professional web application development experience.',
      'Deep expertise in Next.js, React Server Components, and Server Actions.',
      'Strong proficiency in PostgreSQL — schema normalisation, complex joins, and query optimisation.',
      'Experience with CI/CD pipelines (GitHub Actions, Vercel, or equivalent).',
      'Excellent written and verbal communication skills in English.'
    ],
    ARRAY[
      'Experience with Supabase Auth, Storage, and Realtime features.',
      'Prior contributions to open-source projects.',
      'Familiarity with Terraform or Infrastructure-as-Code tooling.',
      'Experience in a B2B SaaS or enterprise consulting environment.'
    ],
    ARRAY[
      'Highly competitive base salary benchmarked to 90th percentile of Singapore market.',
      'Comprehensive private medical, dental, and vision coverage.',
      'SGD 3,000 annual home-office equipment allowance.',
      'SGD 2,000 annual learning & conference budget.',
      '25 days annual leave + public holidays.',
      'Employee stock option plan (ESOP).'
    ],
    TRUE, NOW() + INTERVAL '45 days'
  ),
  (
    'AI/ML Engineer — NLP & LLM Systems',
    'ai-ml-engineer-nlp-llm',
    'Artificial Intelligence',
    'Remote (APAC timezone)',
    'Full-time', 'Mid',
    'Help us build the next generation of enterprise AI products. You will design and ship production RAG pipelines, fine-tune open-source LLMs, and build the tooling that makes AI trustworthy and auditable in regulated industries.',
    ARRAY[
      'Design and implement Retrieval-Augmented Generation (RAG) pipelines with vector databases.',
      'Fine-tune open-source LLMs (Llama, Mistral, Falcon) for domain-specific enterprise tasks.',
      'Build evaluation frameworks to measure model quality, hallucination rates, and latency.',
      'Collaborate with product managers to translate business requirements into ML system designs.',
      'Maintain ML model registry, experiment tracking (MLflow), and deployment pipelines (BentoML).'
    ],
    ARRAY[
      '3+ years of practical ML engineering experience (not just research).',
      'Production experience with LangChain, LlamaIndex, or similar RAG frameworks.',
      'Proficiency in Python, PyTorch, and the HuggingFace ecosystem.',
      'Experience deploying ML models at scale (Kubernetes, Ray Serve, or BentoML).',
      'Strong understanding of transformer architectures and attention mechanisms.'
    ],
    ARRAY[
      'Published research or technical blog posts on LLMs or NLP.',
      'Experience with vector databases (Pinecone, pgvector, Weaviate).',
      'Familiarity with enterprise compliance requirements (GDPR, HIPAA, MAS TRM).',
      'Knowledge of LoRA/QLoRA fine-tuning techniques.'
    ],
    ARRAY[
      'Fully remote role with flexible hours (core overlap: 10am–3pm SGT).',
      'USD 120,000 – 160,000 base salary (commensurate with experience).',
      'USD 3,000 annual learning budget.',
      'Access to H100 GPU cluster for experiments.',
      'Co-author research papers with our AI Research Lab.'
    ],
    TRUE, NOW() + INTERVAL '60 days'
  ),
  (
    'Cloud Infrastructure Engineer (AWS / Terraform)',
    'cloud-infrastructure-engineer-aws',
    'Cloud Engineering',
    'Kuala Lumpur, Malaysia (Hybrid)',
    'Full-time', 'Mid',
    'Join the team responsible for provisioning, operating, and optimising cloud infrastructure across 12 AWS regions for our global client base.',
    ARRAY[
      'Design and maintain multi-account AWS Landing Zones using AWS Control Tower.',
      'Write, review, and improve Terraform modules used across all client engagements.',
      'Implement GitOps workflows using ArgoCD or Flux for infrastructure state management.',
      'Conduct cloud cost optimisation reviews and implement FinOps best practices.',
      'Respond to infrastructure incidents and contribute to blameless post-mortems.'
    ],
    ARRAY[
      '3+ years of hands-on AWS infrastructure engineering.',
      'Strong proficiency in Terraform — modules, state management, workspaces.',
      'Experience with containerised workloads — ECS Fargate or EKS.',
      'AWS Solutions Architect Associate certification (or higher).',
      'Proficiency with Linux, bash scripting, and Python automation.'
    ],
    ARRAY[
      'HashiCorp Terraform Professional certification.',
      'Experience with Pulumi or CDK as alternative IaC tools.',
      'FinOps Certified Practitioner (FOCUS).',
      'Multi-cloud experience (Azure or GCP alongside AWS).'
    ],
    ARRAY[
      'MYR 12,000 – 18,000 base salary.',
      'Full medical and dental coverage.',
      'MYR 5,000 annual certification & training budget.',
      'Flexible hybrid arrangement (2 days in-office).',
      'Annual company retreat.'
    ],
    TRUE, NOW() + INTERVAL '30 days'
  ),
  (
    'UX Designer — Enterprise Product Design',
    'ux-designer-enterprise',
    'Design',
    'Singapore (On-site)',
    'Full-time', 'Senior',
    'CLOSED — Role has been filled.',
    ARRAY['Placeholder'],
    ARRAY['Placeholder'],
    NULL, NULL,
    FALSE, NOW() - INTERVAL '5 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- =========================================================================
-- 8. Job Applications (for the active listings above)
-- =========================================================================

INSERT INTO public.job_applications (
  job_id, applicant_name, email, phone, linkedin_url, cover_letter, status
)
VALUES
  (
    (SELECT id FROM public.job_listings WHERE slug = 'senior-full-stack-engineer'),
    'Marcus Aurelius',
    'maurelius@stoicdev.com',
    '+65 8765 4321',
    'https://linkedin.com/in/stoic-dev',
    'I am deeply interested in helping ASCIRVO build world-class enterprise applications. My 7 years specialising in Next.js and PostgreSQL, combined with 2 years at a Singapore-based fintech startup, make me a strong fit for this role.',
    'reviewing'
  ),
  (
    (SELECT id FROM public.job_listings WHERE slug = 'senior-full-stack-engineer'),
    'Yuki Tanaka',
    'yuki.tanaka@devmail.jp',
    '+81 90 1234 5678',
    'https://linkedin.com/in/yuki-fullstack',
    'I have been building production Next.js applications since 2020 and have deep Supabase experience from 3 commercial projects.',
    'received'
  ),
  (
    (SELECT id FROM public.job_listings WHERE slug = 'ai-ml-engineer-nlp-llm'),
    'Amara Nwosu',
    'amara.n@airesearch.ng',
    '+44 7700 900123',
    'https://linkedin.com/in/amara-ml',
    'My research at UCL on retrieval-augmented generation directly aligns with ASCIRVO''s AI product vision. I have shipped 3 production RAG systems and co-authored 2 NeurIPS papers.',
    'interview'
  )
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 9. Contact Leads (full range of statuses)
-- =========================================================================

-- Base columns only (migration 001)
INSERT INTO public.contact_leads (
  name, email, phone, company, country, service_interest,
  message, status, lead_notes
)
VALUES
  (
    'Sarah Jenkins', 'sjenkins@innovate-tech.com', '+1 (555) 234-5678',
    'InnovateTech Systems', 'United States', 'AI & Machine Learning',
    'We are evaluating vendors for a predictive maintenance model for our retail supply chain. Our engineering team is small (5 engineers) so we need a partner who can own the delivery end-to-end.',
    'new', NULL
  ),
  (
    'David Chen', 'dchen@healthhub.org', '+65 9123 4567',
    'HealthHub Global', 'Singapore', 'Cloud Solutions',
    'We need to migrate our patient management system to a HIPAA-compliant AWS multi-cloud landing zone within 6 months. Urgency: high — our current data centre contract expires in Q4.',
    'contacted', 'Called David 2026-05-28. Sent NDA. Follow-up scheduled for 2026-06-04.'
  ),
  (
    'Elena Rostova', 'e.rostova@cyberfinance.de', '+49 89 201938',
    'CyberFinance AG', 'Germany', 'Cybersecurity',
    'Requesting a comprehensive vulnerability assessment and SOC-2 compliance gap analysis for our new microservices banking core. Budget approved, procurement process in Q3.',
    'read', NULL
  ),
  (
    'Wei Liang', 'w.liang@nova-bank.hk', '+852 2345 6789',
    'Nova Bank HK', 'Hong Kong', 'Data & Analytics',
    'Looking for a partner to build our real-time trading analytics platform. Currently using on-premise Hadoop — want to modernise to a Lakehouse architecture.',
    'closed', 'Closed — client selected a different vendor (Thoughtworks). Keep warm for 2027 renewals.'
  )
ON CONFLICT DO NOTHING;

-- Migration 006 columns: referrer_url, utm_source
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'contact_leads' AND column_name = 'referrer_url'
  ) THEN
    UPDATE public.contact_leads SET referrer_url = '/services/ai-ml',                           utm_source = 'google'   WHERE email = 'sjenkins@innovate-tech.com';
    UPDATE public.contact_leads SET referrer_url = '/contact',                                   utm_source = 'linkedin' WHERE email = 'dchen@healthhub.org';
    UPDATE public.contact_leads SET referrer_url = '/services/cybersecurity',                    utm_source = 'organic'  WHERE email = 'e.rostova@cyberfinance.de';
    UPDATE public.contact_leads SET referrer_url = '/case-studies/apex-logistics-cloud-migration', utm_source = NULL     WHERE email = 'w.liang@nova-bank.hk';
  END IF;
END $$;

-- =========================================================================
-- 10. Newsletter Subscribers
-- =========================================================================

INSERT INTO public.newsletter_subscribers (email, source, is_active)
VALUES
  ('tech-lead@enterprise-co.com',     'blog',    TRUE),
  ('cto@startupventures.sg',           'footer',  TRUE),
  ('d.kowalski@manufacturing.pl',      'careers', TRUE),
  ('newsletter@devweekly.io',          'popup',   TRUE),
  ('analyst@researchfirm.com',         'blog',    TRUE),
  ('unsubscribed@example.com',         'footer',  FALSE)
ON CONFLICT (email) DO NOTHING;

-- Migration 006 column: unsubscribed_at — guard for pre-006 environments
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'newsletter_subscribers' AND column_name = 'unsubscribed_at'
  ) THEN
    UPDATE public.newsletter_subscribers
    SET unsubscribed_at = NOW() - INTERVAL '10 days'
    WHERE email = 'unsubscribed@example.com';
  END IF;
END $$;

-- =========================================================================
-- 11. Newsroom Posts
-- =========================================================================

-- Base columns only (migration 001)
INSERT INTO public.newsroom_posts (
  headline, slug, type, source, source_url, summary, is_published, published_at
)
VALUES
  (
    'ASCIRVO Named in Gartner''s 2026 Cool Vendor Report for Enterprise AI',
    'gartner-cool-vendor-2026',
    'award',
    'Gartner',
    NULL,
    'ASCIRVO has been recognised as a Cool Vendor in Gartner''s 2026 Enterprise AI report, cited for its innovative approach to regulated-industry AI deployment.',
    TRUE, NOW() - INTERVAL '5 days'
  ),
  (
    'ASCIRVO Expands APAC Operations with New Kuala Lumpur Engineering Hub',
    'kl-engineering-hub-announcement',
    'announcement',
    'ASCIRVO Press Office',
    NULL,
    'ASCIRVO opens its third APAC engineering hub in Kuala Lumpur, Malaysia, adding 50 engineering roles across cloud, AI, and cybersecurity practices.',
    TRUE, NOW() - INTERVAL '21 days'
  ),
  (
    'How ASCIRVO Helped Meridian HealthTech Achieve 68% Fraud Reduction',
    'techcrunch-meridian-fraud-coverage',
    'media_coverage',
    'TechCrunch',
    'https://techcrunch.com',
    'TechCrunch features ASCIRVO''s AI fraud detection work with Meridian HealthTech as a standout case of AI applied responsibly in healthcare payments.',
    TRUE, NOW() - INTERVAL '30 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- Migration 006 column: external_url
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'newsroom_posts' AND column_name = 'external_url'
  ) THEN
    UPDATE public.newsroom_posts
    SET external_url = 'https://techcrunch.com/dev-placeholder'
    WHERE slug = 'techcrunch-meridian-fraud-coverage';
  END IF;
END $$;

-- =========================================================================
-- 12. Page Content (editable static sections)
-- =========================================================================

INSERT INTO public.page_content (page_key, section_key, content)
VALUES
  (
    'home', 'hero',
    '{
      "headline": "Engineering Tomorrow''s Digital Enterprise",
      "subheadline": "We partner with the world''s most ambitious organisations to build AI-powered, cloud-native, and secure digital platforms.",
      "cta_primary": {"label": "Explore Our Services", "href": "/services"},
      "cta_secondary": {"label": "Talk to an Expert", "href": "/contact"},
      "stats": [
        {"value": "500+", "label": "Enterprise Clients"},
        {"value": "15+",  "label": "Countries Served"},
        {"value": "10",   "label": "Years of Excellence"},
        {"value": "98%",  "label": "Client Retention Rate"}
      ]
    }'
  ),
  (
    'home', 'why_ascirvo',
    '{
      "title": "Why ASCIRVO",
      "pillars": [
        {"icon": "shield-check", "title": "Enterprise-Grade Security", "body": "Every engagement is designed with SOC-2, ISO 27001, and industry-specific compliance built in from day one."},
        {"icon": "zap",          "title": "Speed at Scale",            "body": "We deliver without sacrificing quality. Our accelerators and frameworks cut delivery timelines by 30–40%."},
        {"icon": "globe",        "title": "Global Delivery Model",     "body": "Teams across Singapore, KL, London, and Nairobi give you follow-the-sun coverage and local market expertise."},
        {"icon": "bar-chart-2",  "title": "Outcome-Driven Pricing",   "body": "We align our incentives with yours through milestone-based contracts and shared success metrics."}
      ]
    }'
  ),
  (
    'contact', 'office_locations',
    '{
      "offices": [
        {"city": "Singapore", "address": "1 Raffles Place, #40-02, Singapore 048616", "phone": "+65 6123 4567", "email": "sg@ascirvo.com", "is_hq": true},
        {"city": "Kuala Lumpur", "address": "Level 32, Petronas Tower 3, KLCC, 50088 Kuala Lumpur", "phone": "+60 3-2345 6789", "email": "my@ascirvo.com", "is_hq": false},
        {"city": "London", "address": "1 Canada Square, Canary Wharf, London E14 5AB", "phone": "+44 20 7946 0958", "email": "uk@ascirvo.com", "is_hq": false}
      ]
    }'
  )
ON CONFLICT (page_key, section_key) DO UPDATE SET
  content    = EXCLUDED.content,
  updated_at = NOW();

-- =========================================================================
-- Done — Summary
-- =========================================================================
-- Seeded:
--   2   admin users (admin@local.dev / editor@local.dev — password: DevAdmin@123)
--   6   team members
--   8   technology partners
--   4   testimonials
--   4   blog posts  (3 published, 1 draft)
--   4   case studies (3 published, 1 draft)
--   4   job listings  (3 active, 1 closed)
--   3   job applications
--   4   contact leads  (all 4 statuses)
--   6   newsletter subscribers (5 active, 1 unsubscribed)
--   3   newsroom posts
--   3   page content sections
