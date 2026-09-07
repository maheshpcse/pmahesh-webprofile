import { education, experience } from '../data/profile';
import { SectionHeading } from './SectionHeading';

export function Journey() {
  return (
    <section id="journey" className="section">
      <SectionHeading index="01" title="Journey" path="/journey">
        Two roles, one arc: from MEAN-stack product work to owning fintech modules end to end.
      </SectionHeading>

      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="timeline__item" data-reveal>
            <div className="timeline__meta">
              <span className="mono">{job.period}</span>
              <span className="muted">{job.location}</span>
            </div>
            <div className="timeline__body">
              <h3>
                {job.role} <span className="muted">· {job.company}</span>
              </h3>
              <ul className="chips" aria-label="Tech stack">
                {job.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className="bullets">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li className="timeline__item" data-reveal>
          <div className="timeline__meta">
            <span className="mono">{education.period}</span>
            <span className="muted">Education</span>
          </div>
          <div className="timeline__body">
            <h3>
              {education.degree} <span className="muted">· {education.institute}</span>
            </h3>
            <p className="muted">{education.score}</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
