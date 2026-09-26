import Image from "next/image";
import { bio } from "@/content/celia";

export function Bio() {
  return (
    <section className="bio theme-light bg-cream" id="bio" aria-labelledby="bio-heading">
      <div className="wrap bio-grid">
        <div className="photo-frame" data-reveal>
          <Image
            src={bio.photo.src}
            alt={bio.photo.alt}
            width={bio.photo.width}
            height={bio.photo.height}
            sizes="(max-width: 820px) 90vw, 40vw"
          />
        </div>
        <div className="bio-text" data-reveal>
          {/* Le titre de section est « Qui suis-je ? » ; la punchline reste un
              paragraphe mis en forme comme un titre (un seul h1 sur la page). */}
          <h2 id="bio-heading" className="eyebrow">{bio.eyebrow}</h2>
          <p className="display section-title bio-punchline">{bio.title}</p>
          {bio.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="bio-signature">{bio.signature}</p>
        </div>
      </div>
    </section>
  );
}
