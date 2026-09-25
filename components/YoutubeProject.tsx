import { isTodo, youtube } from "@/content/celia";

export function YoutubeProject() {
  const linkReady = !isTodo(youtube.cta.href);

  return (
    <section className="youtube theme-light bg-ivory" id="youtube">
      <div className="wrap youtube-grid">
        <div className="youtube-frame" data-reveal>
          {/* Vidéo paysage (16:9) affichée dans son ratio d'origine, sans recadrage. */}
          <video
            src={youtube.video}
            poster={youtube.poster}
            width={youtube.width}
            height={youtube.height}
            style={{ aspectRatio: `${youtube.width} / ${youtube.height}` }}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label={`Vidéo du projet YouTube : ${youtube.title}`}
          />
        </div>
        <div className="youtube-text" data-reveal>
          <span className="eyebrow">{youtube.eyebrow}</span>
          <h2 className="display section-title">
            {youtube.title}
          </h2>
          <p>{youtube.description}</p>
          {linkReady ? (
            <a className="btn btn-primary" href={youtube.cta.href} target="_blank" rel="noopener">
              {youtube.cta.label}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          ) : (
            <>
              <span className="btn btn-primary is-disabled" aria-disabled="true">
                {youtube.cta.label}
              </span>
              <p className="todo-note">{youtube.cta.href}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
