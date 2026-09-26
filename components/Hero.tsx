"use client";

import { useEffect, useRef, useState } from "react";
import { brand, hero } from "@/content/celia";
import { Sparkle } from "./icons";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React ne reflète pas toujours l'attribut `muted` dans le DOM au premier
    // rendu ; iOS/Safari bloque alors l'autoplay. On le force impérativement.
    video.muted = true;
    video.setAttribute("muted", "");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // L'attribut autoPlay a pu lancer la lecture : on garde l'image fixe.
      video.pause();
      return;
    }

    // La vidéo (plusieurs Mo) n'est chargée qu'après l'événement `load` :
    // elle ne concurrence pas les polices et le premier affichage. D'ici là,
    // l'image fixe (poster) est visible.
    let cancelled = false;
    let ready = false;
    const tryPlay = () => {
      if (cancelled || !ready) return;
      video.play().catch(() => {});
    };
    const startVideo = () => {
      ready = true;
      video.preload = "auto";
      tryPlay();
    };
    let startTimer = 0;
    const onLoad = () => {
      startTimer = window.setTimeout(startVideo, 300);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onInteract = () => tryPlay();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("touchstart", onInteract, opts);
    window.addEventListener("pointerdown", onInteract, opts);
    window.addEventListener("scroll", onInteract, opts);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.removeEventListener("load", onLoad);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("scroll", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="hero" id="top" data-glitter="high">
      {/* Image fixe toujours affichée : si l'autoplay est bloqué, le visiteur
          voit cette photo (pas le bouton play natif d'iOS sur une vidéo figée). */}
      <img className="hero-poster" src={hero.poster} alt="" aria-hidden="true" fetchPriority="high" />
      <video
        ref={videoRef}
        className="hero-video"
        poster={hero.poster}
        data-playing={playing ? "true" : "false"}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
      >
        <source src={hero.video} type="video/mp4" />
      </video>
      <div className="hero-scrim" />

      <div className="hero-head">
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="display hero-title">
          <Sparkle className="hero-spark hero-spark-1" />
          {brand.name}
          <Sparkle className="hero-spark hero-spark-2" />
        </h1>
        <p className="hero-sub">{hero.punchline}</p>
        <div className="hero-ctas">
          {hero.ctas.map((cta) => (
            <a key={cta.href} className={`btn btn-${cta.variant}`} href={cta.href}>
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
