import { useCallback, useEffect, useState } from 'react';

export type IntroMode = 'webgl' | 'fallback' | 'none';

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

/**
 * Picks the intro mode for this device. The intro plays on every page load
 * (it is short and skippable); `?intro=0` skips it for direct links to content.
 */
export function resolveIntroMode(): IntroMode {
  if (prefersReducedMotion()) return 'none';
  if (new URLSearchParams(window.location.search).get('intro') === '0') return 'none';
  if (isSmallViewport() || !supportsWebGL()) return 'fallback';
  return 'webgl';
}

export function useIntroMode() {
  const [mode, setMode] = useState<IntroMode>(() => resolveIntroMode());
  const [entered, setEntered] = useState<boolean>(() => mode === 'none');

  useEffect(() => {
    if (mode === 'none') setEntered(true);
  }, [mode]);

  const finishIntro = useCallback(() => {
    setEntered(true);
  }, []);

  const replayIntro = useCallback(() => {
    if (prefersReducedMotion()) return; // nothing to replay
    setEntered(false);
    setMode(isSmallViewport() || !supportsWebGL() ? 'fallback' : 'webgl');
    window.scrollTo({ top: 0 });
  }, []);

  const canReplay = !prefersReducedMotion();

  return { mode, entered, finishIntro, replayIntro, canReplay };
}
