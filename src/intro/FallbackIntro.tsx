import { useEffect, useState } from 'react';
import { bootLines, identity } from '../data/profile';

interface FallbackIntroProps {
  onEnter: (amount: number) => void;
  onComplete: () => void;
}

const LID_MS = 1300;
const BOOT_STEP_MS = 190;
const HOLD_MS = 700;
const FADE_MS = 600;

/**
 * CSS-perspective laptop for small screens and devices without WebGL.
 * Same beats as the 3D version (lid, boot, enter), a little shorter.
 */
export function FallbackIntro({ onEnter, onComplete }: FallbackIntroProps) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(0);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setOpen(true), 150));
    const bootStart = 150 + LID_MS;
    for (let i = 1; i <= bootLines.length; i++) {
      timers.push(window.setTimeout(() => setLines(i), bootStart + i * BOOT_STEP_MS));
    }
    const enterAt = bootStart + bootLines.length * BOOT_STEP_MS + HOLD_MS;
    timers.push(
      window.setTimeout(() => {
        setEntering(true);
        const t0 = performance.now();
        const tick = () => {
          const a = Math.min(1, (performance.now() - t0) / FADE_MS);
          onEnter(a);
          if (a < 1) requestAnimationFrame(tick);
          else onComplete();
        };
        requestAnimationFrame(tick);
      }, enterAt),
    );
    return () => timers.forEach(clearTimeout);
  }, [onEnter, onComplete]);

  return (
    <div className={`fb-stage${entering ? ' fb-stage--enter' : ''}`} aria-hidden="true">
      <div className="fb-laptop">
        <div className={`fb-lid${open ? ' fb-lid--open' : ''}`}>
          <div className="fb-screen">
            <div className="fb-screen__bar">
              <span>MAHESH.OS</span>
              <span>{identity.githubHandle}</span>
            </div>
            <pre className="fb-screen__log">
              {bootLines.slice(0, lines).map((l, i) => (
                <div key={i} className={i === lines - 1 ? 'is-current' : undefined}>
                  {'> '}
                  {l}
                </div>
              ))}
              <span className="fb-cursor" />
            </pre>
          </div>
        </div>
        <div className="fb-base" />
      </div>
    </div>
  );
}
