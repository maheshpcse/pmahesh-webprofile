import { identity } from '../data/profile';
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from './Icons';
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
            <DownloadIcon />
            Download resume (PDF)
          </a>
          <a className="btn btn--ghost" href={resumeUrl} target="_blank" rel="noreferrer">
            View in browser
            <ArrowUpRightIcon />
          </a>
        </div>
        <dl className="contact__list">
          <dt>
            <MailIcon /> Email
          </dt>
          <dd>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </dd>
          <dt>
            <PhoneIcon /> Phone
          </dt>
          <dd>
            <a href={`tel:${identity.phone.replace(/\s+/g, '')}`}>{identity.phone}</a>
          </dd>
          <dt>
            <LinkedInIcon /> LinkedIn
          </dt>
          <dd>
            <a className="link-ext" href={identity.linkedin} target="_blank" rel="noreferrer">
              {identity.linkedin.replace('https://', '')}
              <ArrowUpRightIcon size={14} />
            </a>
          </dd>
          <dt>
            <GitHubIcon /> GitHub
          </dt>
          <dd>
            <a className="link-ext" href={identity.github} target="_blank" rel="noreferrer">
              github.com/{identity.githubHandle}
              <ArrowUpRightIcon size={14} />
            </a>
          </dd>
          <dt>
            <PinIcon /> Location
          </dt>
          <dd>{identity.location}</dd>
        </dl>
      </div>
    </section>
  );
}
