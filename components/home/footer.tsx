import { Github, Instagram, Linkedin } from "lucide-react";
import type { ComponentType } from "react";
import { MastodonIcon, ThreadsIcon } from "@/components/icons";
import { OutboundLink } from "@/components/outbound-link";
import { navLinks, products, socialLinks } from "@/lib/site-data";
import { Logo } from "@/components/logo";

const footerSocialLinks: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { href: socialLinks.github, icon: Github, label: "GitHub" },
  { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: socialLinks.instagram, icon: Instagram, label: "Instagram" },
  { href: socialLinks.mastodon, icon: MastodonIcon, label: "Mastodon" },
  { href: socialLinks.threads, icon: ThreadsIcon, label: "Threads" },
].flatMap((item) => (item.href ? [{ ...item, href: item.href }] : []));

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

          <div>
            <h4 className="mb-3 text-sm font-semibold">Products</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <OutboundLink
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    trackingTarget={product.slug}
                    trackingContext="footer_product"
                    trackingUrl={product.url}
                  >
                    {product.name}
                  </OutboundLink>
                </li>
              ))}
            </ul>
          </div>

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

          <div>
            <h4 className="mb-3 text-sm font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {footerSocialLinks.map((item) => (
                <OutboundLink
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="rounded-lg border p-2 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  trackingTarget={item.label.toLowerCase()}
                  trackingContext="footer_social"
                  trackingUrl={item.href}
                >
                  <item.icon className="h-4 w-4" />
                </OutboundLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Bites In Byte. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
