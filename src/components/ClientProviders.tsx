"use client";

import { useEffect } from "react";
import { useVisitTracker } from "@/hooks/useVisitTracker";
import { Cursor } from "@/components/Cursor";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useVisitTracker();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => {
      if (mq.matches) document.body.classList.add("cursor-none");
      else document.body.classList.remove("cursor-none");
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <Cursor />
      {children}
    </>
  );
}
