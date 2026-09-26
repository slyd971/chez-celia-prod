"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/content/celia";
import { PlayIcon, SoundOffIcon, SoundOnIcon } from "./icons";

type Item = (typeof videos.items)[number];

function VideoCard({
  item,
  active,
  onActivate,
}: {
  item: Item;
  active: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanHover(fine && !reduced);
  }, []);

  // Une autre vidéo a été lancée : on met celle-ci en pause.
  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  const play = () => {
    onActivate();
    ref.current?.play().catch(() => {});
  };

  // Clic n'importe où sur la vidéo : lecture / pause. Pendant l'aperçu au
  // survol (carte pas encore activée), le clic lance la vraie lecture.
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!active || video.paused) play();
    else video.pause();
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    if (video.paused) play();
  };

  const showPlayIcon = !playing || !active;

  return (
    <figure
      className={`vcard${active ? " is-active" : ""}`}
      data-reveal
      onMouseEnter={() => {
        if (canHover && !active) ref.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        if (canHover && !active && ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }}
    >
      <div className="vcard-media">
        <video
          ref={ref}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          aria-hidden="true"
        />
        {/* Zone cliquable sur toute la vidéo (lecture / pause) */}
        <button
          type="button"
          className={`vcard-toggle${showPlayIcon ? "" : " is-playing"}`}
          onClick={toggle}
          aria-label={`${active && playing ? "Mettre en pause" : "Lire"} la vidéo : ${item.caption}`}
        >
          <span aria-hidden="true">
            <PlayIcon />
          </span>
        </button>
        <button
          type="button"
          className="vcard-sound"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? `Activer le son : ${item.caption}` : `Couper le son : ${item.caption}`}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
        {active && (
          <span className="vcard-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
        )}
      </div>
      <figcaption>{item.caption}</figcaption>
    </figure>
  );
}

export function Videos() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="videos theme-light bg-cream" id="videos">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{videos.eyebrow}</span>
          <h2 className="display section-title">
            {videos.title}
          </h2>
          <p className="section-intro">{videos.intro}</p>
        </div>

        <div className={`videos-grid count-${videos.items.length}`}>
          {videos.items.map((item, i) => (
            <VideoCard key={item.src} item={item} active={activeIndex === i} onActivate={() => setActiveIndex(i)} />
          ))}
        </div>

        <div className="videos-cta" data-reveal>
          <a className="btn btn-primary" href={videos.cta.href} target="_blank" rel="noopener noreferrer">
            {videos.cta.label}
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
