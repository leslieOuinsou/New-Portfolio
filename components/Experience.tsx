"use client";

import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { EXPERIENCE } from "@/lib/constants";
import { useRef } from "react";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

export function Experience() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-20 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {EXPERIENCE.map((job, index) => {
            const role = language === "en" ? job.roleEn : job.role;
            const description =
              language === "en" ? job.descriptionEn : job.description;
            const skills = language === "en" ? job.skillsEn : job.skills;

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative mb-12 last:mb-0"
              >
                {index !== EXPERIENCE.length - 1 && (
                  <div className="absolute bottom-0 left-6 top-16 hidden w-0.5 bg-light-border dark:bg-dark-border md:block" />
                )}

                <div className="card card-hover relative flex flex-col gap-6 overflow-hidden md:flex-row">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary ring-2 ring-white/70 dark:ring-white/20">
                      <FiBriefcase className="h-6 w-6 text-[rgb(var(--color-ink))]" />
                    </div>
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="mb-1 text-xl font-bold text-light-text-primary dark:text-dark-text-primary md:text-2xl">
                      {role}
                    </h3>
                    <p className="mb-2 font-medium text-[rgb(var(--color-coral))]">
                      {job.company}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="inline-flex items-center gap-2">
                        <FiMapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FiCalendar className="h-4 w-4" />
                        {job.period}
                      </span>
                    </div>

                    <p className="mb-4 text-light-text-secondary dark:text-dark-text-secondary">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span key={skill} className="skill-tag !px-3 !py-1 text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
