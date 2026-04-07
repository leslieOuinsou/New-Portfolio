"use client";

import { useReducedMotion } from "framer-motion";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Marquee } from "@/components/magicui/marquee";
import { SKILL_CATEGORIES } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const ORBIT_LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Express",
];

const MARQUEE_TECH = SKILL_CATEGORIES.flatMap((c) => c.items.map((i) => i.name));

/**
 * Orbite à libellés stables + double bandeau marquee (vitesses / sens différents).
 */
export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative z-10 py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <Reveal>
          <p className="typo-label uppercase tracking-[0.45em] text-white/60">Stack &amp; outils</p>
          <h2 className="font-[family-name:var(--font-display)] typo-h2 mt-4">CE QUE JE MANIE</h2>
          <p className="typo-body mt-6 max-w-xl text-white/60">
            Orbite à texte stable au centre, deux bandeaux en sens opposé pour tout le stack — rythmes décalés.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="relative mx-auto mt-16 max-w-[min(440px,92vw)] py-8">
          <OrbitingCircles radius={140}>
            {ORBIT_LABELS.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </OrbitingCircles>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="font-[family-name:var(--font-display)] text-center text-[clamp(1.5rem,6vw,2.75rem)] leading-tight text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.06)]">
              {SITE.name}
            </p>
          </div>
        </Reveal>

        <div className="relative mt-16 border-y border-[var(--color-border)] py-8">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#080808] to-transparent md:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#080808] to-transparent md:w-24"
            aria-hidden
          />
          <div className="space-y-5">
            {reduce ? (
              <Marquee duration="slow">
                {MARQUEE_TECH.map((t, idx) => (
                  <span key={`${t}-${idx}`} className="typo-label text-white/50">
                    {t}
                  </span>
                ))}
              </Marquee>
            ) : (
              <>
                <Marquee duration="slow" innerClassName="gap-8 md:gap-12">
                  {MARQUEE_TECH.map((t, idx) => (
                    <span key={`a-${t}-${idx}`} className="typo-label text-white/55">
                      {t}
                    </span>
                  ))}
                </Marquee>
                <Marquee reverse duration="normal" innerClassName="gap-8 md:gap-12">
                  {MARQUEE_TECH.map((t, idx) => (
                    <span key={`b-${t}-${idx}`} className="typo-label text-white/35">
                      {t}
                    </span>
                  ))}
                </Marquee>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
