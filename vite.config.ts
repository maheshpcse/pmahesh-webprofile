import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/.
// The deploy workflow sets VITE_BASE_PATH to "/<repo>/"; local dev defaults to "/".
const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2019',
    sourcemap: false,
    // three.js is ~180 kB gzipped and only loaded lazily for the WebGL intro.
    chunkSizeWarningLimit: 1100,
  },
});
