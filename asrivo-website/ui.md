# ASCIRVO — Product Requirements Document (PRD)
**Version:** 1.1.0  
**Date:** May 2026  
**Status:** Draft  
**Document Owner:** ASCIRVO Product Team  
**Changelog:** v1.1.0 — Added Section 15 (Admin Panel) and Section 16 (Content Management System) with full specifications, schema extensions, UI components, role model, and folder structure updates.

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
15. [Admin Panel — Full Specification ⭐ NEW](#15-admin-panel--full-specification)
16. [Content Management System (CMS) — Full Specification ⭐ NEW](#16-content-management-system-cms--full-specification)

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
| 5 | Fully functional CMS-backed content management | 100% content editable via Admin Dashboard |

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
| Rich Text Editor | Tiptap (ProseMirror-based) | 2.x |

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
    ├── /admin                  → Dashboard Home (Overview & Analytics)
    ├── /admin/leads            → Contact Form Submissions
    ├── /admin/blogs            → Blog CMS
    │   ├── /admin/blogs/new    → New Post Editor
    │   └── /admin/blogs/[id]   → Edit Post
    ├── /admin/case-studies     → Case Study Manager
    │   ├── /admin/case-studies/new
    │   └── /admin/case-studies/[id]
    ├── /admin/jobs             → Job Listing Manager
    │   ├── /admin/jobs/new
    │   └── /admin/jobs/[id]
    ├── /admin/applications     → Job Applications Inbox
    ├── /admin/newsletter       → Newsletter Subscribers
    ├── /admin/media            → Media Library
    ├── /admin/pages            → Static Page Content Editor
    ├── /admin/navigation       → Navigation & Menu Manager
    ├── /admin/testimonials     → Testimonials Manager
    ├── /admin/partners         → Partners Logo Manager
    ├── /admin/team             → Team Members Manager
    ├── /admin/newsroom         → Press Releases Manager
    ├── /admin/settings         → Site Settings & Configuration
    └── /admin/users            → Admin User Management (super-admin only)
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

> **Full Admin Panel and CMS specifications are now detailed in Sections 15 and 16.**

**Purpose:** Allow ASCIRVO's internal team to manage all dynamic content without engineering involvement.

**Auth:** Supabase Auth with email/password + optional Google OAuth. Role-based access (`super_admin`, `admin`, `editor`).

**Modules Summary:**

| Module | Features |
|--------|---------|
| **Dashboard Home** | KPI overview, recent leads, real-time notifications |
| **Leads Manager** | View, filter, export contact form submissions; mark as read/contacted |
| **Blog CMS** | Create, edit, publish/draft, delete blog posts; rich text editor |
| **Job Manager** | Post, edit, close job listings; view applications + download resumes |
| **Case Study Manager** | Add/edit/delete case studies; manage publishing status |
| **Newsletter** | View subscribers list; export CSV; send campaigns |
| **Media Library** | Upload/manage images and files via Supabase Storage |
| **Pages Editor** | Edit static page content (hero copy, about text, service descriptions) |
| **Navigation Manager** | Edit navbar links, footer links, mega menus |
| **Team Manager** | Add/edit leadership and team member profiles |
| **Testimonials Manager** | Add/manage client testimonials displayed on site |
| **Partners Manager** | Manage partner/client logos shown in marquee strip |
| **Newsroom Manager** | Publish press releases and media announcements |
| **Site Settings** | Global config: SEO defaults, social links, contact details |
| **User Management** | Manage admin users, assign roles (super-admin only) |

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
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> **Extended schema tables for Admin Panel and CMS are defined in Sections 15 and 16.**

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
| `media-library` | Admin-uploaded general media assets | Admin write, public read |
| `page-assets` | Static page section images | Public read |

### Edge Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `on-contact-submit` | Contact form POST | Save lead → send notification to sales → send auto-reply to user |
| `on-job-apply` | Job application POST | Save application → upload resume to storage → send confirmation |
| `on-newsletter-signup` | Newsletter form POST | Save subscriber → send welcome email |
| `on-admin-invite` | Admin user creation | Send invite email with setup link |
| `on-content-publish` | Blog/case-study publish | Trigger ISR revalidation via Next.js revalidatePath |

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

/* Admin-specific */
--color-admin-bg: #F0F4F8;        /* Admin panel background */
--color-admin-sidebar: #0A2463;   /* Sidebar (matches brand primary) */
--color-admin-sidebar-text: #CBD5E1;
--color-admin-active: #1B4FD8;
--color-success: #22C55E;
--color-warning: #F59E0B;
--color-danger: #EF4444;
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
- `TiptapEditor` — Rich text WYSIWYG editor for CMS
- `MediaPickerModal` — Inline media library browser for content editors
- `StatusBadge` — Published / Draft / Archived indicators
- `AdminTopbar` — Top navigation bar with user menu and notifications

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
- Super-admin role required for user management and site settings

### Data Protection
- All Supabase connections use TLS 1.3
- Row Level Security enabled on all tables
- Resume uploads (sensitive) in private Supabase Storage bucket — signed URLs only
- Environment variables: never exposed to client; prefixed `NEXT_PUBLIC_` only for safe public keys
- Admin audit log table tracks all create/update/delete actions

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
- `robots.txt` with correct allow/disallow rules (admin routes disallowed)
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

### Phase 4 — Admin Dashboard & CMS (Weeks 10–13) *(extended)*
- [ ] Supabase Auth setup + admin route protection (Next.js middleware)
- [ ] Admin layout + sidebar navigation + topbar
- [ ] Dashboard Home with KPI cards and activity feed
- [ ] Leads Manager module
- [ ] Blog CMS module (rich text editor with Tiptap + media picker)
- [ ] Job Manager module
- [ ] Job Applications inbox with resume download
- [ ] Case Study Manager module
- [ ] Newsletter subscribers module + CSV export
- [ ] Media Library (Supabase Storage browser with upload/delete)
- [ ] Pages Editor (static content sections)
- [ ] Navigation Manager
- [ ] Team Members Manager
- [ ] Testimonials Manager
- [ ] Partners / Logos Manager
- [ ] Newsroom / Press Release Manager
- [ ] Site Settings panel
- [ ] Admin User Management (super-admin)
- [ ] Audit Log viewer
- [ ] Real-time notification feed (Supabase Realtime)

### Phase 5 — Polish, Testing & Launch (Weeks 14–15)
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
│   │   ├── layout.tsx              # Admin layout with sidebar + topbar
│   │   ├── admin/
│   │   │   ├── page.tsx            # Dashboard home
│   │   │   ├── leads/
│   │   │   ├── blogs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   ├── applications/
│   │   │   ├── newsletter/
│   │   │   ├── media/
│   │   │   ├── pages/
│   │   │   ├── navigation/
│   │   │   ├── team/
│   │   │   ├── testimonials/
│   │   │   ├── partners/
│   │   │   ├── newsroom/
│   │   │   ├── settings/
│   │   │   └── users/
│   │
│   ├── api/
│   │   ├── og/                     # OG image generation
│   │   └── revalidate/             # ISR revalidation endpoint
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                         # Shadcn/UI base components
│   ├── layout/                     # Navbar, Footer, SectionWrapper
│   ├── marketing/                  # ServiceCard, IndustryCard, StatCounter
│   ├── forms/                      # ContactForm, ApplicationForm, NewsletterForm
│   ├── blog/                       # BlogCard, BlogContent
│   ├── careers/                    # JobCard, JobDetail
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── AdminTopbar.tsx
│       ├── DataTable.tsx
│       ├── KpiCard.tsx
│       ├── ActivityFeed.tsx
│       ├── TiptapEditor.tsx
│       ├── MediaPickerModal.tsx
│       ├── MediaLibraryGrid.tsx
│       ├── StatusBadge.tsx
│       ├── AuditLogTable.tsx
│       └── ConfirmDeleteModal.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── validations/
│   ├── utils.ts
│   └── constants.ts
│
├── types/
│   ├── database.ts
│   └── index.ts
│
├── hooks/
│   ├── use-leads.ts
│   ├── use-blog.ts
│   ├── use-jobs.ts
│   ├── use-media.ts
│   ├── use-admin-notifications.ts
│   └── use-audit-log.ts
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── supabase/
│   ├── migrations/
│   ├── functions/
│   │   ├── on-contact-submit/
│   │   ├── on-job-apply/
│   │   ├── on-newsletter-signup/
│   │   ├── on-admin-invite/
│   │   └── on-content-publish/
│   └── seed.sql
│
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local
```

---

## 15. Admin Panel — Full Specification

> ⭐ **New in v1.1.0**

### 15.1 Overview

The ASCIRVO Admin Panel is a fully protected internal web application embedded within the Next.js project under the `/admin` route group. It provides non-technical staff (content editors, marketing managers, HR teams) the ability to manage all dynamic site content without direct database or code access.

The panel is accessible only to authenticated users with a valid Supabase Auth session and a record in the `admin_profiles` table. Unauthorized access to any `/admin/*` route is intercepted by Next.js middleware and redirected to `/admin/login`.

---

### 15.2 Role & Permission Model

Three roles govern access. Permissions are enforced both at the middleware level (Next.js) and at the database level (Supabase RLS).

| Role | Description | Access |
|------|-------------|--------|
| `super_admin` | Full system access. Can manage users and global settings. | All modules |
| `admin` | Full content access. Cannot manage users or change system settings. | All content modules |
| `editor` | Content creation and editing only. Cannot delete records or export data. | Blog, Case Studies, Jobs, Pages |

**Permission Matrix:**

| Action | super_admin | admin | editor |
|--------|------------|-------|--------|
| View Dashboard | ✅ | ✅ | ✅ |
| Manage Leads | ✅ | ✅ | ❌ |
| Create/Edit Blog Posts | ✅ | ✅ | ✅ |
| Publish/Unpublish Content | ✅ | ✅ | ❌ |
| Delete Any Record | ✅ | ✅ | ❌ |
| Manage Jobs | ✅ | ✅ | ✅ |
| View Applications | ✅ | ✅ | ❌ |
| Download Resumes | ✅ | ✅ | ❌ |
| Manage Media Library | ✅ | ✅ | ✅ |
| Edit Static Pages | ✅ | ✅ | ✅ |
| Manage Navigation | ✅ | ✅ | ❌ |
| Export CSV | ✅ | ✅ | ❌ |
| Manage Team/Testimonials | ✅ | ✅ | ✅ |
| Site Settings | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| View Audit Log | ✅ | ✅ | ❌ |

---

### 15.3 Admin Authentication

**Login Page** (`/admin/login`):
- Email + password form (Supabase Auth `signInWithPassword`)
- "Sign in with Google" button (OAuth, restricted to allowed domain)
- "Forgot password" link triggers Supabase password reset email
- Branding: ASCIRVO logo + navy sidebar panel on desktop

**Session Management:**
- Auth token stored in HTTP-only Supabase session cookie
- Session refresh handled by `supabase/middleware.ts` on every request
- Idle timeout: 8 hours; auto-logout with notification toast

**Invite Flow (super_admin):**
- Super-admin sends invite from `/admin/users`
- Edge Function `on-admin-invite` triggers Supabase `inviteUserByEmail()`
- New user sets password via emailed link; role assigned post-registration

---

### 15.4 Admin Layout

**Persistent shell wrapping all `/admin/*` pages:**

```
┌─────────────────────────────────────────────────────────┐
│  TOPBAR: [ASCIRVO Admin] ····· [🔔 3] [👤 John Doe ▾]  │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  SIDEBAR     │   PAGE CONTENT AREA                      │
│              │                                          │
│  Dashboard   │   (each admin module renders here)       │
│  ── Content  │                                          │
│    Leads     │                                          │
│    Blog      │                                          │
│    Cases     │                                          │
│    Jobs      │                                          │
│    Pages     │                                          │
│  ── Media    │                                          │
│    Library   │                                          │
│  ── People   │                                          │
│    Team      │                                          │
│    Testim.   │                                          │
│    Partners  │                                          │
│  ── Settings │                                          │
│    Site      │                                          │
│    Users     │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**Sidebar:**
- Navy background (`#0A2463`) matching brand primary
- Collapsible on desktop (icon-only mode), slide-in drawer on mobile
- Active link highlighted with electric blue left border
- Section headers (Content, Media, People, Settings) as non-clickable group labels
- Bottom: avatar + user name + "Sign Out" button

**Topbar:**
- ASCIRVO wordmark + "Admin" badge
- Real-time notification bell with unread count (Supabase Realtime subscription)
- Dropdown notification panel (last 10 events: new lead, new application, etc.)
- User avatar menu: My Profile, Change Password, Sign Out

---

### 15.5 Dashboard Home (`/admin`)

**Purpose:** Single-glance overview of site activity and key metrics.

**KPI Cards Row (top):**
- Total Leads (all time) + new this week delta
- Open Job Positions (active listings)
- Blog Posts Published (total + drafted)
- Newsletter Subscribers (total + new this month)
- Job Applications (new, unreviewed)

**Charts Section:**
- **Leads Over Time** — line chart (last 30 days, daily)
- **Applications by Job** — horizontal bar chart (top 5 roles)
- **Top Blog Posts** — table: title, views (PostHog), published date

**Activity Feed:**
- Real-time Supabase Realtime feed of recent events
- Each event: icon, description, relative timestamp (e.g., "New lead from TechCorp — 2 min ago")
- Events: new contact lead, new job application, blog post published, new subscriber

**Quick Actions Row:**
- Button: "New Blog Post" → `/admin/blogs/new`
- Button: "Post a Job" → `/admin/jobs/new`
- Button: "Add Case Study" → `/admin/case-studies/new`
- Button: "View Leads" → `/admin/leads`

---

### 15.6 Leads Manager (`/admin/leads`)

**Purpose:** Manage inbound sales enquiries.

**Table Columns:** Name | Company | Email | Service Interest | Country | Status | Date | Actions

**Features:**
- Sort by any column; default: newest first
- Filter by Status (new, read, contacted, closed) and Date Range
- Global search across name, company, email
- Click row to open slide-over panel with full lead details + internal notes field
- Status update via inline dropdown (saved immediately to Supabase)
- **Bulk actions:** Mark as read, Mark as contacted, Delete (with confirm dialog)
- **Export to CSV** button (admin role+)
- Pagination: 25 per page

**Lead Detail Slide-Over:**
- All form fields displayed
- Internal Notes textarea (saved to `lead_notes` field in DB)
- Status history timeline
- "Send Email" shortcut opens default mail client with pre-filled `to:` address

---

### 15.7 Job Applications Inbox (`/admin/applications`)

**Purpose:** Review and manage incoming job applications.

**Table Columns:** Applicant | Email | Job Title | Status | Applied Date | Resume | Actions

**Features:**
- Filter by: Job, Status (received, reviewing, interview, offer, rejected), Date
- Click row → slide-over with full application details
- Status update via inline dropdown
- **Resume download** — generates Supabase Storage signed URL (60s expiry) and opens in new tab
- **Email applicant** shortcut
- Bulk status update

**Application Detail Slide-Over:**
- Applicant name, email, phone, LinkedIn link
- Job applied to (linked to job detail)
- Cover letter displayed (truncated with expand)
- Resume download button
- Status update with optional internal notes
- Application timeline

---

### 15.8 Newsletter Manager (`/admin/newsletter`)

**Purpose:** Manage subscriber list.

**Table Columns:** Email | Source | Status | Subscribed Date

**Features:**
- Filter by: Active/Inactive, Source, Date Range
- **Export CSV** of subscriber list
- Toggle subscriber active/inactive (soft unsubscribe)
- **Bulk delete** (with confirmation)
- Total subscriber count shown in page header

---

### 15.9 Media Library (`/admin/media`)

**Purpose:** Centralized file manager for all site media assets.

**Layout:** Masonry grid with thumbnail previews; toggle list view

**Features:**
- Upload files via drag-and-drop or file picker (supports: jpg, png, webp, gif, svg, pdf)
- Files stored in Supabase Storage `media-library` bucket
- Folders: `images/`, `documents/`, `logos/`, `team/`
- Right-click or three-dot menu: Copy URL, Rename, Move to folder, Delete
- Search by filename
- Filter by file type and upload date
- **Copy URL** to clipboard for pasting into CMS editors
- Bulk select + bulk delete
- File size display, upload date, dimensions (for images)
- Image preview modal on click

---

### 15.10 Navigation Manager (`/admin/navigation`)

**Purpose:** Edit site navigation without code changes.

**Sections:**
- **Primary Navbar Links** — reorder, add, remove top-level links
- **Services Mega Menu** — manage service sub-links with titles and descriptions
- **Industries Mega Menu** — manage industry sub-links
- **Footer Columns** — edit column headings and link lists
- **Social Links** — manage social media URLs (LinkedIn, Twitter, GitHub, etc.)

**Each link record:** Label, URL (relative or absolute), Open in new tab (toggle), Display order

**Changes saved to `navigation_config` table; Next.js reads this on request.**

---

### 15.11 Site Settings (`/admin/settings`)

**Purpose:** Global site configuration. Accessible to `super_admin` only.

**Sections:**

| Section | Fields |
|---------|--------|
| **Company Info** | Company name, tagline, address, phone, email |
| **SEO Defaults** | Default meta title suffix, default meta description, default OG image |
| **Social Links** | LinkedIn, Twitter/X, GitHub, YouTube URLs |
| **Contact Routing** | Sales team email, HR team email, Support email |
| **Analytics** | PostHog project key, Google Analytics ID |
| **Feature Flags** | Toggle: Newsletter signup visible, Careers section active, Chat widget enabled |
| **Maintenance Mode** | Toggle + custom maintenance message |

Settings stored in `site_settings` JSONB table; read server-side via Supabase on each request.

---

### 15.12 Admin User Management (`/admin/users`)

**Purpose:** Manage admin portal users. Super-admin only.

**Table Columns:** Name | Email | Role | Last Login | Status | Actions

**Features:**
- Invite new admin user (email + role assignment)
- Change user role via dropdown
- Deactivate / reactivate user account
- View last login timestamp
- Cannot delete own account or other super-admins

---

### 15.13 Audit Log (`/admin/settings/audit-log`)

**Purpose:** Traceability of all admin actions.

**Logged events:** create, update, delete, publish, unpublish, login, logout, export

**Table Columns:** Timestamp | Admin User | Action | Resource Type | Resource ID/Title | IP Address

**Features:**
- Filter by user, action type, date range
- Read-only (no delete)
- Export to CSV

**Database Table:**

```sql
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_profiles(id),
  action TEXT NOT NULL,         -- 'create', 'update', 'delete', 'publish', 'login'
  resource_type TEXT NOT NULL,  -- 'blog_post', 'job_listing', 'lead', etc.
  resource_id UUID,
  resource_title TEXT,
  metadata JSONB,               -- e.g. changed fields
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 16. Content Management System (CMS) — Full Specification

> ⭐ **New in v1.1.0**

### 16.1 Overview

The ASCIRVO CMS is the content layer of the Admin Panel, allowing editors to create and manage all published content on the site: blog posts, case studies, job listings, team profiles, testimonials, partner logos, press releases, and static page sections. The CMS is powered by **Tiptap** (rich text), **Supabase** (storage and database), and a custom **Media Picker** component.

---

### 16.2 Blog CMS (`/admin/blogs`)

#### List View
- Card or table toggle
- Columns: Cover Image | Title | Category | Author | Status | Published Date | Actions
- Filter: Status (all, published, draft), Category, Author, Date
- Search by title
- Bulk: publish, unpublish, delete
- "New Post" button → `/admin/blogs/new`

#### Editor (`/admin/blogs/new` and `/admin/blogs/[id]`)

**Layout: Two-panel (Editor left, Metadata right)**

**Left Panel — Rich Text Editor (Tiptap):**
- Toolbar: Headings (H2–H4), Bold, Italic, Underline, Strikethrough, Code, Code Block, Blockquote
- Lists: Bullet, Ordered, Task list
- Links: Insert/edit/remove with target options
- Images: Insert from Media Library or URL; inline resize handles
- Tables: Insert, add/remove rows and columns
- Divider (horizontal rule)
- Undo / Redo
- Word count display
- Fullscreen mode toggle

**Right Panel — Metadata Sidebar:**
- **Cover Image** — media picker modal thumbnail + "Change" button
- **Slug** — auto-generated from title; manually editable; live availability check
- **Excerpt** — textarea (160 chars max with counter)
- **Category** — dropdown (AI, Cloud, Security, Data, Digital Transformation, Industry News, Company News)
- **Tags** — multi-select creatable tag input
- **Author Name** — text input
- **Author Avatar** — media picker
- **Read Time** — auto-calculated from word count (display only)
- **Publish Status** — toggle (Draft / Published) with `published_at` datetime picker
- **SEO Preview** — Google SERP preview card (title, URL, description)

**Save behavior:**
- Auto-save draft every 60 seconds (debounced Supabase upsert)
- Manual "Save Draft" button
- "Publish" button — sets `is_published: true` + `published_at: now()` + triggers ISR revalidation

---

### 16.3 Case Study Manager (`/admin/case-studies`)

#### List View
- Columns: Cover | Title | Client | Industry | Service | Status | Updated | Actions
- Filter by Industry, Service, Status
- Search by title or client name

#### Editor (`/admin/case-studies/new` and `/admin/case-studies/[id]`)

**Fields:**
- **Title** — text input
- **Slug** — auto-generated; editable
- **Client Name** — text input
- **Client Logo** — media picker
- **Industry** — dropdown (Banking, Healthcare, Manufacturing, Retail, Energy, Government)
- **Service** — dropdown (AI/ML, Cloud, Cybersecurity, Data, Digital Transformation, Engineering, Consulting)
- **Region** — dropdown (Asia Pacific, North America, Europe, Middle East, Global)
- **Cover Image** — media picker
- **Challenge** — Tiptap rich text editor
- **Solution** — Tiptap rich text editor
- **Results** — dynamic repeater: add/remove stat blocks (`{ stat: "40%", label: "Cost reduction" }`)
- **Technologies Used** — tag input
- **Testimonial Quote** — textarea (optional)
- **Testimonial Author** — text input (optional)
- **Publish Status** — Draft / Published toggle

---

### 16.4 Job Manager (`/admin/jobs`)

#### List View
- Columns: Title | Department | Location | Type | Applications | Status | Posted | Closes | Actions
- Filter by Department, Employment Type, Experience Level, Active/Closed
- Application count badge per job (linked to Applications inbox filtered for that job)

#### Editor (`/admin/jobs/new` and `/admin/jobs/[id]`)

**Fields:**
- **Job Title** — text input
- **Slug** — auto-generated; editable
- **Department** — dropdown (Engineering, Data & AI, Cloud, Consulting, Sales, HR, Finance, Operations)
- **Location** — text input (+ Remote toggle)
- **Employment Type** — dropdown (Full-time, Part-time, Contract, Internship)
- **Experience Level** — dropdown (Entry, Mid, Senior, Lead, Director)
- **Job Description** — Tiptap rich text
- **Responsibilities** — ordered list input (add/remove items)
- **Must-Have Requirements** — list input
- **Nice-to-Have Requirements** — list input
- **Benefits** — list input
- **Application Close Date** — date picker (optional)
- **Status** — Active / Closed toggle

---

### 16.5 Pages Editor (`/admin/pages`)

**Purpose:** Edit copy and media for static marketing page sections without code changes.

**Editable Pages & Sections:**

| Page | Editable Sections |
|------|------------------|
| Home | Hero headline, hero subtext, CTA labels, stats (number + label), Why ASCIRVO pillars |
| About | Company story text, vision statement, mission statement, values list |
| Services (each) | Overview paragraph, capabilities list, process steps |
| Industries (each) | Intro paragraph, challenges list, solutions list |
| Careers Landing | Culture intro, "Life at ASCIRVO" highlights |
| Contact | Office addresses, phone numbers, support emails |
| Partners | Intro paragraph |

**Editor UI:**
- Sidebar list of pages and sections
- Click section → inline edit panel with appropriate field types (text, rich text, image, repeater)
- "Save Changes" saves to `page_content` table
- Frontend fetches from this table at build/request time for editable sections

**Database Table:**

```sql
CREATE TABLE page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL,       -- e.g. 'home', 'about', 'services/ai-ml'
  section_key TEXT NOT NULL,    -- e.g. 'hero', 'why_us', 'stats'
  content JSONB NOT NULL,       -- flexible content object for that section
  updated_by UUID REFERENCES admin_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_key, section_key)
);
```

---

### 16.6 Team Members Manager (`/admin/team`)

**Purpose:** Manage leadership and team profiles displayed on `/about/leadership`.

**Table Columns:** Photo | Name | Title | Department | Display Order | Featured | Actions

**Fields per record:**
- Full Name
- Job Title
- Department
- Bio (Tiptap short editor)
- Photo (media picker)
- LinkedIn URL
- Display Order (drag-and-drop reorder)
- Featured (boolean — shown on About page hero)

**Database Table:**

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 16.7 Testimonials Manager (`/admin/testimonials`)

**Purpose:** Manage client testimonials displayed in the `TestimonialSlider` component.

**Fields per record:**
- Quote text (textarea)
- Client Name
- Client Title / Company
- Client Photo (media picker, optional)
- Company Logo (media picker, optional)
- Display Order
- Active toggle

**Database Table:**

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_title TEXT,
  company TEXT,
  photo_url TEXT,
  logo_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 16.8 Partners Manager (`/admin/partners`)

**Purpose:** Manage partner and client logos shown in the Marquee strip and Partners page.

**Fields per record:**
- Company Name
- Logo Image (media picker)
- Website URL (optional)
- Category (Technology Partner, Client, Alliance Partner)
- Display Order
- Active toggle (controls visibility in marquee)

**Database Table:**

```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  category TEXT DEFAULT 'Technology Partner',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 16.9 Newsroom Manager (`/admin/newsroom`)

**Purpose:** Publish press releases and media coverage to the `/newsroom` page.

**Fields per record:**
- Headline
- Slug
- Type: Press Release | Media Coverage | Award | Announcement
- Source / Publication (for media coverage)
- Source URL (external link for media coverage)
- Summary (textarea)
- Full Content (Tiptap, for press releases)
- Cover Image (media picker, optional)
- Publish Date
- Published toggle

**Database Table:**

```sql
CREATE TABLE newsroom_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('press_release', 'media_coverage', 'award', 'announcement')),
  source TEXT,
  source_url TEXT,
  summary TEXT,
  content JSONB,
  cover_image_url TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 16.10 CMS Content Workflow

All content types follow a defined editorial lifecycle:

```
Draft → Review → Published → Archived
         ↑__________↓
         (unpublish back to draft)
```

**Status Definitions:**
- **Draft** — created/edited, not visible on public site
- **Review** — editor flags for admin review (optional workflow step)
- **Published** — visible on public site; triggers ISR revalidation
- **Archived** — hidden from site; preserved in DB for reference

**ISR Revalidation on Publish:**
When a content item is published or unpublished, the admin calls a Next.js API route `/api/revalidate` with the `path` and a secret token. Next.js calls `revalidatePath()` to purge the ISR cache for that specific page.

```typescript
// /app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { path, secret } = await request.json();
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

---

### 16.11 Media Library Integration

The CMS editor and all form fields that accept images use a shared **MediaPickerModal** component:

- Clicking any image field opens a full-screen modal
- Modal shows the Media Library grid (same as `/admin/media`)
- User can browse, search, and select an existing asset OR upload a new one inline
- On selection, the media URL is returned to the calling field
- No external image URLs required — all media managed through Supabase Storage

---

### 16.12 Extended Supabase Schema Summary (New Tables — v1.1.0)

```sql
-- Static page content
CREATE TABLE page_content ( ... );              -- Section 16.5

-- Team members
CREATE TABLE team_members ( ... );              -- Section 16.6

-- Testimonials
CREATE TABLE testimonials ( ... );              -- Section 16.7

-- Partners / client logos
CREATE TABLE partners ( ... );                  -- Section 16.8

-- Newsroom posts
CREATE TABLE newsroom_posts ( ... );            -- Section 16.9

-- Admin audit log
CREATE TABLE admin_audit_log ( ... );           -- Section 15.13

-- Site settings
CREATE TABLE site_settings (
  id INT PRIMARY KEY DEFAULT 1,                 -- Single-row table
  config JSONB NOT NULL,
  updated_by UUID REFERENCES admin_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation config
CREATE TABLE navigation_config (
  id INT PRIMARY KEY DEFAULT 1,
  config JSONB NOT NULL,
  updated_by UUID REFERENCES admin_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS on all new tables:** authenticated users with `admin` or `super_admin` role can read/write. `editor` role restricted to content tables only (no settings, no navigation, no audit log, no user management).

---

*End of PRD — ASCIRVO v1.1.0*  
*This document is the single source of truth for the ASCIRVO website build. All design decisions, technical choices, and feature scope referenced here should be aligned with the development team before implementation begins.*

*Sections 15 and 16 (Admin Panel & CMS) were added in v1.1.0 (May 2026). All earlier sections remain unchanged from v1.0.0 except for minor references updated to reflect the expanded admin module scope.*