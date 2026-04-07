"use client";

import { type FormEvent, useState } from "react";
import { HyperText } from "@/components/magicui/hyper-text";
import { Meteors } from "@/components/magicui/meteors";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/**
 * Effet fort : HyperText sur le titre + Meteors discrets (opacité ~0.3).
 */
export function Contact() {
  const magPrimary = useMagneticEffect<HTMLDivElement>(0.32);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio — ${name || "contact"}`);
    const body = encodeURIComponent(`${message}\n\n—\n${email || ""}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 py-28 md:px-10 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Meteors />
      </div>

      <Reveal className="relative z-10 mx-auto w-full max-w-4xl border border-[var(--color-border)] bg-[#080808]/95 p-10 shadow-[var(--glow-medium)] backdrop-blur-sm md:p-16">
        <p className="typo-label uppercase tracking-[0.45em] text-white/60">Contact direct</p>

        <h2 className="mt-6 max-w-4xl">
          <HyperText text="ON DISCUTE ?" />
        </h2>

        <p className="typo-section mt-8 max-w-xl text-white/60">
          Un sujet, un timing, un format — je réponds sous 48h. Pas de formulaire lourd : un mail suffit.
        </p>
        <p className="typo-label mt-4 uppercase tracking-[0.2em] text-white">{SITE.availabilityLabel}</p>
        <p className="typo-body mt-1 text-white/60">{SITE.availabilityDetail}</p>

        <form onSubmit={onSubmit} className="relative z-10 mt-14 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="typo-label uppercase tracking-[0.35em]">Nom</span>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="typo-body mt-2 w-full border-b border-[var(--color-border)] bg-transparent py-2 text-white outline-none focus:border-white"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="typo-label uppercase tracking-[0.35em]">Email</span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="typo-body mt-2 w-full border-b border-[var(--color-border)] bg-transparent py-2 text-white outline-none focus:border-white"
                autoComplete="email"
              />
            </label>
          </div>
          <label className="block">
            <span className="typo-label uppercase tracking-[0.35em]">Message</span>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="typo-body mt-2 w-full resize-none border-b border-[var(--color-border)] bg-transparent py-2 text-white outline-none focus:border-white"
              placeholder="Ton besoin en une phrase."
            />
          </label>

          <div ref={magPrimary} className="inline-block will-change-transform pt-2">
            <button
              type="submit"
              data-magnetic
              data-cursor-hover
              className="btn-outline font-[family-name:var(--font-body)] px-10 py-4 text-[0.95rem] font-medium uppercase tracking-[0.35em]"
            >
              Ouvrir l&apos;email
            </button>
          </div>
        </form>

        <div className="typo-label mt-12 flex flex-wrap gap-8 uppercase tracking-[0.25em] text-white/60">
          <a href={`mailto:${SITE.email}`} className="hover:text-white">
            {SITE.email}
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
            {SITE.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
