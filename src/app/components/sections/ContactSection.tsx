"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";
import { sendContactMessage } from "@/lib/emailjs";
import { SITE } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSent(true);
    } catch {
      const subject = encodeURIComponent(form.subject.trim() || `Message de ${form.name.trim()}`);
      const body = encodeURIComponent(
        `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <span className={styles.label}>Contact</span>
      <h2 className={styles.title}>
        Travaillons <span className={styles.green}>ensemble</span>
      </h2>
      <p className={styles.subtitle}>Une idée, un projet ? Je suis disponible.</p>

      <div className={styles.card}>
        <div className={styles.scan} />
        <div className={`${styles.corner} ${styles.tl}`} />
        <div className={`${styles.corner} ${styles.tr}`} />
        <div className={`${styles.corner} ${styles.bl}`} />
        <div className={`${styles.corner} ${styles.br}`} />

        {sent ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#50C878"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
                aria-hidden
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>Message envoyé !</h3>
            <p className={styles.successText}>Merci, je vous réponds dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="name">Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jean@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="subject">Sujet</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="De quoi s'agit-il ?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className={styles.group}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Décrivez votre projet..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#040A06"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width={15}
                    height={15}
                    aria-hidden
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        )}

        <div className={styles.links}>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
        </div>
      </div>

      <div className={styles.status}>
        <span className={styles.dot} />
        Disponible pour de nouveaux projets
      </div>
    </section>
  );
}
