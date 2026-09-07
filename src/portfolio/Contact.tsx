import { identity } from '../data/profile';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  const resumeUrl = `${import.meta.env.BASE_URL}${identity.resumeFile}`;
  return (
    <section id="resume" className="section section--contact">
      <SectionHeading index="04" title="Resume / Contact" path="/resume">
        Open to senior full-stack roles. The PDF is the same one recruiters get.
      </SectionHeading>

      <div className="contact" data-reveal>
        <div className="contact__cta">
          <a className="btn btn--primary" href={resumeUrl} download>
            Download resume (PDF)
          </a>
          <a className="btn btn--ghost" href={resumeUrl} target="_blank" rel="noreferrer">
            View in browser
          </a>
        </div>
        <dl className="contact__list">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${identity.phone.replace(/\s+/g, '')}`}>{identity.phone}</a>
          </dd>
          <dt>LinkedIn</dt>
          <dd>
            <a href={identity.linkedin} target="_blank" rel="noreferrer">
              {identity.linkedin.replace('https://', '')}
            </a>
          </dd>
          <dt>GitHub</dt>
          <dd>
            <a href={identity.github} target="_blank" rel="noreferrer">
              github.com/{identity.githubHandle}
            </a>
          </dd>
          <dt>Location</dt>
          <dd>{identity.location}</dd>
        </dl>
      </div>
    </section>
  );
}
