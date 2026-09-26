import Image from "next/image";
import { brand, contact, contactInfo } from "@/content/celia";

export function Contact() {
  return (
    <section className="contact" id="contact" data-glitter="high">
      <div className="wrap contact-grid">
        <div className="photo-frame" data-reveal>
          <Image
            src={contact.photo.src}
            alt={contact.photo.alt}
            width={contact.photo.width}
            height={contact.photo.height}
            sizes="(max-width: 820px) 90vw, 40vw"
          />
        </div>
        <div className="contact-body" data-reveal>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2 className="display section-title">{contact.title}</h2>
          <p className="contact-sub">{contact.description}</p>

          <p className="contact-signature">
            <span className="contact-name display">{brand.name}</span>
            {brand.signature.join(" · ")}
          </p>

          <dl className="contact-list">
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>
                <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={contactInfo.instagram.url} target="_blank" rel="noopener noreferrer">
                  {contactInfo.instagram.label}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>TikTok</dt>
              <dd>
                <a href={contactInfo.tiktok.url} target="_blank" rel="noopener noreferrer">
                  {contactInfo.tiktok.label}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </dd>
            </div>
          </dl>

          <div className="contact-ctas">
            <a className="btn btn-primary" href={`mailto:${contactInfo.email}`}>
              {contact.cta}
            </a>
            <a className="btn btn-ghost" href={contactInfo.whatsapp.url} target="_blank" rel="noopener noreferrer">
              {contactInfo.whatsapp.label}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
