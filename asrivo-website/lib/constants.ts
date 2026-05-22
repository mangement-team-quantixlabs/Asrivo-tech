import {
  Brain,
  Cloud,
  Shield,
  BarChart3,
  Sparkles,
  Code2,
  Briefcase,
  Building2,
  Heart,
  Factory,
  ShoppingCart,
  Zap,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// ============================================
// Site Configuration
// ============================================

export const siteConfig = {
  name: "ASCIRVO",
  tagline: "Engineering Tomorrow's Digital Enterprise",
  description:
    "World-class IT services and digital transformation company delivering AI, Cloud, Cybersecurity, Data Analytics, and Software Engineering solutions to enterprises globally.",
  url: "https://ascirvo.com",
  email: "hello@ascirvo.com",
  salesEmail: "sales@ascirvo.com",
  hrEmail: "careers@ascirvo.com",
  phone: "+1 (800) 123-4567",
  address: {
    street: "100 Innovation Drive, Suite 500",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  social: {
    linkedin: "https://linkedin.com/company/ascirvo",
    twitter: "https://twitter.com/ascirvo",
    github: "https://github.com/ascirvo",
    youtube: "https://youtube.com/@ascirvo",
  },
} as const;

// ============================================
// Navigation Links
// ============================================

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  description?: string;
  icon?: LucideIcon;
}

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "AI & Machine Learning",
        href: "/services/ai-ml",
        description: "Intelligent automation and predictive analytics",
        icon: Brain,
      },
      {
        label: "Cloud Solutions",
        href: "/services/cloud",
        description: "Multi-cloud, migration, and cloud-native",
        icon: Cloud,
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        description: "SOC, compliance, and zero-trust security",
        icon: Shield,
      },
      {
        label: "Data & Analytics",
        href: "/services/data-analytics",
        description: "BI, data engineering, and lakehouse",
        icon: BarChart3,
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
        description: "End-to-end enterprise modernization",
        icon: Sparkles,
      },
      {
        label: "Software Engineering",
        href: "/services/software-engineering",
        description: "Custom development, QA, and DevOps",
        icon: Code2,
      },
      {
        label: "Business Consulting",
        href: "/services/consulting",
        description: "Strategic advisory and process optimization",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "Banking & Finance",
        href: "/industries/banking-finance",
        description: "Digital banking and fintech solutions",
        icon: Building2,
      },
      {
        label: "Healthcare",
        href: "/industries/healthcare",
        description: "Health-tech and life sciences innovation",
        icon: Heart,
      },
      {
        label: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Industry 4.0 and smart manufacturing",
        icon: Factory,
      },
      {
        label: "Retail & E-Commerce",
        href: "/industries/retail",
        description: "Omnichannel and commerce platforms",
        icon: ShoppingCart,
      },
      {
        label: "Energy & Utilities",
        href: "/industries/energy",
        description: "Smart grid and sustainable energy tech",
        icon: Zap,
      },
      {
        label: "Public Sector",
        href: "/industries/government",
        description: "GovTech and citizen services",
        icon: Landmark,
      },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "AI & Machine Learning", href: "/services/ai-ml" },
    { label: "Cloud Solutions", href: "/services/cloud" },
    { label: "Cybersecurity", href: "/services/cybersecurity" },
    { label: "Data & Analytics", href: "/services/data-analytics" },
    { label: "Digital Transformation", href: "/services/digital-transformation" },
    { label: "Software Engineering", href: "/services/software-engineering" },
    { label: "Business Consulting", href: "/services/consulting" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Newsroom", href: "/newsroom" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog & Insights", href: "/insights" },
    { label: "Newsroom", href: "/newsroom" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// ============================================
// Services Data
// ============================================

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const services: ServiceItem[] = [
  {
    title: "AI & Machine Learning",
    slug: "ai-ml",
    description:
      "Transform your business with intelligent automation, predictive analytics, and custom AI solutions that drive measurable outcomes.",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Cloud Solutions",
    slug: "cloud",
    description:
      "Accelerate your cloud journey with multi-cloud strategy, seamless migration, and cloud-native application development.",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    description:
      "Protect your enterprise with SOC-as-a-service, compliance frameworks, and zero-trust security architecture.",
    icon: Shield,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Data & Analytics",
    slug: "data-analytics",
    description:
      "Unlock insights from your data with business intelligence, data engineering, and modern lakehouse solutions.",
    icon: BarChart3,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Digital Transformation",
    slug: "digital-transformation",
    description:
      "Reimagine your business with end-to-end digital transformation strategies that modernize operations and drive growth.",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Software Engineering",
    slug: "software-engineering",
    description:
      "Build world-class software with custom development, quality assurance, and modern DevOps practices.",
    icon: Code2,
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Business Consulting",
    slug: "consulting",
    description:
      "Strategic advisory, process optimization, and technology roadmap planning to accelerate your digital journey.",
    icon: Briefcase,
    color: "from-slate-500 to-gray-700",
  },
];

// ============================================
// Industries Data
// ============================================

export interface IndustryItem {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}

export const industries: IndustryItem[] = [
  {
    title: "Banking & Finance",
    slug: "banking-finance",
    description: "Digital banking, fintech innovation, and regulatory compliance solutions.",
    icon: Building2,
  },
  {
    title: "Healthcare & Life Sciences",
    slug: "healthcare",
    description: "Patient-centric health-tech, clinical data platforms, and telehealth solutions.",
    icon: Heart,
  },
  {
    title: "Manufacturing",
    slug: "manufacturing",
    description: "Industry 4.0, IoT-driven automation, and smart supply chain management.",
    icon: Factory,
  },
  {
    title: "Retail & E-Commerce",
    slug: "retail",
    description: "Omnichannel commerce, personalization engines, and supply chain optimization.",
    icon: ShoppingCart,
  },
  {
    title: "Energy & Utilities",
    slug: "energy",
    description: "Smart grid technologies, renewable energy platforms, and predictive maintenance.",
    icon: Zap,
  },
  {
    title: "Public Sector & Government",
    slug: "government",
    description: "Citizen services, digital governance, and secure public infrastructure.",
    icon: Landmark,
  },
];

// ============================================
// Stats Data (Home Page)
// ============================================

export const heroStats = [
  { value: 500, suffix: "+", label: "Clients Worldwide" },
  { value: 15, suffix: "+", label: "Countries" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 200, suffix: "+", label: "Engineers & Experts" },
];

// ============================================
// Why ASCIRVO Pillars
// ============================================

export const whyAscirvo = [
  {
    title: "Enterprise-Grade Solutions",
    description:
      "We build scalable, secure, and production-ready solutions trusted by Fortune 500 companies and fast-growing startups alike.",
    icon: Shield,
  },
  {
    title: "Innovation First",
    description:
      "Our R&D teams stay ahead of emerging technologies — from generative AI to quantum computing — so your business leads, not follows.",
    icon: Sparkles,
  },
  {
    title: "Global Delivery",
    description:
      "With delivery centers across 15+ countries, we provide 24/7 support with local expertise and global scale.",
    icon: Cloud,
  },
  {
    title: "Measurable Impact",
    description:
      "Every engagement is outcome-driven. We define success metrics upfront and deliver transparent, measurable results.",
    icon: BarChart3,
  },
];
