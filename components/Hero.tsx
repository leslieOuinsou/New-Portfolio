"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowDown, FiGithub, FiMail } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { PERSONAL_INFO } from "@/lib/constants";

const SceneCanvas = dynamic(() => import("./canvas/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-0 bg-[#fcf7f9]" aria-hidden />
  ),
});

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SceneCanvas />
      <section
        id="home"
        ref={ref}
        className="relative flex min-h-[100dvh] items-center pt-24"
      >
        <motion.div style={{ opacity, y }} className="container-custom relative z-10 w-full py-16">
          <div className="soft-panel mx-auto max-w-2xl bg-white/40 px-8 py-12 text-center backdrop-blur-md sm:px-12 sm:py-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[rgb(var(--accent-deep))]"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-5xl font-medium leading-[1.05] text-[rgb(var(--ink))] sm:text-6xl md:text-7xl"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-5 text-lg text-[rgb(var(--ink-soft))] sm:text-xl"
            >
              {t.hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[rgb(var(--ink-soft))]"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection("#projects")}
                className="btn-primary"
              >
                {t.hero.cta}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn-outline"
              >
                {t.hero.contact}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex justify-center gap-3"
            >
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--rose))]/50 bg-white/70 text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent-deep))]"
              >
                <FiGithub className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--rose))]/50 bg-white/70 text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent-deep))]"
              >
                <FiMail className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <p className="mt-8 text-center text-xs tracking-wide text-[rgb(var(--ink-soft))]/80">
            {t.hero.sceneHint}
          </p>
        </motion.div>

        <button
          type="button"
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[rgb(var(--accent-deep))]"
          aria-label={t.nav.about}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex"
          >
            <FiArrowDown className="h-5 w-5" />
          </motion.span>
        </button>
      </section>
    </>
  );
}
