import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  BookOpen,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OutboundLink } from "@/components/outbound-link";
import type { SocialLinks } from "@/lib/site-data";

const socialIconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  twitter: Twitter,
  blog: BookOpen,
};

interface SocialBarProps {
  links: SocialLinks;
  context?: string;
}

export function SocialBar({ links, context = "social_bar" }: SocialBarProps) {
  const entries = Object.entries(links).filter(
    ([, url]) => url && url.length > 0
  );

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {entries.map(([platform, url]) => {
        const Icon = socialIconMap[platform] || ExternalLink;
        return (
          <Button key={platform} variant="ghost" size="icon" asChild>
            <OutboundLink
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="transition-transform hover:scale-110"
              trackingTarget={platform}
              trackingContext={context}
              trackingUrl={url}
            >
              <Icon className="h-5 w-5" />
            </OutboundLink>
          </Button>
        );
      })}
    </div>
  );
}
