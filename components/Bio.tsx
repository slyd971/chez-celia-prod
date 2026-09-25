import Image from "next/image";
import { bio } from "@/content/celia";

export function Bio() {
  return (
    <section className="bio theme-light bg-cream" id="bio">
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
          <span className="eyebrow">{bio.eyebrow}</span>
          <h2 className="display section-title">
            {bio.title}
          </h2>
          {bio.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="bio-signature">{bio.signature}</p>
        </div>
      </div>
    </section>
  );
}
