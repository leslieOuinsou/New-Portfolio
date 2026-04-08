"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Item = (typeof PROJECTS)[number] & { num: string };

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-[rgba(80,200,120,0.12)]",
        "bg-[rgba(80,200,120,0.03)] backdrop-blur-[var(--glass-blur)]"
      )}
    >
      <div className="relative aspect-[16/10]">
        <motion.div className="absolute inset-0" style={{ y, willChange: "transform" }}>
          <div className="absolute inset-x-0 -inset-y-[15%]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              priority={false}
            />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040A06]/65 via-transparent to-transparent" />
    </div>
  );
}

function ProjectRow({
  project,
  index,
  total,
  reverse,
}: {
  project: Item;
  index: number;
  total: number;
  reverse: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const href = project.link ?? project.github ?? "#";

  return (
    <motion.div
      ref={ref}
      initial={reduce ? undefined : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "grid items-center gap-10 py-10",
        "border-t border-[rgba(80,200,120,0.10)]",
        "md:grid-cols-2",
        reverse && "md:[&>*:first-child]:order-2"
      )}
    >
      <div>
        <p className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.18em] text-[rgba(80,200,120,0.42)]">
          {project.num} / {String(total).padStart(2, "0")}
        </p>

        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.45rem,2.6vw,1.95rem)] font-[500] leading-[1.18] tracking-[-0.02em] text-[color:var(--color-text)]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-2 font-[family-name:var(--font-body)] text-[14px] leading-[1.85] text-[color:var(--color-muted)]">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((s) => (
            <span
              key={s}
              className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.06em] text-[color:var(--color-accent)] border border-[rgba(80,200,120,0.20)] rounded-[3px] px-2.5 py-1"
            >
              {s}
            </span>
          ))}
        </div>

        {href !== "#" ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-accent)]/90 transition-opacity hover:opacity-100 opacity-85"
          >
            ↗ voir le projet
          </Link>
        ) : null}
      </div>

      <ParallaxImage src={project.image} alt={project.title} />
    </motion.div>
  );
}

export function Projects() {
  const items = useMemo<Item[]>(
    () =>
      PROJECTS.map((p, idx) => ({
        ...p,
        num: String(idx + 1).padStart(2, "0"),
      })),
    []
  );

  return (
    <section
      id="work"
      className="py-28 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1000px]">
        <p className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-accent)]/70">
          selected work
        </p>
        <div className="mt-10 border-b border-[rgba(80,200,120,0.10)]">
          {items.map((p, i) => (
            <ProjectRow
              key={p.title}
              project={p}
              index={i}
              total={items.length}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

