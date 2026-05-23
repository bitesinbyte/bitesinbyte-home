"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks } from "@/lib/site-data";

interface HeaderProps {
  scrolled: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export function Header({
  scrolled,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  theme,
  setTheme,
}: HeaderProps) {
  const [pulling, setPulling] = useState(false);

  const handlePull = () => {
    setPulling(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setPulling(false), 500);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full overflow-visible transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/70 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between overflow-visible px-4">
        <button
          onClick={handlePull}
          className="group relative flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label={theme === "dark" ? "Turn on the light" : "Turn off the light"}
        >
          <div className="relative">
            <Logo className="h-8 w-8" lit={theme !== "dark"} />
            {/* Pull cord */}
            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 ${pulling ? "cord-pull" : "cord-sway"}`}
            >
              <svg
                width="8"
                height="28"
                viewBox="0 0 8 28"
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                {/* String */}
                <path
                  d="M4 0 Q3 8 4 14 Q5 20 4 24"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.3"
                  className="transition-opacity duration-300 group-hover:opacity-50"
                />
                {/* Bead at the end */}
                <circle
                  cx="4"
                  cy="25"
                  r="2.5"
                  fill="currentColor"
                  opacity="0.25"
                  className="transition-opacity duration-300 group-hover:opacity-45"
                />
              </svg>
            </div>
          </div>
          <span className="text-lg font-semibold tracking-tight">Lamplit Labs</span>
        </button>

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
          <div className="ml-1" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
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
  );
}
