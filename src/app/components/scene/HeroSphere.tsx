"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Sphère wireframe "architecturale" pour le hero.
 * - Rotation lente permanente
 * - Disparition progressive au scroll (sur le premier écran)
 *
 * IMPORTANT: ce composant est rendu DANS le Canvas global (Background3D).
 */
export default function HeroSphere({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.LineSegments>(null);

  // Valeurs cibles (scroll → fade + shrink)
  const target = useRef({ opacity: 1, scale: 1 });

  const outerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2, 2)),
    []
  );
  const innerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.2, 1)),
    []
  );

  useEffect(() => {
    if (!enabled) {
      target.current = { opacity: 0, scale: 0.92 };
      return;
    }

    const onScroll = () => {
      const vh = Math.max(window.innerHeight, 1);
      const y = window.scrollY || 0;
      // 0 → 1 sur ~0.9 viewport, puis clamp
      const t = Math.min(Math.max(y / (vh * 0.9), 0), 1);
      const opacity = 1 - t;
      const scale = 1 - t * 0.08;
      target.current = { opacity, scale };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  useFrame(() => {
    const o = outerRef.current;
    if (o) {
      o.rotation.x += 0.003;
      o.rotation.y += 0.005;
    }
    const i = innerRef.current;
    if (i) {
      i.rotation.x -= 0.004;
      i.rotation.z += 0.003;
    }

    const g = groupRef.current;
    if (!g) return;

    // Lerp doux vers les cibles
    g.scale.lerp(
      new THREE.Vector3(target.current.scale, target.current.scale, target.current.scale),
      0.08
    );

    const outerMat = o?.material as THREE.LineBasicMaterial | undefined;
    const innerMat = i?.material as THREE.LineBasicMaterial | undefined;
    if (outerMat) outerMat.opacity += (0.55 * target.current.opacity - outerMat.opacity) * 0.1;
    if (innerMat) innerMat.opacity += (0.18 * target.current.opacity - innerMat.opacity) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <lineSegments ref={outerRef} geometry={outerEdges}>
        <lineBasicMaterial color="#50C878" transparent opacity={0.55} />
      </lineSegments>
      <lineSegments ref={innerRef} geometry={innerEdges}>
        <lineBasicMaterial color="#F5F0E8" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

