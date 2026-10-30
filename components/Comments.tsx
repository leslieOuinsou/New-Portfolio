"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS } from "@/lib/constants";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  FiMessageCircle,
  FiStar,
  FiX,
  FiSend,
  FiPlus,
  FiInbox,
} from "react-icons/fi";

type StoredComment = {
  id: string;
  name: string;
  projectId: number;
  projectTitle: string;
  projectTitleEn: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Panel = "list" | "form" | null;

const STORAGE_KEY = "portfolio-project-comments";

function loadComments(): StoredComment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveComments(list: StoredComment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 40)));
}

function Stars({
  value,
  onChange,
  interactive,
}: {
  value: number;
  onChange?: (n: number) => void;
  interactive?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? "radiogroup" : undefined}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        if (!interactive) {
          return (
            <FiStar
              key={n}
              className={`h-4 w-4 ${active ? "fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" : "text-[rgb(var(--mauve))]/40"}`}
              aria-hidden
            />
          );
        }
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n}/5`}
            onClick={() => onChange?.(n)}
            className="rounded p-0.5 transition hover:scale-110"
          >
            <FiStar
              className={`h-6 w-6 ${active ? "fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" : "text-[rgb(var(--mauve))]/45"}`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function Comments() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [panel, setPanel] = useState<Panel>(null);
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectId: String(PROJECTS[0]?.id ?? 1),
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    setComments(loadComments());
  }, []);

  useEffect(() => {
    if (panel === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [panel]);

  const openPanel = (next: Panel, el: HTMLElement | null) => {
    triggerRef.current = el;
    setStatus("idle");
    setPanel(next);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectId: Number(form.projectId),
          rating: form.rating,
          comment: form.comment,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        comment?: StoredComment;
      };
      if (!response.ok || !data.comment) {
        setStatus("error");
        window.setTimeout(() => setStatus("idle"), 3000);
        return;
      }
      const next = [data.comment, ...comments];
      setComments(next);
      saveComments(next);
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        comment: "",
        rating: 5,
      }));
      setStatus("success");
      window.setTimeout(() => {
        setPanel("list");
        setStatus("idle");
      }, 900);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const countLabel =
    comments.length === 0
      ? t.comments.noCount
      : comments.length === 1
        ? t.comments.countOne
        : t.comments.countMany.replace("{n}", String(comments.length));

  return (
    <>
      <section id="comments" className="relative py-20 md:py-28" ref={ref}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="section-title">{t.comments.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[rgb(var(--ink-soft))] md:text-lg">
              {t.comments.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={(e) => openPanel("list", e.currentTarget)}
              className="group relative flex h-28 w-28 items-center justify-center rounded-full border border-[rgb(var(--rose))]/45 bg-white/70 text-[rgb(var(--accent-deep))] shadow-[0_24px_50px_-28px_rgba(196,112,140,0.7)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:text-[rgb(var(--accent))] md:h-32 md:w-32"
              aria-label={t.comments.viewButton}
              title={t.comments.viewButton}
            >
              <FiInbox className="h-11 w-11 transition group-hover:scale-105 md:h-12 md:w-12" />
              {comments.length > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-8 min-w-8 items-center justify-center rounded-full bg-[rgb(var(--accent))] px-2 text-sm font-bold text-white shadow-md">
                  {comments.length > 99 ? "99+" : comments.length}
                </span>
              ) : null}
            </button>

            <p className="text-sm font-medium text-[rgb(var(--ink-soft))]">
              {countLabel}
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-[rgb(var(--accent-deep))]">
              {t.comments.tapHint}
            </p>

            <button
              type="button"
              onClick={(e) => openPanel("form", e.currentTarget)}
              className="btn-outline !px-6 !py-2.5 text-xs"
            >
              <FiPlus className="h-4 w-4" />
              {t.comments.leaveButton}
            </button>
          </motion.div>
        </div>
      </section>

      <button
        type="button"
        onClick={(e) => openPanel("list", e.currentTarget)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-white shadow-[0_18px_40px_-12px_rgba(196,112,140,0.75)] transition hover:scale-105 hover:bg-[rgb(var(--accent-deep))] md:bottom-8 md:right-8"
        aria-label={t.comments.viewButton}
        title={t.comments.viewButton}
      >
        <FiMessageCircle className="h-6 w-6" />
        {comments.length > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(var(--ink))] px-1 text-[10px] font-bold text-white">
            {comments.length > 9 ? "9+" : comments.length}
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {panel === "list" ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(var(--ink))]/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanel(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="comments-list-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="soft-panel relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden bg-white/95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-[rgb(var(--rose))]/25 px-6 py-5 sm:px-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-deep))]">
                    {t.comments.badge}
                  </p>
                  <h3
                    id="comments-list-title"
                    className="mt-1 font-display text-3xl font-medium text-[rgb(var(--ink))]"
                  >
                    {t.comments.listTitle}
                  </h3>
                  <p className="mt-1 text-sm text-[rgb(var(--ink-soft))]">
                    {countLabel}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setPanel(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/80 text-[rgb(var(--ink))] transition hover:bg-white"
                  aria-label={t.comments.close}
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 sm:px-7">
                {comments.length === 0 ? (
                  <div className="py-10 text-center">
                    <FiInbox className="mx-auto mb-3 h-8 w-8 text-[rgb(var(--accent))]" />
                    <p className="text-[rgb(var(--ink-soft))]">{t.comments.empty}</p>
                  </div>
                ) : (
                  comments.map((item) => {
                    const projectTitle =
                      language === "en"
                        ? item.projectTitleEn
                        : item.projectTitle;
                    const date = new Date(item.createdAt).toLocaleDateString(
                      language === "en" ? "en-GB" : "fr-FR",
                      { day: "numeric", month: "short", year: "numeric" }
                    );
                    return (
                      <article
                        key={item.id}
                        className="rounded-2xl border border-[rgb(var(--rose))]/25 bg-white/70 px-4 py-4"
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-xl text-[rgb(var(--ink))]">
                              {item.name}
                            </p>
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-deep))]">
                              {projectTitle}
                            </p>
                          </div>
                          <Stars value={item.rating} />
                        </div>
                        <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                          “{item.comment}”
                        </p>
                        <p className="mt-3 text-xs text-[rgb(var(--mauve))]">
                          {date}
                        </p>
                      </article>
                    );
                  })
                )}
              </div>

              <div className="border-t border-[rgb(var(--rose))]/25 px-6 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={(e) => openPanel("form", e.currentTarget)}
                  className="btn-primary w-full !py-3 text-xs"
                >
                  <FiPlus className="h-4 w-4" />
                  {t.comments.leaveButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        {panel === "form" ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(var(--ink))]/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanel(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="comment-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="soft-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white/95 px-6 py-7 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setPanel(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/80 text-[rgb(var(--ink))] transition hover:bg-white"
                aria-label={t.comments.close}
              >
                <FiX className="h-4 w-4" />
              </button>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-deep))]">
                {t.comments.badge}
              </p>
              <h3
                id="comment-modal-title"
                className="pr-10 font-display text-3xl font-medium text-[rgb(var(--ink))]"
              >
                {t.comments.formTitle}
              </h3>
              <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                {t.comments.formHint}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="comment-name"
                    className="mb-1.5 block text-sm font-semibold text-[rgb(var(--ink))]"
                  >
                    {t.comments.name}
                  </label>
                  <input
                    id="comment-name"
                    name="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder={t.comments.namePlaceholder}
                    className="w-full rounded-xl border border-[rgb(var(--rose))]/35 bg-white/80 px-4 py-3 text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/25"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment-email"
                    className="mb-1.5 block text-sm font-semibold text-[rgb(var(--ink))]"
                  >
                    {t.comments.email}
                  </label>
                  <input
                    id="comment-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder={t.comments.emailPlaceholder}
                    className="w-full rounded-xl border border-[rgb(var(--rose))]/35 bg-white/80 px-4 py-3 text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/25"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment-project"
                    className="mb-1.5 block text-sm font-semibold text-[rgb(var(--ink))]"
                  >
                    {t.comments.project}
                  </label>
                  <select
                    id="comment-project"
                    name="projectId"
                    required
                    value={form.projectId}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        projectId: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[rgb(var(--rose))]/35 bg-white/80 px-4 py-3 text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/25"
                  >
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {language === "en" ? p.titleEn : p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1.5 text-sm font-semibold text-[rgb(var(--ink))]">
                    {t.comments.rating}
                  </p>
                  <Stars
                    value={form.rating}
                    interactive
                    onChange={(n) =>
                      setForm((prev) => ({ ...prev, rating: n }))
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment-body"
                    className="mb-1.5 block text-sm font-semibold text-[rgb(var(--ink))]"
                  >
                    {t.comments.comment}
                  </label>
                  <textarea
                    id="comment-body"
                    name="comment"
                    required
                    maxLength={2000}
                    rows={4}
                    value={form.comment}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, comment: e.target.value }))
                    }
                    placeholder={t.comments.commentPlaceholder}
                    className="w-full resize-none rounded-xl border border-[rgb(var(--rose))]/35 bg-white/80 px-4 py-3 text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/25"
                  />
                </div>

                {status === "success" ? (
                  <p className="text-sm font-medium text-emerald-700">
                    {t.comments.success}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-sm font-medium text-red-600">
                    {t.comments.error}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setPanel("list")}
                    className="btn-outline flex-1 !py-3 text-xs"
                  >
                    {t.comments.viewButton}
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary flex-[1.4] !py-3 text-xs disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <FiSend className="h-4 w-4" />
                    {status === "sending" ? t.comments.sending : t.comments.send}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
