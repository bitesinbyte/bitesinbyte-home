import { getConsent } from "@/components/cookie-consent";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  // Plausible (cookieless, always allowed)
  window.plausible?.(eventName, props ? { props } : undefined);

  // Google Analytics 4 (only if user accepted cookies)
  if (getConsent() === "accepted") {
    window.gtag?.("event", eventName, props);
  }
}

export function trackOutboundClick(target: string, context: string, url: string) {
  trackEvent("Outbound Click", {
    target,
    context,
    url,
  });
}
