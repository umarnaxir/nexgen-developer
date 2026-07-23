"use client";

import React, { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  twinkleSpeed: number;
  brightness: number;
};

type ShootingStar = {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
};

const DEPTH = 1000;
const STAR_COUNT_DESKTOP = 220;
const STAR_COUNT_MOBILE = 120;

function createStars(count: number, w: number, h: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * w * 2.2,
    y: (Math.random() - 0.5) * h * 2.2,
    z: Math.random() * DEPTH,
    size: 0.4 + Math.random() * 1.8,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.008 + Math.random() * 0.025,
    brightness: 0.35 + Math.random() * 0.65,
  }));
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
      if (starsRef.current.length !== count) {
        starsRef.current = createStars(count, w, h);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onLeave = () => {
      mouseRef.current.tx = 0;
      mouseRef.current.ty = 0;
    };

    const spawnShootingStar = () => {
      if (shootingRef.current.length > 2) return;
      shootingRef.current.push({
        x: Math.random() * w * 0.7,
        y: Math.random() * h * 0.4,
        len: 60 + Math.random() * 100,
        speed: 6 + Math.random() * 8,
        angle: Math.PI / 5 + Math.random() * 0.35,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
    };

    let spawnTimer = 0;

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (const star of starsRef.current) {
        const k = DEPTH / (DEPTH + star.z);
        const sx = cx + star.x * k;
        const sy = cy + star.y * k;
        const r = star.size * k;
        const alpha = star.brightness * (0.35 + k * 0.65);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(sx, sy, Math.max(0.4, r), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (reducedRef.current) {
        drawStatic();
        return;
      }

      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + m.x * 28;
      const cy = h / 2 + m.y * 18;
      const tiltX = m.y * 0.15;
      const tiltY = m.x * 0.2;

      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      haze.addColorStop(0, "rgba(255,255,255,0.035)");
      haze.addColorStop(0.55, "rgba(255,255,255,0.01)");
      haze.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      for (const star of starsRef.current) {
        star.z -= 0.35 + (1 - star.z / DEPTH) * 0.55;
        if (star.z <= 1) {
          star.z = DEPTH;
          star.x = (Math.random() - 0.5) * w * 2.2;
          star.y = (Math.random() - 0.5) * h * 2.2;
        }

        star.twinkle += star.twinkleSpeed;
        const k = DEPTH / (DEPTH + star.z);
        let sx = star.x * k;
        let sy = star.y * k;
        const rx = sx;
        const ry = sy * Math.cos(tiltX) - star.z * 0.02 * Math.sin(tiltX);
        const rz = sy * Math.sin(tiltX) + star.z * Math.cos(tiltX);
        sx = rx * Math.cos(tiltY) + rz * 0.02 * Math.sin(tiltY);
        sy = ry;

        const px = cx + sx;
        const py = cy + sy;
        const twinkle = 0.55 + 0.45 * Math.sin(star.twinkle);
        const alpha = star.brightness * twinkle * (0.25 + k * 0.75);
        const r = Math.max(0.35, star.size * k * (0.85 + twinkle * 0.25));

        if (k > 0.7 && star.brightness > 0.7) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 6);
          glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha)})`;
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      spawnTimer++;
      if (spawnTimer > 180 + Math.random() * 220) {
        spawnShootingStar();
        spawnTimer = 0;
      }

      for (let i = shootingRef.current.length - 1; i >= 0; i--) {
        const s = shootingRef.current[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const progress = s.life / s.maxLife;
        const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${0.7 * fade})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) shootingRef.current.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    if (reducedRef.current) {
      drawStatic();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
