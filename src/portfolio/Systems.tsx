import { skillGroups } from '../data/profile';
import { SectionHeading } from './SectionHeading';

export function Systems() {
  return (
    <section id="systems" className="section">
      <SectionHeading index="03" title="Systems" path="/systems">
        The stack, laid out as layers: from language runtime to delivery and tooling.
      </SectionHeading>

      <dl className="layers" data-reveal>
        {skillGroups.map((g) => (
          <div className="layer" key={g.layer}>
            <dt>
              <span className="mono muted">{g.layer}</span>
              <span>{g.label}</span>
            </dt>
            <dd>
              <ul className="chips chips--plain">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
