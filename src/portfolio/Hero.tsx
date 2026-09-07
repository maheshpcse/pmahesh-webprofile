import { experience, identity, skillGroups } from '../data/profile';

export function Hero() {
  const current = experience[0];
  const resumeUrl = `${import.meta.env.BASE_URL}${identity.resumeFile}`;

  return (
    <section id="top" className="hero">
      <div className="hero__main">
        <p className="eyebrow">
          {identity.title} · {identity.yearsLabel} · {identity.location}
        </p>
        <h1>{identity.name}</h1>
        <p className="lede">{identity.summary}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href={resumeUrl} download>
            Download resume
          </a>
          <a className="btn btn--ghost" href={identity.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn--ghost" href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <aside className="hero__status" aria-label="Quick facts">
        <div className="status__bar">
          <span>status</span>
          <span>{identity.githubHandle}</span>
        </div>
        <dl className="status__grid">
          <dt>role</dt>
          <dd>
            {current.role} @ {current.company}
          </dd>
          <dt>period</dt>
          <dd>{current.period}</dd>
          <dt>core</dt>
          <dd>{skillGroups[0].items.join(' · ')}</dd>
          <dt>frontend</dt>
          <dd>{skillGroups[1].items.join(' · ')}</dd>
          <dt>backend</dt>
          <dd>{skillGroups[2].items.join(' · ')}</dd>
          <dt>cloud</dt>
          <dd>{skillGroups[5].items.join(' · ')}</dd>
          <dt>contact</dt>
          <dd>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </dd>
        </dl>
      </aside>
    </section>
  );
}
