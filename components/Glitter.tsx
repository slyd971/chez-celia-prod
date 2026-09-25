"use client";

import { useEffect, useRef } from "react";

// Paillettes en fond : un <canvas> fixe, sous le header, qui ne capte aucun
// clic. Densité plus forte quand une section [data-glitter="high"] (hero,
// contact) occupe l'écran. En pause quand l'onglet est caché, allégé sur
// mobile, désactivé si l'utilisateur préfère réduire les animations.

type Particle = {
  x: number;
  y: number;
  r: number;
  star: boolean;
  color: string;
  alpha: number;
  phase: number;
  speed: number;
  vx: number;
  vy: number;
};

const COLORS: [string, number][] = [
  ["255, 79, 163", 34], // rose principal
  ["247, 182, 210", 26], // rose doux
  ["255, 246, 250", 26], // blanc rosé
  ["244, 213, 141", 14], // doré léger
];

function pickColor() {
  let n = Math.random() * 100;
  for (const [c, w] of COLORS) {
    if ((n -= w) <= 0) return c;
  }
  return COLORS[0][0];
}

function makeParticle(w: number, h: number): Particle {
  const star = Math.random() < 0.09;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: star ? 2.2 + Math.random() * 2.4 : 0.4 + Math.random() * 1.4,
    star,
    color: pickColor(),
    alpha: 0.35 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.08,
    vy: -0.02 - Math.random() * 0.07,
  };
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const i = r * 0.22;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x + i, y - i, x + r, y);
  ctx.quadraticCurveTo(x + i, y + i, x, y + r);
  ctx.quadraticCurveTo(x - i, y + i, x - r, y);
  ctx.quadraticCurveTo(x - i, y - i, x, y - r);
  ctx.fill();
}

export function Glitter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const maxCount = mobile ? 55 : 130;
    const baseShare = 0.38; // part des paillettes visibles hors hero / contact
    const frameGap = mobile ? 1000 / 30 : 0; // ~30 fps sur mobile

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let last = 0;
    let running = false;
    let boost = 1;
    let boostTarget = 1;
    const highSections = Array.from(document.querySelectorAll<HTMLElement>('[data-glitter="high"]'));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        particles = Array.from({ length: maxCount }, () => makeParticle(w, h));
      }
    };

    const measureBoost = () => {
      let covered = 0;
      for (const el of highSections) {
        const rect = el.getBoundingClientRect();
        covered += Math.max(0, Math.min(rect.bottom, h) - Math.max(rect.top, 0));
      }
      boostTarget = Math.min(1, covered / Math.max(h, 1));
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (frameGap && now - last < frameGap) return;
      last = now;

      boost += (boostTarget - boost) * 0.05;
      const count = Math.round(maxCount * (baseShare + (1 - baseShare) * boost));
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        if (p.x < -6) p.x = w + 6;
        else if (p.x > w + 6) p.x = -6;

        const tw = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase);
        const a = p.alpha * tw * tw;
        if (a < 0.02) continue;

        if (p.star) {
          ctx.fillStyle = `rgba(${p.color}, ${a * 0.9})`;
          drawStar(ctx, p.x, p.y, p.r * (0.7 + 0.3 * tw));
        } else {
          ctx.fillStyle = `rgba(${p.color}, ${a * 0.22})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${p.color}, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const start = () => {
      if (running || motionQuery.matches || document.hidden) return;
      running = true;
      canvas.dataset.active = "true";
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      if (motionQuery.matches) {
        stop();
        ctx.clearRect(0, 0, w, h);
        canvas.dataset.active = "false";
      } else start();
    };
    const onResize = () => {
      resize();
      measureBoost();
    };

    resize();
    measureBoost();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", measureBoost, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    // Démarrage différé après le chargement : ne concurrence pas le premier
    // affichage de la page.
    let idle = 0;
    const onLoad = () => {
      idle = window.setTimeout(start, 800);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("load", onLoad);
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", measureBoost);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="glitter" aria-hidden="true" />;
}
