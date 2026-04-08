"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HeroSphere from "@/app/components/scene/HeroSphere";

type LineSeg = { start: [number, number, number]; end: [number, number, number] };

function useIsMobile3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // IMPORTANT: "(pointer: coarse)" est trop agressif sur certains laptops/tablettes Windows
    // (trackpad + écran tactile) et peut désactiver la scène "desktop" par erreur.
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return isMobile;
}

// ─── Parallax caméra (subtil, lissé) ──────────────────────────────────────────
function CameraRig({ enabled }: { enabled: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useFrame(() => {
    if (!enabled) {
      // Même désactivée, on fixe une caméra stable pour que la grille soit visible.
      camera.position.x += (0 - camera.position.x) * 0.08;
      camera.position.y += (4 - camera.position.y) * 0.08;
      camera.position.z += (10 - camera.position.z) * 0.08;
      camera.lookAt(0, 0.5, 0);
      return;
    }
    target.current.x += (mouse.current.x - target.current.x) * 0.04;
    target.current.y += (mouse.current.y - target.current.y) * 0.04;
    camera.position.x = target.current.x * 1.5;
    camera.position.y = 4 + target.current.y * 0.8;
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

// ─── Grille architecturale "infinie" ─────────────────────────────────────────
function InfiniteGrid({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const SIZE = 30;
  const STEP = 2;

  const geometry = useMemo(() => {
    // IMPORTANT: on évite `@react-three/drei/Line` ici.
    // Sur certaines configs WebGL (Windows/Intel), les Line2/linewidth peuvent ne pas s’afficher.
    // Un `THREE.LineSegments` classique est le plus robuste.
    const verts: number[] = [];
    for (let i = -SIZE; i <= SIZE; i += STEP) {
      // lignes parallèles à X
      verts.push(-SIZE, 0, i, SIZE, 0, i);
      // lignes parallèles à Z
      verts.push(i, 0, -SIZE, i, 0, SIZE);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#50C878"),
      transparent: true,
      opacity: 0.28,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!animate) return;
    const g = groupRef.current;
    if (!g) return;
    g.position.z = (clock.getElapsedTime() * 0.3) % STEP;
  });

  return (
    <group ref={groupRef} position={[0, -3, 0]}>
      <lineSegments geometry={geometry} material={material} />
    </group>
  );
}

// ─── Particules géométriques (octaèdres) ─────────────────────────────────────
function Particles({ count = 28 }: { count?: number }) {
  const meshRefs = useRef<(THREE.LineSegments | null)[]>([]);

  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12
        ),
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        rotSpeed: 0.003 + Math.random() * 0.006,
        floatSpeed: 0.4 + Math.random() * 0.8,
        floatAmp: 0.08 + Math.random() * 0.15,
        size: 0.08 + Math.random() * 0.1,
      })),
    [count]
  );

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1)), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (let i = 0; i < meshRefs.current.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      mesh.rotateOnAxis(data[i].axis, data[i].rotSpeed);
      mesh.position.y = data[i].position.y + Math.sin(t * data[i].floatSpeed) * data[i].floatAmp;
    }
  });

  return (
    <>
      {data.map((d, i) => (
        <lineSegments
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={edges}
          scale={d.size}
          position={d.position}
        >
          <lineBasicMaterial color="#F5F0E8" transparent opacity={0.22} />
        </lineSegments>
      ))}
    </>
  );
}

function DebugMarker() {
  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#50C878"),
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  const geo = useMemo(() => {
    // Un carré wireframe + une croix au centre -> impossible à rater si WebGL rend.
    const v = [
      -3, 0, -3, 3, 0, -3,
      3, 0, -3, 3, 0, 3,
      3, 0, 3, -3, 0, 3,
      -3, 0, 3, -3, 0, -3,
      -3, 0, 0, 3, 0, 0,
      0, 0, -3, 0, 0, 3,
    ];
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return g;
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      <lineSegments geometry={geo} material={mat} />
    </group>
  );
}

const isProd = process.env.NODE_ENV === "production";

// ─── Export principal (Canvas global fixed) ───────────────────────────────────
export default function Background3D() {
  const isMobile = useIsMobile3D();
  const [status, setStatus] = useState<"loading" | "ok" | "webgl-off">("loading");

  return (
    <>
      {!isProd && (
        <div className="fixed left-3 top-3 z-50 pointer-events-none font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.28em]">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-3 py-2 text-[color:var(--color-muted)] backdrop-blur-[var(--glass-blur)]"
            style={{ opacity: 0.9 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  status === "ok" ? "#50C878" : status === "webgl-off" ? "#F5F0E8" : "rgba(245,240,232,0.35)",
                boxShadow: status === "ok" ? "0 0 18px rgba(80,200,120,0.45)" : "none",
              }}
            />
            3D: {status === "loading" ? "loading" : status === "ok" ? "ok" : "webgl off"}
          </span>
        </div>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#040A06" }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          // Si WebGL est désactivé/indispo, ce callback ne se déclenche généralement pas.
          // Mais s’il se déclenche, on est sûr que le renderer tourne.
          try {
            const ok = Boolean(gl?.getContext?.());
            setStatus(ok ? "ok" : "webgl-off");
          } catch {
            setStatus("webgl-off");
          }
        }}
      >
        <Suspense fallback={null}>
          {/* Sur mobile : grille statique uniquement (pas de particules, pas de parallax) */}
          <CameraRig enabled={!isMobile} />
          {!isProd ? <DebugMarker /> : null}
          <InfiniteGrid animate={!isMobile} />
          <HeroSphere quality={isMobile ? "mobile" : "desktop"} />
          {!isMobile ? <Particles /> : null}
        </Suspense>
      </Canvas>
      </div>
    </>
  );
}

