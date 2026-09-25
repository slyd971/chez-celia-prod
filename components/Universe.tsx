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

        <Slider label="Ma façon de travailler" className="pillars" >
          {universe.pillars.map((pillar, i) => (
            <li className="panel" key={pillar.title}>
              <span className="panel-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="panel-title display italic">{pillar.title}</h3>
              <p className="panel-text">{pillar.text}</p>
            </li>
          ))}
        </Slider>

        <Slider
          label={universe.skillsTitle}
          className="skills"
          heading={<h3 className="skills-title">{universe.skillsTitle}</h3>}
        >
          {universe.skills.map((skill, i) => (
            <li className="panel" key={skill.label}>
              <span className="panel-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h4 className="panel-title display">{skill.label}</h4>
              <p className="panel-text">{skill.text}</p>
            </li>
          ))}
        </Slider>
      </div>
    </section>
  );
}
