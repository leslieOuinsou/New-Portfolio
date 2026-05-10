"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-1">
      <motion.div
        className="absolute w-10 h-8 rounded-md bg-violet-900 dark:bg-violet-700 shadow-sm"
        animate={{
          x: language === "fr" ? 0 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
      <button
        onClick={() => setLanguage("fr")}
        className={`relative z-10 w-10 h-8 text-sm font-medium transition-colors duration-300 ${
          language === "fr" ? "text-white" : "text-light-text-secondary dark:text-dark-text-secondary"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative z-10 w-10 h-8 text-sm font-medium transition-colors duration-300 ${
          language === "en" ? "text-white" : "text-light-text-secondary dark:text-dark-text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}


