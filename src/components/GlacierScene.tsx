"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  ShaderMaterial,
  DoubleSide,
  Fog,
  Vector2,
  AdditiveBlending,
} from "three";
import { useScroll } from "framer-motion";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/* ─── Depth layer shader — masks a vertical band with soft edges ─── */
const layerVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const layerFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uMaskTop;
  uniform float uMaskBottom;
  uniform float uFeather;
  uniform float uBrightness;

  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);

    // Vertical mask — visible between maskBottom and maskTop (UV space, 0=bottom 1=top)
    float maskTop = smoothstep(uMaskTop + uFeather, uMaskTop, vUv.y);
    float maskBottom = smoothstep(uMaskBottom - uFeather, uMaskBottom, vUv.y);
    float mask = maskTop * maskBottom;

    tex.rgb *= uBrightness;
    tex.a = mask;

    gl_FragColor = tex;
  }
`;

/* ─── Single depth layer plane ─── */
function DepthLayer({
  z,
  maskTop,
  maskBottom,
  feather,
  brightness,
  texture,
}: {
  z: number;
  maskTop: number;
  maskBottom: number;
  feather: number;
  brightness: number;
  texture: any;
}) {
  const matRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMaskTop: { value: maskTop },
      uMaskBottom: { value: maskBottom },
      uFeather: { value: feather },
      uBrightness: { value: brightness },
    }),
    [texture, maskTop, maskBottom, feather, brightness]
  );

  return (
    <mesh position={[0, 0, z]} rotation={[0, 0, 0]}>
      <planeGeometry args={[8.5, 11]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={layerVertexShader}
        fragmentShader={layerFragmentShader}
        uniforms={uniforms}
        transparent
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Fog card ─── */
function FogCard({
  z,
  y,
  opacity,
  drift,
  width,
  height,
}: {
  z: number;
  y: number;
  opacity: number;
  drift: number;
  width?: number;
  height?: number;
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x =
        Math.sin(state.clock.elapsedTime * drift + z) * 0.5;
      ref.current.material.opacity =
        opacity + Math.sin(state.clock.elapsedTime * drift * 0.8) * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[0, y, z]}>
      <planeGeometry args={[width || 14, height || 4]} />
      <meshBasicMaterial
        color="#181919"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Scene environment ─── */
function SceneEnv() {
  const { scene } = useThree();
  useMemo(() => {
    scene.fog = new Fog("#181919", 6, 16);
  }, [scene]);
  return null;
}

/* ─── Camera with mouse orbit + scroll ─── */
function OrbitalCamera({
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

    // Smooth mouse
    smooth.current.x += (mouseRef.current.x - smooth.current.x) * 0.03;
    smooth.current.y += (mouseRef.current.y - smooth.current.y) * 0.03;

    const mx = smooth.current.x;
    const my = smooth.current.y;

    // Camera orbits around the scene center
    state.camera.position.x = mx * 1.2 + Math.sin(t * 0.025) * 0.06;
    state.camera.position.y = my * -0.6 + Math.sin(t * 0.02) * 0.04;
    state.camera.position.z = 5.5 + sp * -2.0;

    // Look toward center with slight mouse influence
    state.camera.lookAt(mx * 0.3, my * -0.1, -2);
  });

  return null;
}

/* ─── All layers assembled ─── */
function GlacierLayers() {
  const imgPath = `${BASE}/images/generated/glacier-final-1.jpg`;
  const texture = useLoader(TextureLoader, imgPath);

  /*
    Image UV layout (0=bottom, 1=top):
    1.0 ─── top of sky
    0.85 ── sky/cloud boundary
    0.65 ── mountain peak zone
    0.45 ── mid terrain / base of mountain
    0.25 ── foreground terrain
    0.0 ─── bottom of image (dark foreground)

    Layer 1 (furthest back): Sky — top portion
    Layer 2: Mountain peak — upper-mid
    Layer 3: Mid terrain — lower-mid
    Layer 4 (closest): Foreground — bottom portion

    Each layer shows the FULL image but masks to reveal only its band.
    Behind each front layer, the back layers fill in the gap.
  */

  return (
    <>
      {/* Layer 1: Sky + atmosphere (furthest back, z=-4) */}
      <DepthLayer
        z={-4}
        maskTop={1.0}
        maskBottom={0.6}
        feather={0.08}
        brightness={1.0}
        texture={texture}
      />

      {/* Fog card between sky and mountain */}
      <FogCard z={-3.2} y={-0.8} opacity={0.2} drift={0.025} width={16} height={5} />

      {/* Layer 2: Mountain peak (z=-2) */}
      <DepthLayer
        z={-2}
        maskTop={0.72}
        maskBottom={0.38}
        feather={0.06}
        brightness={1.05}
        texture={texture}
      />

      {/* Fog card between mountain and midground */}
      <FogCard z={-1.0} y={-1.5} opacity={0.35} drift={0.035} width={15} height={4} />

      {/* Layer 3: Mid terrain (z=0) */}
      <DepthLayer
        z={0}
        maskTop={0.48}
        maskBottom={0.18}
        feather={0.06}
        brightness={0.95}
        texture={texture}
      />

      {/* Fog card in foreground */}
      <FogCard z={0.8} y={-2.0} opacity={0.55} drift={0.04} width={14} height={3.5} />

      {/* Layer 4: Foreground (closest, z=1.5) */}
      <DepthLayer
        z={1.5}
        maskTop={0.28}
        maskBottom={0.0}
        feather={0.05}
        brightness={0.85}
        texture={texture}
      />
    </>
  );
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
        camera={{ position: [0, 0, 5.5], fov: 50, near: 0.1, far: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#181919" }}
      >
        <Suspense fallback={null}>
          <SceneEnv />
          <OrbitalCamera mouseRef={mouseRef} scrollRef={scrollRef} />

          <GlacierLayers />

          <EffectComposer>
            <Bloom
              intensity={0.12}
              luminanceThreshold={0.75}
              luminanceSmoothing={0.5}
              blendFunction={BlendFunction.ADD}
            />
            <ChromaticAberration
              offset={new Vector2(0.0005, 0.0005)}
              blendFunction={BlendFunction.NORMAL}
            />
            <Vignette
              offset={0.25}
              darkness={0.65}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Bottom fade to charcoal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #181919)",
        }}
      />
    </div>
  );
}
