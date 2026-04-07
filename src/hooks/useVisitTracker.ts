"use client";

import { useEffect, useRef } from "react";
import { sendVisitNotification, type VisitPayload } from "@/lib/emailjs";

const STORAGE_KEY = "portfolio_visit_email_sent";

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return "Safari";
  if (/Opera|OPR\//.test(ua)) return "Opera";
  return "Autre";
}

async function fetchCountry(): Promise<string> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return "Inconnu";
    const data = (await res.json()) as { country_name?: string };
    return data.country_name ?? "Inconnu";
  } catch {
    return "Inconnu";
  }
}

function buildPayload(country: string): VisitPayload {
  const now = new Date();
  return {
    visitDate: now.toLocaleDateString("fr-FR", { dateStyle: "full" }),
    visitTime: now.toLocaleTimeString("fr-FR", { timeStyle: "medium" }),
    country,
    language: typeof navigator !== "undefined" ? navigator.language : "—",
    device: typeof navigator !== "undefined" ? navigator.userAgent : "—",
    screen:
      typeof window !== "undefined"
        ? `${window.screen.width}×${window.screen.height}`
        : "—",
    url: typeof window !== "undefined" ? window.location.href : "—",
    referrer: typeof document !== "undefined" ? document.referrer || "(direct)" : "—",
    browser:
      typeof navigator !== "undefined" ? parseBrowser(navigator.userAgent) : "—",
  };
}

/**
 * Envoie au plus un email par session (sessionStorage) avec le contexte de visite.
 * Non bloquant : erreurs ignorées en silence en prod.
 */
export function useVisitTracker(): void {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }

    void (async () => {
      const country = await fetchCountry();
      const payload = buildPayload(country);
      try {
        await sendVisitNotification(payload);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[visit] EmailJS error", e);
        }
      }
    })();
  }, []);
}
