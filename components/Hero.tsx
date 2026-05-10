"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { PERSONAL_INFO } from "@/lib/constants";

/** WebGL / ogl uniquement côté client — évite les erreurs Webpack du bundle serveur */
const Iridescence = dynamic(
  () => import("./Iridescence").then((mod) => mod.Iridescence),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 min-h-full bg-accent-primary dark:bg-dark-surface"
        aria-hidden
      />
    ),
  }
);

const HERO_IRIDESCENCE_COLOR: [number, number, number] = [0.5, 0.6, 0.8];

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0 min-h-full">
        <Iridescence
          mixColor={HERO_IRIDESCENCE_COLOR}
          mouseReact
          amplitude={0.1}
          speed={1}
          className="min-h-full"
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-white/25 dark:bg-violet-950/40"
        aria-hidden
      />

      <div className="container-custom relative z-20">
        <div className="flex flex-col items-center text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              {t.hero.greeting}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-violet-950 dark:text-violet-100">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            {t.hero.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-12"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 mb-12"
          >
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-light-border dark:border-gray-700 flex items-center justify-center hover:border-violet-400 hover:text-violet-800 dark:hover:border-violet-400 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </motion.a>
            {PERSONAL_INFO.linkedin ? (
              <motion.a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-light-border dark:border-gray-700 flex items-center justify-center hover:border-violet-400 hover:text-violet-800 dark:hover:border-violet-400 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
            ) : null}
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-light-border dark:border-gray-700 flex items-center justify-center hover:border-violet-400 hover:text-violet-800 dark:hover:border-violet-400 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              onClick={() => scrollToSection("#projects")}
              className="bg-white hover:bg-white/95 text-violet-950 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ring-1 ring-violet-200/80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.cta}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-white text-violet-950 hover:bg-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-sm bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.contact}
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="cursor-pointer"
              onClick={() => scrollToSection("#about")}
            >
              <FiArrowDown className="w-6 h-6 text-violet-800 dark:text-violet-200" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
