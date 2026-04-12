"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Github,
  ArrowDown,
  Mail,
  Menu,
  X,
  Sparkles,
  Code2,
  Users,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { SocialBar, type SocialLinks } from "@/components/social-bar";
import { ProductGrid, type Product } from "@/components/product-grid";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { BitesIllustration } from "@/components/bites-illustration";
import { HeroGlobe } from "@/components/hero-globe";
import { useReveal } from "@/hooks/use-reveal";
import { MastodonIcon, ThreadsIcon } from "@/components/icons";

const socialLinks: SocialLinks = {
  instagram: "https://www.instagram.com/bitesinbyte",
  linkedin: "https://www.linkedin.com/company/bitesinbyte",
  github: "https://github.com/bitesinbyte",
  blog: "https://blogs.bitesinbyte.com",
  mastodon: "https://me.dm/@bitesinbyte",
  threads: "https://www.threads.net/@bitesinbyte",
};

const products: Product[] = [
  {
    name: "Kenntnistrainer",
    title: "KI-gestützte Kenntnisprüfung Simulation & Training",
    description:
      "Kenntnisprüfung (KP) Vorbereitung mit KI-Simulation: Strukturierter 7-Schritte-Fallablauf, KI-Bewertung, Spaced Repetition und medizinische Kommunikation auf Deutsch. Für ausländische Ärzte in Deutschland.",
    url: "https://www.kenntnistrainer.de",
    cover: "/covers/kenntnistrainer.svg",
    tags: ["AI", "Medical", "Training"],
    featured: true,
  },
  {
    name: "Fachsprachprüfung",
    title: "KI-gestützte Fachsprachprüfung Simulation & Training",
    description:
      "Fachsprachprüfung (FSP) Vorbereitung mit KI-Simulation: Arzt-Patienten-Gespräch, Dokumentation und Arzt-Arzt-Übergabe. Medizinische Kommunikation auf Deutsch für ausländische Ärzte in Deutschland.",
    url: "https://www.fachsprachtrainer.de",
    cover: "/covers/fsp.svg",
    tags: ["AI", "Medical", "Language"],
    featured: true,
  },
  {
    name: "Leben in Deutschland",
    title: "Einbürgerungstest | Leben in Deutschland",
    description:
      "Bereiten Sie sich auf den deutschen Einbürgerungstest vor. Genießen Sie einen kostenlosen Service mit umfassenden Ressourcen, die Ihnen zum Erfolg verhelfen!",
    url: "https://www.lebenindeutschland.org",
    cover: "/covers/leben.svg",
    tags: ["Education", "Germany", "Integration"],
    featured: true,
  },
  {
    name: "Developer Tools",
    title: "Everyday utilities for developers",
    description:
      "A growing collection of developer utilities — JSON formatter, Base64 encoder/decoder, UUID generator, URL parser, and more. Fast, free, and right in your browser.",
    url: "https://tools.bitesinbyte.com",
    cover: "/covers/tools.svg",
    tags: ["Developer Tools", "Utilities", "Web"],
    featured: true,
  },
  {
    name: "Resume Builder",
    title: "Get hired with an ATS-optimized resume",
    description:
      "A cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Optimize your resume for maximum visibility with applicant tracking systems.",
    url: "https://resume.bitesinbyte.com",
    cover: "/covers/resume.svg",
    tags: ["Productivity", "Career"],
  },
  {
    name: "EDMX Tools",
    title: "Tools for EDMX & OData metadata",
    description:
      "A set of tools for EDMX or OData metadata files — EDMX Explorer, EDMX Trimmer, EDMX to OpenAPI converter, and EDMX to JSON converter.",
    url: "https://edmx.bitesinbyte.com",
    cover: "/covers/edmx.svg",
    tags: ["Developer Tools", ".NET", "OData"],
  },
  {
    name: "Azure Draw.io Assets",
    title: "Azure icons for architecture diagrams",
    description:
      "Browse 643 Azure service icons for your architecture diagrams. Continuously synced from official Microsoft Azure icon sets, ready to use in Draw.io.",
    url: "https://azure-assets.bitesinbyte.com",
    cover: "/covers/azure-assets.svg",
    tags: ["Azure", "Draw.io", "Architecture"],
  },
];

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "https://blogs.bitesinbyte.com", external: true },
  { label: "Contact", href: "#contact" },
];

/* ── Reveal wrapper ──────────────────────────────────────── */

function RevealSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, visible } = useReveal(0.12);
  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = ["products", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Header ──────────────────────────────────────── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b bg-background/70 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">
              Bites In Byte
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = !link.external && link.href === `#${activeSection}`;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 ${
                    isActive
                      ? "text-foreground after:left-1 after:w-[calc(100%-8px)]"
                      : "text-muted-foreground hover:text-foreground after:w-0 hover:after:left-1 hover:after:w-[calc(100%-8px)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="ml-1">
              <ThemeSwitch theme={theme} setTheme={setTheme} />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitch theme={theme} setTheme={setTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav className="mobile-menu-enter border-t bg-background/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14">
        {/* Animated globe + particle network background */}
        <HeroGlobe />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="hero-badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm" style={{ opacity: 0 }}>
            <Sparkles className="h-3.5 w-3.5" />
            Tools that solve real problems
          </div>

          <h1 className="hero-entrance hero-entrance-2 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Building tools that{" "}
            <span className="hero-title-gradient bg-gradient-to-r from-foreground/70 via-foreground to-foreground/70 bg-clip-text text-transparent">
              make a difference
            </span>
          </h1>

          <p className="hero-entrance hero-entrance-3 mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            From medical exam prep for doctors in Germany to citizenship
            test tools, career resources, and developer utilities &mdash;
            small, practical software that solves real problems.
          </p>

          <div className="hero-entrance hero-entrance-4 mt-8">
            <SocialBar links={socialLinks} />
          </div>

          <div className="hero-entrance hero-entrance-5 mt-16 animate-bounce">
            <a href="#why-bites" className="inline-block text-muted-foreground/50 transition-colors hover:text-muted-foreground">
              <ArrowDown className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Why "Bites In Byte"? ────────────────────────── */}
      <section id="why-bites" className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <RevealSection>
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
                Fun fact
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why &ldquo;Bites In Byte&rdquo;?
              </h2>
            </div>
          </RevealSection>

          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Illustration */}
            <RevealSection>
              <div className="flex justify-center">
                <BitesIllustration className="w-full max-w-md" />
              </div>
            </RevealSection>

            {/* Story */}
            <RevealSection>
              <div className="space-y-6">
                <div className="rounded-xl border bg-muted/30 p-5">
                  <p className="font-mono text-sm text-muted-foreground">
                    <span className="text-foreground/40 line-through">
                      bitsinbyte
                    </span>{" "}
                    &rarr;{" "}
                    <span className="font-semibold text-foreground">
                      bitesinbyte
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We originally wanted{" "}
                    <strong className="text-foreground">
                      &ldquo;bitsinbyte&rdquo;
                    </strong>{" "}
                    &mdash; as in &ldquo;bits in a byte,&rdquo; a nod to the
                    fundamental building blocks of digital data. But that name
                    was already taken.
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    So we went with{" "}
                    <strong className="text-foreground">
                      &ldquo;bitesinbyte&rdquo;
                    </strong>{" "}
                    instead &mdash; small, useful <em>bites</em> of software
                    packed into every <em>byte</em>.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    What started as a workaround turned into a name that
                    perfectly captures what we do: building compact, impactful
                    tools, one bite at a time.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section id="products" className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-24">
        <RevealSection className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tools and platforms we build and maintain
          </p>
        </RevealSection>
        <ProductGrid products={products} />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <RevealSection className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Bites In Byte is a technology organization focused on building
              practical tools that solve real problems and make a tangible
              difference in people&apos;s lives.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Code2,
                  title: "Built with care",
                  desc: "Every product is crafted to solve a specific, real-world problem \u2014 no fluff, just useful software.",
                },
                {
                  icon: Users,
                  title: "Thousands of users",
                  desc: "Our tools are used by thousands of people across Germany and beyond, every day.",
                },
                {
                  icon: Globe,
                  title: "Germany & beyond",
                  desc: "From medical exam prep to citizenship tests to developer tools \u2014 built locally, used globally.",
                },
                {
                  icon: Heart,
                  title: "Accessible first",
                  desc: "We\u2019re committed to keeping our tools accessible and free where possible.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:border-foreground/10 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-muted p-2.5 transition-colors group-hover:bg-foreground/10">
                    <item.icon className="h-5 w-5 text-foreground/70" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────── */}
      <section id="contact" className="border-t">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <RevealSection>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
              Have a question, suggestion, or want to collaborate?
              We&apos;d love to hear from you.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a
                  href="mailto:hello@bitesinbyte.com"
                  className="transition-transform hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  hello@bitesinbyte.com
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/bitesinbyte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/company/bitesinbyte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://blogs.bitesinbyte.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#" className="inline-flex items-center gap-2">
                <Logo className="h-7 w-7" />
                <span className="text-base font-semibold tracking-tight">
                  Bites In Byte
                </span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Small, practical software packed into every byte.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Products</h4>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Connect</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: socialLinks.github!, icon: Github, label: "GitHub" },
                  { href: socialLinks.linkedin!, icon: Linkedin, label: "LinkedIn" },
                  { href: socialLinks.instagram!, icon: Instagram, label: "Instagram" },
                  { href: socialLinks.mastodon!, icon: MastodonIcon, label: "Mastodon" },
                  { href: socialLinks.threads!, icon: ThreadsIcon, label: "Threads" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="rounded-lg border p-2 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bites In Byte. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
