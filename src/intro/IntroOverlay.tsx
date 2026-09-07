import { useEffect, useRef } from 'react';

interface IntroOverlayProps {
  onSkip: () => void;
}

/** DOM chrome that sits over the intro: skip control + screen-reader hint. */
export function IntroOverlay({ onSkip }: IntroOverlayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSkip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onSkip]);

  return (
    <div className="intro-overlay">
      <p className="sr-only" role="status">
        Intro animation playing. Press Escape or activate Skip intro to go straight to the portfolio.
      </p>
      <div className="intro-overlay__brand" aria-hidden="true">
        <span className="wordmark">MAHESH.OS</span>
      </div>
      <button ref={buttonRef} type="button" className="btn btn--ghost intro-overlay__skip" onClick={onSkip}>
        Skip intro
        <kbd>Esc</kbd>
      </button>
    </div>
  );
}
