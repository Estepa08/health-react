# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Full-stack pet project: a themed psychological self-assessment survey (anxiety, burnout, cognitive function, depression) with scored results, a personal dashboard with history/trend charts, and cognitive-distortion training mini-games. React 19 + Vite client, Express 5 + Drizzle ORM (Postgres/Neon) server.

## Commands

Run from repo root via `Makefile` (starts client and server together):

```
make dev            # client (Vite) + server (node --watch), concurrently
make build           # client production build
make run             # client dev server only
make test            # client + server tests
make test-client     # client tests only
make test-server     # server tests only
make test-coverage   # client coverage report (writes client/coverage/lcov.info)
```

Client (`cd client`):
```
npm run dev              # vite dev server
npm run lint              # eslint
npm run format            # prettier --write src/**/*.{js,jsx,json,css}
npm run format:check
npm test -- run           # vitest, single run
npm test -- run <path>    # single test file
npm run test:coverage
```

Server (`cd server`):
```
npm run dev        # node --watch src/index.js
npm start
npm test -- run           # vitest, single run
npm run db:push           # drizzle-kit push (applies schema.js to the DB)
```

There is no root-level test/build script — always `cd client` or `cd server` first, or use the `make` targets.

## CI (`.github/workflows/ci.yml`)

- **client** job: `npm run lint`, `npm run format:check`, `npm run test:coverage`, then rewrites lcov paths to be repo-root-relative (`sed -i 's#^SF:#SF:client/#'`) before the SonarCloud scan, then `npm run build`.
- **server** job: just `node --check src/index.js` (syntax check only, no test run in CI).
- SonarCloud config lives in `sonar-project.properties` at repo root: sources/tests are `client/src,server/src`, tests are matched by `**/__tests__/**`, coverage comes only from `client/coverage/lcov.info` (server has no coverage reporting wired up), `server/src/index.js` is excluded from coverage.

## Architecture

### Server (`server/src`)

- `index.js` — Express app entry. Mounts one router per resource under `/api/*` (`themes`, `result-levels`, `auth`, `results`, `distortion-games`, `distortion-attempts`, `distortion-training`), then a single global `errorHandler` middleware.
- `db/schema.js` — single source of truth for the Postgres schema (Drizzle ORM). Two independent, unrelated feature areas share the `users` table:
  - **Survey**: `themes` → `questions` → `results` (scored per user/theme) → `resultLevels` (score-range → title/description lookup).
  - **Distortion games** (swipe-card game): `distortionGames` → `distortionCards` → `distortionAttempts`.
  - **Distortion training** (situation-based, separate from the games above — see comment in schema.js): `distortionTypes` → `distortionSituations` → `distortionOptions` (scored 0/1/2 via a Postgres CHECK constraint) → `distortionTrainingAttempts`.
- `db/client.js` — Neon serverless Postgres client used by Drizzle.
- `middleware/auth.js` (`requireAuth`) — reads `Authorization: Bearer <jwt>`, verifies with `JWT_SECRET`, sets `req.user`; used on any route needing an authenticated user.
- `middleware/validate.js`, `middleware/errorHandler.js` — request validation and centralized error responses.
- Error/user-facing messages in API responses are in Russian (e.g. `"Требуется авторизация"`) — keep that convention for new server-side user-facing strings.
- Tests live next to the code in `__tests__/` folders (`routes/__tests__`, `middleware/__tests__`, `utils/__tests__`), run with Vitest.

### Client (`client/src`)

- `App.jsx` defines all routes via React Router 7: survey flow (`/survey`, `/result`), `/dashboard`, distortion games (`/distortions`, `/distortions/:gameId`, `/distortions/:gameId/result`), and distortion training (`/training`, `/training/:slug`, `/training/:slug/result`).
- `api/` — one file per backend resource (`auth.js`, `themes.js`, `questions.js`, `results.js`, `resultLevels.js`, `distortionGames.js`, `distortionAttempts.js`, `distortionTraining.js`). Each is a thin `fetch` wrapper: reads `VITE_API_URL` (defaults to `http://localhost:3000`), throws `Error` with the server's `data.error` (in Russian) on non-OK responses. Authenticated calls read the JWT from `localStorage` and attach `Authorization: Bearer <token>`.
- `pages/` mirrors the route structure (`auth/`, `survey/`, `dashboard/`, `distortions/`), each page composes components from `components/`.
- `components/` grouped by feature (`auth`, `dashboard`, `survey`, `distortion`, `training`, `layout`).
- `hooks/`, `utils/`, `validation/` (Formik + Yup schemas) are shared across features.
- Bootstrap (react-bootstrap) is imported globally in `App.jsx`; Recharts is used for dashboard trend charts.
- Tests use Vitest + Testing Library, colocated in `__tests__/` folders next to the code they test; `setupTests.js` is the global test setup referenced from `vite.config.js`.

## Deployment

Docker (Railway) for the API (`server/Dockerfile`), Vercel SPA rewrite for the client (`client/vercel.json`).
