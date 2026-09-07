import { useCallback, useEffect, useMemo, useState } from 'react';

export type IntroMode = 'webgl' | 'fallback' | 'none';

const SEEN_KEY = 'mahesh.os.introSeen';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isSmallViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}

function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

function hasSeenIntro(): boolean {
  try {
    return window.localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    window.localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable - intro simply replays next visit */
  }
}

/** Picks the intro mode for this device/visit. Forced via ?intro=1 for testing / sharing. */
export function resolveIntroMode(force = false): IntroMode {
  if (prefersReducedMotion()) return 'none';
  if (!force && hasSeenIntro()) return 'none';
  if (isSmallViewport() || !supportsWebGL()) return 'fallback';
  return 'webgl';
}

export function useIntroMode() {
  const forced = useMemo(() => new URLSearchParams(window.location.search).get('intro') === '1', []);
  const [mode, setMode] = useState<IntroMode>(() => resolveIntroMode(forced));
  const [entered, setEntered] = useState<boolean>(() => mode === 'none');

  useEffect(() => {
    if (mode === 'none') setEntered(true);
  }, [mode]);

  const finishIntro = useCallback(() => {
    markIntroSeen();
    setEntered(true);
  }, []);

  const replayIntro = useCallback(() => {
    const next = resolveIntroMode(true);
    if (next === 'none') return; // reduced motion: nothing to replay
    setEntered(false);
    setMode(next);
    window.scrollTo({ top: 0 });
  }, []);

  const canReplay = !prefersReducedMotion();

  return { mode, entered, finishIntro, replayIntro, canReplay };
}
