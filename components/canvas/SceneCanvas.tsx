"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { BloomGarden } from "./BloomGarden";

export default function SceneCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.15, 4.6]} fov={40} />
          <ambientLight intensity={1} color="#fff5f8" />
          <directionalLight position={[4, 6, 3]} intensity={1.35} color="#ffe0ea" />
          <directionalLight position={[-4, 2, -2]} intensity={0.55} color="#f0d4ff" />
          <pointLight position={[0, 1.5, 2]} intensity={0.8} color="#ffc0d4" />
          <BloomGarden />
          <Environment preset="apartment" environmentIntensity={0.4} />
        </Suspense>
      </Canvas>
      {/* Voile très léger — la 3D reste bien lisible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fcf7f9]/20 via-transparent to-[#fcf7f9]/55" />
    </div>
  );
}
