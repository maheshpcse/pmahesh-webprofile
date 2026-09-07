import * as THREE from 'three';
import { bootLines, identity } from '../data/profile';

export const SCREEN_W = 1024;
export const SCREEN_H = 640;

export interface ScreenState {
  /** 0 = off, 1 = fully powered */
  power: number;
  /** 0..1 progress through the boot lines */
  boot: number;
  /** Elapsed time, for the cursor blink */
  time: number;
}

/**
 * Off-screen 2D canvas that becomes the laptop display texture. Drawing in 2D
 * keeps text crisp without shipping fonts or a GLB with baked textures.
 */
export function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_W;
  canvas.height = SCREEN_H;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  const sans = 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif';

  let lastKey = '';

  function draw(state: ScreenState) {
    const { power, boot, time } = state;
    const linesShown = Math.floor(boot * bootLines.length);
    const cursorOn = Math.floor(time * 2.5) % 2 === 0;
    const key = `${power.toFixed(2)}|${linesShown}|${cursorOn}|${boot >= 1 ? Math.floor(time * 10) : 0}`;
    if (key === lastKey) return false;
    lastKey = key;

    ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
    ctx.fillStyle = '#060709';
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    if (power <= 0) {
      texture.needsUpdate = true;
      return true;
    }

    // Power-on: a thin horizontal line expands into the full panel.
    if (power < 1) {
      const h = Math.max(2, SCREEN_H * power);
      ctx.fillStyle = `rgba(230, 236, 245, ${0.35 + 0.65 * power})`;
      ctx.fillRect(0, SCREEN_H / 2 - h / 2, SCREEN_W, h);
      texture.needsUpdate = true;
      return true;
    }

    ctx.fillStyle = '#0b0d11';
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // Top bar
    ctx.fillStyle = '#12151b';
    ctx.fillRect(0, 0, SCREEN_W, 44);
    ctx.fillStyle = '#9cc9ff';
    ctx.font = `600 18px ${mono}`;
    ctx.textBaseline = 'middle';
    ctx.fillText('MAHESH.OS', 28, 22);
    ctx.fillStyle = '#6c7683';
    ctx.font = `400 16px ${mono}`;
    ctx.textAlign = 'right';
    ctx.fillText(identity.githubHandle, SCREEN_W - 28, 22);
    ctx.textAlign = 'left';

    if (boot < 1) {
      // Boot log
      ctx.font = `400 22px ${mono}`;
      const startY = 100;
      const lineH = 38;
      for (let i = 0; i < linesShown; i++) {
        const line = bootLines[i];
        ctx.fillStyle = i === linesShown - 1 ? '#e8eaee' : '#8f99a6';
        ctx.fillText(`> ${line}`, 40, startY + i * lineH);
      }
      if (cursorOn) {
        ctx.fillStyle = '#9cc9ff';
        ctx.fillRect(40, startY + linesShown * lineH - 12, 12, 24);
      }
    } else {
      // Identity signal - the frame the camera flies into.
      ctx.fillStyle = '#e8eaee';
      ctx.font = `600 72px ${sans}`;
      ctx.fillText(identity.name, 60, SCREEN_H / 2 - 30);
      ctx.fillStyle = '#9aa3ad';
      ctx.font = `400 28px ${sans}`;
      ctx.fillText(`${identity.title} · ${identity.yearsLabel}`, 62, SCREEN_H / 2 + 40);
      ctx.fillStyle = '#9cc9ff';
      ctx.font = `400 20px ${mono}`;
      ctx.fillText(cursorOn ? 'entering screen _' : 'entering screen', 62, SCREEN_H / 2 + 100);
    }

    texture.needsUpdate = true;
    return true;
  }

  return { texture, draw, dispose: () => texture.dispose() };
}
