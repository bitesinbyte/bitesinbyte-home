import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bites In Byte — Tools That Solve Real Problems",
    template: "%s | Bites In Byte",
  },
  description:
    "Bites In Byte builds practical tools that solve real problems. Home of Kenntnistrainer (KP exam prep), Leben in Deutschland (citizenship test), Resume Builder, and EDMX Tools.",
  metadataBase: new URL("https://www.bitesinbyte.com"),
  keywords: [
    "Bites In Byte",
    "bitesinbyte",
    "Kenntnistrainer",
    "Kenntnisprüfung",
    "KP exam",
    "Leben in Deutschland",
    "Einbürgerungstest",
    "German citizenship test",
    "Resume Builder",
    "ATS resume",
    "EDMX Tools",
    "OData",
    "developer tools",
    "software tools",
    "Germany",
  ],
  authors: [{ name: "Bites In Byte", url: "https://www.bitesinbyte.com" }],
  creator: "Bites In Byte",
  publisher: "Bites In Byte",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.bitesinbyte.com",
  },
  openGraph: {
    title: "Bites In Byte — Tools That Solve Real Problems",
    description:
      "Bites In Byte builds practical tools that solve real problems. Home of Kenntnistrainer, Leben in Deutschland, Resume Builder, and EDMX Tools.",
    url: "https://www.bitesinbyte.com",
    siteName: "Bites In Byte",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bites In Byte — Tools That Solve Real Problems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bites In Byte — Tools That Solve Real Problems",
    description:
      "Bites In Byte builds practical tools that solve real problems. Home of Kenntnistrainer, Leben in Deutschland, Resume Builder, and EDMX Tools.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

/* ── JSON-LD Structured Data ─────────────────────────────── */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bites In Byte",
  url: "https://www.bitesinbyte.com",
  logo: "https://www.bitesinbyte.com/icon-512.png",
  description:
    "A technology organization building practical tools that solve real problems — from medical exam prep to developer utilities.",
  foundingDate: "2020",
  sameAs: [
    "https://github.com/bitesinbyte",
    "https://www.instagram.com/bitesinbyte",
    "https://www.linkedin.com/company/bitesinbyte",
    "https://me.dm/@bitesinbyte",
    "https://www.threads.net/@bitesinbyte",
    "https://blogs.bitesinbyte.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@bitesinbyte.com",
    contactType: "customer support",
  },
};

const productsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kenntnistrainer",
    url: "https://www.kenntnistrainer.de",
    applicationCategory: "EducationalApplication",
    description:
      "KI-gestützte Kenntnisprüfung Simulation & Training für ausländische Ärzte in Deutschland. Strukturierter 7-Schritte-Fallablauf, KI-Bewertung, Spaced Repetition und medizinische Kommunikation auf Deutsch.",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    creator: {
      "@type": "Organization",
      name: "Bites In Byte",
      url: "https://www.bitesinbyte.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Leben in Deutschland",
    url: "https://www.lebenindeutschland.org",
    applicationCategory: "EducationalApplication",
    description:
      "Prepare for the German Einbürgerungstest (citizenship test). Free service with 310 questions, Bundesländer-specific content, and comprehensive resources to help you succeed.",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    creator: {
      "@type": "Organization",
      name: "Bites In Byte",
      url: "https://www.bitesinbyte.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resume Builder",
    url: "https://resume.bitesinbyte.com",
    applicationCategory: "BusinessApplication",
    description:
      "A cutting-edge resume builder that helps job seekers create professional, ATS-friendly resumes in minutes. Optimize your resume for maximum visibility with applicant tracking systems.",
    operatingSystem: "Web",
    creator: {
      "@type": "Organization",
      name: "Bites In Byte",
      url: "https://www.bitesinbyte.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EDMX Tools",
    url: "https://edmx.bitesinbyte.com",
    applicationCategory: "DeveloperApplication",
    description:
      "A set of tools for EDMX or OData metadata files — EDMX Explorer, EDMX Trimmer, EDMX to OpenAPI converter, and EDMX to JSON converter.",
    operatingSystem: "Web",
    creator: {
      "@type": "Organization",
      name: "Bites In Byte",
      url: "https://www.bitesinbyte.com",
    },
  },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bites In Byte",
  url: "https://www.bitesinbyte.com",
  description:
    "Bites In Byte builds practical tools that solve real problems.",
  publisher: {
    "@type": "Organization",
    name: "Bites In Byte",
    url: "https://www.bitesinbyte.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {productsJsonLd.map((product, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(product),
            }}
          />
        ))}
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
