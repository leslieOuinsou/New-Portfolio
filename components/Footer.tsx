"use client";

import { motion } from "framer-motion";
import { FiHeart, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: PERSONAL_INFO.github, label: "GitHub" },
    ...(PERSONAL_INFO.linkedin
      ? [
          {
            icon: FiLinkedin,
            href: PERSONAL_INFO.linkedin,
            label: "LinkedIn" as const,
          },
        ]
      : []),
    { icon: FiMail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
  ];

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 inline-flex items-center">
              <img
                src="/Logo.jpg"
                alt=""
                width={120}
                height={36}
                className="h-8 w-auto object-contain"
                decoding="async"
              />
            </div>
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {PERSONAL_INFO.title}
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex items-center justify-center hover:border-violet-300 dark:hover:border-violet-500 transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Right - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              © {currentYear} {PERSONAL_INFO.name}.
            </p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {t.footer.rights}
            </p>
          </motion.div>
        </div>

        {/* Bottom - Made With */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-light-border dark:border-dark-border text-center"
        >
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary flex items-center justify-center gap-2 flex-wrap">
            <span>{t.footer.madeWith}</span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FiHeart className="inline text-violet-700 dark:text-violet-400" />
            </motion.span>
            <span>{t.footer.using}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}


