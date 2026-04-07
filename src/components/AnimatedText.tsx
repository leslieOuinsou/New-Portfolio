"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Reveal lettre par lettre */
export function AnimatedText({ text, className = "", delay = 0, stagger = 0.028 }: Props) {
  const reduce = useReducedMotion();
  const letters = text.split("");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 28, scale: 0.6, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 22,
            delay: delay + i * stagger,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

type LineProps = {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export function AnimatedLines({ lines, className = "", lineClassName = "", delay = 0 }: LineProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <p key={line} className={lineClassName}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.p
          key={line}
          className={lineClassName}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
