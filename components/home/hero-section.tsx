import { ArrowDown, Sparkles } from "lucide-react";
import { HeroGlobe } from "@/components/hero-globe";
import { SocialBar } from "@/components/social-bar";
import { socialLinks } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="hero-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14">
      <HeroGlobe />

      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className="hero-badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
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
          From medical exam prep for doctors in Germany to citizenship test tools,
          career resources, and developer utilities &mdash; small, practical
          software that solves real problems.
        </p>

        <div className="hero-entrance hero-entrance-4 mt-8">
          <SocialBar links={socialLinks} context="hero_social" />
        </div>

        <div className="hero-entrance hero-entrance-5 mt-16 animate-bounce">
          <a
            href="#why-bites"
            className="inline-block text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
