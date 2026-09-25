import { universe } from "@/content/celia";
import { Slider } from "./Slider";

const pad = (n: number) => String(n).padStart(2, "0");

export function Universe() {
  return (
    <section className="universe" id="univers">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{universe.eyebrow}</span>
          <h2 className="display section-title">{universe.title}</h2>
          <p className="section-intro">{universe.intro}</p>
        </div>

        {/* Valeurs : bloc éditorial (serif italique, filets), jamais en slider */}
        <div className="values">
          <h3 className="block-label" data-reveal>
            {universe.valuesTitle}
          </h3>
          <ul className="values-list">
            {universe.pillars.map((pillar, i) => (
              <li className="value" key={pillar.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <h4 className="value-title display">{pillar.title}</h4>
                <p className="value-text">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Compétences : grille de cases (desktop), slider (mobile) */}
        <Slider
          label={universe.skillsTitle}
          className="skills mobile-only"
          heading={<h3 className="block-label">{universe.skillsTitle}</h3>}
        >
          {universe.skills.map((skill, i) => (
            <li className="skill-cell" key={skill.label}>
              <span className="skill-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h4 className="skill-label">{skill.label}</h4>
              <p className="skill-text">{skill.text}</p>
            </li>
          ))}
        </Slider>
      </div>
    </section>
  );
}
