// GA event tracking with GDPR fallback.
// Only fires if window.gtag is defined (i.e., consent was given and GA loaded).

type GtagParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: GtagParams) {
  try {
    const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof g === 'function') {
      g('event', eventName, params ?? {});
    }
  } catch {
    // Silently ignore if GA is unavailable
  }
}
