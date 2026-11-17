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
  phone?: string;
  languages?: string[];
  visaStatus?: string;
  avatar: string;
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

export interface ToolItem {
  name: string;
  category: 'Mobile & Web' | 'SQA & Testing' | 'Backend & Cloud' | 'Low-Code & Automation' | 'PM & Tracking' | 'Office & Documentation' | 'Integrations & APIs';
  context: string;
  badge?: string;
  icon?: string;
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
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
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
  tools: ToolItem[];
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
    location: "Sialkot, Punjab, Pakistan",
    status: "Open to relocation (UAE / GCC), available within 1 month. Also open to roles in Lahore.",
    relocation: "Open to UAE / GCC & Lahore",
    availability: "Available within 1 month",
    linkedin: "https://www.linkedin.com/in/afaqmehmood-500327259",
    portfolioUrl: "https://afaq-portfolio.lovable.app",
    cv: "/Afaq_Mehmood_Resume.pdf",
    email: "afaqmehmood3179@gmail.com",
    phone: "+92 326 177 9448",
    languages: ["English", "Urdu", "Punjabi"],
    visaStatus: "Sponsorship required"
  },

  experience: [
    {
      company: "Patronecs Software Company",
      role: "Senior Software Developer",
      period: "Jun 2023 – Present",
      location: "Sialkot / Hybrid",
      description:
        "Gathered and verified client requirements, then managed development end to end. Built the frontend, implemented the database schema and backend, and tested every flow before handover to QA for final testing. Performed QA across mobile, web, and admin panels: manual functional, regression, and user acceptance testing, with Android and iOS checks before store release. Wrote test cases, reported and tracked bugs to resolution using ClickUp, Trello, and Jira. Tested Firebase security rules and Supabase RLS policies for multi-tenant isolation and RBAC, and validated APIs with Postman.",
      highlights: [
        "Delivered 5 major projects — multi-tenant SaaS, wellness, engagement, and fintech apps — published on Google Play Store and Apple App Store",
        "Built 'Outdoor Share', a multi-tenant vehicle rental platform (mobile, web, admin panel) on FlutterFlow and Firebase, extended into 3 synced web apps",
        "Published 'Well Quest' (Apple App Store) and 'Sole by Soleties' (Google Play & Apple App Store), both with real-time engagement features",
        "Engineered 'Company Valuation Tool' (Supabase, advanced RLS) and 'ForeCash', a subscription-based forecasting app",
        "Designed Firebase security rules and Supabase RLS policies across all production apps for multi-tenant isolation and RBAC",
        "Integrated Stripe, RevenueCat, ChatGPT API, DocuSeal, and Brevo for payments, AI chat, e-signatures, and automation",
        "Configured Figma MCP and FlutterFlow MCP with Claude AI to accelerate UI-to-component delivery",
        "Prepared project documentation, reports, data sheets, and presentations using Microsoft Word, Excel, and PowerPoint"
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
        "Comprehensive computer science foundations: Software Testing, Verification & Validation, Data Structures & Advanced Algorithms, Distributed Systems, Cloud Architecture, and Relational Database Design."
    },
    {
      degree: "Intermediate, Computer Science",
      institution: "Superior College, Sambrial",
      period: "2017 – 2019",
      location: "Sambrial, Pakistan",
      details:
        "Mathematics, Computer Science fundamentals, Object-Oriented Programming principles, and Database foundations."
    }
  ],

  // Comprehensive Tool Matrix covering EVERY tool and skill from Afaq's resume
  tools: [
    // Mobile & Web
    { name: "FlutterFlow", category: "Mobile & Web", context: "Primary visual & low-code mobile framework; delivered 8+ production apps to stores", badge: "Core", icon: "📱" },
    { name: "Dart", category: "Mobile & Web", context: "Custom functions, state actions, API integrations, and custom widgets in Flutter", badge: "Core", icon: "🎯" },
    { name: "React.js", category: "Mobile & Web", context: "Component architecture, interactive SPAs, and administrative web portals", badge: "Core", icon: "⚛️" },
    { name: "ASP.NET MVC", category: "Mobile & Web", context: "Enterprise C# backend controllers, relational models, and secure RESTful endpoints", badge: "Production", icon: "🔷" },
    { name: "TypeScript", category: "Mobile & Web", context: "Strict typing across client codebases and contract validation", badge: "Production", icon: "📘" },
    { name: "App Store Publishing", category: "Mobile & Web", context: "App Store Connect, Certificates, Provisioning Profiles, TestFlight, and Apple Guideline compliance", badge: "Shipped", icon: "🍎" },
    { name: "Google Play Console", category: "Mobile & Web", context: "AAB releases, Internal/Closed testing tracks, store listings, and Play Console compliance", badge: "Shipped", icon: "🤖" },

    // SQA & Testing
    { name: "Manual Functional Testing", category: "SQA & Testing", context: "End-to-end user flows, edge cases, negative testing, and business rule verification", badge: "Core", icon: "🔍" },
    { name: "Regression Testing", category: "SQA & Testing", context: "Systematic regression matrices verified prior to any production store release", badge: "Core", icon: "🔄" },
    { name: "User Acceptance Testing (UAT)", category: "SQA & Testing", context: "Requirement alignment, client criteria verification, and release sign-off", badge: "Core", icon: "✅" },
    { name: "Test Case Design & Writing", category: "SQA & Testing", context: "Boundary value analysis, equivalence partitioning, test scenarios, and matrices", badge: "Core", icon: "📝" },
    { name: "Bug Reporting & Tracking", category: "SQA & Testing", context: "Comprehensive tickets with reproduction steps, logs, severity triage, and verification", badge: "Core", icon: "🐞" },
    { name: "Postman (API Testing)", category: "SQA & Testing", context: "API collections, automated assertions, token headers, status codes, and latency checks", badge: "Core", icon: "🚀" },
    { name: "Security-Rule Testing", category: "SQA & Testing", context: "Penetration checks for unauthorized reads/writes and multi-tenant data leakage", badge: "Specialist", icon: "🛡️" },

    // Backend, Cloud & Security
    { name: "Firebase (BaaS)", category: "Backend & Cloud", context: "Firestore NoSQL, Cloud Functions, Authentication, Cloud Messaging, and Storage", badge: "Core", icon: "🔥" },
    { name: "Supabase (BaaS)", category: "Backend & Cloud", context: "Managed PostgreSQL, Realtime channels, Edge Functions, and Storage buckets", badge: "Core", icon: "⚡" },
    { name: "PostgreSQL", category: "Backend & Cloud", context: "Relational schema design, indexes, foreign keys, views, and SQL queries", badge: "Core", icon: "🐘" },
    { name: "Firebase Security Rules", category: "Backend & Cloud", context: "Fine-grained document authorization, multi-tenant isolation, and payload validation", badge: "Specialist", icon: "🔒" },
    { name: "Supabase RLS", category: "Backend & Cloud", context: "Advanced Row-Level Security policies enforcing strict tenant boundaries and RBAC", badge: "Specialist", icon: "🛡️" },
    { name: "Role-Based Access Control (RBAC)", category: "Backend & Cloud", context: "Multi-tenant role permissions separating Admins, Managers, and End-Users", badge: "Specialist", icon: "👥" },
    { name: "REST APIs", category: "Backend & Cloud", context: "Endpoint contracts, JSON payloads, pagination, JWT authentication, and error codes", badge: "Core", icon: "🌐" },

    // Low-Code, Automation & Enterprise
    { name: "Retool", category: "Low-Code & Automation", context: "Custom enterprise internal portals, logistics trackers, and customer support consoles", badge: "Enterprise", icon: "🛠️" },
    { name: "Podio", category: "Low-Code & Automation", context: "Real estate workflow automation, calculation fields, and lead-to-contract pipelines", badge: "Enterprise", icon: "🏢" },
    { name: "GoHighLevel", category: "Low-Code & Automation", context: "Multi-channel marketing automation, lead scoring, automated SMS/email sequences", badge: "Enterprise", icon: "📈" },
    { name: "Airtable", category: "Low-Code & Automation", context: "Relational client databases, automated triggers, and form collection workflows", badge: "Production", icon: "📊" },
    { name: "Lovable", category: "Low-Code & Automation", context: "Full-stack rapid web app prototyping, iterative UI delivery, and modern components", badge: "Modern", icon: "💜" },
    { name: "Replit", category: "Low-Code & Automation", context: "Rapid backend prototyping, webhook receivers, and microservices testing", badge: "Modern", icon: "💻" },
    { name: "Softr.io & Tape", category: "Low-Code & Automation", context: "Client portals, secure database frontends, and external stakeholder consoles", badge: "Production", icon: "🧩" },

    // AI & Modern Dev Tools
    { name: "Claude AI", category: "Low-Code & Automation", context: "AI-assisted code generation, architecture design, test case creation, and review", badge: "AI", icon: "🧠" },
    { name: "ChatGPT API", category: "Low-Code & Automation", context: "Embedded LLM conversational support, context prompts, and automated customer assistance", badge: "AI", icon: "🤖" },
    { name: "MCP (Model Context Protocol)", category: "Low-Code & Automation", context: "Integrating automated dev workflows, context servers, and agentic AI tooling", badge: "Cutting-Edge", icon: "🔗" },
    { name: "Figma MCP", category: "Low-Code & Automation", context: "Accelerating design-to-component workflows directly from Figma designs", badge: "Cutting-Edge", icon: "🎨" },
    { name: "FlutterFlow MCP", category: "Low-Code & Automation", context: "Automating and accelerating mobile UI-to-component delivery via AI tool connections", badge: "Cutting-Edge", icon: "⚡" },

    // Project Management & Tracking
    { name: "ClickUp", category: "PM & Tracking", context: "Sprint boards, task dependencies, QA issue tracking, and delivery timelines", badge: "Daily", icon: "📋" },
    { name: "Trello", category: "PM & Tracking", context: "Kanban workflow visualization, release backlogs, and milestone management", badge: "Daily", icon: "📌" },
    { name: "Jira", category: "PM & Tracking", context: "Agile sprints, user stories, bug lifecycle, and acceptance criteria tracking", badge: "Daily", icon: "📊" },

    // Office Suite & Documentation
    { name: "Microsoft Word", category: "Office & Documentation", context: "Technical documentation, system requirement specs (SRS), templates, formatting", badge: "Expert", icon: "📄" },
    { name: "Microsoft Excel", category: "Office & Documentation", context: "Data entry, formulas, pivot tables, QA metric reporting, and data management", badge: "Expert", icon: "📈" },
    { name: "Microsoft PowerPoint", category: "Office & Documentation", context: "Executive presentations, architecture walkthroughs, and client pitch decks", badge: "Expert", icon: "📊" },
    { name: "Document Controller", category: "Office & Documentation", context: "Compliance tracking, versioning, release changelogs, and document archiving", badge: "Certified", icon: "🗄️" },

    // Integrations & Payments
    { name: "Stripe & Stripe Connect", category: "Integrations & APIs", context: "Payment intents, marketplace escrow, payouts, webhooks, and subscriptions", badge: "Core", icon: "💳" },
    { name: "RevenueCat", category: "Integrations & APIs", context: "In-app purchases, iOS/Android subscription paywalls, and customer entitlements", badge: "Core", icon: "💰" },
    { name: "DocuSeal & DocuSign", category: "Integrations & APIs", context: "E-signature embedded contracts, document generation, and status webhooks", badge: "Production", icon: "✍️" },
    { name: "Brevo & BulkSMS", category: "Integrations & APIs", context: "Transactional emails, automated SMS delivery, and notification pipelines", badge: "Production", icon: "✉️" },
    { name: "Google Maps API", category: "Integrations & APIs", context: "Geocoding, interactive location search, route tracking, and custom map pins", badge: "Production", icon: "🗺️" }
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
      platforms: ["App Store", "Play Store", "Web"],
      whatIDid: [
        "Architected end-to-end rental flow with identity verification and e-signatures via DocuSeal",
        "Integrated Stripe Connect for multi-party secure escrow payments and deposit handling",
        "Built AI chat customer support integration and real-time messaging between renters and hosts",
        "Conducted end-to-end regression testing and handled App Store & Play Store publishing"
      ],
      color: "#10b981",
      screenshot: "/screens/outdoor-share.png",
      featured: true,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.mycompany.myoutdoorshareffapp",
      appStoreUrl: "https://apps.apple.com/us/app/outdoorshare/id6746942574",
      webUrl: "https://outdoorshare.app"
    },
    {
      id: "well-quest",
      title: "Well Quest",
      subtitle: "Wellness & Habit-Tracking",
      description:
        "Wellness and habit-tracking app with personalised programs, progress analytics and subscription tiers.",
      category: "Mobile Apps",
      tech: ["FlutterFlow", "Supabase", "RevenueCat"],
      platforms: ["App Store"],
      whatIDid: [
        "Implemented personalized wellness program algorithms and interactive habit analytics",
        "Configured tiered in-app subscriptions and paywalls using RevenueCat",
        "Designed PostgreSQL schema with Row-Level Security (RLS) on Supabase",
        "Led release QA across iOS and Android devices ensuring zero crash rates on launch"
      ],
      color: "#06b6d4",
      screenshot: "/screens/well-quest.png",
      featured: true,
      appStoreUrl: "https://apps.apple.com/us/app/wellquest-wellness-tracker/id6764549163"
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
      featured: true,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.soleapp.app",
      appStoreUrl: "https://apps.apple.com/us/app/sole-by-soleties/id6766420640"
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
      featured: true,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.mycompany.forecash",
      appStoreUrl: "https://apps.apple.com/us/app/forecash-financial-forecasting/id6747763876"
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
