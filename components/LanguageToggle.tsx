"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/70 p-1 backdrop-blur-md">
      <motion.div
        className="absolute h-8 w-10 rounded-full bg-[rgb(var(--accent))] shadow-sm"
        animate={{ x: language === "fr" ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`relative z-10 h-8 w-10 text-sm font-semibold transition-colors ${
          language === "fr" ? "text-white" : "text-[rgb(var(--ink-soft))]"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative z-10 h-8 w-10 text-sm font-semibold transition-colors ${
          language === "en" ? "text-white" : "text-[rgb(var(--ink-soft))]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
