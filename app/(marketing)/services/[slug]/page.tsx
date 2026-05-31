import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { services } from "@/lib/constants";

const serviceDetails: Record<string, {
  overview: string;
  capabilities: string[];
  process: { step: string; title: string; description: string }[];
  technologies: string[];
}> = {
  "ai-ml": {
    overview: "Transform your business with intelligent automation and predictive analytics. Our AI & Machine Learning practice helps enterprises harness the power of data-driven decision making, from custom model development to production-ready AI systems that deliver measurable ROI.",
    capabilities: ["Custom ML Model Development", "Natural Language Processing", "Computer Vision Solutions", "Predictive Analytics & Forecasting", "Generative AI Integration", "MLOps & Model Deployment", "AI Strategy Consulting", "Conversational AI & Chatbots"],
    process: [
      { step: "01", title: "Discovery", description: "Assess your data landscape and identify high-impact AI opportunities" },
      { step: "02", title: "Design", description: "Architect the solution with the right models, data pipelines, and infrastructure" },
      { step: "03", title: "Develop", description: "Build, train, and validate models with rigorous testing and evaluation" },
      { step: "04", title: "Deploy", description: "Production deployment with monitoring, retraining pipelines, and continuous improvement" },
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "AWS SageMaker", "Azure ML", "Kubernetes", "MLflow"],
  },
  "cloud": {
    overview: "Accelerate your cloud journey with multi-cloud strategy, seamless migration, and cloud-native application development. We help enterprises modernize their infrastructure while optimizing costs and improving resilience.",
    capabilities: ["Cloud Migration & Modernization", "Multi-Cloud Architecture", "Cloud-Native Development", "Kubernetes & Container Orchestration", "Serverless Solutions", "Cloud Cost Optimization", "Infrastructure as Code", "Cloud Security & Compliance"],
    process: [
      { step: "01", title: "Assess", description: "Evaluate current infrastructure and define cloud readiness" },
      { step: "02", title: "Architect", description: "Design target cloud architecture with migration strategy" },
      { step: "03", title: "Migrate", description: "Execute migration with zero downtime and data integrity" },
      { step: "04", title: "Optimize", description: "Continuous optimization of performance, cost, and security" },
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Docker", "CloudFormation", "Pulumi"],
  },
  "cybersecurity": {
    overview: "Protect your enterprise with comprehensive cybersecurity solutions. From SOC-as-a-service to zero-trust architecture, we help organizations build resilient security postures that defend against evolving threats.",
    capabilities: ["SOC-as-a-Service", "Zero Trust Architecture", "Compliance & Governance", "Penetration Testing", "Incident Response", "Identity & Access Management", "Cloud Security", "Security Awareness Training"],
    process: [
      { step: "01", title: "Audit", description: "Comprehensive security assessment and vulnerability analysis" },
      { step: "02", title: "Design", description: "Architecture design with defense-in-depth strategy" },
      { step: "03", title: "Implement", description: "Deploy security controls, monitoring, and response systems" },
      { step: "04", title: "Monitor", description: "24/7 threat detection, incident response, and continuous improvement" },
    ],
    technologies: ["CrowdStrike", "Splunk", "Palo Alto", "Okta", "HashiCorp Vault", "AWS Security Hub", "Azure Sentinel", "Snyk"],
  },
  "data-analytics": {
    overview: "Unlock insights from your data with modern analytics platforms. We build enterprise data architectures that enable real-time decision making, from data engineering pipelines to interactive dashboards and advanced analytics.",
    capabilities: ["Data Engineering & Pipelines", "Business Intelligence", "Data Lakehouse Architecture", "Real-Time Analytics", "Data Governance", "Advanced Analytics & Statistical Modeling", "Data Visualization", "DataOps"],
    process: [
      { step: "01", title: "Discover", description: "Map data sources, quality, and business requirements" },
      { step: "02", title: "Design", description: "Architect modern data platform with governance framework" },
      { step: "03", title: "Build", description: "Implement data pipelines, transformations, and analytics layer" },
      { step: "04", title: "Deliver", description: "Deploy dashboards, self-service analytics, and monitoring" },
    ],
    technologies: ["Snowflake", "Databricks", "dbt", "Apache Spark", "Kafka", "Tableau", "Power BI", "Airflow"],
  },
  "digital-transformation": {
    overview: "Reimagine your business with end-to-end digital transformation. We help enterprises modernize operations, enhance customer experiences, and create new digital revenue streams through strategic technology adoption.",
    capabilities: ["Digital Strategy & Roadmapping", "Process Automation", "Customer Experience Transformation", "Legacy Modernization", "Digital Product Development", "Change Management", "Innovation Labs", "Technology Assessment"],
    process: [
      { step: "01", title: "Envision", description: "Define digital vision, strategy, and transformation roadmap" },
      { step: "02", title: "Design", description: "Architect solutions with user-centric design thinking" },
      { step: "03", title: "Execute", description: "Agile delivery with iterative development and feedback loops" },
      { step: "04", title: "Scale", description: "Roll out across organization with change management support" },
    ],
    technologies: ["React", "Next.js", "Node.js", "Microservices", "APIs", "RPA", "Low-Code Platforms", "IoT"],
  },
  "software-engineering": {
    overview: "Build world-class software with custom development, quality assurance, and modern DevOps practices. Our engineering teams deliver scalable, maintainable, and high-performance applications that meet enterprise standards.",
    capabilities: ["Custom Software Development", "API Design & Development", "Quality Assurance & Testing", "DevOps & CI/CD", "Mobile Development", "Microservices Architecture", "Technical Debt Reduction", "Performance Engineering"],
    process: [
      { step: "01", title: "Plan", description: "Requirements analysis, architecture design, and sprint planning" },
      { step: "02", title: "Build", description: "Agile development with TDD, code reviews, and CI/CD" },
      { step: "03", title: "Test", description: "Comprehensive QA with automated testing and security scanning" },
      { step: "04", title: "Ship", description: "Production deployment with monitoring and continuous delivery" },
    ],
    technologies: ["TypeScript", "React", "Node.js", "Python", "Go", "PostgreSQL", "Redis", "GitHub Actions"],
  },
  "consulting": {
    overview: "Strategic advisory and process optimization to align technology with business goals. Our consultants bring deep industry expertise to help enterprises make informed technology decisions and maximize ROI.",
    capabilities: ["Technology Strategy", "Process Optimization", "Vendor Selection", "Architecture Reviews", "Cost Optimization", "Risk Assessment", "Organizational Transformation", "Technology Due Diligence"],
    process: [
      { step: "01", title: "Engage", description: "Understand business context, challenges, and objectives" },
      { step: "02", title: "Analyze", description: "Deep-dive assessment of current state and opportunities" },
      { step: "03", title: "Recommend", description: "Strategic recommendations with detailed implementation roadmap" },
      { step: "04", title: "Support", description: "Ongoing advisory and implementation support" },
    ],
    technologies: ["TOGAF", "Agile", "SAFe", "ITIL", "Six Sigma", "OKRs", "Design Thinking", "Lean"],
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = services.find((s) => s.slug === slug);
    return {
      title: service?.title ?? "Service",
      description: service?.description ?? "ASCIRVO service offering",
    };
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const details = serviceDetails[slug];

  if (!service || !details) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">
            ← All Services
          </Link>
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white mb-4`}>
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            {details.overview}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <SectionWrapper id="capabilities" background="white">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">Capabilities</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">What we deliver</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.capabilities.map((cap) => (
            <div key={cap} className="flex items-start gap-3 rounded-xl border border-border p-4 transition-all hover:border-brand-electric/20 hover:shadow-sm">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
              <span className="text-sm font-medium text-brand-gray-700">{cap}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper id="process" background="off-white">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">Our Process</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">How we work</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.process.map((p) => (
            <div key={p.step} className="relative rounded-2xl border border-border bg-white p-6">
              <span className="text-4xl font-bold text-brand-electric/10 font-[var(--font-sora)]">{p.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-brand-navy font-[var(--font-sora)]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">{p.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Technologies */}
      <SectionWrapper id="technologies" background="white">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">Tech Stack</span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">Technologies we use</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {details.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-border bg-brand-off-white px-5 py-2.5 text-sm font-medium text-brand-gray-700 transition-colors hover:border-brand-electric/20 hover:text-brand-navy">
              {tech}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper id="cta" background="navy">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-[var(--font-sora)] md:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Let&apos;s discuss how {service.title.toLowerCase()} can transform your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-xl active:scale-[0.98]"
          >
            Start a Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
