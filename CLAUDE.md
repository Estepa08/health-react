# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working conventions

- Communicate with the user in Russian.
- Before running any shell/bash command, give a very short (few words) explanation of what the command does.

## Project overview

A health self-assessment survey app ("health-react"): users register/log in, answer a themed questionnaire (anxiety, burnout, cognitive, depression, etc.), and get a scored result. Two halves in this repo, wired together over HTTP:

- `client/` — React 19 + Vite SPA, Bootstrap 5 / react-bootstrap for UI, `react-router-dom` for routing.
- `server/` — Express + Drizzle ORM backend on Postgres (Neon). Auth (register/login/me with bcrypt + JWT), themes, questions, result levels, and server-side scored results are implemented. `requireAuth` middleware is wired into `/api/auth/me` and all of `/api/results`.

The client fetches themes/questions/auth/results from the server via `client/src/api/*.js` (`VITE_API_URL`, defaults to `http://localhost:3000`), attaching `Authorization: Bearer <token>` where needed. `src/data/questions.json` is legacy/unused by the current pages.

## Commands

Client (from `client/`):

```
npm run dev            # start Vite dev server
npm run build           # production build
npm run lint             # eslint .
npm run format          # prettier --write on src/**/*.{js,jsx,json,css}
npm run format:check
npm run test             # vitest (watch mode)
npm run test:coverage   # vitest run --coverage (v8 provider, text + lcov reporters)
```

Server (from `server/`):

```
npm run dev       # node --watch src/index.js
npm start         # node src/index.js
npm run db:push   # drizzle-kit push — sync schema.js to the Neon database
npm test          # vitest (watch mode)
```

Both use Vitest as the test runner. From the repo root, `Makefile` wraps the above:

```
make test            # runs client + server tests (vitest run)
make test-client      # client tests only
make test-server      # server tests only
make test-coverage   # client coverage report
```

## Testing conventions

- Test runner: **Vitest** in both `client/` and `server/` (`client/vite.config.js` / `server/vitest.config.js`).
- Client tests use `jsdom` environment, `@testing-library/react` + `@testing-library/user-event` for component tests, `@testing-library/jest-dom` matchers (loaded via `src/setupTests.js`), and Vitest globals (`describe`/`it`/`expect`/`vi` — no explicit imports needed, enabled via `test.globals: true`).
- Server tests use the default `node` environment; no DOM tooling.
- Test files live in a `__tests__/` folder next to the code they cover (e.g. `src/utils/__tests__/calculateScore.test.js`, `src/components/survey/__tests__/QuestionCard.test.jsx`), not co-located as `Component.test.jsx` siblings.
- ESLint config (`client/eslint.config.js`) has a dedicated block for `**/__tests__/**/*.{js,jsx}` (and `src/setupTests.js`) that adds the Vitest globals; `coverage/` is excluded from lint via `globalIgnores`.
- Coverage: `@vitest/coverage-v8` on the client, reporters `text` + `lcov`; CI runs a SonarCloud scan (`SonarSource/sonarcloud-github-action`) that reads `client/coverage/lcov.info` per `sonar-project.properties` (org `estepa08`, project key `Estepa08_health-react`) — requires a `SONAR_TOKEN` repo secret.

## Architecture notes

### Client (`client/src`)

