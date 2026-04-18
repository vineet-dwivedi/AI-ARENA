# AI Arena Frontend

This frontend now ships with a modular AI Arena screen that mirrors the provided dark and light theme references. The UI is built with React, styled with SCSS partials, and split into small components so it stays easy to extend when live backend data is connected.

## Run the project

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Backend connection

- The frontend calls `POST /use-graph` on `http://localhost:3000` by default.
- Set `VITE_API_URL` in the frontend if your backend runs on a different host or port.
- Optionally set `FRONTEND_ORIGIN` in the backend to a comma-separated allowlist for browser CORS.

## Folder structure

```text
src/
  components/
    battle/      # prompt area, battle board, response cards
    common/      # reusable buttons, pills, theme toggle
    icons/       # small inline SVG icon set used across the page
    layout/      # app header and shell-level UI
    verdict/     # judge verdict section
  data/          # mocked UI content used for the first screen
  hooks/         # shared React hooks like theme persistence
  styles/
    abstracts/   # tokens and Sass mixins
    base/        # resets and global element styles
    components/  # component-specific partials
    layout/      # layout-level partials
```

## Implementation notes

- Theme choice is persisted in `localStorage` through `useTheme`.
- Smooth scrolling is handled by Lenis, entrance/layout motion by Framer Motion, and the judge winner reveal by GSAP.
- Visual tokens live in `src/styles/abstracts/_tokens.scss` so the palette stays consistent across dark and light modes.
- The current data in `src/data/mockBattle.js` is intentionally static to keep the first UI implementation simple and easy to swap with API responses later.
