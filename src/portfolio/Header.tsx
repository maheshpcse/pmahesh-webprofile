import { identity } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { DownloadIcon, ReplayIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';

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
  const { theme, toggleTheme } = useTheme();
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
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        {onReplay && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onReplay}>
            <ReplayIcon />
            <span className="hide-sm">Replay intro</span>
          </button>
        )}
        <a className="btn btn--primary btn--sm" href={`${import.meta.env.BASE_URL}${identity.resumeFile}`} download>
          <DownloadIcon />
          Resume
        </a>
      </div>
    </header>
  );
}
