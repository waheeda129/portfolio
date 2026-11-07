# Waheeda Gillani, portfolio

Personal site for Waheeda Gillani, product and UI/UX designer: Co-founder & COO at SaleForgers, UI/UX Designer at TAMx and part of the founding team at Mapalz.

- `/` is a bento profile page. On large windows it is drawn on a 1440×960 stage that scales to fit; when that would shrink text below 80% (most laptops) or the window is 820px or narrower, it becomes a normal scrolling page instead.
- `/work` lists the case studies and earlier projects; `/work/saleforgers`, `/work/mapalz` and `/work/tamx` are the case studies.
- `/services`, `/about` and `/contact` cover services and process, background and verification links, and ways to get in touch. Unknown paths show a 404 page.

Pages swap on the client (`src/router.tsx`), so navigation does not reload the site.

## Stack

React 19, Vite, Framer Motion and Inter (self-hosted through `@fontsource-variable/inter`). There is no CSS framework; all styles are in `src/styles.css`.

## Motion

All motion on the home page reads one clock: the `currentTime` of a long Web Animation on a hidden element, published once per frame through Framer Motion's `useAnimationFrame` (see `src/clock.tsx`). Each card derives its state from that time, so a recorder that pauses and seeks Web Animations captures the page exactly. With `prefers-reduced-motion`, the page renders settled and nothing moves on its own.

## Editing content

All copy lives in `src/data.ts`: the rotating "Now" line, timeline, process steps, case studies, services, FAQ, beliefs, projects and toolkit. Images are in `public/assets`. The map card loads OpenStreetMap tiles for Bagh, Azad Kashmir; the coordinates are at the top of the `MAP` block in `src/home/Cards.tsx`.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000. `npm run build` writes the production site to `dist/`, which Vercel serves using `vercel.json`.
