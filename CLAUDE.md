# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A health self-assessment survey app ("health-react"): users register/log in, answer a themed questionnaire (anxiety, burnout, cognitive, depression, etc.), and get a scored result. Two halves in this repo, now wired together over HTTP:

- `client/` — React 19 + Vite SPA, Bootstrap 5 / react-bootstrap for UI, `react-router-dom` for routing.
- `server/` — Express + Drizzle ORM backend on Postgres (Neon). Implemented: auth (register/login with bcrypt + JWT), themes, questions, result levels. Dependencies installed (`bcryptjs`, `jsonwebtoken`, `drizzle-orm`, `@neondatabase/serverless`, `express`, `cors`).

The client fetches themes/questions/auth from the server via `client/src/api/*.js` (`VITE_API_URL`, defaults to `http://localhost:3000`). `src/data/questions.json` is legacy/unused by the current pages.

## Commands

Client (from `client/`):

```
npm run dev            # start Vite dev server
npm run build           # production build
npm run lint             # eslint .
npm run format          # prettier --write on src/**/*.{js,jsx,json,css}
npm run format:check
```

Server (from `server/`):

```
npm run dev       # node --watch src/index.js
npm start         # node src/index.js
npm run db:push   # drizzle-kit push — sync schema.js to the Neon database
```

There is no test runner configured in either `client/` or `server/`.

## Architecture notes

### Client (`client/src`)

- `App.jsx` only defines routes (`react-router-dom`): `/` → `HomePage`, `/survey` → `SurveyPage`, `/result` → `ResultPage`. No survey logic lives here anymore.
- `pages/HomePage.jsx` — login/register form (Formik + Yup, schemas in `validation/authSchemas.js`). On success, stores `{ token }` from the server response in `localStorage` (`localStorage.setItem('token', token)`) and navigates to `/survey`. Note: the server also returns a `user` object (`{ id, name, email }`) that the client currently ignores.
- `pages/SurveyPage.jsx` — theme selection (`ThemeSelector`) → fetches questions for the chosen theme → one-question-at-a-time flow (mirrors the old `App.jsx` state machine: `currentIndex`/`answers`/`hasStarted`) → on completion, scores via `calculateScore`, saves via `saveLastResult` (`utils/resultHistory.js`), navigates to `/result`. Redirects to `/` if no `token` in `localStorage` (this only checks presence, it's not validated against the server).
- `pages/ResultPage.jsx` — shows the score just computed (via router state) or the last saved result from `resultHistory`.
- `components/Layout.jsx` — shared centered-column wrapper (Bootstrap grid), used by all three pages.
- `components/QuestionCard.jsx`, `components/ThemeSelector.jsx` — presentational pieces for the survey flow.
- `api/auth.js` (`login`, `register`), `api/themes.js` (`fetchThemes`), `api/questions.js` (`fetchQuestions`, remaps DB `options` array into `{ label, value }[]`) — thin `fetch` wrappers, split by domain. None currently send an `Authorization` header or use cookies — the JWT returned by `auth.js` is stored but not yet attached to subsequent requests.
- `utils/calculateScore.js`, `utils/resultHistory.js` (localStorage persistence of the last result).
- `validation/authSchemas.js` — Yup schemas (`loginSchema`, `registerSchema`) for the Formik forms in `HomePage.jsx`.
- Prettier config: no semicolons, single quotes, 100-char width, `arrowParens: always` — match this style in new client code. ESLint flags unused vars except those matching `^[A-Z_]`.

### Server (`server/src`)

- `index.js` — Express app entry point. Mounts `cors()` (default/open config — no explicit origin or `credentials`), `express.json()`, and routers at `/api/themes`, `/api/result-levels`, `/api/auth`. Listens on `process.env.PORT || 3000`.
- `db/client.js` / `db/schema.js` — Drizzle client and schema (`drizzle.config.js` points `db:push` at `schema.js`, dialect `postgresql`, credentials from `DATABASE_URL`). Tables: `users` (`id`, `name`, `email` unique, `password_hash`, `created_at`), `themes` (`id` text PK, `title`, `description`, `icon`, `questions_file`, `length`, `category`), `questions` (FK `theme_id` → `themes`, unique on `(theme_id, question_number)`, `options` as JSONB), `result_levels` (`min_score`/`max_score` bands with `title`/`emoji`/`description`).
- `routes/auth.js` — `POST /register` (validates fields, checks email uniqueness, hashes password with `bcryptjs`, inserts, returns `{ token, user }`) and `POST /login` (verifies via `bcrypt.compare`, returns `{ token, user }`). `issueToken` signs a JWT (`{ id, email }`, 7d expiry) with `process.env.JWT_SECRET`.
- `routes/themes.js` — `GET /` (all themes), `GET /:id/questions` (questions for a theme, ordered by `question_number`). Neither route is auth-protected.
- `routes/resultLevels.js` — `GET /` (all result-level bands). Not auth-protected.
- `middleware/auth.js` — exports `requireAuth`, which reads `Authorization: Bearer <token>`, verifies with `JWT_SECRET`, sets `req.user`. **Defined but not currently wired into any route.**
- `middleware/validate.js` — `requireParam(name)` guard used by the questions route.
- `middleware/errorHandler.js` — final Express error handler, logs and returns `{ error: message }`.
- `sql/` (if present) holds the original raw schema/seed SQL this schema was derived from; `drizzle/` holds generated migrations from `drizzle-kit`.

## Known gaps / in-progress security work

- Client stores the JWT in `localStorage` and never attaches it to API requests — `Authorization` header is not sent, so `requireAuth` (unused) would reject everything anyway.
- No logout flow exists yet.
- Being considered: moving to an `httpOnly` cookie session (server sets `Set-Cookie` on login/register, `requireAuth` reads from cookie instead of header, client adds `credentials: 'include'`) instead of client-managed `localStorage` tokens, since survey results are sensitive data.
