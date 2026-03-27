"use client";

import { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader, Fog, DoubleSide, Vector2 } from "three";
import { useScroll } from "framer-motion";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/* ─── Displaced terrain using image as both texture + height map ─── */
function GlacierTerrain() {
  const meshRef = useRef<any>(null);
  const imgPath = `${BASE}/images/generated/glacier-final-1.jpg`;
  const texture = useLoader(TextureLoader, imgPath);
  const dispMap = useLoader(TextureLoader, imgPath);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.02) * 0.003;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-1.1, 0, 0]}
      position={[0, -1.2, -3]}
    >
      <planeGeometry args={[10, 13, 512, 512]} />
      <meshPhysicalMaterial
        map={texture}
        displacementMap={dispMap}
        displacementScale={2.5}
        roughness={0.6}
        metalness={0.2}
        clearcoat={0.15}
        clearcoatRoughness={0.4}
        envMapIntensity={0.3}
        side={DoubleSide}
      />
    </mesh>
  );
}

/* ─── Fog planes at different depths ─── */
function FogPlane({
  z,
  y,
  opacity,
  drift,
}: {
  z: number;
  y: number;
  opacity: number;
  drift: number;
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x =
        Math.sin(state.clock.elapsedTime * drift) * 0.4;
      ref.current.material.opacity =
        opacity + Math.sin(state.clock.elapsedTime * drift * 0.6) * 0.04;
    }
  });

  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[-0.5, 0, 0]}>
      <planeGeometry args={[16, 3]} />
      <meshBasicMaterial
        color="#181919"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Scene setup ─── */
function SceneSetup() {
  const { scene } = useThree();
  useMemo(() => {
    scene.fog = new Fog("#181919", 3, 12);
  }, [scene]);
  return null;
}

/* ─── Mouse + scroll camera ─── */
function Camera({
  mouseRef,
  scrollRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = scrollRef.current;

    smooth.current.x += (mouseRef.current.x - smooth.current.x) * 0.025;
    smooth.current.y += (mouseRef.current.y - smooth.current.y) * 0.025;

    const mx = smooth.current.x;
    const my = smooth.current.y;

    state.camera.position.x = mx * 1.0 + Math.sin(t * 0.03) * 0.08;
    state.camera.position.y = 2.2 + my * -0.5 + sp * -1.8 + Math.sin(t * 0.025) * 0.04;
    state.camera.position.z = 3.5 + sp * -1.5;

    state.camera.lookAt(mx * 0.3, -0.5 + my * -0.15, -3);
  });

  return null;
}

/* ─── Main component ─── */
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
    const handle = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2.2, 3.5], fov: 55, near: 0.1, far: 25 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#181919" }}
      >
        <Suspense fallback={null}>
          <SceneSetup />
          <Camera mouseRef={mouseRef} scrollRef={scrollRef} />

          {/* Dramatic lighting */}
          <ambientLight intensity={0.08} color="#151520" />

          {/* Key light — cold from upper right, strong */}
          <directionalLight
            position={[3, 6, 2]}
            intensity={1.0}
            color="#7788aa"
          />

          {/* Rim light from behind — catches ice edges */}
          <directionalLight
            position={[-1, 2, -6]}
            intensity={0.5}
            color="#5566880"
          />

          {/* Fill from below-left */}
          <directionalLight
            position={[-4, -1, 1]}
            intensity={0.15}
            color="#334455"
          />

          {/* Spot on the peak */}
          <spotLight
            position={[0, 5, -2]}
            angle={0.4}
            penumbra={0.8}
            intensity={0.6}
            color="#8899bb"
            target-position={[0, 0, -3]}
          />

          {/* The 3D displaced mountain */}
          <GlacierTerrain />

          {/* Fog layers in foreground */}
          <FogPlane z={0.5} y={-1.6} opacity={0.7} drift={0.04} />
          <FogPlane z={-0.3} y={-1.3} opacity={0.45} drift={0.03} />
          <FogPlane z={-1.2} y={-1.0} opacity={0.25} drift={0.05} />

          {/* Post processing */}
          <EffectComposer>
            <Bloom
              intensity={0.15}
              luminanceThreshold={0.7}
              luminanceSmoothing={0.5}
              blendFunction={BlendFunction.ADD}
            />
            <ChromaticAberration
              offset={new Vector2(0.0006, 0.0006)}
              blendFunction={BlendFunction.NORMAL}
            />
            <Vignette
              offset={0.3}
              darkness={0.7}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Bottom gradient to solid charcoal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[22%] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #181919)",
        }}
      />
    </div>
  );
}
