import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleAnalytics } from "@/components/google-analytics";
import { products, socialLinks } from "@/lib/site-data";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bites In Byte - Tools That Solve Real Problems",
    template: "%s | Bites In Byte",
  },
  description:
    "Bites In Byte builds practical tools that solve real problems. Home of Kenntnistrainer, Fachsprachprufung, Leben in Deutschland, Resume Builder, Developer Tools, EDMX Tools, Azure Draw.io Assets, and Azure Compliance Matrix.",
  metadataBase: new URL("https://www.bitesinbyte.com"),
  keywords: [
    "Bites In Byte",
    "bitesinbyte",
    "Kenntnistrainer",
    "Kenntnisprufung",
    "KP exam",
    "Fachsprachprufung",
    "FSP",
    "Leben in Deutschland",
    "Einburgerungstest",
    "German citizenship test",
    "Resume Builder",
    "ATS resume",
    "Developer Tools",
    "JSON formatter",
    "Base64 encoder",
    "UUID generator",
    "EDMX Tools",
    "OData",
    "Azure Draw.io Assets",
    "Azure icons",
    "Draw.io",
    "Azure Compliance Matrix",
    "Azure compliance",
    "ISO 27001",
    "SOC compliance",
    "HIPAA",
    "PCI DSS",
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
    title: "Bites In Byte - Tools That Solve Real Problems",
    description:
      "Bites In Byte builds practical tools that solve real problems across education, career, and developer workflows.",
    url: "https://www.bitesinbyte.com",
    siteName: "Bites In Byte",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bites In Byte - Tools That Solve Real Problems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bites In Byte - Tools That Solve Real Problems",
    description:
      "Bites In Byte builds practical tools that solve real problems across education, career, and developer workflows.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bites In Byte",
  url: "https://www.bitesinbyte.com",
  logo: "https://www.bitesinbyte.com/icon-512.png",
  description:
    "A technology organization building practical tools that solve real problems - from medical exam prep to developer utilities.",
  foundingDate: "2020",
  sameAs: [
    socialLinks.github,
    socialLinks.instagram,
    socialLinks.linkedin,
    socialLinks.mastodon,
    socialLinks.threads,
    socialLinks.blog,
  ].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@bitesinbyte.com",
    contactType: "customer support",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bites In Byte",
  url: "https://www.bitesinbyte.com",
  description: "Bites In Byte builds practical tools that solve real problems.",
  publisher: {
    "@type": "Organization",
    name: "Bites In Byte",
    url: "https://www.bitesinbyte.com",
  },
};

const productJsonLd = products.map((product) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  url: product.url,
  applicationCategory: "UtilitiesApplication",
  description: product.longDescription,
  operatingSystem: "Web",
  creator: {
    "@type": "Organization",
    name: "Bites In Byte",
    url: "https://www.bitesinbyte.com",
  },
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          data-domain="bitesinbyte.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {productJsonLd.map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <GoogleAnalytics />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
