# 🧠 Health Self-Assessment Survey

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Postgres-Neon-4169E1?logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Railway-black?logo=vercel&logoColor=white)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Estepa08_health-react&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Estepa08_health-react)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Estepa08_health-react&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Estepa08_health-react)

**[English](#english) | [Русский](#русский)**

---

## English

Full-stack pet project: users take a themed psychological self-assessment survey (anxiety, burnout, cognitive function, depression), get a scored result, track progress on a personal dashboard, and train recognizing cognitive distortions through two mini-games.

### ✨ Features

- 🔐 Registration/login with JWT authentication, password hashing (bcrypt) and protected routes
- 📋 Step-by-step survey flow with forward/back navigation and answer highlighting
- 📊 Final score calculation and result lookup by range, plus a personal dashboard with history and trend charts (Recharts)
- 🧩 Cognitive distortion training: a swipe-card "agree/disagree" game and a situation-based training flow, both with scored attempts
- 🗄️ REST API on Express + database schema on Drizzle ORM (Postgres/Neon)
- ✅ Form validation via Formik + Yup
- 🧪 Unit and component tests (Vitest + Testing Library), coverage and code quality tracked via SonarCloud
- 🚀 Deploy configured: Docker (Railway) for the API, SPA rewrite (Vercel) for the client

### 🏗️ Stack

| Client | Server |
|---|---|
| React 19, Vite | Express 5 |
| React Router 7 | Drizzle ORM |
| react-bootstrap, Recharts | Neon (serverless Postgres) |
| Formik + Yup | bcryptjs, jsonwebtoken |
| Vitest, Testing Library | Vitest |

### 🧪 Testing

```
make test            # client + server tests
make test-client      # client tests only
make test-server      # server tests only
make test-coverage   # client coverage report
```

See [CLAUDE.md](CLAUDE.md) for the full testing conventions (test runner, folder layout, coverage setup).

---

## Русский

Full-stack pet-проект: пользователь проходит тематический психологический опросник (тревожность, выгорание, когнитивные функции, депрессия), получает балл с интерпретацией, отслеживает динамику на личном дашборде и тренирует распознавание когнитивных искажений в двух мини-играх.

### ✨ Features

- 🔐 Регистрация/вход с JWT-аутентификацией, хешированием паролей (bcrypt) и защищёнными маршрутами
- 📋 Пошаговое прохождение опроса с навигацией вперёд/назад и подсветкой ответов
- 📊 Подсчёт итогового балла и вывод результата по диапазонам, личный дашборд с историей и графиками динамики (Recharts)
- 🧩 Тренировка когнитивных искажений: свайп-игра «согласен/не согласен» и тренировка на основе ситуаций, обе с подсчётом результата попытки
- 🗄️ REST API на Express + схема БД на Drizzle ORM (Postgres/Neon)
- ✅ Валидация форм через Formik + Yup
- 🧪 Юнит- и компонентные тесты (Vitest + Testing Library), покрытие и качество кода отслеживаются через SonarCloud
- 🚀 Настроен деплой: Docker (Railway) для API, SPA-rewrite (Vercel) для клиента

### 🏗️ Стек

| Клиент | Сервер |
|---|---|
| React 19, Vite | Express 5 |
| React Router 7 | Drizzle ORM |
| react-bootstrap, Recharts | Neon (serverless Postgres) |
| Formik + Yup | bcryptjs, jsonwebtoken |
| Vitest, Testing Library | Vitest |

### 🧪 Тестирование

```
make test            # клиент + сервер
make test-client      # только клиент
make test-server      # только сервер
make test-coverage   # coverage-отчёт клиента
```

Подробные конвенции тестирования (раннер, структура папок, покрытие) — в [CLAUDE.md](CLAUDE.md).
