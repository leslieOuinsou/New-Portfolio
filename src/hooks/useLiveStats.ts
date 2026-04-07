"use client";

import { useEffect, useMemo, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { getLiveStats, type LiveStats } from "@/lib/stats";

/**
 * Recalcule les stats quand la page reprend le focus, devient visible, ou toutes les minutes
 * (pour que l’année d’expérience suive le passage à la nouvelle année sans rechargement forcé).
 * Dès que tu modifies `PROJECTS` ou les constantes dans `lib/stats.ts`, le prochain rendu reflète le changement.
 */
export function useLiveStats(): LiveStats {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);

    const onVisibility = () => {
      if (document.visibilityState === "visible") bump();
    };

    const id = setInterval(bump, 60_000);
    window.addEventListener("focus", bump);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(id);
      window.removeEventListener("focus", bump);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /** `PROJECTS.length` en dépendance : ajout/suppression d’un projet → recalcul immédiat au re-render. */
  return useMemo(() => getLiveStats(), [tick, PROJECTS.length]);
}
