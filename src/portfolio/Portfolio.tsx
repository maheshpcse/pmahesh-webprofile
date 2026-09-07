import { identity } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { Contact } from './Contact';
import { Cursor } from './Cursor';
import { Header } from './Header';
import { Hero } from './Hero';
import { Journey } from './Journey';
import { Projects } from './Projects';
import { Systems } from './Systems';

interface PortfolioProps {
  /** True once the intro has finished (or was skipped) and the DOM is interactive. */
  active: boolean;
  onReplay?: () => void;
}

export function Portfolio({ active, onReplay }: PortfolioProps) {
  useReveal(active);

  return (
    <div className="portfolio" aria-hidden={!active}>
      <a className="skip-link" href="#journey">
        Skip to content
      </a>
      {active && <Cursor />}
      <Header onReplay={onReplay} />
      <main>
        <Hero />
        <Journey />
        <Projects />
        <Systems />
        <Contact />
      </main>
      <footer className="site-footer">
        <span className="mono muted">MAHESH.OS · {new Date().getFullYear()}</span>
        <span className="muted">
          {identity.name}. Built with React, Three.js and Vite; deployed on GitHub Pages.{' '}
          <a href="https://github.com/maheshpcse/pmahesh-webprofile" target="_blank" rel="noreferrer">
            Source
          </a>
        </span>
      </footer>
    </div>
  );
}
