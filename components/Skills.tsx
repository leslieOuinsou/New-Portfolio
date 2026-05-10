"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SKILLS } from "@/lib/constants";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiTool,
  FiLayout,
  FiZap,
} from "react-icons/fi";
import { IconCloud } from "./IconCloud";

/** SVG Simple Icons (jsDelivr) — évite le rendu React dans le canvas (Webpack stable) */
const SI_PKG = "simple-icons@13.15.0";
const siIcon = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/${SI_PKG}/icons/${slug}.svg`;

const SKILL_CLOUD_IMAGE_URLS = [
  siIcon("react"),
  siIcon("nextdotjs"),
  siIcon("typescript"),
  siIcon("tailwindcss"),
  siIcon("nodedotjs"),
  siIcon("express"),
  siIcon("mongodb"),
  siIcon("postgresql"),
  siIcon("git"),
  siIcon("docker"),
  siIcon("figma"),
  siIcon("wordpress"),
];

export function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: t.skills.frontend,
      skills: SKILLS.frontend,
      icon: FiCode,
      accent: "primary" as const,
    },
    {
      title: t.skills.backend,
      skills: SKILLS.backend,
      icon: FiServer,
      accent: "secondary" as const,
    },
    {
      title: t.skills.database,
      skills: SKILLS.database,
      icon: FiDatabase,
      accent: "primary" as const,
    },
    {
      title: t.skills.tools,
      skills: SKILLS.tools,
      icon: FiTool,
      accent: "secondary" as const,
    },
    {
      title: t.skills.design,
      skills: [...SKILLS.design, ...SKILLS.cms],
      icon: FiLayout,
      accent: "primary" as const,
    },
    {
      title: t.skills.automation,
      skills: SKILLS.automation,
      icon: FiZap,
      accent: "secondary" as const,
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-light-card dark:bg-dark-card"
      ref={ref}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.skills.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const tint =
              category.accent === "primary"
                ? "bg-accent-primary"
                : "bg-white border border-light-border dark:border-dark-border";
            const tintSoft =
              category.accent === "primary"
                ? "bg-accent-primary/15"
                : "bg-accent-primary/5";
            const pulseTint =
              category.accent === "primary"
                ? "bg-accent-primary"
                : "bg-accent-primary/40";
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="card card-hover relative overflow-hidden group"
              >
                {/* Fond au survol (couleur unie) */}
                <div
                  className={`pointer-events-none absolute inset-0 ${tintSoft} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-lg ${tint} flex items-center justify-center relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 text-violet-950 dark:text-violet-100" />
                    {/* Pulse effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${pulseTint}`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: categoryIndex * 0.2,
                      }}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{
                        duration: 0.3,
                        delay:
                          categoryIndex * 0.1 +
                          skillIndex * 0.05,
                      }}
                      className="skill-tag"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nuage d’icônes 3D */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="relative rounded-lg border border-light-border bg-accent-primary/20 dark:border-dark-border dark:bg-dark-card/80 px-4 py-8 md:px-8">
            <IconCloud images={SKILL_CLOUD_IMAGE_URLS} size={400} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

