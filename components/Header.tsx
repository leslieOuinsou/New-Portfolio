"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { PERSONAL_INFO } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.education, href: "#education" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-white/50 bg-white/55 shadow-[0_10px_40px_-24px_rgba(186,150,168,0.45)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="container-custom flex items-center justify-between py-3.5">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="flex items-center gap-2"
            aria-label={PERSONAL_INFO.name}
          >
            <Image
              src="/Logo.jpg"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white/80"
              priority
            />
            <span className="font-display text-lg text-[rgb(var(--ink))]">
              Leslie
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="text-sm font-medium text-[rgb(var(--ink-soft))] transition hover:text-[rgb(var(--accent-deep))]"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--rose))]/40 bg-white/70 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[3.75rem] z-40 border-b border-white/60 bg-white/85 px-5 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[rgb(var(--ink))] hover:bg-[rgb(var(--blush))]/50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
