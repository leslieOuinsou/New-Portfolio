"use client";

import { motion } from "framer-motion";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * DotPattern global + transitions douces. Chaque section porte son seul effet fort.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080808]">
      <DotPattern className="fixed inset-0 z-[1] opacity-[0.03]" />
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Nav />
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  );
}
