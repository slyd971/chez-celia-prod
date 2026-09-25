"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/content/celia";

const DURATION = 1600;

function format(stat: Extract<Stat, { value: number }>, value: number) {
  const digits = stat.decimals ?? 0;
  const num = value.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${stat.prefix ?? ""}${num}${stat.suffix ?? ""}`;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  // null = rendu serveur / sans JS : on affiche directement les valeurs finales.
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(1 - Math.pow(1 - t, 3)); // easeOutCubic
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="stats" aria-labelledby="stats-heading">
      <div className="wrap">
        <h2 id="stats-heading" className="sr-only">
          Chiffres clés
        </h2>
        <div className="stats-grid" ref={ref}>
          {stats.map((stat, i) => {
            const isNumber = "value" in stat;
            const finalText = isNumber ? format(stat, stat.value) : stat.display;
            const shown =
              isNumber && progress !== null ? format(stat, stat.value * progress) : finalText;
            return (
              <div className="stat-card" key={stat.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <div className={`num${isNumber ? "" : " num-todo"}`}>
                  {/* Les lecteurs d'écran lisent directement la valeur finale */}
                  <span aria-hidden="true">{shown}</span>
                  <span className="sr-only">{finalText}</span>
                </div>
                <div className="label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
