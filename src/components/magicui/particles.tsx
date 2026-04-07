"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = { bx: number; by: number; r: number };

/**
 * Particules blanches sur canvas — légère attraction vers le curseur (effet fort Hero uniquement).
 */
export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = 72;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      bx: Math.random(),
      by: Math.random(),
      r: Math.random() * 1.2 + 0.4,
    }));

    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const p = canvas.parentElement;
      w = p?.clientWidth ?? window.innerWidth;
      h = p?.clientHeight ?? window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / w;
      mouse.current.y = (e.clientY - rect.top) / h;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;

      for (const p of particles) {
        const bx = p.bx * w;
        const by = p.by * h;
        const dx = mx - bx;
        const dy = my - by;
        const x = bx + dx * 0.06;
        const y = by + dy * 0.06;
        const d = Math.hypot(dx, dy);
        const a = 0.08 + Math.min(0.22, 120 / (d + 40));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    />
  );
}
