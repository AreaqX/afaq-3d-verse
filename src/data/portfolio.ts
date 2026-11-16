export interface Profile {
  name: string;
  title: string;
  roles: string[];
  tagline: string;
  summary: string;
  location: string;
  status: string;
  relocation: string;
  availability: string;
  linkedin: string;
  portfolioUrl: string;
  cv: string;
  email: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export interface SkillNode {
  name: string;
  context: string;
}

export interface SkillCategory {
  name: string;
  ringIndex: number;
  color: string;
  skills: SkillNode[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Mobile Apps' | 'Internal Tools' | 'Automation' | 'Research';
  tech: string[];
  platforms?: ('App Store' | 'Play Store' | 'Web')[];
  whatIDid: string[];
  color: string;
  screenshot?: string;
  featured: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  category: 'Research';
  description: string;
  tags: string[];
}

export interface PortfolioData {
  profile: Profile;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: Project[];
  research: ResearchItem[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Afaq Mehmood",
    title: "Mobile App Developer · Software Engineer · SQA Engineer",
    roles: [
      "Mobile App Developer",
      "Software Engineer",
      "SQA Engineer"
    ],
    tagline: "I build mobile apps that ship, and test them until they don't break.",
    summary:
      "3+ years shipping production mobile apps and web platforms, with a strong focus on secure backends, payments and rigorous testing. I take products from idea to the App Store and Play Store, and I test them like a user who wants them to fail.",
    location: "Sialkot, Pakistan",
    status: "Open to relocation (UAE / GCC), available within 1 month. Also open to roles in Lahore.",
    relocation: "Open to UAE / GCC & Lahore",
    availability: "Available within 1 month",
    linkedin: "https://www.linkedin.com/in/afaqmehmood-500327259",
    portfolioUrl: "https://afaq-portfolio.lovable.app",
    cv: "/Afaq_Mehmood_Resume.pdf",
    email: "YOUR_EMAIL_HERE"
  },

  experience: [
    {
      company: "Patronecs Software Company",
      role: "Senior Software Developer",
      period: "Jun 2023 – Present",
      location: "Sialkot / Hybrid",
      description:
        "Built cross-platform mobile apps, admin portals and internal tools; automated real estate workflows with third-party integrations; secured backends with role-based access control and row-level security; handled payments and subscriptions; owned testing and QA on releases.",
      highlights: [
        "Architected and deployed 8+ cross-platform mobile applications on App Store and Google Play Store",
        "Engineered real estate automation pipelines integrating Podio, DocuSeal, and custom webhook services",
        "Configured secure authentication, RBAC, and Supabase Row-Level Security (RLS) policies",
        "Integrated multi-provider payment systems including Stripe Connect and RevenueCat subscriptions",
        "Established QA release protocols, regression test matrices, and automated API validation"
      ]
    }
  ],

  education: [
    {
      degree: "BS Software Engineering",
      institution: "University of Sialkot",
      period: "2019 – 2023",
      location: "Sialkot, Pakistan",
      details:
        "Rigorous coursework in Data Structures, Algorithms, Software Testing & Quality Assurance, Mobile Application Development, and Distributed Systems."
    }
  ],

  skills: [
    {
      name: "Mobile Development",
      ringIndex: 0,
      color: "#00E5FF", // Electric Cyan
      skills: [
        { name: "FlutterFlow", context: "Primary rapid mobile development framework for 8+ published apps" },
        { name: "Dart", context: "Custom functions, state actions, and custom widgets" },
        { name: "Cross-platform apps", context: "Single-codebase delivery for both iOS and Android" },
        { name: "Push notifications", context: "FCM & APNs targeted campaigns, deep links & payload routing" },
        { name: "App Store & Play Store", context: "Full release lifecycle, testflight tracks, review compliance" }
      ]
    },
    {
      name: "Software Engineering",
      ringIndex: 1,
      color: "#EDEDED", // Off-white
      skills: [
        { name: "React", context: "Modern hooks, modular component architecture, and responsive SPAs" },
        { name: "TypeScript", context: "Strict type safety across client interfaces and data contracts" },
        { name: "Firebase", context: "Firestore, cloud functions, authentication, and offline persistence" },
        { name: "Supabase", context: "PostgreSQL relational schemas, edge functions, and real-time streams" },
        { name: "REST APIs", context: "Endpoint design, token-based auth, pagination, and error contracts" },
        { name: "Stripe", context: "Payment intents, checkout sessions, webhook handlers, and connect" },
        { name: "RevenueCat", context: "In-app purchases, entitlement management, and subscription analytics" },
        { name: "Retool", context: "Enterprise internal dashboards, SQL queries, and administrative tooling" },
        { name: "Podio automation", context: "Custom enterprise CRM workflows and calculation fields" },
        { name: "Security rules & RLS", context: "Row-level security policies and granular role-based permissions" }
      ]
    },
    {
      name: "SQA & Testing",
      ringIndex: 2,
      color: "#2DD4BF", // Teal Mint
      skills: [
        { name: "Test case design", context: "Boundary value analysis, equivalence partitioning, edge cases" },
        { name: "Manual & exploratory", context: "Uncovering UX quirks, broken states, and abnormal user journeys" },
        { name: "Bug reporting", context: "Detailed reproduction steps, console logs, and severity triage" },
        { name: "Regression testing", context: "Pre-flight validation before every production release" },
        { name: "API testing", context: "Postman collections, payload validation, status codes, latency checks" },
        { name: "Release QA", context: "Device matrix testing across multiple screen sizes and OS versions" }
      ]
    }
  ],

  projects: [
    // 8 Featured Mobile Apps (show as 3D Phones in the constellation)
    {
      id: "outdoor-share",
      title: "Outdoor Share",
      subtitle: "Vehicle Rental Marketplace",
      description:
        "Vehicle rental marketplace with identity verification, payments, e-signature contracts and AI chat support.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Stripe", "DocuSeal", "Firebase"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Architected end-to-end rental flow with identity verification and e-signatures via DocuSeal",
        "Integrated Stripe Connect for multi-party secure escrow payments and deposit handling",
        "Built AI chat customer support integration and real-time messaging between renters and hosts",
        "Conducted end-to-end regression testing and handled App Store & Play Store publishing"
      ],
      color: "#10b981",
      screenshot: "/screens/outdoor-share.png",
      featured: true
    },
    {
      id: "well-quest",
      title: "Well Quest",
      subtitle: "Wellness & Habit-Tracking",
      description:
        "Wellness and habit-tracking app with personalised programs, progress analytics and subscription tiers.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Supabase", "RevenueCat"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Implemented personalized wellness program algorithms and interactive habit analytics",
        "Configured tiered in-app subscriptions and paywalls using RevenueCat",
        "Designed PostgreSQL schema with Row-Level Security (RLS) on Supabase",
        "Led release QA across iOS and Android devices ensuring zero crash rates on launch"
      ],
      color: "#06b6d4",
      screenshot: "/screens/well-quest.png",
      featured: true
    },
    {
      id: "sole-by-soleties",
      title: "Sole by Soleties",
      subtitle: "Footwear E-Commerce",
      description:
        "Footwear commerce app with catalog, cart, secure checkout and order tracking.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Firebase", "Stripe"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Developed seamless mobile shopping experience with dynamic catalog and real-time inventory",
        "Engineered 1-click checkout flow with Stripe payment sheet integration",
        "Configured push notifications for order lifecycle and shipment updates",
        "Executed thorough exploratory and edge-case testing for payment failure recovery"
      ],
      color: "#f59e0b",
      screenshot: "/screens/sole-by-soleties.png",
      featured: true
    },
    {
      id: "e-scrow",
      title: "E-Scrow",
      subtitle: "Contract & Escrow Platform",
      description:
        "Contract creation platform with in-app chat and subscription payments.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Firebase", "Stripe"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Created milestone-based escrow contracts workflow with dynamic PDF generation",
        "Built real-time encrypted messaging between contracting parties",
        "Implemented recurring billing and automated dispute resolution workflows",
        "Authored comprehensive test suites and verified security rules"
      ],
      color: "#8b5cf6",
      screenshot: "/screens/e-scrow.png",
      featured: true
    },
    {
      id: "starline-stepper",
      title: "Starline Stepper",
      subtitle: "Job & Skill Assessment",
      description:
        "Job listing and skill-assessment platform connecting employers and candidates.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Firebase"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Built dual-role portals for recruiters and job seekers with interactive skill evaluations",
        "Integrated automated candidate matching algorithms based on assessment scores",
        "Optimized Firestore queries and local caching for high concurrency",
        "Conducted performance and usability testing across low-end mobile devices"
      ],
      color: "#ec4899",
      screenshot: "/screens/starline-stepper.png",
      featured: true
    },
    {
      id: "local-bestie",
      title: "Local Bestie",
      subtitle: "Events & Housing Finder",
      description:
        "Location-based events and housing platform with smart alerts.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Google Maps", "Firebase"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Implemented radius-based geospatial queries with custom Google Maps clustering",
        "Created real-time localized push alerts for nearby events and vacant listings",
        "Designed intuitive map-to-card navigation interactions with 60 FPS transitions",
        "Verified location permission handling and offline state resilience"
      ],
      color: "#3b82f6",
      screenshot: "/screens/local-bestie.png",
      featured: true
    },
    {
      id: "heroz-school-system",
      title: "Heroz School System",
      subtitle: "School Activity & Fee Management",
      description:
        "School management for activity tracking and payments.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Firebase"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Engineered multi-role administrative platform for parents, teachers, and administrators",
        "Automated fee collection, fee slips generation, and digital payment receipts",
        "Built daily attendance, homework tracking, and performance reporting modules",
        "Conducted rigorous role-based access control (RBAC) vulnerability audits"
      ],
      color: "#14b8a6",
      screenshot: "/screens/heroz-school.png",
      featured: true
    },
    {
      id: "forecash",
      title: "Forecash",
      subtitle: "Financial Forecasting & Balance Prediction",
      description:
        "Financial forecasting app for transactions and future balance prediction.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Firebase"],
      platforms: ["App Store", "Play Store"],
      whatIDid: [
        "Built mathematical projection engine predicting account cash flow over 30/60/90 days",
        "Designed rich interactive charts for income vs expense categorization",
        "Implemented encrypted local biometric auth and data synchronization",
        "Tested calculation precision under multiple currency formats and edge cases"
      ],
      color: "#a855f7",
      screenshot: "/screens/forecash.png",
      featured: true
    },

    // Internal Tools
    {
      id: "cargo-mgmt",
      title: "Cargo Management System",
      subtitle: "Logistics Tracking & Dispatch",
      description:
        "Centralized logistics portal tracking fleet dispatches, shipment waybills, and driver assignments in real time.",
      category: "Internal Tools",
      tech: ["Retool", "REST APIs", "PostgreSQL"],
      platforms: ["Web"],
      whatIDid: [
        "Designed dynamic dashboard with live cargo telemetry and delivery status filters",
        "Connected PostgreSQL databases to synchronize driver assignments with billing",
        "Engineered automated route notifications via Twilio and email webhooks"
      ],
      color: "#0ea5e9",
      featured: false
    },
    {
      id: "customer-support-portal",
      title: "Customer Support Portal",
      subtitle: "Ticketing & Analytics Hub",
      description:
        "Omnichannel support desk providing ticket triage, SLA breach alerting, and team performance analytics.",
      category: "Internal Tools",
      tech: ["Retool", "Firebase", "Webhooks"],
      platforms: ["Web"],
      whatIDid: [
        "Constructed ticket routing engine based on agent skill sets and active queue depth",
        "Configured real-time Firebase listeners to display unread customer replies instantly",
        "Implemented SLA breach countdown timers with automated escalation"
      ],
      color: "#6366f1",
      featured: false
    },
    {
      id: "hr-management-portal",
      title: "HR Management Portal",
      subtitle: "Employees, Payroll & Reporting",
      description:
        "Automated human resources portal covering employee onboarding, leave tracking, and automated payroll calculations.",
      category: "Internal Tools",
      tech: ["Retool", "PostgreSQL", "Stripe"],
      platforms: ["Web"],
      whatIDid: [
        "Built role-based employee directory with confidential document management",
        "Automated salary slip calculation taking into account bonuses, leaves, and tax deductions",
        "Integrated custom export tools for monthly executive payroll audit reports"
      ],
      color: "#f43f5e",
      featured: false
    },
    {
      id: "company-valuation-tool",
      title: "Company Valuation Tool",
      subtitle: "Financial Scenario Modeling & PDF Reports",
      description:
        "Financial modeling system running DCF and multiple-based valuations with customized executive PDF export.",
      category: "Internal Tools",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      platforms: ["Web"],
      whatIDid: [
        "Implemented discounted cash flow (DCF) and EBITDA multiple calculation algorithms",
        "Built interactive sensitivity matrices responding to growth and discount rate toggles",
        "Developed serverless PDF report generation featuring charts and executive summaries"
      ],
      color: "#10b981",
      featured: false
    },

    // Automation
    {
      id: "real-estate-automation",
      title: "Real Estate Automation",
      subtitle: "Lead & Contract Workflows",
      description:
        "Automated CRM engine capturing incoming property leads, generating purchase contracts, and notifying agents.",
      category: "Automation",
      tech: ["Podio", "Webhooks", "REST APIs"],
      platforms: ["Web"],
      whatIDid: [
        "Automated incoming lead ingestion from multiple ad channels directly into Podio CRM",
        "Created webhook-triggered contract generation with pre-filled property and owner data",
        "Configured SMS follow-up drip campaigns with lead scoring and agent task assignment"
      ],
      color: "#84cc16",
      featured: false
    },
    {
      id: "custom-business-builder",
      title: "Custom Business Builder",
      subtitle: "Enterprise Workflow Architecture",
      description:
        "Tailored low-code enterprise automation architecture connecting sales pipelines with fulfillment teams.",
      category: "Automation",
      tech: ["Podio", "Zapier", "JavaScript"],
      platforms: ["Web"],
      whatIDid: [
        "Engineered end-to-end data pipelines connecting marketing webhooks to inventory management",
        "Developed JavaScript calculation rules handling commission calculations and margin thresholds",
        "Built automated milestone notifications for clients throughout the delivery cycle"
      ],
      color: "#eab308",
      featured: false
    },
    {
      id: "lead-management-system",
      title: "Lead Management System",
      subtitle: "Sales Pipelines & Multi-Channel Nurturing",
      description:
        "Multi-stage sales pipeline with automated SMS/email sequences, calendar booking, and attribution tracking.",
      category: "Automation",
      tech: ["GoHighLevel", "Webhooks", "Zapier"],
      platforms: ["Web"],
      whatIDid: [
        "Constructed automated 2-way SMS and email conversation flows with smart response handling",
        "Implemented calendar booking automation with no-show follow-up re-engagement",
        "Configured conversion tracking webhooks feeding back into paid advertising campaigns"
      ],
      color: "#06b6d4",
      featured: false
    }
  ],

  research: [
    {
      id: "res-1",
      title: "AI-Assisted App Prototyping",
      category: "Research",
      description:
        "Investigating rapid multimodal LLM workflows to convert wireframe sketches directly into responsive FlutterFlow component trees and state definitions.",
      tags: ["AI", "FlutterFlow", "UI Generation", "Rapid Prototyping"]
    },
    {
      id: "res-2",
      title: "Rapid Backend Prototyping",
      category: "Research",
      description:
        "Benchmarking declarative serverless schema generators that produce hardened PostgreSQL tables with production-grade Row-Level Security (RLS) in Supabase and Firebase.",
      tags: ["Supabase", "Firebase", "PostgreSQL", "RLS", "Security"]
    },
    {
      id: "res-3",
      title: "AI-Assisted Mobile Development Workflows",
      category: "Research",
      description:
        "Evaluating AI copilot agent integration for automated Dart unit testing, edge-case generation, regression test suites, and synthetic realistic test-data seeding.",
      tags: ["Dart", "Testing", "SQA Automation", "LLM Evals"]
    },
    {
      id: "res-4",
      title: "Exploring MCP for Automation-Connected AI Workflows",
      category: "Research",
      description:
        "Building Model Context Protocol (MCP) server endpoints bridging local developer tooling, device emulators, and CRM databases to autonomous AI engineering agents.",
      tags: ["Model Context Protocol", "Agentic Systems", "Automation", "Tool Use"]
    }
  ]
};
