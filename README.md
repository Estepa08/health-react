# health-react

Приложение для самооценки здоровья: пользователь проходит тематический опросник (тревожность, выгорание, когнитивные функции, депрессия и др.) и получает результат со шкалой оценки.

Состоит из двух частей:

- `client/` — React 19 + Vite SPA (Bootstrap 5 / react-bootstrap)
- `server/` — Node.js + Express API, отдаёт вопросы и темы из базы данных Postgres (Neon) через Drizzle ORM

## Требования

- Node.js 18+
- npm
- Доступ к базе данных Postgres (например, бесплатный проект на [Neon](https://neon.tech))

## Установка

Клонируйте репозиторий и установите зависимости отдельно для клиента и сервера:

```bash
git clone <URL_РЕПОЗИТОРИЯ>
cd health-react

cd client && npm install
cd ../server && npm install
```

## Настройка окружения

### Сервер (`server/.env`)

Создайте файл `server/.env`:

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
PORT=3000
```

`DATABASE_URL` — строка подключения к вашей Postgres-базе (например, из панели Neon).

Примените схему и сиды в базу (SQL-файлы находятся в `server/src/sql/`, применяются по порядку номеров `00_...` → `06_...`) — выполните их через клиент Postgres (`psql` или интерфейс Neon).

### Клиент (`client/.env.local`)

Создайте файл `client/.env.local`:

```
VITE_API_URL=http://localhost:3000
```

Укажите адрес, на котором будет доступен сервер (совпадает с `PORT` из `server/.env`).

## Запуск в режиме разработки

Запустите сервер и клиент в отдельных терминалах.

**Сервер:**

```bash
cd server
npm run dev
```

По умолчанию слушает `http://localhost:3000`.

**Клиент:**

```bash
cd client
npm run dev
```

Vite поднимет dev-сервер (обычно `http://localhost:5173`) — откройте адрес из вывода команды в браузере.

Либо через Makefile из корня репозитория — одна команда запустит сервер и клиент вместе:

```bash
make dev
```

(`make run` запускает только клиент.)

## Сборка для продакшена

```bash
cd client
npm run build
```

Собранные файлы появятся в `client/dist/`.

## Полезные команды (client/)

```bash
npm run lint            # проверка ESLint
npm run format          # форматирование Prettier
npm run format:check    # проверка форматирования без изменений
```

## Возможные проблемы

- **`ERR_CONNECTION_REFUSED` на `/api/...` в консоли браузера** — сервер не запущен или запущен не на том порту. Проверьте, что `server` работает (`npm run dev` в `server/`) и что `PORT` в `server/.env` совпадает с `VITE_API_URL` в `client/.env.local`.
- **Ошибки подключения к базе** — проверьте корректность `DATABASE_URL` в `server/.env` и что база доступна (для Neon — что проект не "уснул").
