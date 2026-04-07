"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const EGG_THRESHOLD = 5;

/**
 * Pied de page + easter egg : cliquer {EGG_THRESHOLD} fois sur l'année révèle un message caché.
 */
export function Footer() {
  const reduce = useReducedMotion();
  const [clicks, setClicks] = useState(0);
  const [showEgg, setShowEgg] = useState(false);

  const onYearClick = useCallback(() => {
    setClicks((c) => {
      const n = c + 1;
      if (n >= EGG_THRESHOLD) {
        setShowEgg(true);
        return 0;
      }
      return n;
    });
  }, []);

  return (
    <>
      <motion.footer
        className="relative z-10 border-t border-[var(--color-border)] px-6 py-12 md:px-10"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="typo-label max-w-md uppercase tracking-[0.35em] text-white/30">
            {SITE.name} — développeuse full stack
          </p>
          <button
            type="button"
            onClick={onYearClick}
            className="typo-label cursor-pointer bg-transparent uppercase tracking-[0.4em] text-white/30 transition-colors hover:text-white/60"
            aria-label="Easter egg"
          >
            ©{" "}
            <span className="underline decoration-white/20 decoration-dotted underline-offset-4">
              {new Date().getFullYear()}
            </span>
          </button>
        </div>
      </motion.footer>

      <AnimatePresence>
        {showEgg ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="egg-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            onClick={() => setShowEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="max-w-md border border-white/20 bg-[#0a0a0a] p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p
                id="egg-title"
                className="font-[family-name:var(--font-body)] text-[0.95rem] uppercase tracking-[0.5em] text-white/60"
              >
                // easter_egg.unlocked
              </p>
              <p className="typo-section mt-4 italic text-white">
                « Les détails invisibles sont ceux qu’on cherche vraiment. Merci d’avoir fouillé. »
              </p>
              <p className="typo-label mt-6 uppercase tracking-[0.3em] text-white/30">
                — LO · fragment caché
              </p>
              <button
                type="button"
                onClick={() => setShowEgg(false)}
                className="btn-outline-muted font-[family-name:var(--font-body)] mt-8 px-4 py-2 text-[0.95rem] uppercase tracking-[0.25em]"
                data-cursor-hover
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
