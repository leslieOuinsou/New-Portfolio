"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fond #080808, halos blancs très diffus, grain, parallaxe.
 */
export function LiveBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1200], [0, 180]);
  const y2 = useTransform(scrollY, [0, 1200], [0, -120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.55]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080808]">
      <motion.div
        className="absolute inset-0 animate-bg-shift"
        style={{
          opacity,
          y: y1,
          backgroundImage:
            "linear-gradient(125deg, #080808 0%, #0c0c0c 25%, #101010 50%, #080808 75%, #0a0a0a 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      <motion.div
        className="absolute -left-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,transparent_70%)] blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[20%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-3xl"
        style={{ y: y1 }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080808_78%)]" />

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-white/30"
          style={{
            left: `${(i * 47) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            y: [0, -20 + (i % 5) * 4, 0],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
