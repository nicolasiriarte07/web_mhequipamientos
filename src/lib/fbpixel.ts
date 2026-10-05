declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function pageview() {
  if (!FB_PIXEL_ID || typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

export function event(name: string, params?: Record<string, unknown>) {
  if (!FB_PIXEL_ID || typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", name, params);
}
