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

    // Liquid displacement
    float displaceX = sin(uv.y * 20.0 + uTime * 2.0) * 0.012 * ripple;
    float displaceY = cos(uv.x * 20.0 + uTime * 2.0) * 0.012 * ripple;

    vec2 displaced = uv + vec2(displaceX, displaceY);

    // Enhanced chromatic aberration / blur
    float aberration = 0.025 * uHover;
    float edgeAberration = 0.002 * (1.0 - uHover); 

    float totalAberration = aberration + edgeAberration;

    vec2 dir = normalize(uv - uMouse + 0.001) * totalAberration;

    // Multi-tap blur along the chromatic split
    vec3 col = vec3(0.0);

    // Red Channel
    col.r += texture2D(uTexture, displaced + dir).r * 0.5;
    col.r += texture2D(uTexture, displaced + dir * 1.5).r * 0.3;
    col.r += texture2D(uTexture, displaced + dir * 2.0).r * 0.2;

    // Green Channel
    col.g += texture2D(uTexture, displaced).g * 0.6;
    col.g += texture2D(uTexture, displaced + dir * 0.2).g * 0.2;
    col.g += texture2D(uTexture, displaced - dir * 0.2).g * 0.2;

    // Blue Channel
    col.b += texture2D(uTexture, displaced - dir).b * 0.5;
    col.b += texture2D(uTexture, displaced - dir * 1.5).b * 0.3;
    col.b += texture2D(uTexture, displaced - dir * 2.0).b * 0.2;

    gl_FragColor = vec4(col, 1.0);
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
      // Flip Y during upload — HTML images are top-left origin, WebGL is bottom-left
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
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
