"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { PROJECTS } from "@/lib/data";

/** Index du projet mis en avant — « Gestion des Événements » */
const FEATURED_INDEX = 6;

/**
 * Disposition éditoriale : liste verticale espacée, zigzag image gauche / droite,
 * carte mise en avant en bandeau large (image ~60 %).
 */
export function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="relative z-10 py-28 md:py-40">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10">
        <Reveal className="mb-16 max-w-4xl md:mb-20">
          <p className="typo-label uppercase tracking-[0.45em]">Problème · solution · résultat</p>
          <h2 className="font-[family-name:var(--font-display)] typo-h2 mt-4">CE QUE J&apos;AI RÉSOLU</h2>
          <p className="typo-section mt-6 max-w-2xl text-white/60">
            Chaque bloc raconte une contrainte métier, une réponse technique, un impact concret.
          </p>
        </Reveal>

        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          {PROJECTS.map((p, i) => {
            const featured = i === FEATURED_INDEX;
            const zigzagRight = !featured && i % 2 === 1;

            return (
              <motion.article
                key={p.title}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.05, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "relative",
                  !featured && "lg:w-[min(100%,920px)]",
                  zigzagRight && "lg:ml-auto",
                  !zigzagRight && !featured && "lg:mr-auto"
                )}
              >
                <span
                  className="font-[family-name:var(--font-display)] pointer-events-none absolute -left-1 top-0 text-[clamp(2.25rem,9vw,5.5rem)] leading-none text-white/[0.06] select-none md:-left-2 lg:-left-3 lg:top-[-0.25rem]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <ProjectCard
                  project={p}
                  featured={featured}
                  zigzagRight={zigzagRight}
                  reduceMotion={Boolean(reduce)}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  featured,
  zigzagRight,
  reduceMotion,
}: {
  project: (typeof PROJECTS)[number];
  featured: boolean;
  zigzagRight: boolean;
  reduceMotion: boolean;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      className="relative"
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }
      }
    >
    <MagicCard
      className={cn(
        "relative overflow-hidden border border-[var(--color-border)] bg-white/[0.02] transition-shadow duration-500",
        "hover:shadow-[0_24px_80px_-24px_rgba(255,255,255,0.06)]",
        featured
          ? "lg:min-h-[min(400px,52vh)]"
          : "min-h-[min(300px,72vh)] md:min-h-[min(300px,42vh)]"
      )}
    >
      {featured ? <BorderBeam /> : null}

      <div
        className={cn(
          "relative z-10 grid h-full min-h-0",
          featured
            ? "grid-cols-1 lg:grid-cols-12 lg:gap-0"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:gap-y-0"
        )}
      >
        {/* Bloc image */}
        <div
          className={cn(
            "relative min-h-[180px] overflow-hidden",
            featured && "lg:col-span-7 lg:min-h-[min(400px,52vh)]",
            !featured && "md:min-h-[min(280px,38vh)] lg:col-span-5",
            !featured && zigzagRight && "lg:order-2 lg:col-start-8"
          )}
        >
          {!imgErr ? (
            <Image
              src={p.image}
              alt={p.title}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
                featured && "lg:object-center"
              )}
              sizes="(max-width: 1024px) 100vw, 48vw"
              onError={() => setImgErr(true)}
              priority={featured}
            />
          ) : (
            <div className="absolute inset-0 bg-white/[0.04]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#080808]/40 lg:via-[#080808]/10" />
        </div>

        {/* Contenu */}
        <div
          className={cn(
            "flex flex-col justify-between border-[var(--color-border)] p-5 md:p-6 lg:p-8",
            featured && "lg:col-span-5 lg:border-l lg:border-t-0 lg:py-9",
            !featured && "lg:col-span-7 lg:justify-center lg:py-6",
            !featured && !zigzagRight && "lg:border-l",
            !featured && zigzagRight && "lg:order-1 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-l-0"
          )}
        >
          <div>
            <span className="typo-label uppercase tracking-[0.4em] text-white/30">{p.title}</span>
            <h3
              className={cn(
                "font-[family-name:var(--font-display)] mt-3 leading-[0.95] text-white",
                featured ? "text-[clamp(1.65rem,4vw,2.85rem)]" : "text-[clamp(1.35rem,3.2vw,2.1rem)]"
              )}
            >
              {p.summary}
            </h3>
            <dl className="typo-body mt-4 space-y-3 text-white/60">
              <div>
                <dt className="typo-label text-white">Contrainte</dt>
                <dd className="mt-1">{p.problem}</dd>
              </div>
              <div>
                <dt className="typo-label text-white/60">Réponse</dt>
                <dd className="mt-1">{p.solution}</dd>
              </div>
              <div>
                <dt className="typo-label text-white/30">Résultat</dt>
                <dd className="mt-1 text-white">{p.impact}</dd>
              </div>
            </dl>
            <p className="typo-label mt-4 text-white/30">{p.tech.join(" · ")}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="btn-outline-muted px-4 py-2 text-[0.95rem] uppercase tracking-[0.2em]"
              >
                Voir
              </a>
            ) : null}
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="typo-label uppercase text-white/60 hover:text-white"
              >
                Code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </MagicCard>
    </motion.div>
  );
}
