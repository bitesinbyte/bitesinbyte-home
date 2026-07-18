export interface ProductHighlight {
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  cover: string;
  tags: string[];
  highlights: ProductHighlight[];
  featured?: boolean;
  comingSoon?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  blog: string;
  x: string;
  linkedin: string;
}

export const socialLinks: SocialLinks = {
  facebook: "https://www.facebook.com/lamplitlabs",
  instagram: "https://www.instagram.com/lamplitlabs",
  blog: "https://blogs.lamplitlabs.com",
  x: "https://x.com/lamplitlabs",
  linkedin: "https://www.linkedin.com/company/lamplitlabs",
};

export const products: Product[] = [
  {
    slug: "amistio",
    name: "Amistio",
    title: "A personal AI teacher for anything you want to learn",
    description:
      "Talk to Ami and a team of AI teaching agents that plan your learning Journey, assign and grade real practice, and adapt to you — for any subject.",
    longDescription:
      "Amistio is a general-purpose learning platform built around a real learning loop: you talk, Ami plans, you practice, your work gets graded, and the next step adapts to how you did. The same loop serves languages, coding, math, music, and exam prep through pluggable subject packs. Start from scratch or bring your own notes, slides, or syllabus and get a structured, graded Journey built around them.",
    url: "https://www.amistio.com",
    cover: "/covers/amistio.svg",
    tags: ["AI", "Learning", "Education"],
    highlights: [
      { title: "Any Subject", description: "One platform for languages, code, math, music, and exam prep. New subjects ship as packs, so the catalog keeps growing." },
      { title: "Bring Your Own Materials", description: "Import your notes, slides, PDFs, or a syllabus and Ami builds a structured, graded Journey around them." },
      { title: "Graded Feedback", description: "Assignments are scored against real rubrics with specific, actionable feedback — not a generic 'good job'." },
      { title: "Adapts to You", description: "Difficulty, pace, and focus follow your stated preferences and your actual results, session after session." },
    ],
    featured: true,
  },
  {
    slug: "kenntnistrainer",
    name: "Kenntnistrainer",
    title: "AI-powered Kenntnisprufung simulation and training",
    description:
      "Kenntnisprufung preparation with AI simulation: a structured 7-step case flow, AI feedback, spaced repetition, and medical communication in German.",
    longDescription:
      "Kenntnistrainer helps foreign doctors in Germany prepare for the Kenntnisprufung with guided case-based training. It combines exam-style simulation, feedback loops, and focused medical language practice.",
    url: "https://www.kenntnistrainer.de",
    cover: "/covers/kenntnistrainer.svg",
    tags: ["AI", "Medical", "Training"],
    highlights: [
      { title: "7-Step Case Flow", description: "Structured exam simulation following the official Kenntnisprufung format step by step." },
      { title: "AI Feedback", description: "Get instant, detailed feedback on your responses powered by AI evaluation." },
      { title: "Spaced Repetition", description: "Smart review scheduling so you retain medical knowledge efficiently." },
      { title: "German Medical Language", description: "Practice medical communication in German with realistic scenarios." },
    ],
    featured: true,
  },
  {
    slug: "fachsprachprufung",
    name: "Fachsprachprufung",
    title: "AI-powered FSP simulation and training",
    description:
      "FSP preparation with AI simulation: doctor-patient conversation, documentation, and doctor-to-doctor handover in German.",
    longDescription:
      "Fachsprachprufung supports foreign doctors preparing for the language-focused medical exam in Germany. It trains practical workflows from patient interaction to handover communication.",
    url: "https://www.fachsprachtrainer.de",
    cover: "/covers/fsp.svg",
    tags: ["AI", "Medical", "Language"],
    highlights: [
      { title: "Patient Conversation", description: "Practice realistic doctor-patient dialogues with AI-simulated patients." },
      { title: "Documentation Training", description: "Learn to write medical reports and referral letters in German." },
      { title: "Doctor-to-Doctor Handover", description: "Train structured handover communication with medical peers." },
      { title: "Exam-Ready Practice", description: "Covers all three FSP exam sections in a single training flow." },
    ],
    featured: true,
  },
  {
    slug: "leben-in-deutschland",
    name: "Leben in Deutschland",
    title: "Citizenship test prep for Germany",
    description:
      "Prepare for the German citizenship test with a free platform and comprehensive resources.",
    longDescription:
      "Leben in Deutschland offers focused preparation for the Einburgerungstest with complete question coverage, region-specific content, and a simple practice flow.",
    url: "https://www.lebenindeutschland.org",
    cover: "/covers/leben.svg",
    tags: ["Education", "Germany", "Integration"],
    highlights: [
      { title: "310 Official Questions", description: "Complete coverage of all questions from the official question catalog." },
      { title: "Region-Specific Content", description: "Practice with questions specific to your Bundesland." },
      { title: "Progress Tracking", description: "See which topics you have mastered and where you need more practice." },
      { title: "Free to Use", description: "No account required, no paywalls. Just start practicing." },
    ],
    featured: true,
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    title: "Everyday utilities for developers",
    description:
      "A growing collection of browser-based developer utilities, including JSON formatter, Base64, UUID, and more.",
    longDescription:
      "Developer Tools is a practical toolkit for common engineering tasks. It focuses on speed, usability, and free access directly in the browser.",
    url: "https://tools.lamplitlabs.com",
    cover: "/covers/tools.svg",
    tags: ["Developer Tools", "Utilities", "Web"],
    highlights: [
      { title: "JSON Formatter", description: "Format, validate, and minify JSON with syntax highlighting." },
      { title: "Base64 Encoder/Decoder", description: "Encode and decode Base64 strings instantly." },
      { title: "UUID Generator", description: "Generate v4 UUIDs with one click." },
      { title: "Browser-Based", description: "All tools run entirely in your browser. Nothing is sent to a server." },
    ],
    featured: true,
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    title: "Create an ATS-optimized resume",
    description:
      "Build professional, ATS-friendly resumes in minutes with clear structure and practical guidance.",
    longDescription:
      "Resume Builder helps job seekers create resumes that read well for both recruiters and applicant tracking systems, improving clarity and discoverability.",
    url: "https://resume.lamplitlabs.com",
    cover: "/covers/resume.svg",
    tags: ["Productivity", "Career"],
    highlights: [
      { title: "ATS-Optimized", description: "Structured output that applicant tracking systems can parse correctly." },
      { title: "Professional Templates", description: "Clean, recruiter-friendly layouts you can customize." },
      { title: "Quick Setup", description: "Fill in your details and get a polished resume in minutes." },
      { title: "Export Ready", description: "Download your resume as PDF, ready to submit." },
    ],
  },
  {
    slug: "edmx-tools",
    name: "EDMX Tools",
    title: "Tools for EDMX and OData metadata",
    description:
      "A set of tools for EDMX and OData metadata files, including explorer, trimmer, and conversion utilities.",
    longDescription:
      "EDMX Tools supports teams working with enterprise metadata by making exploration and transformation of EDMX and OData schemas straightforward.",
    url: "https://edmx.lamplitlabs.com",
    cover: "/covers/edmx.svg",
    tags: ["Developer Tools", ".NET", "OData"],
    highlights: [
      { title: "EDMX Explorer", description: "Browse entity types, properties, and associations visually." },
      { title: "EDMX Trimmer", description: "Remove unused entities to reduce metadata file size." },
      { title: "OpenAPI Converter", description: "Convert EDMX metadata to OpenAPI specification." },
      { title: "JSON Converter", description: "Transform EDMX XML into structured JSON for easier processing." },
    ],
  },
  {
    slug: "azure-drawio-assets",
    name: "Azure Draw.io Assets",
    title: "Azure icons for architecture diagrams",
    description:
      "Browse Azure service icons for architecture diagrams, synced from official Microsoft icon sets.",
    longDescription:
      "Azure Draw.io Assets provides a searchable catalog of Azure architecture icons so teams can build clean and up-to-date diagrams quickly.",
    url: "https://azure-assets.lamplitlabs.com",
    cover: "/covers/azure-assets.svg",
    tags: ["Azure", "Draw.io", "Architecture"],
    highlights: [
      { title: "643+ Icons", description: "Comprehensive collection of Azure service icons for diagrams." },
      { title: "Auto-Synced", description: "Continuously updated from official Microsoft Azure icon sets." },
      { title: "Draw.io Ready", description: "Icons formatted and ready to drag into your Draw.io diagrams." },
      { title: "Searchable Catalog", description: "Find the right icon quickly with built-in search." },
    ],
  },
  {
    slug: "azure-compliance-matrix",
    name: "Azure Compliance Matrix",
    title: "Azure services compliance coverage",
    description:
      "Interactive compliance coverage matrix for Azure services with search and filtering across major frameworks.",
    longDescription:
      "Azure Compliance Matrix helps security and compliance teams explore certification coverage across Azure and Azure Government offerings in one place.",
    url: "https://azure-compliance.lamplitlabs.com",
    cover: "/covers/azure-compliance.svg",
    tags: ["Azure", "Compliance", "Security"],
    highlights: [
      { title: "17 Frameworks", description: "Coverage across ISO 27001, SOC, HIPAA, PCI DSS, and more." },
      { title: "Interactive Matrix", description: "Search, filter, and explore compliance coverage by service." },
      { title: "Azure Government", description: "Includes compliance data for both Azure and Azure Government." },
      { title: "Always Current", description: "Data sourced and updated from official Microsoft documentation." },
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Blog", href: socialLinks.blog, external: true },
  { label: "Contact", href: "#contact" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
