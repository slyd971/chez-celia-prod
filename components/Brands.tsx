import Image from "next/image";
import { brands } from "@/content/celia";

export function Brands() {
  const hasLogos = brands.items.length > 0;

  return (
    <section className="brands" id="marques" aria-labelledby="brands-heading">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{brands.eyebrow}</span>
          <h2 id="brands-heading" className="display section-title">
            {brands.title}
          </h2>
        </div>
        <ul className="brands-grid">
          {hasLogos
            ? brands.items.map((item) => (
                <li className="brand-item" key={item.name} data-reveal>
                  <Image src={item.logo} alt={item.name} width={item.width} height={item.height} loading="lazy" />
                </li>
              ))
            : Array.from({ length: brands.placeholderCount }, (_, i) => (
                <li className="brand-item brand-placeholder" key={i} data-reveal>
                  {brands.placeholderLabel}
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
