import { BookOpen, Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons";
import { OutboundLink } from "@/components/outbound-link";
import { Button } from "@/components/ui/button";
import { RevealSection } from "@/components/home/reveal-section";
import { socialLinks } from "@/lib/site-data";

export function ContactSection() {
  return (
    <section id="contact" className="border-t">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <RevealSection>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Get in Touch</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Have a question, suggestion, or want to collaborate? We&apos;d love to
            hear from you.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <OutboundLink
                href="mailto:hello@lamplitlabs.com"
                className="transition-transform hover:scale-105"
                trackingTarget="hello@lamplitlabs.com"
                trackingContext="contact_email"
                trackingUrl="mailto:hello@lamplitlabs.com"
              >
                <Mail className="mr-2 h-5 w-5" />
                hello@lamplitlabs.com
              </OutboundLink>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <OutboundLink
              href="https://github.com/lamplitlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="github"
              trackingContext="contact_link"
              trackingUrl="https://github.com/lamplitlabs"
            >
              <Github className="h-4 w-4" />
              GitHub
            </OutboundLink>
            <OutboundLink
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="x"
              trackingContext="contact_link"
              trackingUrl={socialLinks.x}
            >
              <XIcon className="h-4 w-4" />
              X
            </OutboundLink>
            <OutboundLink
              href="https://blogs.lamplitlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              trackingTarget="blog"
              trackingContext="contact_link"
              trackingUrl="https://blogs.lamplitlabs.com"
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
