import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  BookOpen,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { MastodonIcon, ThreadsIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  twitter?: string;
  blog?: string;
  web?: string;
  mastodon?: string;
  threads?: string;
}

const socialIconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  twitter: Twitter,
  blog: BookOpen,
  mastodon: MastodonIcon,
  threads: ThreadsIcon,
};

interface SocialBarProps {
  links: SocialLinks;
}

export function SocialBar({ links }: SocialBarProps) {
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
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="transition-transform hover:scale-110"
            >
              <Icon className="h-5 w-5" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
