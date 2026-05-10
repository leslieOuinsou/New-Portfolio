"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { EDUCATION } from "@/lib/constants";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiAward, FiCalendar, FiBookOpen } from "react-icons/fi";

export function Education() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.education.title}</h2>
          <p className="section-subtitle">{t.education.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {EDUCATION.map((edu, index) => (
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
              {/* Timeline Line */}
              {index !== EDUCATION.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-light-border dark:bg-dark-border hidden md:block" />
              )}

              <div className="card card-hover flex flex-col md:flex-row gap-6 relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center relative ring-2 ring-white/70 dark:ring-white/20">
                    <FiAward className="w-6 h-6 text-violet-950 dark:text-violet-100" />
                    {/* Pulse Animation */}
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

                {/* Content */}
                <div className="flex-1 relative z-10">
                  {/* Degree */}
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {edu.degree}
                  </motion.h3>

                  {/* School */}
                  <div className="flex items-center gap-2 text-violet-800 dark:text-violet-300 mb-2">
                    <FiBookOpen className="w-4 h-4" />
                    <span className="font-medium">{edu.school}</span>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <FiCalendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {edu.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium bg-accent-primary/35 dark:bg-accent-primary/25 text-violet-950 dark:text-violet-100 rounded-full cursor-default border border-light-border/80 dark:border-dark-border"
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
          ))}
        </div>
      </div>
    </section>
  );
}

