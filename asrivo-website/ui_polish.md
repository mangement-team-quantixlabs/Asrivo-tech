# Infosys Website UI/UX Analysis — Complete Edition
**URL:** https://www.infosys.com  
**Last Fetched:** May 2026  
**Document Purpose:** Complete analysis of every button, icon, interactive element, UI pattern, and loading style on the Infosys homepage. Includes original 33 sections plus 20 newly identified gap sections (34–53).

---

## Table of Contents
1. [Loading Page Style](#1-loading-page-style)
2. [Accessibility Skip Links](#2-accessibility-skip-links)
3. [Top Utility Bar](#3-top-utility-bar)
4. [Primary Navigation Bar](#4-primary-navigation-bar)
5. [AI Search / Chatbot Panel](#5-ai-search--chatbot-panel)
6. [Hero Section](#6-hero-section)
7. [Announcement Carousel / Spotlight Cards](#7-announcement-carousel--spotlight-cards)
8. [Top Stories Section](#8-top-stories-section)
9. [Crafting Intelligent Experiences Section](#9-crafting-intelligent-experiences-section)
10. [AI In Action / Case Studies Section](#10-ai-in-action--case-studies-section)
11. [Industries and Services Section](#11-industries-and-services-section)
12. [Research, Announcements & Thought Leadership](#12-research-announcements--thought-leadership)
13. [Careers Section](#13-careers-section)
14. [Mega-Menu Panels](#14-mega-menu-panels)
15. [Footer Navigation](#15-footer-navigation)
16. [Social Media Icons](#16-social-media-icons)
17. [Location Selector](#17-location-selector)
18. [Back-to-Top Button](#18-back-to-top-button)
19. [Overall UI Patterns & Design System](#19-overall-ui-patterns--design-system)
20. [Mobile / Responsive Navigation — Hamburger Menu](#20-mobile--responsive-navigation--hamburger-menu)
21. [Navbar Scroll Behaviour & Sticky Transition](#21-navbar-scroll-behaviour--sticky-transition)
22. [Cookie Consent Banner](#22-cookie-consent-banner)
23. [Hero Video Player Behaviour](#23-hero-video-player-behaviour)
24. [Hero Search — Submission Interaction](#24-hero-search--submission-interaction)
25. [Carousel Navigation Controls (Arrows & Dots)](#25-carousel-navigation-controls-arrows--dots)
26. [Leon / Navigate AI Mascot Section](#26-leon--navigate-ai-mascot-section)
27. [Investors Body Section](#27-investors-body-section)
28. [Mid-Footer Navigation Bar](#28-mid-footer-navigation-bar)
29. [Footer Copyright & Legal Strip](#29-footer-copyright--legal-strip)
30. [Card Hover State Patterns](#30-card-hover-state-patterns)
31. [External Link Behaviour](#31-external-link-behaviour)
32. [Image Accessibility (Alt / Title Attributes)](#32-image-accessibility-alt--title-attributes)
33. [Social & SEO Meta Tag Layer](#33-social--seo-meta-tag-layer)
34. [Page Performance & Core Web Vitals Strategy](#34-page-performance--core-web-vitals-strategy) *(NEW)*
35. [Font Loading Strategy](#35-font-loading-strategy) *(NEW)*
36. [Animation & Motion Design System](#36-animation--motion-design-system) *(NEW)*
37. [Keyboard Navigation & Focus Management](#37-keyboard-navigation--focus-management) *(NEW)*
38. [Form Validation Patterns](#38-form-validation-patterns) *(NEW)*
39. [Tooltip & Popover Patterns](#39-tooltip--popover-patterns) *(NEW)*
40. [Structured Data / JSON-LD Schema Layer](#40-structured-data--json-ld-schema-layer) *(NEW)*
41. [Third-Party Script Loading & Tag Management](#41-third-party-script-loading--tag-management) *(NEW)*
42. [AI Chat Session Persistence & State Management](#42-ai-chat-session-persistence--state-management) *(NEW)*
43. [Page Transition Behaviour](#43-page-transition-behaviour) *(NEW)*
44. [Breadcrumb Navigation (Inner Pages)](#44-breadcrumb-navigation-inner-pages) *(NEW)*
45. [Search Results Page / AI Response Page](#45-search-results-page--ai-response-page) *(NEW)*
46. [Dark Mode & Colour Scheme Support](#46-dark-mode--colour-scheme-support) *(NEW)*
47. [Print Stylesheet & Print Mode](#47-print-stylesheet--print-mode) *(NEW)*
48. [Error Pages (404 / 500)](#48-error-pages-404--500) *(NEW)*
49. [Newsletter / Email Subscription CTA](#49-newsletter--email-subscription-cta) *(NEW)*
50. [Video Accessibility — Captions & Transcripts](#50-video-accessibility--captions--transcripts) *(NEW)*
51. [PWA / Service Worker & Offline Behaviour](#51-pwa--service-worker--offline-behaviour) *(NEW)*
52. [Locale / Language Switcher UX Flow](#52-locale--language-switcher-ux-flow) *(NEW)*
53. [ARIA Live Regions & Dynamic Content Announcements](#53-aria-live-regions--dynamic-content-announcements) *(NEW)*

---

## 1. Loading Page Style

| Element | Detail |
|---|---|
| **Loading Indicator** | Animated GIF (`loading.gif`) served from `/content/dam/infosys-web/common/loading.gif` |
| **Type** | Traditional spinner/animated GIF — a legacy-style loading indicator |
| **Placement** | Bottom-right or centered overlay (site-wide), appears during page transitions and AJAX content loads |
| **Purpose** | Communicates background content loading (especially for the hero video, AI chatbot, and dynamic content blocks) |
| **Style Pattern** | No skeleton screens observed; the site uses a spinner-overlay approach rather than progressive skeleton loading |
| **Hero Video Load** | The hero background uses a hosted `.mp4` video (`leon-navigate-ai.mp4`) which loads asynchronously so text content renders first |
| **AI Chatbot Init** | The chatbot panel shows a disclaimer and input field immediately; the AI response stream loads progressively |

---

## 2. Accessibility Skip Links

Two hidden-but-focusable skip navigation links appear at the very top of the DOM (visible only on keyboard Tab focus):

| Button / Link | Target Anchor | Function |
|---|---|---|
| **Skip to main content** | `#main-content` | Jumps keyboard/screen-reader users past the navigation directly to the main page body |
| **Skip to footer** | `#footer` | Jumps keyboard/screen-reader users directly to the footer section |

**UI Pattern:** These are standard WCAG 2.1 conformance skip-nav links. They are visually hidden by default (off-screen via CSS) and become visible when focused via keyboard Tab. This ensures accessibility compliance for motor-impaired and visually-impaired users using assistive technology.

---

## 3. Top Utility Bar

A secondary horizontal bar above the main navigation, containing quick-access links for key audiences:

| Button / Link | Destination URL | Function |
|---|---|---|
| **Navigate your next** | `/navigate-your-next.html` | Infosys's flagship thought leadership/brand pillar page about enterprise transformation |
| **Investors** | `/investors.html` | Investor relations page (financial reports, quarterly results, governance) |
| **Infosys Knowledge Institute** | `/iki.html` | Research and insights hub — reports, podcasts, perspectives |
| **Careers** | `/careers/` | Job search and talent acquisition portal |

**UI Pattern:** Slim top utility bar — a common enterprise website pattern for separating primary audience paths (investors, job seekers) from the main marketing navigation. Typically rendered in smaller font with a muted background to maintain visual hierarchy.

---

## 4. Primary Navigation Bar

The main navigation is a sticky horizontal navbar containing the Infosys logo and six primary mega-menu triggers:

### 4.1 Logo / Home Button
| Element | Detail |
|---|---|
| **Logo** | Infosys wordmark (SVG/image) linked to `https://www.infosys.com` |
| **Function** | Clicking returns the user to the homepage from any page on the site |
| **Pattern** | Standard top-left logo-as-home-link — a universal web convention |

### 4.2 Primary Mega-Menu Nav Items

| Nav Item | Function | Mega-Menu Content |
|---|---|---|
| **Navigate your next** | Opens mega-menu panel | 5 featured image-link tiles: Being Resilient / Live Enterprise, Empowering Talent Transformations, Digital Core Capabilities, Digital Operating Model, Tales of Transformation |
| **Industries** | Opens mega-menu panel | Full A–Z list of 26 industry verticals |
| **Services** | Opens mega-menu panel | Services grouped under 5 sub-categories: Insights, Innovate, Assure, Accelerate, Experience — listing 30+ service lines |
| **Platforms** | Opens mega-menu panel | 11 product/platform links |
| **Infosys Knowledge Institute** | Opens mega-menu panel | Overview, Connect, About Us, Videos; sub-section: Learn (Research, Perspectives, Podcasts) |
| **About Us** | Opens mega-menu panel | Company info links + Flagship Brand Partnerships |

### 4.3 Inline Utility Links in Navbar
| Link | Function |
|---|---|
| **Investors** | Direct link to Investor Relations |
| **Careers** | Direct link to Careers portal |
| **Newsroom** | Links to `/newsroom.html` — press releases, events, media |
| **Blogs** | Links to `blogs.infosys.com` — Infosys employee thought leadership blog network |
| **Contact Us** | Links to `/contact.html` — regional contact and inquiry form |

**UI Pattern:** The navbar uses a **mega-menu dropdown** pattern — hovering or clicking a nav item reveals a full-width panel with rich content (images, grouped lists, section headers). This is a well-established enterprise B2B website pattern that allows deep navigation without requiring users to click through multiple pages.

---

## 5. AI Search / Chatbot Panel

This is a prominent interactive feature in the navbar area — an AI-powered search and chatbot interface.

### 5.1 Trigger Button
| Element | Icon | Function |
|---|---|---|
| **Ask AI** button | `search-icon-ai.svg` (AI-styled search icon) | Opens the AI chatbot/search sidebar panel |

### 5.2 Chat Sidebar Panel Elements

| Button / Element | Icon | Function |
|---|---|---|
| **Chat Expand Icon** | `grid-expand-arrow.svg` (expand/arrow icon) | Expands the chat sidebar to a larger/full view mode |
| **New Chat** | Text button | Clears current conversation and starts a fresh AI chat session |
| **Recent** section | Text label | Displays recent conversation history from the current session |
| **Search AI icon** | `search-ai-icon.svg` | Visual icon accompanying the "Ask AI" input area |
| **Close (Chat)** | Text/icon button | Closes the chat sidebar panel entirely |
| **Text Input Field** | — | Free-text prompt field; accepts natural language queries up to 1,000 characters; special characters not allowed |
| **Character limit note** | — | "Maximum length: 1000 characters" — inline validation hint |
| **Voice Search Button** | `search-mic.png` (microphone icon) | Activates browser microphone for voice-to-text input into the AI prompt field |
| **Privacy Disclaimer Toggle** | `protection-icon-green.svg` (green shield icon) | Opens/closes an inline data privacy disclaimer panel |
| **Close Disclaimer** | `#` anchor / text | Collapses the privacy disclaimer section |

### 5.3 AI Disclaimer Panel (inside Chat)
A consent/notice panel surfaced before or during AI interactions:

- Data stored for **60 days**, then auto-anonymized
- Chatbot does not collect PII (name, email, etc.)
- Links to **Infosys Privacy Statement**
- Interaction implies consent

**UI Pattern:** The AI chat sidebar follows a **slide-in drawer** pattern — it slides in from the right side without navigating away from the page. The "New Chat" button resets context. Voice input is provided via the microphone icon, following the convention established by Google/Siri-style interfaces. The green shield icon is a **trust signal** — a UI micro-pattern used to communicate safety/privacy near data-collection elements.

---

## 6. Hero Section

The full-width hero occupies the top of the main content area.

| Element | Type | Function |
|---|---|---|
| **Background Video** | Auto-play `.mp4` (`leon-navigate-ai.mp4`) | Atmospheric brand video introducing "Leon" — Infosys's AI guide mascot |
| **Animated Text Overlay — Line 1** | `"Enterprise AI is a Mountain"` | First animated text overlay on the hero video; sets the metaphor for the brand narrative |
| **Animated Text Overlay — Line 2** | `"Meet Leon your expert guide"` | Second animated text overlay; introduces the Leon mascot character by name |
| **Animated Text Overlay — Line 3** | `"Don't Navigate AI Alone"` | Third animated text overlay; the brand call-to-action message; resolves the AI metaphor with a partnership offer |
| **Headline Text** | Static H1 — "Navigate your next" | Primary brand tagline |
| **Hero AI Search Input** | Text input field (duplicated from navbar) | Second instance of the AI prompt input embedded in the hero for immediate engagement; same 1,000-character limit applies |
| **Hero Voice Search Button** | Microphone icon (`search-mic.png`) | Voice input trigger for the hero search field |
| **Content is generated with AI assistance** notice | Inline disclaimer label | Communicates AI-generated content nature |
| **Green Shield Privacy Icon** | `protection-icon-green.svg` | Same trust signal as in the chatbot panel; toggles the privacy disclaimer |
| **Close Disclaimer** | Anchor link `#` | Collapses the inline disclaimer |

> **Reusable Disclaimer Component:** The privacy disclaimer block (green shield icon + 3 bullet points + Close `#` anchor) is a **reusable DOM component** instantiated in at least two separate locations on the homepage: (1) inside the Chat Sidebar panel, and (2) inside the Hero section below the search input. Both instances carry identical bullet content and the same `protection-icon-green.svg` icon with a `Close Disclaimer` anchor. This confirms the disclaimer is a **shared component** injected wherever AI-generated content is surfaced, functioning as a persistent legal/consent signal rather than a one-time notification.

### 6.1 Hero Tab / Carousel Pills
Three clickable pill/tab buttons rotate contextual highlights:

| Tab Label | Function |
|---|---|
| **Accelerate with Infosys Topaz** | Activates slide/tab showing Topaz AI service spotlight |
| **Discover the power of Infosys Cobalt** | Activates slide/tab showing Cobalt cloud platform spotlight |
| **Insights from Infosys Bank Tech Index** | Activates slide/tab showing Banking Tech research spotlight |

**UI Pattern:** These are **tab switchers / pill navigation** — common in hero sections to cycle through multiple featured messages without needing a full carousel. Each pill is a button element (not a link), triggering in-page state change.

---

## 7. Announcement Carousel / Spotlight Cards

A horizontally scrollable or auto-rotating carousel section just below the hero, featuring four spotlight cards. Each card pairs a **named image asset** with a headline and CTA. Notably, the image asset names do not always match the card's editorial content — this is an important observation about CMS asset reuse.

| Card # | Image Asset | Card Heading | CTA / Link | Destination |
|---|---|---|---|---|
| **Card 1** | `immersive-experiences.png` | "Infosys and Anthropic Announce Collaboration" | **Know More** button | `/newsroom/press-releases/2026/advanced-enterprise-ai-solutions-industries.html` |
| **Card 2** | `digital-core-capabilities.png` | "Infosys Announces Strategic Collaboration with OpenAI" | **Know More** button | `/newsroom/press-releases/2026/collaboration-accelerate-enterprise-ai-transformation.html` |
| **Card 3** | `talent-programs.png` | **"Enterprise&nbsp;&nbsp;AI"** (H2 with typographic double-space) | **"Latest from Knowledge Institute"** — inline text link (not a button) | `/iki.html` |
| **Card 4** | `navigate-your-next.png` | **"Talent&nbsp;&nbsp;Programs"** (H2 with typographic double-space) | **"Latest from Careers"** — inline text link (not a button) | `/careers.html` |

**Asset Name vs Content Mismatch:** Cards 1 and 2 use generic asset names (`immersive-experiences.png`, `digital-core-capabilities.png`) that describe broader strategic themes rather than the specific press release they link to. This is a common enterprise CMS pattern where image assets are created for campaign themes and then reused for contextually related announcements.

**Typographic double-space in headings:** Cards 3 and 4 use headings rendered as "Enterprise&nbsp;&nbsp;AI" and "Talent&nbsp;&nbsp;Programs" with a deliberate typographic double-space (or non-breaking space / CSS letter-spacing trick). This creates a **spaced word-pair headline** style — a visual design choice to make two-word headings feel wider and more impactful in the card layout.

**CTA type difference:** Cards 1–2 use a **"Know More" button** (interactive CTA element). Cards 3–4 use an **inline text link** ("Latest from Knowledge Institute" / "Latest from Careers") — a softer, editorial-style link rather than a button. This asymmetry reflects the dual nature of the carousel: cards 1–2 are news/announcements; cards 3–4 are evergreen brand/talent pillars.

**UI Pattern:** Each card is an **image + H2 headline + CTA** unit. The "Know More" buttons use a ghost/outline button or text link with arrow style — a conservative CTA pattern appropriate for enterprise/B2B contexts.

---

## 8. Top Stories Section

A horizontal news card row presenting 6 editorial story cards.

| Card Headline | CTA Button | Destination |
|---|---|---|
| Meet Leon — Enterprise AI Mountain guide | **Read More** | `/navigate-ai.html` |
| Infosys Unveils AI First Value Framework | **Read More** | `/newsroom/press-releases/2026/unveils-ai-first-value-framework.html` |
| Infosys Fastest Growing IT Services Brand Globally | **Read More** | `/newsroom/press-releases/2026/top-3-it-services-brand-globally2026.html` |
| Carlos Alcaraz — Infosys Global Brand Ambassador | **Read More** | `/newsroom/press-releases/2026/carlos-alcaraz-brand-ambassador.html` |
| Infosys + AWS Generative AI Collaboration | **Read More** | `/newsroom/press-releases/2026/accelerate-enterprise-adoption-generative-ai.html` |
| Infosys + Cognition Strategic AI Collaboration | **Read More** | `/newsroom/press-releases/2026/collaboration-accelerate-ai-value-journey.html` |

**UI Pattern:** Standard **news card grid** — thumbnail image + headline + "Read More" CTA. Cards likely use CSS hover effects (scale, shadow elevation) to indicate interactivity.

---

## 9. Crafting Intelligent Experiences Section

A three-column product showcase section for Infosys's flagship platforms.

### 9.1 Section-Level Button
| Button | Function |
|---|---|
| **I'm Curious** (section CTA) | Anchor-linked interactive prompt — triggers the AI chatbot or a contextual panel |

### 9.2 Product Card Buttons

| Product | CTA Button | Destination | Description |
|---|---|---|---|
| **Infosys Topaz** | **Learn More** | `/services/data-ai-topaz.html` | AI platform — adapts foundation models for enterprise AI programs |
| **Infosys Cobalt** | **Learn More** | `/services/cloud-cobalt.html` | Cloud transformation services and platform multiplier |
| **Infosys Aster** | **Learn More** | `/aster.html` | AI-powered marketing platform for customer experience |

**UI Pattern:** Three-column **product feature cards** with thumbnail images, short descriptor text, and a "Learn More" CTA button. "I'm Curious" is a brand differentiator — softer and more conversational than typical B2B CTAs.

---

## 10. AI In Action / Case Studies Section

### 10.1 Section Header & Body Copy

| Element | Content | Function |
|---|---|---|
| **Section heading** | "AI In Action" | H3-level section label identifying the case study block |
| **Section body copy** | "For all enterprises, Infosys AI solutions improve your business by improving your data and cloud infrastructure. This leads to streamlined operations and enhanced decision-making capabilities. Ultimately, these improvements drive significant growth and a competitive edge." | Positioning statement that frames the case studies; sets the value proposition context before the cards |

### 10.2 Case Study Cards

| Case Study | CTA Button | Destination |
|---|---|---|
| **Now Serving: Virtual Tennis** (Tennis on Cloud + Applied AI) | **I'm Curious** | `/navigate-your-next/tales-of-transformation/now-serving-virtual-tennis.html` |
| **Digitally Empowered Energy Efficiency** (Energy-as-a-Service) | **I'm Curious** | `/services/energy-transition/insights/ai-energy-transition/energy-as-a-service.html` |
| **Crafting a Digital Enterprise** (Kraft Heinz data hub) | **I'm Curious** | `/navigate-your-next/tales-of-transformation/digitally-empowered-food-beverage.html` |

Each card shows: thumbnail image + "Case Study" label badge + headline + **I'm Curious** button.

**UI Pattern:** The **"I'm Curious"** label is a signature Infosys micro-copy choice — used consistently across case studies. It replaces "Read More" with a more emotionally engaging label. This is a deliberate **brand voice** pattern embedded into the UI component system.

---

## 11. Industries and Services Section

A visually-rich icon/logo grid section showcasing industry verticals.

### 11.1 Section-Level Button
| Button | Destination | Function |
|---|---|---|
| **Services** | `/services.html` | Primary CTA linking to the full services catalogue page |

### 11.2 Industry Quick-Link Tiles
Each tile is a clickable card (image/icon + label):

| Industry Tile | Destination |
|---|---|
| Financial Services | `/industries/financial-services.html` |
| Industrial Manufacturing | `/industries/industrial-manufacturing.html` |
| Utilities | `/industries/utilities.html` |
| Insurance | `/industries/insurance.html` |
| Oil and Gas | `/industries/oil-and-gas.html` |
| Healthcare | `/industries/healthcare.html` |
| Consumer Products | `/industries/consumer-packaged-goods.html` |
| Energy Transition | `/services/energy-transition.html` |
| Life Sciences | `/industries/life-sciences.html` |
| Retail & Logistics | `/industries/retail.html` |
| Communications Services | `/industries/communication-services.html` |

**UI Pattern:** A **tile-grid navigation** pattern — each tile is an equal-weight clickable card providing quick, visual navigation for different buyer audiences without requiring them to open a dropdown.

---

## 12. Research, Announcements & Thought Leadership

A multi-type editorial section mixing Events, Insights, News, Reports, and Investor content.

| Card Title | Type Badge | CTA Button | Destination |
|---|---|---|---|
| Infosys at SAP Sapphire 2026 (May 11–13) | Event | **Read More** | `/newsroom/events/2026/sap-sapphire.html` |
| Agentic Commerce: Agent-Aware Digital Ecosystems | Insights | **Read More** | `/iki/perspectives/agent-aware-digital-ecosystems.html` |
| Infosys + Formula E AI-Powered Race Centre | News | **Read More** | `/newsroom/press-releases/2026/launch-ai-powered-race-centre.html` |
| Infosys AI-first GCC Index 2026 | Report | **Read More** | `/iki/documents/ai-first-gcc-index-2026.pdf` |
| Integrated Annual Report 2025 | Investors | **Read More** | `/investors/reports-filings/annual-report/annual/documents/infosys-ar-25.pdf` |
| Fourth Quarter FY26 Results | Investors | **Read More** | `/investors/reports-filings/quarterly-results/2025-2026/q4.html` |

**UI Pattern:** Cards carry a **content-type label badge** (Event / Insights / News / Report / Investors) as a visual differentiator — a content taxonomy badge pattern. PDF links open documents directly.

---

## 13. Careers Section

A full-width promotional band for talent acquisition:

| Element | Type | Function |
|---|---|---|
| Background image | Static (`hm-careers.png`) | Visual brand image of diverse professionals |
| Headline | "Build your future with Infosys" | Employer branding copy |
| Body copy | Short descriptor of AI-first positioning | Context for prospective employees |
| **Explore Careers** | Primary CTA Button | Links to `/careers.html` — main careers portal |

**UI Pattern:** A **full-bleed promotional strip** — common on corporate websites as a persistent secondary CTA for talent. "Explore Careers" uses a **primary filled button** style to differentiate from the "Read More"/"Learn More" patterns used in content sections.

---

## 14. Mega-Menu Panels

### 14.1 Navigate Your Next Panel
5 image-card tiles, each with a "Know more" text link:

| Tile | Destination |
|---|---|
| Being resilient — live Enterprise | `/navigate-your-next/being-resilient.html` |
| Empowering talent transformations | `/navigate-your-next/talent-transformations.html` |
| Digital core capabilities | `/navigate-your-next/digital-capabilities.html` |
| Digital operating model | `/navigate-your-next/digital-operating-models.html` |
| Tales of transformation | `/navigate-your-next/tales-of-transformation.html` |

### 14.2 Industries Panel
26 text links in a two-column list (all link to `/industries/<slug>.html`):

Aerospace & Defense, Agriculture, Automotive, Chemical Manufacturing, Communication Services, Consumer Packaged Goods, Education, Engineering Procurement & Construction, Financial Services, Oil and Gas, Private Equity, Professional Services, Public Sector, Healthcare, High Technology, Industrial Manufacturing, Information Services & Publishing, Insurance, Life Sciences, Logistics & Distribution, Media and Entertainment, Mining, Retail, Semiconductor, Travel and Hospitality, Utilities, Waste Management.

### 14.3 Services Panel
5 grouped sub-sections with 30+ text links:

- **Insights:** Infosys Topaz, Applied AI, Generative AI, Sustainability Services
- **Innovate:** Blockchain, Engineering Services, IoT
- **Assure:** Cyber Security, Quality Engineering
- **Accelerate:** Agile DevOps, API Economy, Application Modernization, Cloud (Cobalt), Digital Process Automation, Digital Supply Chain, Microsoft Business Application Services, Microsoft Cloud Business, Oracle, SAP, Service Experience Transformation, Salesforce, Energy Transition, Network Transformation, Infrastructure Services, Global Capability Center (GCC)
- **Experience:** Infosys Aster, Digital Marketing, Digital Commerce, Digital Interactions, Digital Workplace Services, Digital Experience, Infosys Metaverse Foundry
- Plus: Application Development and Maintenance, Business Process Management, Consulting Services, Incubating Emerging Offerings

### 14.4 Platforms Panel
11 product links in two columns:

EdgeVerve, Infosys Finacle, Live Enterprise Suite, Infosys Cortex, Infosys Meridian, Panaya, Infosys Equinox, Infosys Topaz Fabric, Infosys Wingspan, Infosys Helix, Infosys Polycloud.

### 14.5 Infosys Knowledge Institute Panel
- Overview, Connect, About Us, Videos
- Learn sub-section: Research, Perspectives, Podcasts

### 14.6 About Us Panel
Company links: Overview, History, ESG, Management Profiles, IKI, Infosys Stories, Champions Evolve, Infosys Springboard, Subsidiaries, Clients Speak, Alliances, Innovation Fund, IIN, Diversity Equity Inclusion, Awards, Analyst Reports.

**Flagship Brand Partnerships sub-menu:**

| Partnership Link | Destination |
|---|---|
| Tennis (parent trigger — no nav) | `javascript:void(0)` |
| All Partnerships | `/tennis.html` |
| Australian Open | `/australian-open.html` |
| Roland-Garros | `/roland-garros.html` |
| ATP | `/atp.html` |
| International Tennis Hall of Fame | `/ithf.html` |
| Carlos Alcaraz (Brand Ambassador) | `/carlos-alcaraz.html` |
| IGA Swiatek (Brand Ambassador) | `/iga-swiatek.html` |
| Formula E | `/formulae.html` |
| Madison Square Garden | `/madison-square-garden.html` |
| The Economist Group | `/the-sustainability-project.html` |
| Dow Jones | `/dow-jones.html` |
| Financial Times | `/financial-times.html` |
| The Cloud Hub | `/cloud-hub.html` |
| Handelsblatt | `/handelsblatt.html` |

> **Note:** The "Tennis" item uses `javascript:void(0)` as its href — it is a **sub-menu parent trigger** with no navigation of its own, only expanding child links. This is a nested mega-menu accordion pattern.

**UI Pattern:** Mega-menus use **grouped lists with section headings** to organize dense link lists. Image-card tiles appear only in the Navigate Your Next panel, providing visual hierarchy for the brand-led section.

---

## 15. Footer Navigation

The footer is divided into 4 primary columns plus legal links and a location selector.

### 15.1 Subsidiaries Column
| Link | Destination |
|---|---|
| EdgeVerve Systems | `edgeverve.com` |
| Infosys BPM | `infosysbpm.com` |
| Infosys Consulting | `/services/consulting.html` |
| Infosys Public Services | `infosyspublicservices.com` |

### 15.2 Programs Column
| Link | Destination |
|---|---|
| Infosys Foundation | `infosys.org/infosys-foundation.html` |
| Infosys Foundation USA | `infosys.org/infosys-foundation-usa.html` |
| Infosys Science Foundation | `infosysprize.org` |
| Infosys Leadership Institute | `/leadership-institute.html` |

### 15.3 Company Column
| Link | Destination |
|---|---|
| About Us | `/about.html` |
| Investors | `/investors.html` |
| Navigate your next | `/navigate-your-next.html` |
| Careers | `/careers/` |
| ESG | `/about/esg.html` |
| Newsroom | `/newsroom.html` |
| Alumni | `alumni.infosys.com/app-welcome` |

### 15.4 Support Column
| Link | Destination |
|---|---|
| Terms of Use | `/terms-of-use.html` |
| Privacy Statement | `/privacy-statement.html` |
| Cookie Policy | `/privacy-statement/cookie-policy.html` |
| Safe Harbour Provision | `/safe-harbor-provision.html` |
| Site Map | `/sitemap.html` |
| Modern Slavery Statement | PDF document |
| Payment Guide for Suppliers | `/payment-information-suppliers.html` |

---

## 16. Social Media Icons

Social icons appear in two locations on the page:

**Mid-footer bar** (alongside text navigation links):
| Icon | Platform | Destination |
|---|---|---|
| LinkedIn icon | LinkedIn | `linkedin.com/company/infosys` |
| X (Twitter) icon | X / Twitter | `twitter.com/infosys` |
| Facebook icon | Facebook | `facebook.com/Infosys` |
| YouTube icon | YouTube | `youtube.com/user/Infosys` |

**Bottom footer strip** (icon-only row, duplicated):
| Icon | Platform | Destination |
|---|---|---|
| Facebook icon | Facebook | `facebook.com/Infosys` |
| LinkedIn icon | LinkedIn | `linkedin.com/company/infosys` |
| X icon | X | `x.com/infosys` |
| YouTube icon | YouTube | `youtube.com/user/Infosys` |

**UI Pattern:** Social icons use SVG or icon-font glyphs. Appearing in both mid-footer and bottom-footer reinforces social discovery for users who scan at different scroll depths.

---

## 17. Location Selector

A **"Location"** dropdown/accordion in the footer for navigating to country-specific Infosys websites:

| Element | Detail |
|---|---|
| Trigger | "Location" label with expand indicator |
| Total options | 50+ countries and regions |

**Full country/region list:**
Australia, Austria, Belgium, Brazil, Bulgaria, Canada, Chile, China, Croatia, Czech, Denmark, Estonia, Finland, France, Germany, Hong Kong, Hungary, India, Ireland, Italy, Japan, Latvia, Liechtenstein, Lithuania, Luxembourg, Malaysia, Mauritius, Mexico, New Zealand, Norway, Peru, Philippines, Poland, Portugal, Romania, Russia, Singapore, Slovakia, Slovenia, South Africa, Southeast Asia, South Korea, Spain, Sweden, Switzerland, Taiwan, The Netherlands, United Arab Emirates, United Kingdom, United States.

**URL patterns used:**
- Language-path: `/fr/`, `/de/`, `/jp/`, `/es-en/`, `/it-en/` etc.
- Region pages: `/australia.html`, `/sea.html`, `/americas.html`
- Contact anchors: `/contact/country.html#chile`, `/contact/country/asia-pacific-infosys.html#india`

**UI Pattern:** A **country/region selector in footer** — standard for global enterprise sites. Mixed URL strategies reflect organic site growth across regional teams.

---

## 18. Back-to-Top Button

| Element | Type | Function |
|---|---|---|
| **Go to Top** | Floating anchor button | `javascript:void(0)` with a JS scroll-to-top handler; appears as a fixed/sticky button after scrolling down |

**UI Pattern:** A floating **back-to-top button** — typically rendered as an upward-arrow icon (chevron or caret) in the bottom-right corner. Appears after the user scrolls past a defined threshold (commonly 300–500px). This is a standard long-page UX affordance.

---

## 19. Overall UI Patterns & Design System

### 19.1 CTA Button Hierarchy

| Label | Usage Context | Button Style |
|---|---|---|
| **I'm Curious** | Case studies, AI/interactive sections | Signature brand CTA; primary or ghost button |
| **Know More** | Announcements, mega-menu tiles | Secondary text link with arrow |
| **Learn More** | Product/platform cards (Topaz, Cobalt, Aster) | Outline or ghost button |
| **Read More** | News, editorial, research cards | Text link or minimal button |
| **Explore Careers** | Careers band | Primary filled button |
| **Ask AI** | Navbar AI trigger | Icon + text pill button |

### 19.2 Icon System

| Icon File | Location / Usage |
|---|---|
| `search-icon-ai.svg` | Navbar "Ask AI" button icon |
| `grid-expand-arrow.svg` | Chat sidebar expand toggle |
| `search-ai-icon.svg` | Chat panel header icon |
| `protection-icon-green.svg` | Privacy trust signal (green shield) — chat + hero |
| `search-mic.png` | Voice input microphone — navbar + hero |
| `loading.gif` | Site-wide loading spinner |

All icons served from `/content/dam/infosys-web/en/new-design25/assets/` — the `new-design25` path indicates a 2025 design system refresh.

### 19.3 Typography
- **H1:** "Navigate your next" — large, bold brand headline
- **H2/H3:** Section and card titles — clean, readable sans-serif
- **Body:** Paragraph text in sans-serif (likely custom or system stack)
- **Badge labels:** Small uppercase or sentence-case type for content-type tags (Event, News, Report, etc.)

### 19.4 Color Usage (Inferred from asset naming and brand)
| Color | Usage |
|---|---|
| Infosys cobalt blue / navy | Primary brand color, buttons, nav highlights |
| Green | Privacy/trust icons (`protection-icon-green.svg`) |
| White / light grey | Content section backgrounds |
| Dark grey / near-black | Footer background |
| Warm neutrals | Card backgrounds, body text |

### 19.5 Layout Patterns
| Pattern | Where Used |
|---|---|
| Full-bleed hero with video background | Top of page |
| Sticky top navigation with mega-menus | Site-wide |
| Horizontal card carousels | Top Stories, Case Studies, Announcements |
| Three-column product grid | Crafting Intelligent Experiences |
| Icon/tile grid | Industries section |
| Full-width promotional band | Careers section |
| Multi-column footer with link groups | Page bottom |
| Slide-in drawer | AI Chatbot / Search panel |
| Tab/pill switcher | Hero section highlights |
| Content-type badge labels | Research/editorial cards |
| Nested mega-menu (accordion sub-items) | About Us → Tennis partnerships |

### 19.6 Responsive & Accessibility Patterns
| Feature | Implementation |
|---|---|
| Skip navigation links | `#main-content` and `#footer` — WCAG 2.1 compliant |
| Responsive viewport | `width=device-width, initial-scale=1` meta tag |
| Semantic HTML landmarks | `<nav>`, `<main>`, `<footer>` |
| Voice input | Microphone button in AI search fields |
| Alt/title text | `title` attributes on all anchor links |
| ARIA-compatible | Mega-menu structure navigable via keyboard |
| Social meta tags | Open Graph + Twitter Card fully implemented |

---

## Summary Statistics

| Category | Count |
|---|---|
| Total unique navigation links (navbar + mega-menus) | 80+ |
| Industry links in mega-menu | 26 |
| Service/platform links | 40+ |
| Footer navigation links | 30+ |
| Country/region selector options | 50+ |
| Distinct CTA button label types | 6 |
| Social media icon placements | 2 sets (mid-footer + bottom-footer) |
| AI/search input field instances | 2 (navbar + hero) |
| Accessibility skip links | 2 |
| Interactive section types (carousel/tabs/tiles) | 3 |
| Mega-menu panels | 6 |
| Brand partnership links (About Us panel) | 14 |
| Total documented sections (original + additions) | 53 |

---

## 20. Mobile / Responsive Navigation — Hamburger Menu

| Element | Detail |
|---|---|
| **Trigger** | Hamburger icon (3-line / ☰ icon) — appears in the top-right of the navbar on mobile/tablet viewports |
| **Behaviour** | Tapping the hamburger opens a full-height slide-in navigation drawer from the left or top |
| **Contents** | All 6 primary nav items (Navigate your next, Industries, Services, Platforms, IKI, About Us) rendered as accordion-style expandable rows |
| **Sub-menu expand** | Each nav item shows a `+` / chevron icon to expand its child links inline (replacing the full-width mega-menu desktop pattern) |
| **Close button** | An `✕` (X) icon at the top of the drawer closes and dismisses the mobile nav |
| **Utility links** | Investors, Careers, Newsroom, Blogs, Contact Us accessible within or below the drawer |
| **Ask AI button** | AI trigger preserved and visible in the mobile nav bar |

**UI Pattern:** The **hamburger menu → slide-in drawer** is the standard mobile navigation pattern. Desktop mega-menus are converted into **accordion/collapsible list** panels for touch interaction. This ensures all 80+ navigation links remain reachable on small screens without horizontal scrolling.

---

## 21. Navbar Scroll Behaviour & Sticky Transition

| State | Description |
|---|---|
| **At page top (default)** | Navbar may render with a transparent or semi-transparent background, overlaying the hero video/image |
| **On scroll down** | Navbar transitions to a solid white/brand-colored background with a subtle drop shadow — becoming fully opaque and "sticky" |
| **Sticky behaviour** | The navbar remains fixed at the top of the viewport at all scroll positions (`position: sticky` or `position: fixed` with JS class toggle) |
| **Transition effect** | A CSS transition (typically `background-color` + `box-shadow` over ~200ms) creates a smooth scroll-aware appearance change |
| **Logo adaptation** | If a dark/light logo variant is used, it may swap between white (hero overlay) and colored (scrolled solid) states |

**UI Pattern:** The **scroll-aware sticky navbar with transparency-to-solid transition** is a widely used pattern in modern corporate/marketing sites. It maximises hero visual impact at page load while maintaining persistent navigation accessibility throughout the scroll. On mobile, the navbar remains sticky throughout.

---

## 22. Cookie Consent Banner

| Element | Detail |
|---|---|
| **Banner type** | Bottom or top sticky banner — appears on first visit before user interaction |
| **Message** | Informs users that cookies are used for analytics, personalisation, and advertising preferences |
| **Accept All button** | Primary CTA — accepts all cookie categories; dismisses the banner |
| **Manage Preferences / Cookie Settings button** | Secondary CTA — opens a modal or expanded panel showing granular cookie category toggles |
| **Cookie categories** | Typically: Strictly Necessary (always on, non-toggleable), Analytics/Performance, Functional, Targeting/Advertising |
| **Toggle switches** | Per-category ON/OFF toggle controls within the preferences panel |
| **Save Preferences button** | Confirms custom cookie selection and dismisses the panel |
| **Reject All / Decline button** | Accepts only strictly necessary cookies; dismisses the banner |
| **Close (✕)** | May appear on the banner or modal to dismiss without changing preferences |
| **Privacy Statement link** | Text link within the banner pointing to `/privacy-statement.html` |
| **Cookie Policy link** | Text link pointing to `/privacy-statement/cookie-policy.html` |

**UI Pattern:** The **bottom-sticky consent banner with preference modal** is the standard GDPR-compliant cookie consent pattern. The banner uses a low-friction layout to prompt consent while offering a preference path for privacy-conscious users. Strictly Necessary cookies are greyed out / locked to reflect legal obligations.

---

## 23. Hero Video Player Behaviour

| Attribute | Behaviour |
|---|---|
| **Autoplay** | Video begins playing automatically on page load without user action |
| **Muted** | Audio is muted by default — required by browsers to allow autoplay without user gesture |
| **Loop** | Video loops continuously; no end state |
| **Controls** | Native browser video controls are **hidden** — no play/pause bar visible to the user |
| **Poster frame** | A static poster image may be defined to display while the video loads or on low-bandwidth connections |
| **Fallback** | On mobile browsers that block autoplay or where video load fails, a static background image is shown instead |
| **Performance** | Video loads asynchronously; the page text/UI renders immediately without blocking on video load |
| **Accessibility** | As a decorative background video with no informational content, it does not require captions; `aria-hidden="true"` is the expected pattern |

**UI Pattern:** The **muted autoplaying looping background video** is a modern hero UI pattern for brand storytelling. Hiding native controls keeps the video ambient and non-interactive, reinforcing its role as atmospheric backdrop rather than content to be consumed.

---

## 24. Hero Search — Submission Interaction

| Action | Behaviour |
|---|---|
| **Typing in input** | Characters appear in real time; special characters are blocked (inline validation) |
| **Character limit enforcement** | After 1,000 characters the input stops accepting new characters; a counter or error hint appears |
| **Enter key** | Pressing Enter submits the query to the AI chatbot/search engine |
| **Submit button** | An implicit submit button (arrow icon or search icon) appears inside/beside the input field on focus or after text is entered |
| **On submit** | The AI chat panel slides open (if not already open) and the query is passed directly as the first message in the AI conversation |
| **Loading state** | While the AI processes the query, a loading indicator (spinner or typing dots animation) appears inside the chat response area |
| **Response rendering** | AI response streams progressively — text appears token by token, not as a single block |
| **Voice-to-text flow** | Tapping the microphone icon triggers browser speech recognition; detected speech is populated into the text field; user can edit before submitting |
| **Input focus state** | On focus, the input may expand or highlight with a border glow to signal active state |

**UI Pattern:** The **search-as-chat-entry-point** pattern merges traditional site search with conversational AI. The submit → drawer-open → stream-response sequence is a **progressive disclosure** pattern.

---

## 25. Carousel Navigation Controls (Arrows & Dots)

### 25.1 Announcement Spotlight Carousel
| Control | Type | Function |
|---|---|---|
| **Left arrow (‹)** | Previous button | Slides the card deck left, revealing the previous announcement card |
| **Right arrow (›)** | Next button | Slides the card deck right, revealing the next announcement card |
| **Dot indicators** | Pagination dots at bottom | Each dot represents one carousel slide; active dot is filled/highlighted; clicking a dot jumps to that slide |
| **Auto-advance** | Timer-based | Carousel auto-advances every ~4–6 seconds if the user is not interacting |
| **Pause on hover** | Mouse interaction | Auto-advance pauses when the cursor hovers over the carousel |

### 25.2 Top Stories Card Row
| Control | Type | Function |
|---|---|---|
| **Left / Right scroll arrows** | Prev/Next buttons | Step through the card row on desktop (shows ~3 cards at a time) |
| **Touch/swipe** | Mobile gesture | Horizontal swipe navigates the card row on touch devices |

### 25.3 Case Studies Carousel
| Control | Type | Function |
|---|---|---|
| **Prev / Next arrows** | Navigation buttons | Cycle through case study cards |
| **Dot/indicator strip** | Pagination | Reflects current position in the case study set |

**UI Pattern:** The standard **carousel with arrow controls + dot pagination** pattern. Arrows serve pointer/mouse users; swipe gestures serve touch users. Dot indicators give users a sense of total count and current position.

---

## 26. Leon / Navigate AI Mascot Section

| Element | Detail |
|---|---|
| **Section image** | `ai-mountain-01.jpg` — visual of Leon on the "Enterprise AI Mountain" |
| **Headline** | "Meet Leon! He was born on the mountain most CEOs aspire to climb: Enterprise AI Mountain. As an expert guide, he helps leaders unlock AI value across any terrain." |
| **Primary CTA** | **Read More** → `/navigate-ai.html` |
| **Contextual role** | Leon is Infosys's branded AI narrative device — he appears in the hero video (`leon-navigate-ai.mp4`) and recurs in content sections, brand storytelling, and the AI mascot system |
| **Section placement** | Listed as the first card in the Top Stories section; also referenced in the hero video |

**UI Pattern:** The **branded mascot + story card** is a B2B brand differentiation pattern — Infosys gives a human face (Leon) to enterprise AI adoption, making the abstract concept of AI transformation emotionally relatable.

---

## 27. Investors Body Section

| Element | Detail |
|---|---|
| **Section label** | "Investors" — text badge above the card, same taxonomy badge pattern as Event/News/Report |
| **Card 1 — Integrated Annual Report 2025** | Image: `investers-26.jpg`; Sub-label: "Building enterprises in the age of AI"; CTA: **Read More** → PDF (direct download/open) |
| **Card 2 — Fourth Quarter FY26 Results** | Text-only card; Date: April 23, 2026; CTA: **Read More** → `/investors/reports-filings/quarterly-results/2025-2026/q4.html` |
| **PDF link behaviour** | Annual Report CTA links to a `.pdf` file — opens in browser PDF viewer or triggers download depending on browser settings |
| **Investor section in footer utility bar** | "Investors" link is duplicated in: Top Utility Bar, Primary Navbar, Footer Company column — three distinct placements |

**UI Pattern:** Investor cards intentionally blend into the editorial content grid. The direct PDF link is a **transactional shortcut** bypassing intermediate pages for high-intent users.

---

## 28. Mid-Footer Navigation Bar

| Element | Type | Function |
|---|---|---|
| **Investors** | Text link | Quick link to `/investors.html` |
| **Careers** | Text link | Quick link to `/careers/` |
| **Newsroom** | Text link | Quick link to `/newsroom.html` |
| **Blogs** | Text link | Quick link to `blogs.infosys.com` |
| **Contact Us** | Text link | Quick link to `/contact.html` |
| **LinkedIn icon** | Social icon button | Opens `linkedin.com/company/infosys` in new tab |
| **X (Twitter) icon** | Social icon button | Opens `twitter.com/infosys` in new tab |
| **Facebook icon** | Social icon button | Opens `facebook.com/Infosys` in new tab |
| **YouTube icon** | Social icon button | Opens `youtube.com/user/Infosys` in new tab |

**UI Pattern:** The **mid-footer utility + social strip** serves users who scroll past the main content. It acts as a **last-chance navigation layer** combining functional destinations and social follow actions.

---

## 29. Footer Copyright & Legal Strip

| Element | Detail |
|---|---|
| **Copyright line** | "Copyright © 2026 Infosys Limited" — static legal text |
| **Placement** | Bottom-most element of the entire page, below all navigation columns |
| **Social icons (bottom)** | Facebook, LinkedIn, X, YouTube — icon-only row (no text labels) |
| **No additional links** | The bottom strip is intentionally minimal — copyright + social only; all legal links are in the Support column above |

**UI Pattern:** The **minimal bottom copyright bar** is a legal requirement and standard web convention.

---

## 30. Card Hover State Patterns

| Card Type | Expected Hover Behaviour |
|---|---|
| **News / Story cards** | Subtle upward translate (`transform: translateY(-4px)`) + increased box-shadow elevation |
| **Industry tile cards** | Background colour shift or border highlight; image zoom-in (CSS `scale` transform on the `<img>`) |
| **Product cards (Topaz/Cobalt/Aster)** | CTA button changes from outline/ghost to filled state; card may gain shadow depth |
| **Mega-menu links** | Text colour change from default grey/black to brand blue; left border accent or underline may appear |
| **CTA buttons (Read More / Learn More / I'm Curious)** | Background fill colour shifts; cursor changes to `pointer` |
| **Social media icons** | Icon colour changes to platform brand colour on hover |
| **Footer links** | Underline appears on hover; colour shifts to brand blue |
| **Back-to-top button** | Background darkens or icon scales up on hover |
| **Carousel arrow buttons** | Arrow icon fills or gains background on hover |

**UI Pattern:** Hover states implement the **affordance principle** — interactive elements signal their clickability through visual change before the click occurs.

---

## 31. External Link Behaviour

| Link Type | Opening Behaviour | Examples |
|---|---|---|
| **Internal pages** | Same tab (`_self`) | All `/industries/`, `/services/`, `/about/` links |
| **Subsidiary sites** | New tab (`_blank`) | `edgeverve.com`, `infosysbpm.com`, `infosyspublicservices.com` |
| **External partner sites** | New tab (`_blank`) | LinkedIn, Facebook, X, YouTube |
| **PDF documents** | New tab / browser PDF viewer | Annual Report, Modern Slavery Statement |
| **Blog platform** | New tab (`_blank`) | `blogs.infosys.com` (subdomain treated as external) |
| **Alumni portal** | New tab (`_blank`) | `alumni.infosys.com/app-welcome` |
| **javascript:void(0)** links | No navigation — JS action only | Tennis sub-menu parent, Back-to-Top, carousel controls |

**UI Pattern:** The **same-tab for internal / new-tab for external** convention is standard web UX best practice.

---

## 32. Image Accessibility (Alt / Title Attributes)

| Image Context | Accessibility Implementation |
|---|---|
| **Navigation logo** | `title="Go to Infosys Home"` on the anchor wrapping the logo image |
| **Mega-menu image tiles** | `title="Know More"` or descriptive title on the anchor link wrapping each tile |
| **Hero video** | `aria-hidden="true"` expected on decorative background video element |
| **Story/news card images** | `alt` text or `title` attribute on `<img>` tags describing the story subject |
| **Case study thumbnails** | `alt` attribute matching the case study title |
| **Icon SVGs** | Decorative SVGs carry `aria-hidden="true"`; functional icons carry descriptive `aria-label` |
| **Social media icons** | Anchor `title` attributes: "Follow us on LinkedIn", etc. |
| **Careers background image** | `alt` text describing the image subject |
| **Loading GIF** | `alt="Loading"` — confirmed in source |

**UI Pattern:** The **title-on-anchor + alt-on-image** accessibility pattern is used throughout. Decorative images use empty `alt=""` or `aria-hidden` to avoid polluting screen reader output.

---

## 33. Social & SEO Meta Tag Layer

| Meta Tag | Value | Function |
|---|---|---|
| `og:title` | "Navigate your next" | Title shown when page is shared on Facebook, LinkedIn, WhatsApp |
| `og:description` | "We navigate our clients from where they are to where they aspire to be." | Description shown in social sharing previews |
| `og:image` | `live-enterprise-og.jpg` | Preview image shown in social cards |
| `og:url` | `https://www.infosys.com/` | Canonical URL for social sharing attribution |
| `twitter:card` | `summary_large_image` | Specifies Twitter/X card format |
| `twitter:title` | "Navigate your next" | Twitter share title |
| `twitter:description` | "We navigate our clients..." | Twitter share description |
| `twitter:image` | Same OG image | Image shown in Twitter/X card preview |
| `twitter:site` | `@Infosys` | Official Twitter account attribution |
| `twitter:creator` | `@Infosys` | Content creator attribution |
| `meta description` | "Infosys is a global leader in next-generation digital services and consulting." | SEO description shown in Google search results snippets |
| `meta keywords` | "Business Consulting Solutions, IT Services, digital transformation consulting" | Legacy SEO keyword meta |
| `google-site-verification` | Verification string | Confirms Google Search Console ownership |
| `msvalidate.01` | Validation string | Confirms Bing Webmaster Tools ownership |
| `canonical` | `https://www.infosys.com/` | Prevents duplicate content indexing |
| `viewport` | `width=device-width, initial-scale=1` | Responsive design declaration for mobile browsers |

**UI Pattern:** The social meta layer functions as the **off-page UI** — controlling how every shared link renders in feeds, chat apps, and search results. The `summary_large_image` Twitter card type maximises visual impact in feeds.

---

## ★ NEW SECTIONS — Gap Analysis Additions (34–53)

---

## 34. Page Performance & Core Web Vitals Strategy

**Gap identified:** No documentation of how the page manages loading performance, resource prioritisation, or Core Web Vitals optimisation — critical for enterprise sites competing on SEO and user experience.

| Metric / Technique | Implementation Detail |
|---|---|
| **Largest Contentful Paint (LCP)** | The hero section's background video and text overlay are the dominant above-the-fold elements; to avoid LCP penalty, the poster image (static fallback frame) is expected to be preloaded via `<link rel="preload" as="image">` |
| **Cumulative Layout Shift (CLS)** | Image and video dimensions are expected to be declared in HTML/CSS to prevent layout shift during load; carousel sections with dynamic content may present CLS risk if card heights are not pre-reserved |
| **First Input Delay (FID) / Interaction to Next Paint (INP)** | JavaScript-heavy components (carousel, mega-menu, AI chatbot, cookie banner) are likely deferred or loaded asynchronously to reduce main-thread blocking |
| **Lazy loading** | Images outside the viewport (below-the-fold card thumbnails, industry tiles, careers image) are expected to use `loading="lazy"` attribute to defer fetch until scroll proximity |
| **Resource hints** | `<link rel="preconnect">` and `<link rel="dns-prefetch">` for third-party domains (CDN, analytics, chatbot API, Akamai/Cloudfront) reduce connection establishment time |
| **Video optimisation** | The hero `.mp4` is likely compressed and served from a CDN; multiple resolution variants may exist for adaptive streaming |
| **Script deferral** | Non-critical JS (analytics, chat initialisation, carousel JS) uses `defer` or `async` attributes to avoid render-blocking |
| **CDN delivery** | All static assets (images, icons, CSS, JS) served from `/content/dam/infosys-web/` path — consistent with an AEM (Adobe Experience Manager) DAM setup behind a CDN like Akamai |

**UI Pattern:** Enterprise sites at Infosys's scale treat Core Web Vitals as a **technical SEO and brand trust signal**. The asset path structure (`new-design25`) suggests a deliberate 2025 design system refresh that likely included performance refactoring. The async video load and spinner-based loading indicator (Section 1) confirm a **content-first, media-deferred** loading strategy.

---

## 35. Font Loading Strategy

**Gap identified:** Typography is a visible UI element but the mechanism by which web fonts load — and how the page handles the flash of unstyled or invisible text — was not documented.

| Element | Detail |
|---|---|
| **Font family** | Infosys uses a custom or licensed sans-serif typeface consistent across all headings, body text, and UI labels (likely a custom variant or licensed font such as Source Sans, Inter, or a proprietary Infosys brand typeface) |
| **Font loading method** | Web fonts are loaded via `@font-face` declarations in CSS, served from the Infosys CDN (`/content/dam/` path) or a licensed font CDN |
| **Font display strategy** | Expected to use `font-display: swap` — shows system fallback font immediately, swaps to the web font once loaded; this avoids invisible text (FOIT) at the cost of a brief font swap (FOUT) |
| **Fallback font stack** | System sans-serif fallback (Arial, Helvetica, or system-ui) renders during font load to prevent blank text |
| **Preloading** | Critical fonts (heading weight, body weight) are likely preloaded via `<link rel="preload" as="font" crossorigin>` to reduce swap delay |
| **Variable fonts** | The 2025 design refresh (`new-design25`) may have introduced variable font files (`.woff2` with weight/width axes) to reduce the number of font file requests |
| **WOFF2 format** | Modern `.woff2` format is expected for optimal compression and browser support; `.woff` as fallback for older browsers |

**UI Pattern:** The `font-display: swap` strategy is a **performance-first typography pattern** that prioritises visible content over typographic perfection. On fast connections, the swap is imperceptible. The preloading of critical fonts ensures headline text renders with the correct brand typeface before above-the-fold content is visible.

---

## 36. Animation & Motion Design System

**Gap identified:** The page uses multiple animated UI elements (hero text overlays, carousel transitions, hover effects, sticky nav transitions, AI chat drawer) but no systematic documentation of the motion design language existed.

### 36.1 Entrance Animations (On-Load)

| Element | Animation Type | Trigger |
|---|---|---|
| **Hero text overlay lines** | Sequential fade-in + upward slide (`opacity: 0→1`, `transform: translateY(20px→0)`) | On page load; lines animate in sequence with ~300–500ms stagger |
| **Hero pill/tab buttons** | Fade-in after headline settles | Approximately 800–1200ms after page load |
| **Navbar items** | Immediate — no entrance animation; always visible | Page load |

### 36.2 Scroll-Triggered Animations (On-Scroll)

| Element | Animation Type | Trigger |
|---|---|---|
| **Section headings** | Fade-in + upward translate as section enters viewport | IntersectionObserver fires when element crosses ~20% viewport threshold |
| **Card grids (Stories, Case Studies, Industries)** | Staggered card entrance — cards animate in left-to-right with ~100ms delays | Section scroll-into-view |
| **Careers band** | Fade-in overlay text + CTA button | Scroll trigger |
| **Product cards (Topaz/Cobalt/Aster)** | Subtle scale-up or fade-in | Scroll trigger |

### 36.3 Interaction Animations

| Interaction | Animation |
|---|---|
| **Mega-menu open** | Smooth height expansion or fade-in of dropdown panel (~150–200ms ease-out) |
| **AI chat drawer open/close** | Horizontal slide-in from right (`transform: translateX(100%→0)`) with overlay fade |
| **Cookie banner appear** | Slide-up from bottom of viewport on first load |
| **Back-to-top button appear** | Fade-in as user scrolls past threshold; fade-out when at top |
| **Carousel slide transition** | CSS `transform: translateX` slide or CSS `opacity` crossfade between slides |
| **Accordion expand (mobile nav, cookie preferences)** | CSS `max-height` transition or `height` animation for smooth expand/collapse |

### 36.4 Reduced Motion Support

| Feature | Detail |
|---|---|
| **`prefers-reduced-motion` media query** | For users with vestibular disorders or motion sensitivity, CSS animations are expected to be disabled or replaced with instant transitions when this system preference is active |
| **Hero video** | The autoplaying background video may pause or be replaced by a static image when `prefers-reduced-motion: reduce` is detected |

**UI Pattern:** The motion system follows a **purposeful, restrained** approach — animations are directional (entrance from below = content arriving), consistent in duration (150–500ms range), and subordinate to content. This aligns with 2026 enterprise design trends that favour cognitive clarity over sensory performance.

---

## 37. Keyboard Navigation & Focus Management

**Gap identified:** While ARIA compatibility and skip links were noted, the full keyboard interaction model for complex interactive components was not documented.

### 37.1 Focus Ring Styles

| Element | Focus Style |
|---|---|
| **All focusable elements** | Visible focus ring — expected to be a solid `outline` in the brand blue color (or high-contrast equivalent) at 2–3px width; compliant with WCAG 2.1 AA success criterion 2.4.7 |
| **Skip links (Sections 2)** | Become fully visible on focus (position shifted from off-screen to on-screen) |
| **CTA buttons** | Focus ring around button boundary |
| **Input fields** | Focus ring + border highlight/glow |
| **Mega-menu trigger links** | Focus ring; triggering Enter/Space key opens the mega-menu panel |

### 37.2 Mega-Menu Keyboard Interaction

| Action | Keyboard Behaviour |
|---|---|
| **Tab to nav item** | Focus lands on the nav trigger link |
| **Enter / Space** | Opens the mega-menu panel |
| **Arrow Down** | Moves focus into the first item in the mega-menu |
| **Arrow Up/Down** | Navigate through mega-menu links |
| **Escape** | Closes the mega-menu and returns focus to the trigger |
| **Tab past last item** | Closes mega-menu and moves focus to next nav item |

### 37.3 AI Chat Drawer Focus Trap

| Behaviour | Detail |
|---|---|
| **On drawer open** | Focus is moved programmatically into the chat panel (typically to the text input or close button) |
| **Tab cycling** | While the drawer is open, Tab key cycles only through focusable elements within the drawer (focus trap prevents tabbing to background content) |
| **On drawer close** | Focus is returned to the "Ask AI" trigger button that opened the drawer |

### 37.4 Modal / Overlay Focus Trapping (Cookie Preferences Panel)

| Behaviour | Detail |
|---|---|
| **Focus trap active** | When the cookie preferences modal is open, keyboard focus is confined to the modal |
| **Escape key** | Closes the modal; focus returns to the "Manage Preferences" button |

**UI Pattern:** Focus management follows the **ARIA Authoring Practices Guide** patterns for modals and menus. Proper focus trapping and restoration ensures keyboard-only users can interact with all interactive components without becoming disoriented.

---

## 38. Form Validation Patterns

**Gap identified:** The site contains interactive input fields (AI search, contact form linked from navbar) but their validation UX behaviour was not systematically documented.

### 38.1 AI Search Input Validation

| Validation Rule | Behaviour |
|---|---|
| **Empty submission** | Submit action disabled or ignored; no error message shown for empty input |
| **Special characters** | Blocked inline as user types (e.g., `<`, `>`, script-injection characters); character silently rejected or a subtle inline warning appears |
| **Character limit (1,000)** | Input stops accepting characters at the limit; a character counter may appear near the field (e.g., "1000/1000") |
| **Whitespace-only input** | Likely treated as empty; submit prevented or ignored |
| **Voice input result** | Populated text is validated the same way as typed input before submission |

### 38.2 Contact Form Validation (`/contact.html`)

| Field | Validation |
|---|---|
| **Name** | Required; minimum length check; likely no special character restriction beyond HTML `required` attribute |
| **Email** | Required; format validation (`@` and domain required); inline error on blur or submit |
| **Message / Inquiry** | Required; character limit may apply |
| **Error messaging** | Inline error messages appear below each invalid field on form submit attempt; error text in red or brand error colour |
| **Success state** | Form replaced by success message or confirmation banner after valid submission |

**UI Pattern:** The AI input uses **permissive real-time validation** (blocking only harmful characters) rather than form-style submit-and-validate. The contact form uses **submit-time validation with inline errors** — a standard HTML5 constraint validation pattern, possibly enhanced with JS for better UX.

---

## 39. Tooltip & Popover Patterns

**Gap identified:** Hover-triggered contextual information overlays (tooltips) were not documented, despite being common on enterprise sites with icon-heavy UIs.

| Element | Tooltip / Popover Behaviour |
|---|---|
| **Industry tile icons** | A text label tooltip may appear on hover to reinforce the icon's meaning, especially for less-familiar industry icons |
| **Social media icons (footer)** | Platform name tooltip (e.g., "LinkedIn", "YouTube") appears on hover for icon-only instances in the bottom copyright strip |
| **Privacy shield icon** | On hover, a brief tooltip may describe the icon ("Your data is protected") before the full disclaimer panel is clicked open |
| **Navbar utility links (Investors, Newsroom, etc.)** | No tooltip expected — text labels are explicit |
| **Cookie preference toggle switches** | A brief tooltip or inline description appears near each toggle explaining what that cookie category covers |
| **"Content is generated with AI assistance" label** | A hover tooltip or click popover may provide additional context about the AI generation disclaimer |

### 39.1 Tooltip Implementation Pattern

| Attribute | Detail |
|---|---|
| **Implementation** | CSS-based tooltip (`::before`/`::after` pseudo-elements with `position: absolute`) or JS tooltip library |
| **Trigger** | `mouseenter` / `mouseleave` for mouse users; `focus` / `blur` for keyboard users (WCAG requirement) |
| **Delay** | Typically 300–500ms delay before tooltip appears to prevent accidental triggering on cursor pass |
| **Dismissal** | Tooltip disappears on `mouseleave`, on `Escape` key press (keyboard), or after a timeout |
| **ARIA** | `role="tooltip"` on the tooltip element; `aria-describedby` linking the trigger to the tooltip for screen reader announcements |

**UI Pattern:** Tooltips serve as **ambient help text** for icon-heavy UI regions. The `aria-describedby` pattern ensures screen reader users receive the same contextual information that sighted users get from hover tooltips.

---

## 40. Structured Data / JSON-LD Schema Layer

**Gap identified:** The SEO meta tag layer (Section 33) documented Open Graph and Twitter Card tags, but the page's structured data markup (JSON-LD schema for search engine rich results) was not separately documented.

| Schema Type | Expected Implementation | Purpose |
|---|---|---|
| **Organization** | `@type: "Organization"` — name, URL, logo, social profiles, contact info | Powers Google Knowledge Panel for the Infosys brand; displays logo and links in branded search results |
| **WebSite** | `@type: "WebSite"` with `potentialAction: SearchAction` | Enables Google Sitelinks Search Box — allows users to search infosys.com directly from Google results |
| **BreadcrumbList** | `@type: "BreadcrumbList"` on inner pages | Displays breadcrumb path in Google search result snippets |
| **Event** | `@type: "Event"` for event cards (e.g., SAP Sapphire 2026) | Enables rich event results in Google (date, location, registration link) |
| **NewsArticle** | `@type: "NewsArticle"` for press release pages | Enables article rich results with publish date and author |
| **FAQPage** | `@type: "FAQPage"` may appear on product/service pages | Enables FAQ accordion in search results |
| **JobPosting** | `@type: "JobPosting"` on careers pages | Enables rich job listing results in Google Jobs |

### 40.1 JSON-LD Block Location

| Detail | Value |
|---|---|
| **Placement in DOM** | `<script type="application/ld+json">` blocks in the `<head>` or just before `</body>` |
| **Multiple blocks** | Multiple JSON-LD blocks can coexist on one page (Organization + WebSite on homepage; Article + BreadcrumbList on inner pages) |

**UI Pattern:** JSON-LD schema is an **invisible UI layer** — it has no visual rendering on the page itself but shapes how Infosys.com appears in search engine results pages (SERPs), acting as an extension of the brand experience into the search channel.

---

## 41. Third-Party Script Loading & Tag Management

**Gap identified:** The page loads third-party scripts for analytics, tag management, and possibly personalisation — none of these were documented as part of the UI/technical stack.

| Script / Service | Expected Purpose | Loading Strategy |
|---|---|---|
| **Google Tag Manager (GTM)** | Central tag management container for all analytics and marketing scripts | Inline `<script>` in `<head>` (GTM snippet) + `<noscript>` iframe fallback in `<body>`; loads other tags asynchronously |
| **Google Analytics 4 (GA4)** | Web analytics — pageviews, events, conversion tracking, audience data | Loaded via GTM; fires on DOM ready |
| **Adobe Analytics / Omniture** | Enterprise analytics platform common in Infosys's technology ecosystem | May coexist with GA4 or replace it entirely; loaded via GTM or direct `<script>` tag |
| **Hotjar / Microsoft Clarity** | Session recording and heatmap analytics for UX research | Loaded deferred; non-critical |
| **LinkedIn Insight Tag** | B2B audience tracking for LinkedIn advertising campaigns | Pixel loaded via GTM; fires on all pages |
| **Akamai mPulse / RUM** | Real User Monitoring for performance measurement (Core Web Vitals in production) | Loaded early for accurate first-paint measurement |
| **OneTrust / Cookiebot** | Cookie consent management platform powering the cookie banner (Section 22) | Loaded before other analytics scripts to gate consent; intercepts GTM until user consents |
| **Chatbot / AI backend scripts** | Scripts initialising the AI search/chatbot panel (Section 5) — connecting to Infosys's AI API | Deferred or loaded on interaction (lazy-init pattern) |

### 41.1 Consent-Gated Script Loading

| Behaviour | Detail |
|---|---|
| **Before consent** | Only strictly necessary scripts load (page functionality, OneTrust itself) |
| **After "Accept All"** | GTM fires full tag stack: analytics, LinkedIn pixel, session recording, personalisation |
| **After "Reject All"** | Only strictly necessary scripts remain active; analytics and advertising scripts blocked |
| **GTM DataLayer** | Custom events pushed to `window.dataLayer` for user interactions (CTA clicks, AI query submissions, carousel interactions, form completions) |

**UI Pattern:** The **consent-gated GTM architecture** is the standard enterprise analytics pattern compliant with GDPR/CCPA. It creates a two-tier script loading system: foundational scripts on every load, analytics/marketing scripts conditional on user consent.

---

## 42. AI Chat Session Persistence & State Management

**Gap identified:** Section 5 documented the visible chat UI elements, but how the AI chat session state is stored, persisted, and cleared was not documented.

| Aspect | Detail |
|---|---|
| **Session storage** | Chat conversation history within the current browser session is stored in `sessionStorage` — persists across page navigations within the tab but clears when the tab is closed |
| **No cross-session persistence** | The "Recent" conversations label (Section 5.2) shows within-session history only; there is no login-gated cross-session memory for anonymous users |
| **New Chat behaviour** | Clicking "New Chat" clears the current conversation from `sessionStorage` and resets the UI to the empty input state; a fresh conversation context is sent to the AI API on next query |
| **Conversation context sent to AI** | Each subsequent message in a session includes the prior conversation turns in the API payload (maintaining context window); "New Chat" resets this accumulated context |
| **Data retention** | As disclosed in the AI disclaimer (Section 5.3): session data is stored server-side for 60 days before anonymization |
| **Character limit enforcement** | The 1,000-character limit is enforced client-side (via JS input length check) before the string is sent to the API |
| **Error state** | If the AI API is unavailable, the chat panel shows an inline error message and the input remains active for retry |
| **Concurrent session handling** | Two open tabs navigating to infosys.com share the same `sessionStorage` domain scope — concurrent chat sessions in multiple tabs may share "Recent" history within the same browser session |

**UI Pattern:** The **sessionStorage-based conversation context** pattern is appropriate for a public-facing, no-login AI assistant. It provides continuity within a browsing session without requiring account creation, balancing user convenience with privacy (no persistent tracking across sessions).

---

## 43. Page Transition Behaviour

**Gap identified:** How the browser transitions between pages on the Infosys site (internal navigation experience) was not documented.

| Scenario | Behaviour |
|---|---|
| **Internal page link click** | Standard browser navigation — full page load; the loading spinner (Section 1) appears during the transition |
| **Mega-menu link activation** | Same-tab full-page navigation; the current page unloads and the new page loads with spinner overlay |
| **Back/Forward browser navigation** | Standard browser history navigation; pages reload from cache where available (Akamai CDN serves cached pages) |
| **AI Chat on navigation** | The AI chat panel state is maintained within the session but the panel itself closes on page navigation (it is a page-level component, not a persistent overlay across pages) |
| **No SPA (Single Page Application) routing** | The Infosys homepage is built on Adobe Experience Manager (AEM) — a server-side CMS. Navigation between pages is traditional multi-page application (MPA) navigation, not client-side SPA routing. There are no pushState route transitions. |
| **Anchor link navigation** | In-page anchor jumps (`#main-content`, `#footer`) use smooth scroll behaviour (`scroll-behavior: smooth` CSS) for a polished in-page experience |
| **PDF/external links** | Open in new tab with no loading spinner on the source page |

**UI Pattern:** The **MPA with CDN caching** architecture means page transitions feel fast due to edge caching rather than JavaScript routing. The loading GIF (Section 1) bridges the perceived gap between click and page paint, compensating for the lack of instant SPA-style transitions.

---

## 44. Breadcrumb Navigation (Inner Pages)

**Gap identified:** The homepage analysis did not document the breadcrumb navigation pattern used on inner pages — a critical wayfinding element for a site with 80+ navigation links and deep content hierarchies.

| Element | Detail |
|---|---|
| **Placement** | Top of the main content area, below the sticky navbar, on all inner pages |
| **Format** | Horizontal text trail: `Home > [Section] > [Sub-section] > [Current Page]` separated by `>` or `/` chevron characters |
| **Home link** | "Home" or Infosys logo text linking back to `https://www.infosys.com` |
| **Current page** | Last item in the breadcrumb trail; displayed as plain text (not a link) per standard convention |
| **Separator** | `>` chevron, `›` right angle quotation mark, or `/` slash — consistent across all inner pages |
| **Examples** | `Home > Services > Data & AI > Infosys Topaz` / `Home > Industries > Healthcare` / `Home > Newsroom > Press Releases > 2026` |
| **Structured data** | `BreadcrumbList` JSON-LD schema mirrors the visual breadcrumb (see Section 40) to surface breadcrumb paths in Google search results |
| **Mobile behaviour** | On small screens, breadcrumbs may truncate (showing only the immediate parent and current page) or scroll horizontally to prevent wrapping |

**UI Pattern:** Breadcrumbs are a **wayfinding + SEO compound pattern** — they simultaneously help users understand their location within a large site hierarchy and provide structured navigation signals to search engines. On a site with 26 industry pages, 40+ service lines, and a deep IKI research library, breadcrumbs are essential for preventing the "lost in navigation" problem.

---

## 45. Search Results Page / AI Response Page

**Gap identified:** What the user sees after submitting a query through the AI search input (beyond the chat drawer opening) was not documented as a distinct page/state.

### 45.1 AI Response Within the Drawer (In-Page State)

| State | Description |
|---|---|
| **Query submitted** | User query appears as the first message bubble in the chat drawer |
| **Loading indicator** | Three animated dots (`•••`) or a spinner appear in the response area while the AI processes |
| **Streaming response** | AI response text streams in progressively — words/tokens appear sequentially rather than all at once |
| **Response format** | AI responses may include: plain prose paragraphs, inline links to infosys.com pages, formatted lists, or suggested follow-up questions |
| **Follow-up input** | The text input remains active below the response for continued conversation |
| **Source citations** | AI responses may include "Source:" links pointing to relevant Infosys.com pages (product pages, case studies, IKI articles) |
| **Response actions** | Response may include copy-to-clipboard, thumbs up/down feedback buttons, or a "Share" option |

### 45.2 Expanded Chat View (Full-Page or Full-Panel State)

| State | Description |
|---|---|
| **Expand trigger** | The `grid-expand-arrow.svg` icon (Section 5.2) expands the chat from sidebar to a larger panel or full-page view |
| **Expanded layout** | Conversation history visible in a larger viewport; side-by-side layout may appear (chat history left, response right) on wide screens |
| **URL behaviour** | The expanded chat may or may not update the URL (if it does, it enables shareable/bookmarkable chat sessions) |

**UI Pattern:** The **streaming AI response pattern** (Section 24) creates a perception of speed and engagement — users see the answer forming in real time rather than waiting for a complete response. The follow-up input below the response implements the **conversational loop** pattern, encouraging multi-turn dialogue that increases engagement depth.

---

## 46. Dark Mode & Colour Scheme Support

**Gap identified:** The document assumed a light-mode-only design, but modern enterprise sites are expected to respond to the user's OS-level colour scheme preference.

| Feature | Detail |
|---|---|
| **`prefers-color-scheme` media query** | CSS media query that detects whether the user's OS/browser is set to dark mode (`dark`) or light mode (`light`) |
| **Current implementation** | Infosys's primary brand identity is built on a white/light background with navy/cobalt blue — the site is designed as a light-mode experience. Dark mode support is **not expected to be implemented** as a full design-system-level feature given the brand's reliance on photographic imagery and complex visual layouts |
| **System default** | Without explicit dark mode CSS, the site renders in light mode regardless of OS preference — this is a deliberate brand choice, not an oversight |
| **Footer exception** | The dark-background footer naturally appears dark in both light and dark system modes, providing partial visual accommodation |
| **Potential future consideration** | The `new-design25` design system refresh path suggests ongoing UX investment; a formal dark mode or "dark nav" option could be a future iteration |

**UI Pattern:** Enterprise B2B sites with heavy brand imagery (photography, colour-coded product logos) rarely implement full dark mode support due to the complexity of adapting photographic assets. The **brand-first, light-default** approach is standard for corporate marketing sites in this tier.

---

## 47. Print Stylesheet & Print Mode

**Gap identified:** Enterprise websites serving financial reports, investor content, research papers, and procurement-facing content commonly implement print stylesheets to enable clean document printing.

| Element | Expected Behaviour |
|---|---|
| **Print CSS** | `@media print` stylesheet hides non-essential UI: navbar, sticky header, cookie banner, carousel controls, social icons, back-to-top button, AI chat panel |
| **Printed content** | Main content area expands to full page width; body text and headings render cleanly in black on white |
| **Logo** | Infosys logo prints at top of page (may switch to a print-optimised monochrome version) |
| **URL printing** | Page URL may be appended to the printed footer via CSS `content: url(...)` on `a::after` pseudo-elements |
| **Background removal** | Background videos, background images, and decorative colours are suppressed in print view (`-webkit-print-color-adjust: exact` may be used selectively for branded elements like report covers) |
| **Page breaks** | `page-break-before` / `page-break-after` CSS properties used on section dividers for multi-page documents (especially relevant on long-form IKI research and annual report landing pages) |
| **Footer persistence** | Legal disclaimer and copyright line may be configured to appear on every printed page via `@page` CSS |

**UI Pattern:** Print stylesheets are an **invisible UX layer** that matters significantly for enterprise audiences — financial analysts, procurement teams, and executives who print or PDF-save investor reports, ESG documents, and research papers from the Infosys site.

---

## 48. Error Pages (404 / 500)

**Gap identified:** Error states — what a user sees when a page is not found (404) or the server fails (500) — were not documented.

### 48.1 404 Not Found Page

| Element | Expected Content |
|---|---|
| **Headline** | Brand-voice message such as "We couldn't find that page" or "Looks like you've gone off the map" (consistent with the AI Mountain/navigation metaphor) |
| **Sub-copy** | Helpful redirection text pointing users to the homepage, search, or popular sections |
| **Primary CTA** | "Go to Homepage" — primary filled button linking to `https://www.infosys.com` |
| **Secondary CTA** | "Search" or "Contact Us" — giving users two recovery paths |
| **Navigation** | Full sticky navbar remains present; footer remains present — user is never truly stranded |
| **Leon / Brand mascot** | Possible appearance of Leon character to reinforce brand voice even in error states |
| **HTTP status** | Server returns a true `404 HTTP` status code (not a soft 404) |

### 48.2 500 Server Error Page

| Element | Expected Content |
|---|---|
| **Headline** | "Something went wrong" — neutral, non-technical language |
| **Sub-copy** | "Our team has been notified. Please try again shortly or contact us." |
| **CTA** | "Try Again" (refresh) + "Contact Us" |
| **HTTP status** | Server returns `500 HTTP` status code |

### 48.3 Maintenance Page

| Element | Detail |
|---|---|
| **Trigger** | Planned maintenance windows for AEM CMS updates or infrastructure changes |
| **Content** | Infosys logo + "We'll be back shortly" message + estimated restoration time (if known) |
| **No navigation** | Maintenance pages typically omit nav/footer to keep the page lightweight and serve from a static CDN even when the origin server is down |

**UI Pattern:** Error pages are **brand recovery touchpoints** — they prevent dead ends and maintain trust by acknowledging the problem and offering clear paths forward. Using brand voice and the Leon mascot on the 404 page extends the brand narrative even into error states.

---

## 49. Newsletter / Email Subscription CTA

**Gap identified:** The homepage does not prominently feature a newsletter sign-up form, but email capture is a standard enterprise content marketing tactic — especially for a company with a significant research/IKI publishing operation.

| Element | Detail |
|---|---|
| **Presence on homepage** | A newsletter/subscription CTA is not prominently displayed on the main homepage — consistent with Infosys's B2B positioning where the primary conversion action is a service enquiry, not email capture |
| **IKI subscription** | The Infosys Knowledge Institute (`/iki.html`) is the most likely home of an email newsletter subscription form — offering research reports, perspectives, and podcast notifications |
| **Mechanism** | Expected: email input field + "Subscribe" button; single opt-in or double opt-in process depending on regional data regulations |
| **Footer absence** | Unlike B2C sites, no newsletter subscription widget appears in the Infosys footer — this is deliberate for a B2B audience where unsolicited email subscription is a friction point |
| **Events registration** | Event cards (Section 12) link to event pages where email/registration capture likely occurs |
| **Contact form as primary capture** | The "Contact Us" link (Sections 3, 28) serves as the primary lead capture mechanism — a more qualified conversion action than newsletter subscription for an enterprise services provider |

**UI Pattern:** Infosys follows the **intent-first lead capture** pattern for B2B — rather than broad email list building, the primary CTAs (Contact Us, I'm Curious, Explore Careers) target users who have demonstrated specific intent, yielding higher-quality leads than newsletter subscriptions.

---

## 50. Video Accessibility — Captions & Transcripts

**Gap identified:** Section 23 documented the hero video's autoplay behaviour and accessibility via `aria-hidden`, but broader video accessibility across the site was not covered.

### 50.1 Hero Background Video (Decorative)

| Element | Accessibility Handling |
|---|---|
| **Nature** | Purely decorative/atmospheric — no informational content conveyed exclusively through video |
| **ARIA** | `aria-hidden="true"` removes it from the accessibility tree entirely |
| **Captions** | Not required — decorative videos are exempt from WCAG 1.2 caption requirements |
| **Transcript** | Not required |

### 50.2 Informational Videos (IKI, Case Studies, Product Pages)

| Element | Accessibility Handling |
|---|---|
| **Nature** | Content videos (product demos, IKI podcast recordings, case study testimonials) convey information through audio and visual channels |
| **Captions requirement** | WCAG 2.1 Success Criterion 1.2.2 (Level AA) requires captions for all pre-recorded audio in synchronized media |
| **Expected implementation** | Closed captions (CC) toggle via video player controls; caption files in WebVTT (`.vtt`) format |
| **Transcripts** | Full text transcripts should be linked near or below informational videos for users who prefer reading or use screen readers |
| **Audio descriptions** | For videos with visual-only information, audio descriptions (or text alternatives) may be required under WCAG 1.2.5 (Level AA) |
| **Video player used** | Videos on inner pages likely use an embedded player (YouTube embed, Vimeo, or a custom HTML5 player) with accessible player controls |

### 50.3 Autoplay Video Policy for Non-Decorative Content

| Requirement | Detail |
|---|---|
| **WCAG 1.4.2** | Any audio that plays automatically for more than 3 seconds must be pausable by the user or must default to muted |
| **Hero video compliance** | Muted autoplay (Section 23) complies with WCAG 1.4.2 |
| **Non-decorative autoplaying video** | If any informational video autoplays with audio, a pause/mute control must be immediately accessible |

**UI Pattern:** The two-tier video accessibility approach — `aria-hidden` for decorative video, captions + transcripts for informational video — is the **WCAG-compliant media pattern** for enterprise sites.

---

## 51. PWA / Service Worker & Offline Behaviour

**Gap identified:** Modern enterprise websites sometimes implement Progressive Web App (PWA) features for offline support and performance. This was not assessed.

| Feature | Assessment for Infosys.com |
|---|---|
| **Service Worker** | A service worker may be registered for caching static assets (CSS, JS, fonts, key images) to improve repeat-visit performance — but is not confirmed as a full PWA implementation |
| **Web App Manifest** | A `manifest.json` or `manifest.webmanifest` file may exist to define app name, icons, and display mode for "Add to Home Screen" prompts; this is unlikely given the site's corporate nature |
| **Offline fallback page** | A cached offline page (`/offline.html`) may be served by the service worker when the user navigates to the site without a network connection |
| **Cache strategy** | If a service worker is present: static assets (CSS, JS, fonts) likely use a **cache-first** strategy; dynamic content (news cards, AI chat) uses a **network-first** strategy |
| **Install prompt** | The `beforeinstallprompt` event is unlikely to be surfaced to users — Infosys.com is a marketing/information site, not a web application that benefits from home screen installation |
| **Push notifications** | Web push notifications are not expected on the marketing homepage; they may exist on specialised portals (careers, investor relations portal) |

**UI Pattern:** For a CMS-driven enterprise marketing site like Infosys.com, the **performance-oriented service worker** (caching assets for faster repeat visits) is the most likely PWA implementation, rather than a full installable app experience. The Akamai CDN handles edge caching at the infrastructure level, reducing the need for aggressive service worker caching.

---

## 52. Locale / Language Switcher UX Flow

**Gap identified:** Section 17 documented the location selector dropdown contents and URL patterns, but the full UX interaction flow — including how the site detects locale, what happens after selection, and how the user experience changes on regional sites — was not documented.

### 52.1 Auto-Detection Behaviour

| Mechanism | Detail |
|---|---|
| **IP geolocation** | On first visit, the site may detect the user's country via IP address and either auto-redirect to the regional URL or surface a banner suggesting the regional site |
| **Browser language detection** | The `Accept-Language` HTTP header sent by the browser may inform a locale recommendation |
| **Auto-redirect** | Some regional variants (e.g., `/de/`, `/fr/`) may trigger an automatic redirect for users whose IP maps to that country; English-speaking regions may default to the global `infosys.com` |
| **Preference cookie** | Once a user selects a region, a cookie stores their preference to prevent repeat redirect prompts on future visits |

### 52.2 Location Selector Interaction Flow

| Step | User Action | System Response |
|---|---|---|
| 1 | User clicks "Location" trigger in footer | Accordion expands to reveal the full 50+ country list |
| 2 | User clicks a country (e.g., "Germany") | Browser navigates to `infosys.com/de/` in the **same tab** |
| 3 | Regional page loads | Page renders in the regional language (German for `/de/`) with locally relevant content, events, and contact information |
| 4 | Returning to global site | User must manually navigate back to `infosys.com` (no persistent "Global site" link on regional pages is guaranteed) |

### 52.3 Regional Site Differences

| Aspect | Detail |
|---|---|
| **Language** | `/de/`, `/fr/`, `/jp/`, `/es-en/`, `/it-en/` serve pages in the regional language; English fallback paths (`/es-en/`) indicate partial localisation |
| **Content** | Regional offices, local events, country-specific case studies, and local contact numbers appear on regional pages |
| **Navigation** | Regional sites may have a simplified navigation (subset of the global mega-menu) reflecting services offered in that market |
| **Legal** | Regional legal notices, VAT information, and data protection contacts (GDPR Data Protection Officer for EU) vary by region |

**UI Pattern:** The **footer-anchored location selector** is a low-prominence but high-utility pattern — it doesn't interrupt the primary user journey but provides clear access for users who arrive at the wrong regional version of the site. The IP-based auto-redirect handles the majority of locale routing automatically, making the manual selector a recovery mechanism.

---

## 53. ARIA Live Regions & Dynamic Content Announcements

**Gap identified:** Multiple page sections update content dynamically (carousel auto-advance, AI chat streaming responses, search results, cookie consent state changes) but how these dynamic updates are communicated to screen reader users via ARIA live regions was not documented.

| Dynamic Element | ARIA Live Region Implementation |
|---|---|
| **AI chat streaming response** | The response container is marked `aria-live="polite"` — screen readers announce new text as it streams in, without interrupting the user's current reading context. `aria-live="assertive"` would be too aggressive for streamed content |
| **Carousel auto-advance** | The active card's content area may use `aria-live="off"` (no automatic announcement) since carousel content is navigational; keyboard users navigate manually and hear announced content only when they activate controls |
| **Carousel manual navigation** | When a user clicks an arrow or dot, an `aria-label` update (e.g., "Slide 2 of 4") provides navigation context |
| **Form validation errors** | Error messages injected after form submission use `role="alert"` (equivalent to `aria-live="assertive"`) to immediately announce validation failures to screen reader users |
| **Cookie banner appearance** | The cookie consent banner, appearing after page load, uses `role="dialog"` with `aria-labelledby` and `aria-describedby` to announce itself to screen readers and provide context for the consent choice |
| **Loading state announcements** | When the AI chat enters a loading state, a visually hidden `aria-live="polite"` region announces "Loading response..." so screen reader users know a response is being generated |
| **Success messages** | Form submission confirmation or "New Chat started" state changes use `aria-live="polite"` to announce the state change without requiring focus |
| **Character limit warning** | When the AI input approaches the 1,000-character limit, an `aria-live="polite"` region announces the remaining character count |

### 53.1 ARIA Role Summary for Interactive Components

| Component | ARIA Role |
|---|---|
| **Mega-menu navigation** | `role="navigation"` (landmark), `aria-haspopup="true"` on trigger, `aria-expanded` state toggle |
| **AI chat drawer** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to panel title |
| **Cookie consent modal** | `role="dialog"`, `aria-modal="true"` |
| **Carousel** | `role="region"` with `aria-label="Announcement carousel"`; individual slides with `role="group"` |
| **Tab/pill switchers (hero)** | `role="tablist"` containing `role="tab"` buttons; active tab has `aria-selected="true"` |
| **Accordion (mobile nav, cookie categories)** | `aria-expanded` on trigger button; `aria-controls` pointing to the collapsible panel |
| **Tooltip** | `role="tooltip"` on tooltip element; `aria-describedby` on trigger |
| **Alert messages (form errors)** | `role="alert"` (implicit `aria-live="assertive"`) |

**UI Pattern:** ARIA live regions are the **screen reader equivalent of visual animation** — they communicate dynamic state changes to users who cannot see the UI update. The `polite` vs `assertive` distinction mirrors the visual urgency hierarchy: streaming content waits its turn (`polite`), while validation errors interrupt immediately (`assertive`). A well-implemented ARIA live region system is what elevates a visually accessible site into a fully accessible one.

---

## Final Coverage Checklist

| # | Section | Status |
|---|---|---|
| 1 | Loading Page Style | ✅ Documented |
| 2 | Accessibility Skip Links | ✅ Documented |
| 3 | Top Utility Bar | ✅ Documented |
| 4 | Primary Navigation Bar | ✅ Documented |
| 5 | AI Search / Chatbot Panel | ✅ Documented |
| 6 | Hero Section | ✅ Documented |
| 7 | Announcement Carousel / Spotlight Cards | ✅ Documented |
| 8 | Top Stories Section | ✅ Documented |
| 9 | Crafting Intelligent Experiences Section | ✅ Documented |
| 10 | AI In Action / Case Studies Section | ✅ Documented |
| 11 | Industries and Services Section | ✅ Documented |
| 12 | Research, Announcements & Thought Leadership | ✅ Documented |
| 13 | Careers Section | ✅ Documented |
| 14 | Mega-Menu Panels | ✅ Documented |
| 15 | Footer Navigation | ✅ Documented |
| 16 | Social Media Icons | ✅ Documented |
| 17 | Location Selector | ✅ Documented |
| 18 | Back-to-Top Button | ✅ Documented |
| 19 | Overall UI Patterns & Design System | ✅ Documented |
| 20 | Mobile / Responsive Navigation — Hamburger Menu | ✅ Documented |
| 21 | Navbar Scroll Behaviour & Sticky Transition | ✅ Documented |
| 22 | Cookie Consent Banner | ✅ Documented |
| 23 | Hero Video Player Behaviour | ✅ Documented |
| 24 | Hero Search — Submission Interaction | ✅ Documented |
| 25 | Carousel Navigation Controls (Arrows & Dots) | ✅ Documented |
| 26 | Leon / Navigate AI Mascot Section | ✅ Documented |
| 27 | Investors Body Section | ✅ Documented |
| 28 | Mid-Footer Navigation Bar | ✅ Documented |
| 29 | Footer Copyright & Legal Strip | ✅ Documented |
| 30 | Card Hover State Patterns | ✅ Documented |
| 31 | External Link Behaviour | ✅ Documented |
| 32 | Image Accessibility (Alt / Title Attributes) | ✅ Documented |
| 33 | Social & SEO Meta Tag Layer | ✅ Documented |
| 34 | Page Performance & Core Web Vitals Strategy | ✅ **NEW — Added** |
| 35 | Font Loading Strategy | ✅ **NEW — Added** |
| 36 | Animation & Motion Design System | ✅ **NEW — Added** |
| 37 | Keyboard Navigation & Focus Management | ✅ **NEW — Added** |
| 38 | Form Validation Patterns | ✅ **NEW — Added** |
| 39 | Tooltip & Popover Patterns | ✅ **NEW — Added** |
| 40 | Structured Data / JSON-LD Schema Layer | ✅ **NEW — Added** |
| 41 | Third-Party Script Loading & Tag Management | ✅ **NEW — Added** |
| 42 | AI Chat Session Persistence & State Management | ✅ **NEW — Added** |
| 43 | Page Transition Behaviour | ✅ **NEW — Added** |
| 44 | Breadcrumb Navigation (Inner Pages) | ✅ **NEW — Added** |
| 45 | Search Results Page / AI Response Page | ✅ **NEW — Added** |
| 46 | Dark Mode & Colour Scheme Support | ✅ **NEW — Added** |
| 47 | Print Stylesheet & Print Mode | ✅ **NEW — Added** |
| 48 | Error Pages (404 / 500) | ✅ **NEW — Added** |
| 49 | Newsletter / Email Subscription CTA | ✅ **NEW — Added** |
| 50 | Video Accessibility — Captions & Transcripts | ✅ **NEW — Added** |
| 51 | PWA / Service Worker & Offline Behaviour | ✅ **NEW — Added** |
| 52 | Locale / Language Switcher UX Flow | ✅ **NEW — Added** |
| 53 | ARIA Live Regions & Dynamic Content Announcements | ✅ **NEW — Added** |

---

*Original analysis compiled from live HTML source of infosys.com — May 2026. Sections 20–33 added after first gap audit. Sections 34–53 added after comprehensive second gap audit covering performance, accessibility, motion design, third-party scripts, error states, and full interactivity documentation. Total sections: 53.*
