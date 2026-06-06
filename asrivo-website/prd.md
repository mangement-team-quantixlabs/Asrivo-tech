# ASCIRVO — Product Requirements Document (PRD)
**Version:** 1.0.0  
**Date:** May 2026  
**Status:** Draft  
**Document Owner:** ASCIRVO Product Team  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Target Audience](#3-target-audience)
4. [Tech Stack](#4-tech-stack)
5. [Site Architecture & Pages](#5-site-architecture--pages)
6. [Feature Specifications](#6-feature-specifications)
7. [Supabase Backend Schema](#7-supabase-backend-schema)
8. [UI/UX Design System](#8-uiux-design-system)
9. [Performance & Quality Standards](#9-performance--quality-standards)
10. [Security Requirements](#10-security-requirements)
11. [SEO & Analytics](#11-seo--analytics)
12. [Deployment & Infrastructure](#12-deployment--infrastructure)
13. [Milestones & Delivery Phases](#13-milestones--delivery-phases)
14. [Appendix: Folder Structure](#14-appendix-folder-structure)

---

## 1. Executive Summary

**ASCIRVO** is an industrial-grade corporate technology and consulting website built to position the brand as a world-class IT services and digital transformation company. Inspired by enterprise-level websites like Infosys, ASCIRVO's web presence will function as a complete digital platform — covering marketing, lead generation, content publishing, careers, and client engagement.

The website will be built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** on the frontend, and **Supabase** as the complete backend platform (database, auth, storage, edge functions, and real-time).

---

## 2. Product Vision & Goals

### Vision
> *"To be the digital face of ASCIRVO — a platform that earns trust, drives enquiries, and reflects world-class engineering capability."*

### Primary Goals

| # | Goal | Success Metric |
|---|------|---------------|
| 1 | Establish brand credibility at enterprise level | Bounce rate < 40%, Avg. session > 2.5 min |
| 2 | Generate qualified B2B leads | Contact form submissions ≥ 50/month |
| 3 | Attract top talent via Careers section | Job applications ≥ 20/month |
| 4 | Publish thought leadership content | 4 blog posts/month, organic traffic growth |
| 5 | Fully functional CMS-backed content management | 100% content editable via Supabase dashboard |

---

## 3. Target Audience

### Primary Audience — B2B Decision Makers
- C-Suite executives (CEOs, CTOs, CIOs) of mid-to-large enterprises
- IT Directors and Digital Transformation leads
- Procurement and vendor evaluation teams

### Secondary Audience — Talent & Community
- Software engineers, data scientists, consultants looking for career opportunities
- Tech journalists, analysts, and industry peers

### Tertiary Audience — Investors & Partners
- Potential investors evaluating the company
- Technology partners and ecosystem vendors

---

## 4. Tech Stack

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| UI Components | Shadcn/UI + Radix UI | Latest |
| Animations | Framer Motion | 11.x |
| Icons | Lucide React | Latest |
| Forms | React Hook Form + Zod | Latest |
| State Management | Zustand (lightweight) | Latest |
| Email | Resend (transactional email) | Latest |

### Backend (Supabase — Full Suite)
| Service | Usage |
|---------|-------|
| **Supabase Database** (PostgreSQL) | All structured data: leads, blogs, jobs, users |
| **Supabase Auth** | Admin portal authentication (email + OAuth) |
| **Supabase Storage** | Media assets: hero images, case study files, team photos, logos |
| **Supabase Edge Functions** | Contact form processing, email triggers, webhook handlers |
| **Supabase Realtime** | Live notification feeds for admin dashboard |
| **Supabase Row-Level Security (RLS)** | Fine-grained access control per table |

### DevOps & Infrastructure
| Tool | Purpose |
|------|---------|
| Vercel | Hosting & CI/CD for Next.js |
| GitHub Actions | Automated testing and deployment pipeline |
| Supabase Cloud | Managed Postgres + backend services |
| Sentry | Error monitoring |
| PostHog | Product analytics |

---

## 5. Site Architecture & Pages

### 5.1 Page Map

```
ascirvo.com/
│
├── /                           → Home (Landing Page)
├── /about                      → About ASCIRVO
│   ├── /about/leadership       → Leadership Team
│   ├── /about/vision-mission   → Vision & Mission
│   └── /about/global-presence  → Office Locations
│
├── /services                   → Services Overview
│   ├── /services/ai-ml         → AI & Machine Learning
│   ├── /services/cloud         → Cloud Solutions
│   ├── /services/cybersecurity → Cybersecurity
│   ├── /services/data-analytics → Data & Analytics
│   ├── /services/digital-transformation → Digital Transformation
│   ├── /services/software-engineering   → Software Engineering
│   └── /services/consulting    → Business Consulting
│
├── /industries                 → Industries Overview
│   ├── /industries/banking-finance → Banking & Financial Services
│   ├── /industries/healthcare  → Healthcare & Life Sciences
│   ├── /industries/manufacturing → Manufacturing
│   ├── /industries/retail      → Retail & E-Commerce
│   ├── /industries/energy      → Energy & Utilities
│   └── /industries/government  → Public Sector & Government
│
├── /case-studies               → Case Studies List
│   └── /case-studies/[slug]    → Individual Case Study
│
├── /insights                   → Blog / Thought Leadership
│   └── /insights/[slug]        → Individual Blog Post
│
├── /careers                    → Careers Landing
│   ├── /careers/open-positions → Job Listings
│   └── /careers/[job-slug]     → Individual Job Detail + Apply
│
├── /partners                   → Technology Partners
├── /contact                    → Contact Page
├── /newsroom                   → Press Releases & Media
│
└── /admin (protected)          → Admin Dashboard
    ├── /admin/leads            → Contact Form Submissions
    ├── /admin/blogs            → Blog CMS
    ├── /admin/jobs             → Job Listing Manager
    ├── /admin/case-studies     → Case Study Manager
    └── /admin/newsletter       → Newsletter Subscribers
```

---

## 6. Feature Specifications

### 6.1 Home Page

**Purpose:** Make a powerful first impression, communicate brand value, and drive users to explore services or contact sales.

**Sections:**
1. **Hero Section**
   - Full-width video/animated background with headline and CTA buttons
   - Animated counter stats (e.g., "500+ Clients", "15+ Countries", "10 Years")
   - Primary CTA: "Explore Services" | Secondary CTA: "Talk to an Expert"

2. **Marquee / Trusted By**
   - Scrolling logo strip of client/partner logos

3. **Services Highlight**
   - 6-card grid with icon, title, short description, and "Learn More" link
   - Hover animation on each card

4. **Why ASCIRVO**
   - 4-pillar value proposition section with icons and copy

5. **Industries We Serve**
   - Visual card grid with industry icons

6. **Featured Case Studies**
   - 3 highlighted case studies with image, title, client, and result stat

7. **Insights / Blog Preview**
   - Latest 3 blog posts with category tag, title, date, and read time

8. **Careers CTA Banner**
   - "Join the ASCIRVO Family" section with open roles count + link

9. **Contact / Lead CTA**
   - Simple inline lead capture form (name, email, company, message)

10. **Footer**
    - Company info, navigation links, social links, newsletter signup, legal links

---

### 6.2 Services Pages

**Purpose:** Detailed service offering pages to convert visitors researching specific IT services.

**Each Service Page contains:**
- Hero with service title + animated visual
- Overview paragraph (200–300 words)
- Key capabilities list with icons
- Process / Methodology (step-by-step visual)
- Related Case Studies (2–3 cards)
- Technologies Used (logo grid)
- CTA: "Start a Conversation"

**Services list:**
- AI & Machine Learning
- Cloud Solutions (Multi-cloud, Migration, Native)
- Cybersecurity (SOC, Compliance, Zero Trust)
- Data & Analytics (BI, Data Engineering, Lakehouse)
- Digital Transformation
- Software Engineering (Custom Dev, QA, DevOps)
- Business Consulting

---

### 6.3 Industries Pages

**Purpose:** Show domain depth and build credibility for specific verticals.

**Each Industry Page contains:**
- Industry hero with sector-specific imagery
- Challenges faced in this industry (pain points)
- ASCIRVO's solutions for this sector
- Industry-specific case studies
- Key stats / client results
- CTA to contact a domain specialist

---

### 6.4 Case Studies

**Purpose:** Proof of capability — the most conversion-critical section of the site.

**List Page:**
- Filter by Industry, Service, and Region
- Card layout: client logo (if permitted), title, challenge teaser, result stat

**Detail Page (dynamic `[slug]`):**
- Client overview (anonymized if needed)
- Challenge
- ASCIRVO's Solution
- Technologies Used
- Results & Impact (highlighted stat boxes)
- Testimonial quote (optional)
- Related Case Studies
- CTA: "Achieve Similar Results"

**Backend:** Case studies stored and managed in Supabase `case_studies` table with rich text (MDX or JSON content blocks).

---

### 6.5 Insights / Blog

**Purpose:** SEO-driven thought leadership content to attract organic traffic.

**Features:**
- Category filter (AI, Cloud, Security, Data, Industry News)
- Search bar (client-side filter)
- Post detail with MDX content rendering
- Estimated read time
- Author bio
- Share buttons (LinkedIn, Twitter/X, copy link)
- Related posts
- Newsletter subscribe CTA inline

**Backend:** Posts stored in Supabase `blog_posts` table. Content stored as rich JSON (Tiptap/ProseMirror blocks) or MDX string.

---

### 6.6 Careers

**Purpose:** Attract top talent and streamline the application process.

**Careers Landing:**
- Culture section with photos/video
- Employee testimonials
- "Life at ASCIRVO" highlights
- Open positions count + Search/Filter

**Job Listings Page:**
- Filter by: Location, Department, Experience Level, Employment Type
- Each card: Job Title, Department, Location, Type (Full-time/Contract), Date Posted

**Job Detail Page:**
- Full job description
- Responsibilities
- Requirements (Must-have / Nice-to-have)
- Benefits
- Application form (Name, Email, LinkedIn, Resume Upload, Cover Letter)

**Backend:**
- Jobs in Supabase `job_listings` table
- Applications in `job_applications` table
- Resume files stored in Supabase Storage (`resumes/` bucket)
- On submission: Edge Function triggers confirmation email via Resend

---

### 6.7 Contact Page

**Purpose:** Capture leads and route enquiries to the right team.

**Features:**
- Lead capture form: Name, Email, Phone, Company, Country, Service Interest (dropdown), Message
- Office locations with addresses + embedded map
- Support email and phone numbers
- On submission: 
  - Lead stored in Supabase `contact_leads` table
  - Supabase Edge Function triggers notification email to sales team
  - Auto-reply confirmation email sent to submitter

---

### 6.8 Admin Dashboard (Internal, Protected)

**Purpose:** Allow ASCIRVO's internal team to manage all dynamic content without engineering involvement.

**Auth:** Supabase Auth with email/password + optional Google OAuth. Role-based access (`admin`, `editor`).

**Modules:**

| Module | Features |
|--------|---------|
| **Leads Manager** | View, filter, export contact form submissions; mark as read/contacted |
| **Blog CMS** | Create, edit, publish/draft, delete blog posts; rich text editor |
| **Job Manager** | Post, edit, close job listings; view applications + download resumes |
| **Case Study Manager** | Add/edit/delete case studies; manage publishing status |
| **Newsletter** | View subscribers list; export CSV |
| **Media Library** | Upload/manage images and files via Supabase Storage |

---

## 7. Supabase Backend Schema

### Tables

```sql
-- Contact Leads
CREATE TABLE contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  service_interest TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB,                -- rich text blocks (Tiptap JSON)
  category TEXT,
  tags TEXT[],
  author_name TEXT,
  author_avatar_url TEXT,
  cover_image_url TEXT,
  read_time_minutes INT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case Studies
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  client_logo_url TEXT,
  industry TEXT,
  service TEXT,
  region TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB,               -- [{ "stat": "40%", "label": "Cost reduction" }]
  technologies TEXT[],
  testimonial TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Listings
CREATE TABLE job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  experience_level TEXT CHECK (experience_level IN ('Entry', 'Mid', 'Senior', 'Lead', 'Director')),
  description TEXT,
  responsibilities TEXT[],
  requirements_must TEXT[],
  requirements_nice TEXT[],
  benefits TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Applications
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  resume_path TEXT,            -- Supabase Storage path
  cover_letter TEXT,
  status TEXT DEFAULT 'received' CHECK (status IN ('received', 'reviewing', 'interview', 'offer', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,                 -- 'home', 'blog', 'footer'
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users (Supabase Auth extension)
-- Managed via Supabase Auth + profiles table
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies

```sql
-- contact_leads: only authenticated admins can read/write
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only" ON contact_leads FOR ALL
  USING (auth.role() = 'authenticated');

-- blog_posts: public can read published, admins can do all
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published" ON blog_posts FOR SELECT
  USING (is_published = TRUE);
CREATE POLICY "Admins full access" ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Similar RLS applied to case_studies, job_listings, job_applications
```

### Supabase Storage Buckets

| Bucket | Purpose | Access |
|--------|---------|--------|
| `public-assets` | Hero images, service icons, logos | Public read |
| `blog-images` | Blog cover images and inline images | Public read |
| `case-study-assets` | Case study visuals | Public read |
| `team-photos` | Leadership and team member photos | Public read |
| `resumes` | Job application resumes | Private (admin only) |

### Edge Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `on-contact-submit` | Contact form POST | Save lead → send notification to sales → send auto-reply to user |
| `on-job-apply` | Job application POST | Save application → upload resume to storage → send confirmation |
| `on-newsletter-signup` | Newsletter form POST | Save subscriber → send welcome email |

---

## 8. UI/UX Design System

### Brand Identity
- **Company Name:** ASCIRVO
- **Brand Tone:** Professional, Innovative, Trustworthy, Forward-thinking
- **Style:** Corporate-modern — clean, confident, enterprise-grade with premium feel

### Color Palette

```css
/* Primary */
--color-primary: #0A2463;         /* Deep Navy Blue */
--color-primary-light: #1B4FD8;   /* Electric Blue */
--color-primary-dark: #06153A;    /* Midnight Blue */

/* Accent */
--color-accent: #00C6BE;          /* Teal / Cyan */
--color-accent-warm: #FF6B35;     /* Energy Orange (CTAs) */

/* Neutrals */
--color-white: #FFFFFF;
--color-off-white: #F7F9FC;
--color-gray-100: #EEF2F7;
--color-gray-400: #9CA3AF;
--color-gray-700: #374151;
--color-black: #0B0E13;
```

### Typography

```css
/* Headings — Strong, authoritative */
font-family: 'Sora', sans-serif;

/* Body — Readable, clean */
font-family: 'DM Sans', sans-serif;

/* Code / Technical — Monospace */
font-family: 'JetBrains Mono', monospace;
```

### Typography Scale

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 64px / 4rem | 700 | Hero headlines |
| H2 | 48px / 3rem | 700 | Section titles |
| H3 | 32px / 2rem | 600 | Sub-section titles |
| H4 | 24px / 1.5rem | 600 | Card titles |
| Body L | 18px / 1.125rem | 400 | Lead paragraphs |
| Body M | 16px / 1rem | 400 | General body |
| Caption | 14px / 0.875rem | 400 | Labels, meta |

### Component Library (Shadcn/UI + Custom)

**Core Components to Build:**
- `Navbar` — Mega menu with dropdowns for Services & Industries
- `Footer` — Multi-column with social + newsletter
- `HeroSection` — Video/animation background, animated headline
- `ServiceCard` — Icon + title + description + link
- `IndustryCard` — Image/icon background card
- `CaseStudyCard` — Cover image + client + result stat + link
- `BlogCard` — Category tag + cover + title + author + date
- `JobCard` — Title + dept + location + type badge + apply link
- `StatCounter` — Animated number counter on scroll
- `TestimonialSlider` — Carousel with quote + client info
- `ContactForm` — Validated multi-field form
- `ApplicationForm` — Job apply form with file upload
- `MarqueeStrip` — Auto-scrolling logo strip
- `SectionWrapper` — Consistent padding/margin wrapper
- `Badge` — Category/tag chips
- `Button` — Primary, secondary, ghost, destructive variants
- `AdminSidebar` — Collapsible nav for admin dashboard
- `DataTable` — Sortable, filterable table for admin views

### Motion / Animation Guidelines
- **Page transitions:** Fade + slide-up (150ms ease)
- **Scroll animations:** Intersection Observer — fade-in-up with stagger
- **Hover effects:** Card lift (`translate-y-1`, shadow deepens)
- **Counter animation:** Count up from 0 on first viewport entry
- **Hero:** Subtle parallax or looping gradient/particle animation
- **Loading states:** Skeleton screens (not spinners) for all data-fetched sections

### Responsive Breakpoints (Tailwind)

| Breakpoint | Screen | Usage |
|-----------|--------|-------|
| `sm` | ≥ 640px | Mobile landscape |
| `md` | ≥ 768px | Tablets |
| `lg` | ≥ 1024px | Small desktops |
| `xl` | ≥ 1280px | Standard desktops |
| `2xl` | ≥ 1536px | Large displays |

---

## 9. Performance & Quality Standards

### Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to First Byte (TTFB) | < 600ms |
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 95 |

### Technical Standards
- **Image optimization:** Next.js `<Image>` component with WebP/AVIF, lazy loading, blur placeholder
- **Font loading:** `next/font` with `display: swap` — zero CLS impact
- **Code splitting:** Automatic via Next.js App Router per-page bundles
- **Static pages:** All marketing pages statically generated (SSG) via `generateStaticParams`
- **Dynamic pages:** Blog posts and case studies use ISR (Incremental Static Regeneration, revalidate: 3600)
- **Data fetching:** Server Components for initial data; Client Components only for interactive elements
- **Bundle size:** Target < 200KB initial JS
- **Caching:** Supabase query results cached at edge via Next.js `fetch` cache headers

### Accessibility (WCAG 2.1 AA)
- All images have descriptive `alt` text
- Keyboard navigable — full tab order management
- ARIA labels on all interactive elements
- Contrast ratio ≥ 4.5:1 for all text
- Focus indicators visible and styled
- Skip-to-content link on all pages

---

## 10. Security Requirements

### Authentication & Authorization
- Supabase Auth with JWT sessions for admin dashboard
- HTTP-only cookies for session storage (not localStorage)
- Role-based access control (RBAC) via Supabase RLS
- Admin routes protected with Next.js middleware (`matcher` config)

### Data Protection
- All Supabase connections use TLS 1.3
- Row Level Security enabled on all tables
- Resume uploads (sensitive) in private Supabase Storage bucket — signed URLs only
- Environment variables: never exposed to client; prefixed `NEXT_PUBLIC_` only for safe public keys

### Form Security
- CSRF protection via Supabase Auth tokens on mutation requests
- Zod schema validation on all form inputs (client + server-side)
- Rate limiting on contact form and newsletter signup via Edge Functions
- Honeypot fields on public forms to catch bots
- reCAPTCHA v3 on contact and job application forms

### Infrastructure Security
- Vercel deployment with environment variable encryption
- Supabase project with IP allowlisting for admin connections
- Dependency vulnerability scanning via GitHub Dependabot
- Monthly security audits

---

## 11. SEO & Analytics

### SEO Requirements
- `generateMetadata()` on all Next.js pages (title, description, OG, Twitter card)
- Structured data (JSON-LD) on: Home, Blog Posts, Job Listings, Contact
- XML Sitemap auto-generated at `/sitemap.xml` via `next-sitemap`
- `robots.txt` with correct allow/disallow rules
- Canonical URLs on all pages
- Open Graph images for blog and case study pages (auto-generated with `@vercel/og`)
- Internal linking strategy: Services ↔ Industries ↔ Case Studies

### Analytics Stack
| Tool | Purpose |
|------|---------|
| PostHog | User behaviour analytics, session recording, feature flags |
| Google Search Console | Organic search performance monitoring |
| Vercel Analytics | Core Web Vitals monitoring per page |
| Sentry | Frontend error tracking and performance tracing |

---

## 12. Deployment & Infrastructure

### Environments

| Environment | Branch | URL | Auto-deploy |
|------------|--------|-----|-------------|
| Production | `main` | `ascirvo.com` | On merge to main |
| Staging | `staging` | `staging.ascirvo.com` | On merge to staging |
| Preview | Feature branches | `*.vercel.app` | On PR open |

### CI/CD Pipeline (GitHub Actions)

```yaml
# On PR:
1. Lint (ESLint + Prettier check)
2. Type check (tsc --noEmit)
3. Unit tests (Vitest)
4. Build check

# On merge to main:
1. All PR checks
2. E2E tests (Playwright)
3. Deploy to Vercel Production
4. Run Supabase migrations
5. Notify team on Slack
```

### Supabase Migrations
- All schema changes version-controlled in `/supabase/migrations/`
- Managed via Supabase CLI (`supabase db push`)
- Seed data for local development in `/supabase/seed.sql`

---

## 13. Milestones & Delivery Phases

### Phase 1 — Foundation (Weeks 1–3)
- [ ] Project setup: Next.js 14, TypeScript, Tailwind, Shadcn/UI
- [ ] Supabase project setup: database schema, RLS, storage buckets
- [ ] Design system implementation: tokens, typography, base components
- [ ] Navbar + Footer components
- [ ] Home page (static, no backend data yet)

### Phase 2 — Core Marketing Pages (Weeks 4–6)
- [ ] About page (+ sub-pages)
- [ ] Services overview + 7 service detail pages
- [ ] Industries overview + 6 industry detail pages
- [ ] Contact page + Supabase lead capture + Edge Function email
- [ ] Partners page

### Phase 3 — Dynamic Content (Weeks 7–9)
- [ ] Blog / Insights — list + detail pages (Supabase-backed)
- [ ] Case Studies — list + detail pages (Supabase-backed)
- [ ] Careers — listing + detail + application form (Supabase-backed)
- [ ] Newsroom / Press Releases page
- [ ] Newsletter signup (all CTA locations + Edge Function)

### Phase 4 — Admin Dashboard (Weeks 10–12)
- [ ] Supabase Auth setup + admin route protection (Next.js middleware)
- [ ] Admin layout + sidebar navigation
- [ ] Leads Manager module
- [ ] Blog CMS module (rich text editor with Tiptap)
- [ ] Job Manager module
- [ ] Case Study Manager module
- [ ] Newsletter subscribers module
- [ ] Media Library (Supabase Storage browser)

### Phase 5 — Polish, Testing & Launch (Weeks 13–14)
- [ ] Full responsive QA across breakpoints and devices
- [ ] Accessibility audit and fixes (axe-core)
- [ ] Performance optimization (Lighthouse ≥ 90)
- [ ] SEO implementation (metadata, sitemap, OG images)
- [ ] Analytics integration (PostHog, GSC, Vercel Analytics)
- [ ] Security review (OWASP top 10 checklist)
- [ ] Content population (real copy, images, case studies)
- [ ] Staging → Production deployment
- [ ] DNS cutover and Go-Live ✅

---

## 14. Appendix: Folder Structure

```
ascirvo/
├── app/                            # Next.js App Router
│   ├── (marketing)/                # Public marketing pages layout group
│   │   ├── page.tsx                # Home
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/
│   │   ├── industries/
│   │   │   └── [slug]/
│   │   ├── case-studies/
│   │   │   └── [slug]/
│   │   ├── insights/
│   │   │   └── [slug]/
│   │   ├── careers/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   └── partners/
│   │
│   ├── (admin)/                    # Protected admin layout group
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   ├── admin/
│   │   │   ├── leads/
│   │   │   ├── blogs/
│   │   │   ├── jobs/
│   │   │   ├── case-studies/
│   │   │   └── newsletter/
│   │
│   ├── api/                        # Next.js API routes
│   │   └── og/                     # OG image generation
│   │
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
│
├── components/                     # Shared components
│   ├── ui/                         # Shadcn/UI base components
│   ├── layout/                     # Navbar, Footer, SectionWrapper
│   ├── marketing/                  # ServiceCard, IndustryCard, StatCounter
│   ├── forms/                      # ContactForm, ApplicationForm, NewsletterForm
│   ├── blog/                       # BlogCard, BlogContent
│   ├── careers/                    # JobCard, JobDetail
│   └── admin/                      # DataTable, AdminSidebar, CMSEditor
│
├── lib/                            # Utilities and config
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client
│   │   └── middleware.ts           # Auth session management
│   ├── validations/                # Zod schemas
│   ├── utils.ts                    # General utilities
│   └── constants.ts                # Site config, nav links, etc.
│
├── types/                          # TypeScript types
│   ├── database.ts                 # Auto-generated Supabase types
│   └── index.ts                    # App-level types
│
├── hooks/                          # Custom React hooks
│   ├── use-leads.ts
│   ├── use-blog.ts
│   └── use-jobs.ts
│
├── public/                         # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── supabase/                       # Supabase config
│   ├── migrations/                 # SQL migration files
│   ├── functions/                  # Edge Functions
│   │   ├── on-contact-submit/
│   │   ├── on-job-apply/
│   │   └── on-newsletter-signup/
│   └── seed.sql                    # Dev seed data
│
├── middleware.ts                   # Next.js middleware (auth guard)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local                      # Environment variables (gitignored)
```

---

*End of PRD — ASCIRVO v1.0.0*  
*This document is the single source of truth for the ASCIRVO website build. All design decisions, technical choices, and feature scope referenced here should be aligned with the development team before implementation begins.*