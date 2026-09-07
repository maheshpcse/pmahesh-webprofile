import { identity, projects } from '../data/profile';
import { ArrowUpRightIcon, GitHubIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

const repoName = (url: string) => url.replace('https://github.com/', '');

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading index="02" title="Projects" path="/projects">
        Public repositories on GitHub. Each one is source you can read, run, and judge.
      </SectionHeading>

      <ol className="projects">
        {projects.map((p) => (
          <li key={p.repo} className="project" data-reveal>
            <div className="project__head">
              <h3>
                <a href={p.repo} target="_blank" rel="noreferrer">
                  {p.name}
                </a>
              </h3>
              <span className="tag">{p.kind}</span>
            </div>
            <p className="project__desc">{p.description}</p>
            <ul className="chips" aria-label="Tech stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="project__links mono">
              <a className="link-ext" href={p.repo} target="_blank" rel="noreferrer">
                <GitHubIcon size={14} />
                {repoName(p.repo)}
                <ArrowUpRightIcon size={13} />
              </a>
              {p.companion && (
                <a
                  className="link-ext"
                  href={p.companion.repo}
                  target="_blank"
                  rel="noreferrer"
                  title={p.companion.label}
                >
                  <GitHubIcon size={14} />
                  {repoName(p.companion.repo)}
                  <ArrowUpRightIcon size={13} />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="section__foot muted" data-reveal>
        More on{' '}
        <a href={`${identity.github}?tab=repositories`} target="_blank" rel="noreferrer">
          github.com/{identity.githubHandle}
        </a>
        .
      </p>
    </section>
  );
}
