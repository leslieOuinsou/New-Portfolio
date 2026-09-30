"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useScrollMotion } from "@/contexts/ScrollMotionContext";

const PALETTE = ["#f2c9d6", "#e8b4c4", "#d9a0b5", "#c98ba8", "#f7dde6", "#ba8fa8"];

function SoftOrb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.45} floatIntensity={0.7}>
      <Sphere args={[0.7 * scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          roughness={0.12}
          metalness={0.08}
          distort={0.38}
          speed={1.6}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function PetalRing() {
  const ref = useRef<Group>(null);
  const { progress, mouse } = useScrollMotion();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.18;
    ref.current.rotation.x = -0.3 + progress * 0.65 + mouse.y * 0.15;
    ref.current.rotation.y = progress * 1.1 + mouse.x * 0.35;
  });

  return (
    <group ref={ref} position={[0.15, 0.05, -0.2]}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.75,
              Math.sin(angle) * 0.4,
              Math.sin(angle) * 1.75,
            ]}
            rotation={[0.45, angle, 0.25]}
            scale={[0.7, 0.22, 1.05]}
          >
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshPhysicalMaterial
              color={PALETTE[i % PALETTE.length]}
              roughness={0.2}
              transmission={0.4}
              thickness={0.7}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SparklesField() {
  const mesh = useRef<Mesh>(null);
  const { progress } = useScrollMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(240);
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.06 + progress * 0.7;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Ribbon() {
  const ref = useRef<Mesh>(null);
  const { progress, mouse } = useScrollMotion();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.4 + progress * 0.5;
    ref.current.rotation.y = t * 0.25 + mouse.x * 0.4;
    ref.current.position.y = Math.sin(t * 0.55) * 0.2 - progress * 0.4;
  });

  return (
    <mesh ref={ref} position={[-0.15, 0.25, 0.5]} scale={1.35}>
      <torusKnotGeometry args={[0.78, 0.2, 200, 28, 2, 3]} />
      <meshPhysicalMaterial
        color="#e8a8c0"
        roughness={0.12}
        metalness={0.12}
        transmission={0.3}
        thickness={0.9}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

export function BloomGarden() {
  const root = useRef<Group>(null);
  const { mouse, progress } = useScrollMotion();

  useFrame(() => {
    if (!root.current) return;
    root.current.rotation.y +=
      (mouse.x * 0.35 - root.current.rotation.y) * 0.05;
    root.current.rotation.x +=
      (-mouse.y * 0.2 - root.current.rotation.x) * 0.05;
    root.current.position.y +=
      (-progress * 1.1 - root.current.position.y) * 0.06;
  });

  return (
    <group ref={root}>
      <Ribbon />
      <PetalRing />
      <SoftOrb position={[-2.2, 1.15, -1]} color="#f3c6d4" scale={1.35} speed={1.1} />
      <SoftOrb position={[2.3, -0.35, -0.7]} color="#dab0c4" scale={1} speed={1.4} />
      <SoftOrb position={[1.25, 1.55, 0.5]} color="#f7d8e4" scale={0.7} speed={1.8} />
      <SoftOrb position={[-1.5, -1.15, 0.7]} color="#c99bb0" scale={0.85} speed={1.2} />
      <SoftOrb position={[0.1, -1.6, -1.2]} color="#f0bfd0" scale={0.6} speed={1.5} />
      <SparklesField />
    </group>
  );
}
