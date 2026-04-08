"use client";

import { useMemo } from "react";
import { Marquee } from "@/components/magicui/marquee";
import { SKILL_CATEGORIES } from "@/lib/data";

/** Liste plate des technologies (toutes catégories) */
function stackLabels(): string[] {
  return SKILL_CATEGORIES.flatMap((c) => c.items.map((i) => i.name));
}

export function SkillsMarquee() {
  const labels = useMemo(() => stackLabels(), []);

  return (
    <section
      id="skills"
      aria-label="Stacks maîtrisées"
      className="relative z-20 mb-12 border-b border-[rgba(80,200,120,0.18)] bg-[#040A06] pb-8 pt-10 shadow-[inset_0_1px_0_0_rgba(80,200,120,0.06)] md:mb-16 md:pb-10 md:pt-12"
    >
      {/* Fond plein : coupe le bruit visuel du canvas 3D derrière pour garder le texte lisible */}
      <div className="mx-auto max-w-6xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:px-10">
        <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.22em] text-[#50C878]">
          Stacks
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-[400] leading-[1.12] text-[#F5F0E8]">
          Ce que je maîtrise
        </h2>
      </div>

      <div className="relative mt-6 rounded-xl bg-[#050f0a] py-2.5 ring-1 ring-[rgba(80,200,120,0.12)] md:py-3">
        {/* Masques alignés sur le même fond que la zone marquee */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 rounded-l-xl bg-gradient-to-r from-[#050f0a] to-transparent md:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 rounded-r-xl bg-gradient-to-l from-[#050f0a] to-transparent md:w-16"
          aria-hidden
        />

        <Marquee duration="slow" className="px-2 md:px-4" innerClassName="gap-6 md:gap-10">
          {labels.map((name) => (
            <span
              key={name}
              className="inline-flex items-center whitespace-nowrap rounded-md border border-[rgba(80,200,120,0.35)] bg-[rgba(80,200,120,0.09)] px-4 py-2.5 font-[family-name:var(--font-body)] text-[15px] font-[500] leading-none tracking-normal text-[#F5F0E8] shadow-[0_0_0_1px_rgba(0,0,0,0.25)_inset] md:text-[16px]"
            >
              {name}
            </span>
          ))}
        </Marquee>

        <div className="mt-3">
          <Marquee reverse duration="normal" className="px-2 md:px-4" innerClassName="gap-6 md:gap-10">
            {labels.map((name) => (
              <span
                key={`r-${name}`}
                className="inline-flex items-center whitespace-nowrap rounded-md border border-[rgba(80,200,120,0.22)] bg-[rgba(245,240,232,0.04)] px-4 py-2 font-[family-name:var(--font-body)] text-[14px] font-[400] leading-none tracking-normal text-[rgba(245,240,232,0.92)] md:text-[15px]"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
