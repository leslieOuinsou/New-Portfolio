"use client";

import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/magicui/word-fade-in";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

/**
 * Effet fort : WordFadeIn sur la bio. Timeline = opacité au scroll seulement.
 */
export function About() {
  return (
    <section id="about" className="relative z-10 border-t border-[var(--color-border)] py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <p className="typo-label uppercase tracking-[0.45em] text-white/60">Profil</p>
            <h2 className="font-[family-name:var(--font-display)] typo-h2 mt-4">
              L&apos;HUMAIN
              <br />
              <span className="text-white/60">DANS LE</span> CODE
            </h2>
            <div className="relative mt-10 aspect-square max-w-[260px] border border-[var(--color-border)] bg-white/[0.02] shadow-[var(--glow-soft)]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-[clamp(4rem,18vw,7rem)] text-white/10">
                  LO
                </span>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {SITE.bio.map((para) => (
              <WordFadeIn key={para} text={para} />
            ))}
            <p className="typo-body border-l border-[var(--color-border)] pl-6 text-white">
              {SITE.differentiation}
            </p>

            <div className="space-y-8 pt-4">
              {SITE.journey.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <span className="font-[family-name:var(--font-display)] shrink-0 text-2xl text-white">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="typo-label uppercase tracking-[0.2em] text-white">{step.title}</h3>
                    <p className="typo-body mt-2 text-white/60">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={SITE.cvPath}
              download="CV-Leslie-Ouinsou.pdf"
              data-cursor-hover
              className="btn-outline-muted mt-8 inline-flex px-6 py-3 text-[0.95rem] uppercase tracking-[0.3em]"
            >
              Télécharger le CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
