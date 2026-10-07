"use client";

import { useEffect } from "react";

const SENT_KEY = "visit-notified";
const OWNER_KEY = "portfolio-owner";

export function VisitTracker() {
  useEffect(() => {
    try {
      // Ouvre le site avec ?owner=1 une fois pour ne plus te notifier toi-même
      const params = new URLSearchParams(window.location.search);
      if (params.get("owner") === "1") localStorage.setItem(OWNER_KEY, "1");
      if (params.get("owner") === "0") localStorage.removeItem(OWNER_KEY);
      if (localStorage.getItem(OWNER_KEY)) return;
      if (sessionStorage.getItem(SENT_KEY)) return;
      sessionStorage.setItem(SENT_KEY, "1");
    } catch {
      return;
    }
    if (process.env.NODE_ENV !== "production") return;

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
