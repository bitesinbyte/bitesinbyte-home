import { ArrowDown, Lamp } from "lucide-react";
import { HeroGlobe } from "@/components/hero-globe";
import { SocialBar } from "@/components/social-bar";
import { socialLinks } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="hero-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14">
      <HeroGlobe />

      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className="hero-badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <Lamp className="h-3.5 w-3.5" />
          Illuminating ideas into software
        </div>

        <h1 className="hero-entrance hero-entrance-2 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          We shine a light on{" "}
          <span className="hero-title-gradient bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
            bold ideas
          </span>
        </h1>

        <p className="hero-entrance hero-entrance-3 mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          From medical exam prep for doctors in Germany to citizenship test tools,
          career resources, and developer utilities &mdash; we build practical
          software that makes a real difference.
        </p>

        <div className="hero-entrance hero-entrance-4 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            View Products
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Learn More
          </a>
        </div>

        <div className="hero-entrance hero-entrance-4 mt-6">
          <SocialBar links={socialLinks} context="hero_social" />
        </div>

        <div className="hero-entrance hero-entrance-5 mt-16 animate-bounce">
          <a
            href="#our-story"
            className="inline-block text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
