import { useEffect } from 'react';

const EASE = 0.11;
const LINE_HEIGHT = 40;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Inertial page scrolling for mouse wheels and in-page anchor links, without
 * a scroll library. Touch, keyboard and scrollbar dragging stay native so the
 * page is never less accessible than the browser default. Disabled under
 * reduced-motion and on touch-primary devices.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const root = document.documentElement;
    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let running = false;

    const maxScroll = () => root.scrollHeight - window.innerHeight;
    const headerOffset = () => (document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0) + 8;

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo({ top: current, behavior: 'instant' });
        running = false;
        return;
      }
      window.scrollTo({ top: current, behavior: 'instant' });
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      // Let pinch-zoom and horizontal trackpad gestures through untouched.
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= LINE_HEIGHT;
      else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;
      if (!running) target = current = window.scrollY;
      target = clamp(target + delta, 0, maxScroll());
      start();
    };

    // Keyboard / scrollbar / programmatic scrolls happen natively; resync so the
    // next wheel tick starts from where the page actually is.
    const onScroll = () => {
      if (!running) target = current = window.scrollY;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href')!.slice(1));
      const el = id ? document.getElementById(id) : root;
      if (!el) return;
      e.preventDefault();
      current = window.scrollY;
      target = id ? clamp(el.getBoundingClientRect().top + window.scrollY - headerOffset(), 0, maxScroll()) : 0;
      start();
      // Move focus for keyboard/AT users without triggering a native jump.
      if (id && el instanceof HTMLElement) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    };

    const onResize = () => {
      target = clamp(target, 0, maxScroll());
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onClick);
    };
  }, [enabled]);
}
