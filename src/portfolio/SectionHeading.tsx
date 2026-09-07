import type { ReactNode } from 'react';

interface SectionHeadingProps {
  index: string;
  title: string;
  path: string;
  children?: ReactNode;
}

export function SectionHeading({ index, title, path, children }: SectionHeadingProps) {
  return (
    <header className="section__head" data-reveal>
      <p className="mono muted section__path">
        <span aria-hidden="true">{index} · </span>
        {path}
      </p>
      <h2>{title}</h2>
      {children && <p className="section__intro">{children}</p>}
    </header>
  );
}
