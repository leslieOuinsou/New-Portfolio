"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";
import { getProjectSpec } from "@/lib/project-specs";
import { useEffect, useRef, useState } from "react";
import {
  FiExternalLink,
  FiGithub,
  FiGitBranch,
  FiBookOpen,
  FiInfo,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

type ModalMode = "about" | "spec";
type CoffretKind = "personal" | "academic";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Projects() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
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
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [openId, mode]);

  const openModal = (
    id: number,
    nextMode: ModalMode,
    trigger: HTMLElement | null
  ) => {
    triggerRef.current = trigger;
    setMode(nextMode);
    setOpenId(id);
  };

  const renderGrid = (list: typeof PROJECTS, startIndex: number) => (
    <div className="relative z-[1] grid gap-6 sm:grid-cols-2">
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
              <h4 className="mb-3 text-xl font-bold text-light-text-primary dark:text-dark-text-primary md:text-2xl">
                {title}
              </h4>

              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary md:text-base">
                {description}
              </p>

              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={(e) =>
                    openModal(project.id, "about", e.currentTarget)
                  }
                  aria-label={`${t.projects.aboutProject} — ${title}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent-deep))] transition hover:text-[rgb(var(--accent))]"
                >
                  <FiInfo className="h-4 w-4" />
                  {t.projects.aboutProject}
                </button>
                <button
                  type="button"
                  onClick={(e) =>
                    openModal(project.id, "spec", e.currentTarget)
                  }
                  aria-label={`${t.projects.viewSpec} — ${title}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent-deep))] transition hover:text-[rgb(var(--accent))]"
                >
                  <FiBookOpen className="h-4 w-4" />
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

  const renderCoffret = (
    kind: CoffretKind,
    list: typeof PROJECTS,
    startIndex: number
  ) => {
    const isPersonal = kind === "personal";
    return (
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.55, delay: isPersonal ? 0.05 : 0.15 }}
        className={`coffret ${isPersonal ? "coffret-personal" : "coffret-academic"} mb-12 last:mb-0`}
      >
        <div className="coffret-lid relative z-[1]">
          <div>
            <span className="coffret-badge">
              {isPersonal ? t.projects.personalCoffret : t.projects.academicCoffret}
            </span>
            <h3 className="mt-3 font-display text-2xl font-medium text-[rgb(var(--ink))] md:text-3xl">
              {isPersonal ? t.projects.personalTitle : t.projects.academicTitle}
            </h3>
            <p className="mt-1 text-sm text-[rgb(var(--ink-soft))]">
              {isPersonal ? t.projects.personalHint : t.projects.academicHint}
            </p>
          </div>
          <span
            className="font-display text-4xl text-[rgb(var(--ink))]/15 md:text-5xl"
            aria-hidden="true"
          >
            {String(list.length).padStart(2, "0")}
          </span>
        </div>
        {renderGrid(list, startIndex)}
      </motion.div>
    );
  };

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

        {renderCoffret("personal", personal, 0)}
        {renderCoffret("academic", academic, personal.length)}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(var(--ink))]/50 p-3 backdrop-blur-sm sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            {mode === "spec" && selectedSpec ? (
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotateY: -12, scale: 0.92 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, rotateY: 0, scale: 1 }
                }
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="spec-book"
                style={{ transformPerspective: 1200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--mauve))]/35 bg-[#faf6f1]/95 text-[rgb(var(--ink))] shadow-sm transition hover:bg-white sm:right-5 sm:top-5"
                  aria-label={t.projects.closeAbout}
                >
                  <FiX className="h-4 w-4" />
                </button>
                <div className="spec-book-pages spec-paper-line">
                  <p className="mb-1 font-display text-sm italic tracking-wide text-[rgb(var(--accent-deep))]">
                    {t.projects.specBookTitle}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="pr-10 font-display text-3xl font-medium leading-tight text-[rgb(var(--ink))] md:text-4xl"
                  >
                    {selectedTitle}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-b border-[rgb(var(--mauve))]/25 pb-4 text-xs uppercase tracking-[0.16em] text-[rgb(var(--ink-soft))]">
                    <span>
                      {t.projects.specDocRef}{" "}
                      <strong className="tracking-normal text-[rgb(var(--ink))]">
                        {selectedSpec.docRef}
                      </strong>
                    </span>
                    <span>
                      {t.projects.specVersion}{" "}
                      <strong className="tracking-normal text-[rgb(var(--ink))]">
                        {selectedSpec.version}
                      </strong>
                    </span>
                  </div>

                  <div className="mt-6 space-y-7">
                    <div>
                      <h4 className="mb-2 font-display text-xl text-[rgb(var(--ink))]">
                        {t.projects.objective}
                      </h4>
                      <p className="text-[0.95rem] leading-7 text-[rgb(var(--ink-soft))]">
                        {language === "en"
                          ? selectedSpec.objectiveEn
                          : selectedSpec.objective}
                      </p>
                    </div>
                    {selectedSpec.sections.map((section) => (
                      <div key={section.title}>
                        <h4 className="mb-2 font-display text-xl text-[rgb(var(--ink))]">
                          {language === "en" ? section.titleEn : section.title}
                        </h4>
                        <ul className="space-y-2 text-[0.95rem] leading-7 text-[rgb(var(--ink-soft))]">
                          {(language === "en"
                            ? section.itemsEn
                            : section.items
                          ).map((item) => (
                            <li key={item} className="flex gap-2">
                              <span
                                className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent))]"
                                aria-hidden
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 border-t border-[rgb(var(--mauve))]/25 pt-6">
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
                </div>
              </motion.div>
            ) : (
              <motion.div
                ref={dialogRef}
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
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="sticky float-right mb-2 ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/90 text-[rgb(var(--ink))] transition hover:bg-white"
                  aria-label={t.projects.closeAbout}
                >
                  <FiX className="h-4 w-4" />
                </button>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-deep))]">
                  {t.projects.aboutProject}
                </p>
                <h3
                  id="project-modal-title"
                  className="pr-10 font-display text-3xl font-medium text-[rgb(var(--ink))]"
                >
                  {selectedTitle}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-[rgb(var(--ink-soft))]">
                  {selectedAbout}
                </p>

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
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
