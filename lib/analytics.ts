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

  // Plausible
  window.plausible?.(eventName, props ? { props } : undefined);

  // Google Analytics 4
  window.gtag?.("event", eventName, props);
}

export function trackOutboundClick(target: string, context: string, url: string) {
  trackEvent("Outbound Click", {
    target,
    context,
    url,
  });
}
