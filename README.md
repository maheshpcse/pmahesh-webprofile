# pmahesh-webprofile

Portfolio of **Mahesh Pachapalam** - Senior Full Stack Engineer (Node.js, Angular, TypeScript, AWS).

Live: https://maheshpcse.github.io/pmahesh-webprofile/

## Concept

A cinematic opener built around a lightweight 3D laptop: the lid opens, the keyboard lights up, the display
powers on and runs a short engineering-style boot log, then the camera travels *into* the screen and the WebGL
view crossfades into the real HTML portfolio ("MAHESH.OS": Journey, Projects, Systems, Resume / Contact).

Guardrails baked in:

- The intro is ~6 s, skippable (button, `Esc`, `Enter`, `Space`) and replayable from the header.
- The intro plays on every load and the page always starts at the top. Append `?intro=0` to link straight to content.
- `prefers-reduced-motion` skips the intro entirely.
- Small viewports / no WebGL get a CSS-perspective 2D laptop with the same beats.
- If WebGL fails at runtime an error boundary drops straight into the content.
- three.js is code-split and only downloaded when the 3D intro is actually going to play.
- All resume/project content lives in `src/data/profile.ts` and comes from the resume PDF and public GitHub repos only.

## Tech

- Vite 5, React 18, TypeScript
- three.js + `@react-three/fiber` + `@react-three/drei`
- No UI framework; hand-written CSS in `src/styles.css`

The laptop is built procedurally from primitives (`src/intro/Laptop.tsx`) - no GLB download. The display is a
2D `CanvasTexture` (`src/intro/screenTexture.ts`) so the boot log stays crisp without shipping fonts.

## Project layout

```
src/
  data/profile.ts        verified content (identity, experience, skills, projects, boot lines)
  hooks/useIntroMode.ts  webgl | fallback | none decision, seen flag, replay
  intro/                 3D scene, procedural laptop, screen texture, timeline, CSS fallback, overlay
  portfolio/             Header, Hero, Journey, Projects, Systems, Contact
  App.tsx                intro <-> portfolio crossfade orchestration
public/
  resume/                downloadable PDF
  .nojekyll              keep GitHub Pages from touching the Vite output
.github/workflows/
  deploy.yml             build + deploy to GitHub Pages on push to main
  ci.yml                 typecheck + build on pull requests
```

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/
```

## Deploy (GitHub Pages)

1. In the repository go to **Settings -> Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` installs, builds with the correct base path
   (`/pmahesh-webprofile/`, taken from `actions/configure-pages`), uploads `dist/` and deploys it.
3. The site is published at `https://maheshpcse.github.io/pmahesh-webprofile/`.

The base path is read from `VITE_BASE_PATH` in `vite.config.ts`, so the same build works for a custom domain or a
user site by changing that variable (defaults to `/` for local development).

## Updating content

Edit `src/data/profile.ts`. Replace `public/resume/Mahesh-Pachapalam-Resume.pdf` to update the downloadable resume
(keep the filename or update `identity.resumeFile`).
