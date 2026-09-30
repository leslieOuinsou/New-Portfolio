"use client";

import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { EDUCATION } from "@/lib/constants";
import { useRef } from "react";
import { FiAward, FiCalendar, FiBookOpen } from "react-icons/fi";

export function Education() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title">{t.education.title}</h2>
          <p className="section-subtitle">{t.education.subtitle}</p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {EDUCATION.map((edu, index) => {
            const degree = language === "en" ? edu.degreeEn : edu.degree;
            const description =
              language === "en" ? edu.descriptionEn : edu.description;
            const skills = language === "en" ? edu.skillsEn : edu.skills;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                {index !== EDUCATION.length - 1 && (
                  <div className="absolute bottom-0 left-6 top-16 hidden w-0.5 bg-light-border dark:bg-dark-border md:block" />
                )}

                <div className="card card-hover relative flex flex-col gap-6 overflow-hidden md:flex-row">
                  <motion.div
                    className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary ring-2 ring-white/70 dark:ring-white/20">
                      <FiAward className="h-6 w-6 text-[rgb(var(--color-ink))]" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-accent-primary/50"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>

                  <div className="relative z-10 flex-1">
                    <motion.h3
                      className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {degree}
                    </motion.h3>

                    <div className="mb-2 flex items-center gap-2 text-[rgb(var(--color-coral))]">
                      <FiBookOpen className="h-4 w-4" />
                      <span className="font-medium">{edu.school}</span>
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FiCalendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>

                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="cursor-default rounded-full border border-light-border/80 bg-accent-primary/35 px-3 py-1 text-xs font-medium text-[rgb(var(--color-ink))] dark:border-dark-border dark:bg-accent-primary/25"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0 }
                          }
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + skillIndex * 0.1,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(238, 237, 254, 0.9)",
                          }}
                        >
                          {skill}
                        </motion.span>
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
