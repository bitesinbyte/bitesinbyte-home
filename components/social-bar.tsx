import { XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { OutboundLink } from "@/components/outbound-link";
import type { SocialLinks } from "@/lib/site-data";

interface SocialBarProps {
  links: SocialLinks;
  context?: string;
}

export function SocialBar({ links, context = "social_bar" }: SocialBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <Button variant="ghost" size="icon" asChild>
        <OutboundLink
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="transition-transform hover:scale-110"
          trackingTarget="x"
          trackingContext={context}
          trackingUrl={links.x}
        >
          <XIcon className="h-5 w-5" />
        </OutboundLink>
      </Button>
    </div>
  );
}
