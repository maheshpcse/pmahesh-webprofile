import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

/**
 * Structured "reticle" cursor: four corner brackets that trail the pointer and
 * snap around interactive elements. The native cursor is restyled via CSS
 * (SVG data URIs) so pointing still works if this component never mounts.
 * Not active on touch-primary devices or under reduced-motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Exclude touch-primary devices; some desktop VMs report neither fine nor coarse.
    const coarse = window.matchMedia('(pointer: coarse)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (coarse.matches || reduce.matches) return;

    document.documentElement.classList.add('has-reticle');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let w = 22;
    let h = 22;
    let tw = 22;
    let th = 22;
    let target: Element | null = null;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        cx = x;
        cy = y;
        el.dataset.visible = 'true';
      }
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      if (hit !== target) {
        target = hit;
        el.dataset.state = hit ? 'hover' : 'idle';
      }
    };
    const onLeave = () => {
      visible = false;
      el.dataset.visible = 'false';
    };
    const onDown = () => el.setAttribute('data-pressed', 'true');
    const onUp = () => el.removeAttribute('data-pressed');

    const tick = () => {
      if (target) {
        const r = target.getBoundingClientRect();
        // Skip block-level containers that would make the reticle huge.
        if (r.width < 420 && r.height < 200) {
          tw = r.width + 14;
          th = r.height + 12;
          cx += (r.left + r.width / 2 - cx) * 0.28;
          cy += (r.top + r.height / 2 - cy) * 0.28;
        } else {
          tw = th = 22;
          cx += (x - cx) * 0.35;
          cy += (y - cy) * 0.35;
        }
      } else {
        tw = th = 22;
        cx += (x - cx) * 0.35;
        cy += (y - cy) * 0.35;
      }
      w += (tw - w) * 0.3;
      h += (th - h) * 0.3;
      el.style.transform = `translate3d(${cx - w / 2}px, ${cy - h / 2}px, 0)`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-reticle');
    };
  }, []);

  return <div ref={ref} className="reticle" data-visible="false" data-state="idle" aria-hidden="true" />;
}