- `App.jsx` only defines routes (`react-router-dom`): `/` → `HomePage`, `/survey` → `SurveyPage`, `/result` → `ResultPage`, `*` → `NotFoundPage`. No survey logic lives here.
- `pages/HomePage.jsx` — login/register form (Formik + Yup, schemas in `validation/authSchemas.js`). On mount, if a `token` is already in `localStorage` it calls `GET /api/auth/me`; on success it stores `user` and redirects straight to `/survey` (skipping the login form), on failure it clears `token`/`user`. On successful login/register it stores both `token` and `user` (`{ id, name, email }`) in `localStorage` and navigates to `/survey`.
- `pages/SurveyPage.jsx` — theme selection (`ThemeSelector`) → fetches questions for the chosen theme → one-question-at-a-time flow (`currentIndex`/`answers`/`hasStarted` state machine, auto-advances ~1s after an answer is picked) → on completion, calls `saveResult` (`api/results.js`) to score and persist the result server-side, then navigates to `/result` with the returned score in router state (falls back to local `calculateScore` if the request fails). Also has a "Просмотр истории" button that jumps straight to `/result` (which then fetches the last saved result). Redirects to `/` if no `token` in `localStorage` (this only checks presence, it's not validated against the server).
- `pages/ResultPage.jsx` — shows the score from router state if present, otherwise fetches the last result via `GET /api/results/last`; looks up the matching band from `fetchResultLevels`; redirects to `/survey` if no score is available.
- `pages/NotFoundPage.jsx` — catch-all 404 page.
- `components/Layout.jsx` — shared centered-column wrapper (Bootstrap grid) that renders `Header` above the page content, used by all pages.
- `components/Header.jsx` — shows the logged-in user's name and a "Выход" (logout) button (clears `token`/`user` from `localStorage` and navigates to `/`); renders nothing if no `user` is stored.
- `components/QuestionCard.jsx`, `components/ThemeSelector.jsx` — presentational pieces for the survey flow.
- `api/auth.js` (`login`, `register`, `getMe`), `api/themes.js` (`fetchThemes`), `api/questions.js` (`fetchQuestions`, remaps DB `options` array into `{ label, value }[]`), `api/results.js` (`saveResult`, `fetchLastResult`, both send `Authorization: Bearer <token>` from `localStorage`), `api/resultLevels.js` (`fetchResultLevels`) — thin `fetch` wrappers, split by domain.
- `utils/calculateScore.js` — client-side fallback scorer (sums answer values); the authoritative score comes from the server. There is no client-side result history anymore — results live server-side per user.
- `utils/buttonColors.js` — shared button/nav color constants used across pages/components.
- `validation/authSchemas.js` — Yup schemas (`loginSchema`, `registerSchema`) for the Formik forms in `HomePage.jsx`.
- Prettier config: no semicolons, single quotes, 100-char width, `arrowParens: always` — match this style in new client code. ESLint flags unused vars except those matching `^[A-Z_]`.

### Server (`server/src`)

- `index.js` — Express app entry point. Mounts `cors()` (default/open config — no explicit origin or `credentials`), `express.json()`, and routers at `/api/themes`, `/api/result-levels`, `/api/auth`, `/api/results`. Listens on `process.env.PORT || 3000`.
- `db/client.js` / `db/schema.js` — Drizzle client and schema (`drizzle.config.js` points `db:push` at `schema.js`, dialect `postgresql`, credentials from `DATABASE_URL`). Tables: `users` (`id`, `name`, `email` unique, `password_hash`, `created_at`), `themes` (`id` text PK, `title`, `description`, `icon`, `questions_file`, `length`, `category`), `questions` (FK `theme_id` → `themes`, unique on `(theme_id, question_number)`, `options` as JSONB), `results` (FK `user_id` → `users`, FK `theme_id` → `themes`, `score`, `created_at` — one row per completed survey attempt), `result_levels` (`min_score`/`max_score` bands with `title`/`emoji`/`description`).
- `routes/auth.js` — `POST /register` (validates fields, checks email uniqueness, hashes password with `bcryptjs`, inserts, returns `{ token, user }`), `POST /login` (verifies via `bcrypt.compare`, returns `{ token, user }`), and `GET /me` (auth-protected via `requireAuth`, returns the current user looked up by `req.user.id`). `issueToken` signs a JWT (`{ id, email }`, 7d expiry) with `process.env.JWT_SECRET`.
- `routes/results.js` — auth-protected (`requireAuth`). `POST /` validates `{ themeId, answers }` against the theme's questions (all questions answered, each answer value one of that question's option scores), computes the score server-side via `utils/calculateScore.js`, and inserts a row into `results` for `req.user.id`. `GET /last` returns the current user's most recent result (or `null`).
- `routes/themes.js` — `GET /` (all themes), `GET /:id/questions` (questions for a theme, ordered by `question_number`). Not auth-protected (read-only reference data).
- `routes/resultLevels.js` — `GET /` (all result-level bands). Not auth-protected.
- `middleware/auth.js` — exports `requireAuth`, which reads `Authorization: Bearer <token>`, verifies with `JWT_SECRET`, sets `req.user`. Wired into `/api/auth/me` and all of `/api/results`.
- `middleware/validate.js` — `requireParam(name)` guard used by the questions route.
- `middleware/errorHandler.js` — final Express error handler, logs and returns `{ error: message }`.
- `utils/calculateScore.js` — server-side scorer used by `routes/results.js` (mirrors the client's version, sums answer values).
- `sql/` (if present) holds the original raw schema/seed SQL this schema was derived from; `drizzle/` holds generated migrations from `drizzle-kit`.

## Git workflow

`main` is protected — never push directly to it. Every change goes through a feature branch + Pull Request:

1. `git checkout -b feature/short-descriptive-name` — branch off before making changes.
2. Commit as usual (`git add`, `git commit`).
3. `git push origin feature/short-descriptive-name` — push the branch, not `main`.
4. Open a Pull Request on GitHub (`gh pr create` or the "Compare & pull request" banner).
5. Merge the PR on GitHub once ready (no required approvals for solo work — the green "Merge pull request" button is enough).
6. `git checkout main && git pull` to sync locally.
7. Optionally delete the merged branch (`git branch -d feature/...`; GitHub also offers to delete it after merge).

## Known gaps / in-progress security work

- Client still stores the JWT and user object in `localStorage` rather than an `httpOnly` cookie session; auth checks and result requests do send the `Authorization` header now, but a stolen/XSS-exposed token remains usable until it expires (7d).
- `cors()` is mounted with default/open config (no explicit origin allowlist or `credentials`) — worth tightening before this is exposed beyond local dev.
- Being considered: moving to an `httpOnly` cookie session (server sets `Set-Cookie` on login/register, `requireAuth` reads from cookie instead of header, client adds `credentials: 'include'`) instead of client-managed `localStorage` tokens, since survey results are sensitive data.
