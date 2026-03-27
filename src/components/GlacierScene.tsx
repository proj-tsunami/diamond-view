"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  PlaneGeometry,
  Fog,
  MeshStandardMaterial,
  DoubleSide,
  AdditiveBlending,
  Color,
} from "three";
import { useScroll } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/* ─── Displaced mountain mesh ─── */
function DisplacedMountain() {
  const meshRef = useRef<any>(null);
  const texture = useLoader(
    TextureLoader,
    `${BASE}/images/generated/glacier-final-1.jpg`
  );

  // Use the same image as displacement — bright areas push up
  const displacementMap = texture;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        -0.6 + Math.sin(state.clock.elapsedTime * 0.03) * 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-0.6, 0, 0]}
      position={[0, -0.8, -2.5]}
    >
      <planeGeometry args={[8, 10, 256, 256]} />
      <meshStandardMaterial
        map={texture}
        displacementMap={displacementMap}
        displacementScale={1.8}
        roughness={0.7}
        metalness={0.15}
        side={DoubleSide}
      />
    </mesh>
  );
}

/* ─── Fog layers at different depths ─── */
function FogLayer({
  z,
  y,
  opacity,
  speed,
  scale = [12, 2],
}: {
  z: number;
  y: number;
  opacity: number;
  speed: number;
  scale?: [number, number];
}) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x =
        Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.material.opacity =
        opacity + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, y, z]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        color="#181919"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Atmospheric haze particles ─── */
function HazeParticles() {
  const meshRef = useRef<any>(null);

  const particles = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3a3a3a"
        size={0.15}
        transparent
        opacity={0.15}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Scene fog ─── */
function SceneFog() {
  const { scene } = useThree();
  useMemo(() => {
    scene.fog = new Fog("#181919", 4, 14);
  }, [scene]);
  return null;
}

/* ─── Mouse + scroll driven camera ─── */
function Camera({
  mouseRef,
  scrollRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = scrollRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Smooth mouse
    smoothMouse.current.x += (mx - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (my - smoothMouse.current.y) * 0.03;

    const smx = smoothMouse.current.x;
    const smy = smoothMouse.current.y;

    // Camera position — orbits slightly with mouse, pulls back on scroll
    state.camera.position.x = smx * 0.8 + Math.sin(t * 0.04) * 0.1;
    state.camera.position.y =
      1.8 + smy * -0.4 + sp * -1.5 + Math.sin(t * 0.03) * 0.05;
    state.camera.position.z = 4.0 + sp * -1.5;

    state.camera.lookAt(
      smx * 0.2,
      -0.3 + smy * -0.1,
      -2.5
    );
  });

  return null;
}

/* ─── Main exported component ─── */
export default function GlacierScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  scrollYProgress.on("change", (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.8, 4], fov: 50, near: 0.1, far: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#181919" }}
      >
        <SceneFog />
        <Camera mouseRef={mouseRef} scrollRef={scrollRef} />

        {/* Lighting — dramatic, matches the image */}
        <ambientLight intensity={0.15} color="#1a1a2a" />
        <directionalLight
          position={[2, 5, 3]}
          intensity={0.6}
          color="#8899bb"
        />
        <directionalLight
          position={[-3, 2, -2]}
          intensity={0.2}
          color="#667799"
        />
        {/* Subtle rim from behind */}
        <directionalLight
          position={[0, 1, -5]}
          intensity={0.3}
          color="#556688"
        />

        {/* The displaced mountain */}
        <DisplacedMountain />

        {/* Layered fog planes — closest to furthest */}
        <FogLayer z={1.5} y={-1.8} opacity={0.85} speed={0.06} scale={[14, 3]} />
        <FogLayer z={0.5} y={-1.5} opacity={0.6} speed={0.04} scale={[13, 2.5]} />
        <FogLayer z={-0.5} y={-1.2} opacity={0.35} speed={0.05} scale={[12, 2]} />
        <FogLayer z={-1.5} y={-0.9} opacity={0.2} speed={0.03} scale={[11, 1.5]} />

        {/* Atmospheric particles */}
        <HazeParticles />
      </Canvas>

      {/* Bottom gradient to solid charcoal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #181919 100%)",
        }}
      />
    </div>
  );
}
