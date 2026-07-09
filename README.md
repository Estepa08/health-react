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

Full-stack pet project: users take a themed psychological self-assessment survey (anxiety, burnout, cognitive function, depression) and get a score with a personalized interpretation of the result.

### ✨ Features

- 🔐 Registration/login with JWT authentication, password hashing (bcrypt) and protected routes
- 📋 Step-by-step survey flow with forward/back navigation and answer highlighting
- 📊 Final score calculation and result lookup by range
- 🗄️ REST API on Express + database schema on Drizzle ORM (Postgres/Neon)
- ✅ Form validation via Formik + Yup
- 🚀 Deploy configured: Docker (Railway) for the API, SPA rewrite (Vercel) for the client

### 🏗️ Stack

| Client | Server |
|---|---|
| React 19, Vite | Express 5 |
| React Router 7 | Drizzle ORM |
| react-bootstrap | Neon (serverless Postgres) |
| Formik + Yup | bcryptjs, jsonwebtoken |

---

## Русский

Full-stack pet-проект: пользователь проходит тематический психологический опросник (тревожность, выгорание, когнитивные функции, депрессия) и получает балл с персональной интерпретацией результата.

### ✨ Features

- 🔐 Регистрация/вход с JWT-аутентификацией, хешированием паролей (bcrypt) и защищёнными маршрутами
- 📋 Пошаговое прохождение опроса с навигацией вперёд/назад и подсветкой ответов
- 📊 Подсчёт итогового балла и вывод результата по диапазонам
- 🗄️ REST API на Express + схема БД на Drizzle ORM (Postgres/Neon)
- ✅ Валидация форм через Formik + Yup
- 🚀 Настроен деплой: Docker (Railway) для API, SPA-rewrite (Vercel) для клиента

### 🏗️ Стек

| Клиент | Сервер |
|---|---|
| React 19, Vite | Express 5 |
| React Router 7 | Drizzle ORM |
| react-bootstrap | Neon (serverless Postgres) |
| Formik + Yup | bcryptjs, jsonwebtoken |
