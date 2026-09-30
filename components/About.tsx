"use client";

import { motion, useInView } from "framer-motion";
import { FiDownload, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";

export function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="soft-panel mx-auto max-w-4xl px-8 py-12 sm:px-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--accent-deep))]">
            Portrait
          </p>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[rgb(var(--ink-soft))]">
            {t.about.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[rgb(var(--ink-soft))]">
            <FiMapPin className="h-4 w-4 text-[rgb(var(--accent))]" />
            <span>{t.about.location}</span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[rgb(var(--rose))]/30 pt-8">
            {[
              { value: "20+", label: "Technologies" },
              { value: String(PROJECTS.length), label: "Projets" },
              { value: "2", label: "Stages" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl text-[rgb(var(--accent-deep))]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[rgb(var(--ink-soft))] sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="/cv-leslie-ouinsou.pdf"
            download
            className="btn-primary mt-10 inline-flex"
          >
            <FiDownload className="h-4 w-4" />
            {t.about.downloadCV}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
