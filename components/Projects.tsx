"use client";

import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";

export function Projects() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-20 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title">{t.projects.title}</h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, index) => {
            const title =
              language === "en" ? project.titleEn : project.title;
            const description =
              language === "fr" ? project.description : project.descriptionEn;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card card-hover group relative flex flex-col overflow-hidden"
              >
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[5/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--ink))]/25 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="mb-3 text-xl font-bold text-light-text-primary dark:text-dark-text-primary md:text-2xl">
                    {title}
                  </h3>

                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary md:text-base">
                    {description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="skill-tag !px-3 !py-1 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 !px-4 !py-2.5 text-xs"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                      {t.projects.viewProject}
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline !px-3.5 !py-2.5"
                      aria-label={t.projects.viewCode}
                    >
                      <FiGithub className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
