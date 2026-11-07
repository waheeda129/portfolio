# Waheeda Gillani, portfolio

Personal site for Waheeda Gillani, product and UI/UX designer: Co-founder & COO at SaleForgers, UI/UX Designer at TAMx and part of the founding team at Mapalz.

- `/` is a bento profile page drawn on a 1440×960 stage that scales to fit any desktop window and becomes a single scrolling column at 820px and below.
- `/work` covers each role, earlier projects, toolkit, education and contact.

## Stack

React 19, Vite, Framer Motion and Inter (self-hosted through `@fontsource-variable/inter`). There is no CSS framework; all styles are in `src/styles.css`.

## Motion

All motion on the home page reads one clock: the `currentTime` of a long Web Animation on a hidden element, published once per frame through Framer Motion's `useAnimationFrame` (see `src/clock.tsx`). Each card derives its state from that time, so a recorder that pauses and seeks Web Animations captures the page exactly. With `prefers-reduced-motion`, the page renders settled and nothing moves on its own.

## Editing content

Text, roles, timeline, process steps, projects and toolkit live in `src/data.ts`. Images are in `public/assets`. The map card loads OpenStreetMap tiles for Bagh, Azad Kashmir; the coordinates are at the top of the `MAP` block in `src/home/Cards.tsx`.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000. `npm run build` writes the production site to `dist/`, which Vercel serves using `vercel.json`.
