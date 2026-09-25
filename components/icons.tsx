const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

export function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M7 4.5v15l12.5-7.5z" />
    </svg>
  );
}

export function SoundOnIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

export function SoundOffIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  );
}

/** Flèche fine vers la droite (retournée en CSS pour « précédent »). */
export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Étincelle ✦ décorative (4 branches), utilisée avec parcimonie dans le hero. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`sparkle ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c.6 5.6 3.4 9.4 12 12-8.6 2.6-11.4 6.4-12 12-.6-5.6-3.4-9.4-12-12C8.6 9.4 11.4 5.6 12 0z" />
    </svg>
  );
}
