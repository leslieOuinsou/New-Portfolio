"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Mots qui apparaissent en cascade au scroll — une seule fois, lisible.
 */
export function WordFadeIn({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(/\s+/);

  return (
    <p className={cn("typo-body text-white/60", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`w-${i}`}
          className="mr-[0.35em] inline-block"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
