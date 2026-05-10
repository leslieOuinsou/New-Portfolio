import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "accent-primary": "rgb(var(--color-accent-primary) / <alpha-value>)",
        "accent-secondary": "rgb(var(--color-accent-secondary) / <alpha-value>)",
        "light-surface": "rgb(var(--color-light-surface) / <alpha-value>)",
        "dark-surface": "rgb(var(--color-dark-surface) / <alpha-value>)",
        "light-card": "rgb(var(--color-light-card) / <alpha-value>)",
        "dark-card": "rgb(var(--color-dark-card) / <alpha-value>)",
        "light-border": "rgb(var(--color-light-border) / <alpha-value>)",
        "dark-border": "rgb(var(--color-dark-border) / <alpha-value>)",
        "light-text-primary":
          "rgb(var(--color-light-text-primary) / <alpha-value>)",
        "dark-text-primary":
          "rgb(var(--color-dark-text-primary) / <alpha-value>)",
        "light-text-secondary":
          "rgb(var(--color-light-text-secondary) / <alpha-value>)",
        "dark-text-secondary":
          "rgb(var(--color-dark-text-secondary) / <alpha-value>)",
      },
      boxShadow: {
        "light-md":
          "0 4px 6px -1px rgb(238 237 254 / 0.9), 0 2px 4px -2px rgb(200 195 230 / 0.25)",
        "dark-md": "0 4px 6px -1px rgb(0 0 0 / 0.35)",
        "light-lg":
          "0 10px 15px -3px rgb(238 237 254 / 0.95), 0 4px 6px -4px rgb(200 195 230 / 0.3)",
        "dark-lg": "0 10px 15px -3px rgb(0 0 0 / 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
