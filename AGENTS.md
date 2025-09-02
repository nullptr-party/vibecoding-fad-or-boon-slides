# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (entry: `src/main.tsx`, deck: `src/slides/Deck.tsx`, styles: `src/style.css`).
- HTML shell: `index.html` mounts the React app at `#root`.
- Tooling: Vite + TypeScript + React + Spectacle. Package scripts live in `package.json`.
- Assets: place images under `src/assets/` (create if needed) and import via ESM.

## Build, Test, and Development Commands
- `bun install`: install dependencies (uses `bun.lock`).
- `bun run dev`: start Vite dev server with HMR.
- `bun run build`: type‑check (`tsc`) and build production bundle.
- `bun run preview`: preview the production build locally.

## Coding Style & Naming Conventions
- TypeScript strict mode is enabled; prefer typed props and explicit returns.
- Indentation: 2 spaces; keep lines focused and readable.
- Components: use functional React components; filename `PascalCase.tsx` (e.g., `Deck.tsx`).
- CSS classes: lower‑case, hyphenated or simple words (e.g., `.todo`, `.two-col`).
- Imports: use ESM paths within `src/`; avoid deep relative churn.

## Testing Guidelines
- No test harness is included. For changes, manually verify slides render and navigate.
- Optional: add lightweight visual checks (e.g., export key slides and compare screenshots) without introducing heavy dependencies.
- Keep TODO markers (`[TODO]`) short‑lived; replace with final content before merging.

## Commit & Pull Request Guidelines
- Commits: use concise, imperative messages. Recommended prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Scope changes narrowly; keep diffs readable (slides + styles together when related).
- PRs: include a short description, before/after notes or screenshots/GIFs, and any manual verification steps (`bun run dev`, slide paths affected).
- Link relevant issues or talk notes when available.

## Security & Configuration Tips
- Do not commit secrets or tokens; this deck runs entirely client‑side.
- Keep dependencies minimal; avoid adding libraries for simple slide content.
- Environment: install Bun; Node is not required for standard tasks.
- Accessibility: prefer semantic text components and sufficient contrast in styles.

