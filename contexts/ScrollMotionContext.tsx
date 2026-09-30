"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ScrollMotion = {
  progress: number;
  y: number;
  mouse: { x: number; y: number };
};

const ScrollMotionContext = createContext<ScrollMotion>({
  progress: 0,
  y: 0,
  mouse: { x: 0, y: 0 },
});

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [y, setY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const nextY = window.scrollY;
        setY(nextY);
        setProgress(max > 0 ? Math.min(1, nextY / max) : 0);
      });
    };
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const value = useMemo(
    () => ({ progress, y, mouse }),
    [progress, y, mouse]
  );

  return (
    <ScrollMotionContext.Provider value={value}>
      {children}
    </ScrollMotionContext.Provider>
  );
}

export function useScrollMotion() {
  return useContext(ScrollMotionContext);
}
