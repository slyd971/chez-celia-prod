"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon } from "./icons";

// Slider horizontal sobre : défilement natif (doigt, trackpad, clavier) avec
// scroll-snap, deux boutons carrés et un compteur. Les boutons sont masqués
// quand tous les éléments tiennent à l'écran. Le nombre d'éléments visibles se
// règle en CSS (variable --per-view sur .slider).
export function Slider({
  label,
  heading,
  className = "",
  children,
}: {
  label: string;
  heading?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const count = Children.count(children);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false, scrollable: false });

  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setState({
      index: Math.min(count - 1, Math.round(track.scrollLeft / step())),
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft >= max - 2,
      scrollable: max > 2,
    });
  }, [count, step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const go = (direction: 1 | -1) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollBy({ left: direction * step(), behavior: reduced ? "auto" : "smooth" });
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={`slider ${className}`}>
      <div className="slider-bar">
        {heading}
        <div className="slider-controls" hidden={!state.scrollable}>
          <span className="slider-count" aria-hidden="true">
            {pad(state.index + 1)} / {pad(count)}
          </span>
          <button type="button" className="slider-btn prev" onClick={() => go(-1)} disabled={state.atStart} aria-label={`${label} : précédent`}>
            <ArrowIcon />
          </button>
          <button type="button" className="slider-btn" onClick={() => go(1)} disabled={state.atEnd} aria-label={`${label} : suivant`}>
            <ArrowIcon />
          </button>
        </div>
      </div>
      {/* tabIndex : la zone défile aussi au clavier (flèches) */}
      <ul className="slider-track" ref={trackRef} tabIndex={0} aria-label={label}>
        {children}
      </ul>
    </div>
  );
}
