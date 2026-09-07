import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useIntroMode } from './hooks/useIntroMode';
import { FallbackIntro } from './intro/FallbackIntro';
import { IntroErrorBoundary } from './intro/IntroErrorBoundary';
import { IntroOverlay } from './intro/IntroOverlay';
import { Portfolio } from './portfolio/Portfolio';

// three.js + react-three-fiber are only fetched when the WebGL intro will actually play.
const IntroScene = lazy(() => import('./intro/IntroScene').then((m) => ({ default: m.IntroScene })));

const LEAVE_MS = 450;

export default function App() {
  const { mode, entered, finishIntro, replayIntro, canReplay } = useIntroMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const [introMounted, setIntroMounted] = useState(() => !entered && mode !== 'none');

  // Crossfade amount lives in a CSS variable so per-frame updates skip React.
  const setEnter = useCallback((amount: number) => {
    rootRef.current?.style.setProperty('--enter', amount.toFixed(3));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-intro', introMounted && !entered);
  }, [introMounted, entered]);

  useEffect(() => {
    if (entered) {
      setEnter(1);
      const id = window.setTimeout(() => setIntroMounted(false), LEAVE_MS);
      return () => clearTimeout(id);
    }
    setEnter(0);
    setIntroMounted(mode !== 'none');
  }, [entered, mode, setEnter]);

  const handleReplay = useCallback(() => {
    replayIntro();
  }, [replayIntro]);

  return (
    <div ref={rootRef} className="app" data-entered={entered ? 'true' : 'false'}>
      {introMounted && (
        <div className="intro" data-leaving={entered ? 'true' : 'false'}>
          <IntroErrorBoundary onError={finishIntro}>
            {mode === 'webgl' ? (
              <Suspense fallback={null}>
                <IntroScene onEnter={setEnter} onComplete={finishIntro} />
              </Suspense>
            ) : (
              <FallbackIntro onEnter={setEnter} onComplete={finishIntro} />
            )}
          </IntroErrorBoundary>
          {!entered && <IntroOverlay onSkip={finishIntro} />}
        </div>
      )}
      <Portfolio active={entered} onReplay={canReplay ? handleReplay : undefined} />
    </div>
  );
}
