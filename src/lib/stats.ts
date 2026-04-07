import { PROJECTS } from "@/lib/data";

/**
 * Année où la carrière dev « compte » pour le portfolio (à ajuster à ta réalité).
 * Les années d’expérience = année courante − cette valeur.
 */
export const CAREER_START_YEAR = 2021;

/**
 * Collaborations / missions / équipes — valeur métier (pas dérivée du code).
 * Modifie ce nombre ici quand ta situation change.
 */
export const COLLABORATIONS_COUNT = 8;

export type LiveStats = {
  /** Toujours égal à PROJECTS.length — ajoute/supprime un projet dans data.ts → mis à jour automatiquement */
  projectCount: number;
  /** Années d’expérience (recalculées selon l’année en cours) */
  yearsExperience: number;
  collaborationsCount: number;
};

/**
 * Chiffres « vivants » : même source que les projets + règles explicites pour le reste.
 */
export function getLiveStats(): LiveStats {
  const year = new Date().getFullYear();
  const yearsExperience = Math.max(0, year - CAREER_START_YEAR);

  return {
    projectCount: PROJECTS.length,
    yearsExperience,
    collaborationsCount: COLLABORATIONS_COUNT,
  };
}
