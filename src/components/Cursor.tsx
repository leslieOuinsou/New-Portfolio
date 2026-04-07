"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Curseur magnétique : anneau + point avec lerp ;
 * sur [data-magnetic], le point est attiré vers le centre de la cible.
 */
export function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const magneticPull = useRef<{ x: number; y: number; strength: number } | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = () => setFinePointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!finePointer) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = (e.target as HTMLElement | null)?.closest("[data-magnetic]");
      if (el instanceof HTMLElement) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        magneticPull.current = { x: cx, y: cy, strength: 0.38 };
      } else {
        magneticPull.current = null;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor-hover], [data-magnetic]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    let raf = 0;

    const loop = () => {
      let tx = target.current.x;
      let ty = target.current.y;
      const mp = magneticPull.current;
      if (mp) {
        tx = tx + (mp.x - tx) * mp.strength;
        ty = ty + (mp.y - ty) * mp.strength;
      }

      pos.current.x += (tx - pos.current.x) * 0.2;
      pos.current.y += (ty - pos.current.y) * 0.2;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        <div
          className={`rounded-full border border-white/90 transition-[width,height] duration-300 ${
            hovering ? "h-14 w-14" : "h-9 w-9"
          }`}
        />
      </div>
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        <div
          className={`rounded-full bg-white transition-transform duration-200 ${
            hovering ? "h-2 w-2 scale-125" : "h-1.5 w-1.5"
          }`}
        />
      </div>
    </>
  );
}
