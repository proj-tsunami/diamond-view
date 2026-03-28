"use client";

import { useRef, useEffect } from "react";

/*
  WebGL distortion + chromatic aberration effect on images.
  On hover, the image warps with a liquid displacement and
  RGB channels split apart. Smooth ease in/out.
*/

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Distance from mouse position
    float dist = distance(uv, uMouse);
    float ripple = smoothstep(0.4, 0.0, dist) * uHover;

    // Liquid displacement — warps UV around mouse
    float displaceX = sin(uv.y * 12.0 + uTime * 2.0) * 0.008 * ripple;
    float displaceY = cos(uv.x * 12.0 + uTime * 2.0) * 0.006 * ripple;

    vec2 displaced = uv + vec2(displaceX, displaceY);

    // Chromatic aberration — split RGB channels
    float aberration = 0.006 * uHover;
    float edgeAberration = 0.003 * (1.0 - uHover); // subtle even when not hovered

    float totalAberration = aberration + edgeAberration;

    // Direction of split follows mouse offset
    vec2 dir = normalize(uv - uMouse + 0.001) * totalAberration;

    float r = texture2D(uTexture, displaced + dir).r;
    float g = texture2D(uTexture, displaced).g;
    float b = texture2D(uTexture, displaced - dir).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface DistortionHoverProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function DistortionHover({
  src,
  alt = "",
  className = "",
}: DistortionHoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    hover: 0,
    targetHover: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    time: 0,
    animId: 0,
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    uniforms: {} as Record<string, WebGLUniformLocation | null>,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const state = stateRef.current;
    state.gl = gl;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    state.program = program;

    // Quad geometry
    const vertices = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
       1,  1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);

    const uvLoc = gl.getAttribLocation(program, "uv");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    // Uniforms
    state.uniforms = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uHover: gl.getUniformLocation(program, "uHover"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
    };

    // Load texture
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = src;

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    // Animation loop
    const animate = () => {
      state.time += 0.016;
      state.hover += (state.targetHover - state.hover) * 0.06;

      gl.uniform1f(state.uniforms.uHover!, state.hover);
      gl.uniform1f(state.uniforms.uTime!, state.time);
      gl.uniform2f(state.uniforms.uMouse!, state.mouseX, state.mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      state.animId = requestAnimationFrame(animate);
    };
    state.animId = requestAnimationFrame(animate);

    // Events
    const handleEnter = () => { state.targetHover = 1; };
    const handleLeave = () => { state.targetHover = 0; };
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = (e.clientX - rect.left) / rect.width;
      state.mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(state.animId);
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-label={alt}
      role="img"
    />
  );
}
