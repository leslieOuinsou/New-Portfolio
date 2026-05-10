"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  FiExternalLink,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export function Projects() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  /** Pas de loop avec peu de slides : sinon Embla clone les cartes et les projets semblent dupliqués */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: PROJECTS.length > 3,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const navBtnClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-light-border bg-white/90 text-violet-900 shadow-md backdrop-blur-sm transition-all hover:border-violet-300 hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-dark-border dark:bg-dark-card/90 dark:text-violet-100 dark:hover:border-violet-500/50 dark:hover:bg-dark-card md:h-12 md:w-12";

  return (
    <section id="projects" className="py-20 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="section-title">{t.projects.title}</h2>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex cursor-grab touch-pan-y gap-5 md:gap-7 [&:active]:cursor-grabbing">
                  {PROJECTS.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 24 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_74%] lg:flex-[0_0_62%]"
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-border/80 bg-white/95 shadow-md transition-[box-shadow,transform] duration-300 hover:shadow-xl dark:border-dark-border dark:bg-dark-card/95 dark:hover:shadow-2xl">
                        <div className="relative h-28 overflow-hidden bg-neutral-200 dark:bg-violet-950 sm:h-32 md:h-36">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 74vw, 62vw"
                          />

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                          <div className="absolute inset-0 z-[2] flex items-center justify-center gap-3 bg-black/0 transition-colors duration-300 group-hover:bg-black/45">
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 scale-90 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all hover:bg-white/25 group-hover:scale-100 group-hover:opacity-100"
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.96 }}
                              aria-label="Voir le projet"
                            >
                              <FiExternalLink className="h-4 w-4" />
                            </motion.a>
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 scale-90 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all hover:bg-white/25 group-hover:scale-100 group-hover:opacity-100"
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.96 }}
                              aria-label="Voir le code"
                            >
                              <FiGithub className="h-4 w-4" />
                            </motion.a>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
                          <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary md:text-xl">
                            {project.title}
                          </h3>
                          <p className="line-clamp-3 text-xs leading-snug text-light-text-secondary dark:text-dark-text-secondary md:text-sm">
                            {language === "fr"
                              ? project.description
                              : project.descriptionEn}
                          </p>

                          <div className="space-y-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-800/80 dark:text-violet-300/90 md:text-[11px]">
                              {t.projects.technologies}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-md border border-light-border bg-accent-primary/35 px-2 py-0.5 text-[10px] font-medium text-violet-950 dark:border-dark-border dark:bg-violet-950/50 dark:text-violet-100 md:text-[11px]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-auto flex gap-2 pt-1">
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-light-border bg-white px-2.5 py-2 text-[11px] font-semibold text-violet-950 shadow-sm ring-1 ring-violet-200/50 transition-all hover:bg-accent-primary/25 dark:border-dark-border dark:bg-dark-surface dark:text-violet-50 dark:ring-violet-800/40 dark:hover:bg-violet-950/80 md:gap-2 md:text-xs"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FiExternalLink className="h-4 w-4 shrink-0" />
                              {t.projects.viewProject}
                            </motion.a>
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-violet-300/60 bg-violet-600 px-2.5 py-2 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-violet-700 dark:border-violet-500/40 dark:bg-violet-700 dark:hover:bg-violet-600 md:gap-2 md:text-xs"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FiGithub className="h-4 w-4 shrink-0" />
                              {t.projects.viewCode}
                            </motion.a>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={scrollPrev}
                className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 md:-left-5 ${navBtnClass}`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Projet précédent"
              >
                <FiChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
              <motion.button
                type="button"
                onClick={scrollNext}
                className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 md:-right-5 ${navBtnClass}`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Projet suivant"
              >
                <FiChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-1 rounded-full border border-light-border bg-accent-primary/40 px-1.5 py-1.5 dark:border-dark-border dark:bg-violet-950/60">
              {PROJECTS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                    index === selectedIndex
                      ? "w-8 bg-violet-700 dark:bg-violet-400"
                      : "w-2 bg-white/80 hover:bg-white dark:bg-white/25 dark:hover:bg-white/40"
                  }`}
                  aria-label={`Aller au projet ${index + 1}`}
                />
              ))}
            </div>
            <p className="text-sm tabular-nums text-light-text-secondary dark:text-dark-text-secondary">
              <span className="font-semibold text-violet-900 dark:text-violet-200">
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-light-border dark:text-dark-border">
                /
              </span>
              <span>{String(PROJECTS.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
