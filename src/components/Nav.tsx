"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#stats", label: "Chiffres" },
  { href: "#work", label: "Projets" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "Profil" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? { y: 0, opacity: 1 } : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10"
    >
      <motion.a
        href="#hero"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="font-[family-name:var(--font-body)] text-[0.95rem] uppercase tracking-[0.4em] text-white/60 transition-colors hover:text-white"
        data-cursor-hover
      >
        {SITE.name.split(" ")[0]}
        <span className="text-white">.</span>
      </motion.a>
      <motion.nav
        className="hidden items-center gap-6 lg:flex lg:gap-10"
        aria-label="Principal"
        initial={reduce ? "show" : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
        }}
      >
        {LINKS.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-[family-name:var(--font-body)] text-[0.95rem] uppercase tracking-[0.28em] text-white/60 transition-colors hover:text-white"
            data-cursor-hover
          >
            {l.label}
          </motion.a>
        ))}
      </motion.nav>
    </motion.header>
  );
}
