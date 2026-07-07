# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A health self-assessment survey app ("health-react"): users answer a themed questionnaire (anxiety, burnout, cognitive, depression, etc.) and get a scored result. Two independent halves in this repo:

- `client/` — React 19 + Vite SPA, Bootstrap 5 / react-bootstrap for UI.
- `server/` — Node backend intended to serve question/theme data from Postgres (Neon) via Drizzle ORM. **Currently a bare scaffold**: `server/package.json`, `server/.env`, and all files under `server/src/middleware/` and `server/src/db/` (`client.js`, `schema.js`) exist but are empty (0 bytes). Only `server/src/sql/*.sql` contain real content (raw schema + seed SQL, described below). There is no working server yet — no dependencies installed, no drizzle config, no routes.

The client currently reads questions from a local `src/data/questions.json` (per `App.jsx`), not from the server — the two sides are not yet wired together.

## Commands

All client commands run from `client/`:

```
npm run dev            # start Vite dev server
npm run build           # production build
npm run lint             # eslint .
npm run format          # prettier --write on src/**/*.{js,jsx,json,css}
npm run format:check
```

There is no test runner configured yet in `client/` or `server/`.

The server has no `scripts` defined (its `package.json` is empty) — nothing to run there yet.

## Architecture notes

### Client (`client/src`)

- `App.jsx` is the whole survey flow as a single state machine: `currentIndex` / `answers` / `hasStarted` / `showResult` / `totalScore` state, driven by `handleAnswer`. It renders one question at a time via a `QuestionCard` component and a `Layout` wrapper, computes the final score via `calculateScore(answers)`, then shows a result screen with a restart button.
- Expected structure (imported by `App.jsx` but **not yet created** — build these when implementing survey features):
  - `src/components/Layout.jsx`
  - `src/components/QuestionCard.jsx`
  - `src/data/questions.json` — question bank (id, prompt, options, scoring)
  - `src/utils/calculateScore.js` — turns an `{questionId: answer}` map into a numeric score
- Uses Bootstrap classes directly (`btn btn-primary`, `progress`/`progress-bar`) rather than react-bootstrap components in `App.jsx`; `react-bootstrap` is a dependency so either style may appear.
- Prettier config: no semicolons, single quotes, 100-char width, `arrowParens: always` — match this style in new client code. ESLint flags unused vars except those matching `^[A-Z_]`.

### Server (`server/src`)

- `index.js` is the entry point (currently empty — needs implementation).
- `db/client.js` / `db/schema.js` are meant to hold the Drizzle client and schema definitions, mirroring the raw SQL in `sql/00_schema.sql` (three tables: `themes`, `questions`, `result_levels`).
- `middleware/auth.js`, `middleware/errorHandler.js`, `middleware/validate.js` are stubs for future Express (or similar) middleware.
- `sql/` holds the actual source of truth for the target DB schema and seed data, applied in numeric order:
  - `00_schema.sql` — creates `themes`, `questions` (FK to `themes`, unique on `theme_id, question_number`), `result_levels`.
  - `01_themes.sql` — seeds theme rows (id, title, description, icon, questions_file, length, category).
  - `02`–`05_questions_*.sql` — seed questions per theme (anxiety, burnout, cognitive, depression); each question has `options` as JSONB.
  - `06_result_levels.sql` — seeds score-range → result label/description bands.
- `drizzle/` directory exists but is currently empty — migrations/config not yet generated.
