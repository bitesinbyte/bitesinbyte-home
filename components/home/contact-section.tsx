import { BookOpen, Github, Linkedin, Mail } from "lucide-react";
import { OutboundLink } from "@/components/outbound-link";
import { Button } from "@/components/ui/button";
import { RevealSection } from "@/components/home/reveal-section";

export function ContactSection() {
  return (
    <section id="contact" className="border-t">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Have a question, suggestion, or want to collaborate? We&apos;d love to
            hear from you.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <OutboundLink
                href="mailto:hello@bitesinbyte.com"
                className="transition-transform hover:scale-105"
                trackingTarget="hello@bitesinbyte.com"
                trackingContext="contact_email"
                trackingUrl="mailto:hello@bitesinbyte.com"
              >
                <Mail className="mr-2 h-5 w-5" />
                hello@bitesinbyte.com
              </OutboundLink>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <OutboundLink
              href="https://github.com/bitesinbyte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="github"
              trackingContext="contact_link"
              trackingUrl="https://github.com/bitesinbyte"
            >
              <Github className="h-4 w-4" />
              GitHub
            </OutboundLink>
            <OutboundLink
              href="https://www.linkedin.com/company/bitesinbyte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="linkedin"
              trackingContext="contact_link"
              trackingUrl="https://www.linkedin.com/company/bitesinbyte"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </OutboundLink>
            <OutboundLink
              href="https://blogs.bitesinbyte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="blog"
              trackingContext="contact_link"
              trackingUrl="https://blogs.bitesinbyte.com"
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </OutboundLink>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
