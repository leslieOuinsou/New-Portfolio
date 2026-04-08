"use client";

import { motion } from "framer-motion";
import { Hero } from "@/app/components/sections/Hero";
import { Projects } from "@/app/components/sections/Projects";
import { SkillsMarquee } from "@/app/components/sections/SkillsMarquee";
import ContactSection from "@/app/components/sections/ContactSection";

/**
 * DotPattern global + transitions douces. Chaque section porte son seul effet fort.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <Projects />
        <SkillsMarquee />
        <ContactSection />
      </motion.main>
    </div>
  );
}
