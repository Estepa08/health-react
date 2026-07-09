import { describe, it, expect, vi, beforeEach, afterAll, beforeAll } from 'vitest'
import express from 'express'
import http from 'node:http'
import jwt from 'jsonwebtoken'

vi.mock('../../db/client.js', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
  },
}))

const { db } = await import('../../db/client.js')
const { resultsRouter } = await import('../results.js')
const { errorHandler } = await import('../../middleware/errorHandler.js')

const questionSelectResult = (rows) => ({
  from: () => ({ where: () => Promise.resolve(rows) }),
})

const listSelectResult = (rows) => ({
  from: () => ({
    leftJoin: () => ({
      where: () => ({ orderBy: () => Promise.resolve(rows) }),
    }),
  }),
})

const lastSelectResult = (rows) => ({
  from: () => ({
    where: () => ({
      orderBy: () => ({ limit: () => Promise.resolve(rows) }),
    }),
  }),
})

function insertResult(row) {
  return { values: () => ({ returning: () => Promise.resolve([row]) }) }
}

let server
let baseUrl
let token

beforeAll(async () => {
  process.env.JWT_SECRET = 'test-secret'
  token = jwt.sign({ id: 1, email: 'a@b.com' }, 'test-secret')
  const app = express()
  app.use(express.json())
  app.use('/results', resultsRouter)
  app.use(errorHandler)
  server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))
  baseUrl = `http://localhost:${server.address().port}`
})

afterAll(() => {
  server.close()
})

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

const questions = [
  { id: 1, options: [{ score: 0 }, { score: 1 }, { score: 2 }] },
  { id: 2, options: [{ score: 0 }, { score: 1 }, { score: 2 }] },
]

describe('POST /results', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ themeId: 'x', answers: {} }),
    })
    expect(res.status).toBe(401)
  })

  it('rejects missing themeId or answers', async () => {
    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ themeId: 'x' }),
    })
    expect(res.status).toBe(400)
  })

  it('rejects an unknown theme', async () => {
    db.select.mockReturnValue(questionSelectResult([]))

    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ themeId: 'x', answers: { 1: 1 } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/Тема не найдена/)
  })

  it('rejects answers that do not match the question count', async () => {
    db.select.mockReturnValue(questionSelectResult(questions))

    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ themeId: 'x', answers: { 1: 1 } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/не соответствуют/)
  })

  it('rejects an answer whose score is invalid for the question', async () => {
    db.select.mockReturnValue(questionSelectResult(questions))

    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ themeId: 'x', answers: { 1: 1, 2: 99 } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/Некорректный ответ/)
  })

  it('computes the score and saves the result', async () => {
    db.select.mockReturnValue(questionSelectResult(questions))
    db.insert.mockReturnValue(insertResult({ id: 10, userId: 1, themeId: 'x', score: 3 }))

    const res = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ themeId: 'x', answers: { 1: 1, 2: 2 } }),
    })
    const body = await res.json()

    expect(res.status).toBe(201)
    expect(body).toEqual({ id: 10, userId: 1, themeId: 'x', score: 3 })
  })
})

describe('GET /results', () => {
  it('returns the current user results', async () => {
    db.select.mockReturnValue(listSelectResult([{ id: 1, score: 5 }]))

    const res = await fetch(`${baseUrl}/results`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual([{ id: 1, score: 5 }])
  })
})

describe('GET /results/last', () => {
  it('returns null when there are no results', async () => {
    db.select.mockReturnValue(lastSelectResult([]))

    const res = await fetch(`${baseUrl}/results/last`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toBeNull()
  })

  it('returns the most recent result', async () => {
    db.select.mockReturnValue(lastSelectResult([{ id: 2, score: 7 }]))

    const res = await fetch(`${baseUrl}/results/last`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual({ id: 2, score: 7 })
  })
})
