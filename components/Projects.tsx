"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";
import { getProjectSpec } from "@/lib/project-specs";
import { useEffect, useRef, useState } from "react";
import {
  FiExternalLink,
  FiGithub,
  FiGitBranch,
  FiFileText,
  FiInfo,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

type ModalMode = "about" | "spec";

export function Projects() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openId, setOpenId] = useState<number | null>(null);
  const [mode, setMode] = useState<ModalMode>("about");

  const personal = PROJECTS.filter((p) => p.category === "personal");
  const academic = PROJECTS.filter((p) => p.category === "academic");

  const selected = PROJECTS.find((p) => p.id === openId) ?? null;
  const selectedTitle = selected
    ? language === "en"
      ? selected.titleEn
      : selected.title
    : "";
  const selectedAbout = selected
    ? language === "en"
      ? selected.aboutEn
      : selected.about
    : "";
  const selectedSpec = selected ? getProjectSpec(selected.id) : null;

  useEffect(() => {
    if (openId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  const openModal = (id: number, nextMode: ModalMode) => {
    setMode(nextMode);
    setOpenId(id);
  };

  const renderGrid = (list: typeof PROJECTS, startIndex: number) => (
    <div className="grid gap-8 sm:grid-cols-2">
      {list.map((project, index) => {
        const title = language === "en" ? project.titleEn : project.title;
        const description =
          language === "fr" ? project.description : project.descriptionEn;

        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: (startIndex + index) * 0.08 }}
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

              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary md:text-base">
                {description}
              </p>

              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openModal(project.id, "about")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent-deep))] transition hover:text-[rgb(var(--accent))]"
                >
                  <FiInfo className="h-4 w-4" />
                  {t.projects.aboutProject}
                </button>
                <button
                  type="button"
                  onClick={() => openModal(project.id, "spec")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent-deep))] transition hover:text-[rgb(var(--accent))]"
                >
                  <FiFileText className="h-4 w-4" />
                  {t.projects.viewSpec}
                </button>
              </div>

              {"note" in project && project.note ? (
                <p className="mb-4 text-xs italic text-[rgb(var(--accent-deep))]">
                  {language === "en" && "noteEn" in project && project.noteEn
                    ? project.noteEn
                    : project.note}
                </p>
              ) : null}

              <div className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-deep))]">
                  {t.projects.technologies}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-tag !px-3 !py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 !px-4 !py-2.5 text-xs"
                >
                  <FiExternalLink className="h-3.5 w-3.5" />
                  {t.projects.viewProject}
                </a>
                {"workflowUrl" in project && project.workflowUrl ? (
                  <a
                    href={project.workflowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline !px-3.5 !py-2.5"
                    aria-label={t.projects.viewWorkflow}
                    title={t.projects.viewWorkflow}
                  >
                    <FiGitBranch className="h-4 w-4" />
                  </a>
                ) : null}
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
  );

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

        <div className="mb-16">
          <h3 className="mb-8 font-display text-2xl font-medium text-[rgb(var(--ink))] md:text-3xl">
            {t.projects.personalTitle}
          </h3>
          {renderGrid(personal, 0)}
        </div>

        <div>
          <h3 className="mb-8 font-display text-2xl font-medium text-[rgb(var(--ink))] md:text-3xl">
            {t.projects.academicTitle}
          </h3>
          {renderGrid(academic, personal.length)}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(var(--ink))]/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="soft-panel relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-white/95 px-6 py-7 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/80 text-[rgb(var(--ink))] transition hover:bg-white"
                aria-label={t.projects.closeAbout}
              >
                <FiX className="h-4 w-4" />
              </button>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-deep))]">
                {mode === "spec" ? t.projects.viewSpec : t.projects.aboutProject}
              </p>
              <h3
                id="project-modal-title"
                className="pr-10 font-display text-3xl font-medium text-[rgb(var(--ink))]"
              >
                {selectedTitle}
              </h3>

              {mode === "about" ? (
                <p className="mt-5 text-base leading-relaxed text-[rgb(var(--ink-soft))]">
                  {selectedAbout}
                </p>
              ) : selectedSpec ? (
                <div className="mt-5 space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-deep))]">
                      {t.projects.objective}
                    </h4>
                    <p className="text-base leading-relaxed text-[rgb(var(--ink-soft))]">
                      {language === "en"
                        ? selectedSpec.objectiveEn
                        : selectedSpec.objective}
                    </p>
                  </div>
                  {selectedSpec.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-deep))]">
                        {language === "en" ? section.titleEn : section.title}
                      </h4>
                      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))] md:text-base">
                        {(language === "en"
                          ? section.itemsEn
                          : section.items
                        ).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-[rgb(var(--ink-soft))]">{selectedAbout}</p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-5 !py-2.5 text-xs"
                >
                  <FiExternalLink className="h-3.5 w-3.5" />
                  {t.projects.viewProject}
                </a>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="btn-outline !px-5 !py-2.5 text-xs"
                >
                  {t.projects.closeAbout}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
