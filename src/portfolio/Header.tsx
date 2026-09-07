import { identity } from '../data/profile';

interface HeaderProps {
  onReplay?: () => void;
}

const NAV = [
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#systems', label: 'Systems' },
  { href: '#resume', label: 'Resume' },
];

export function Header({ onReplay }: HeaderProps) {
  return (
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label={`${identity.name} - home`}>
        MAHESH.OS
      </a>
      <nav aria-label="Sections">
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-header__actions">
        {onReplay && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onReplay}>
            Replay intro
          </button>
        )}
        <a className="btn btn--primary btn--sm" href={`${import.meta.env.BASE_URL}${identity.resumeFile}`} download>
          Resume
        </a>
      </div>
    </header>
  );
}
