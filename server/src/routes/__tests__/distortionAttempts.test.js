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
const { distortionAttemptsRouter } = await import('../distortionAttempts.js')
const { errorHandler } = await import('../../middleware/errorHandler.js')

const cardSelectResult = (rows) => ({
  from: () => ({ where: () => Promise.resolve(rows) }),
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
  app.use('/distortion-attempts', distortionAttemptsRouter)
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

const cards = [
  { id: 1, isDistorted: true },
  { id: 2, isDistorted: false },
  { id: 3, isDistorted: true },
]

describe('POST /distortion-attempts', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: 1, swipes: {} }),
    })
    expect(res.status).toBe(401)
  })

  it('rejects missing gameId or swipes', async () => {
    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1 }),
    })
    expect(res.status).toBe(400)
  })

  it('rejects an unknown game', async () => {
    db.select.mockReturnValue(cardSelectResult([]))

    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1, swipes: { 1: 'left' } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/Игра не найдена/)
  })

  it('rejects swipes that do not match the card count', async () => {
    db.select.mockReturnValue(cardSelectResult(cards))

    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1, swipes: { 1: 'left' } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/не соответствуют/)
  })

  it('rejects an invalid swipe direction', async () => {
    db.select.mockReturnValue(cardSelectResult(cards))

    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1, swipes: { 1: 'left', 2: 'up', 3: 'left' } }),
    })
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toMatch(/Некорректный свайп/)
  })

  it('computes correct/incorrect/unsure counts and score percent', async () => {
    db.select.mockReturnValue(cardSelectResult(cards))
    let savedValues
    db.insert.mockImplementation(() => ({
      values: (values) => {
        savedValues = values
        return { returning: () => Promise.resolve([{ id: 5, ...values }]) }
      },
    }))

    // card 1 isDistorted:true, swipe left (agreed=true) => correct
    // card 2 isDistorted:false, swipe right (agreed=false) => correct
    // card 3 isDistorted:true, swipe down => unsure
    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1, swipes: { 1: 'left', 2: 'right', 3: 'down' } }),
    })
    const body = await res.json()

    expect(res.status).toBe(201)
    expect(savedValues).toMatchObject({
      correctCount: 2,
      incorrectCount: 0,
      unsureCount: 1,
      totalCount: 3,
      scorePercent: 100,
    })
    expect(body.id).toBe(5)
  })

  it('returns 0% score when every card is unsure', async () => {
    db.select.mockReturnValue(cardSelectResult(cards))
    let savedValues
    db.insert.mockImplementation(() => ({
      values: (values) => {
        savedValues = values
        return { returning: () => Promise.resolve([{ id: 6, ...values }]) }
      },
    }))

    await fetch(`${baseUrl}/distortion-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameId: 1, swipes: { 1: 'down', 2: 'down', 3: 'down' } }),
    })

    expect(savedValues.scorePercent).toBe(0)
    expect(savedValues.unsureCount).toBe(3)
  })
})

describe('GET /distortion-attempts', () => {
  it('returns the current user attempts', async () => {
    db.select.mockReturnValue({
      from: () => ({
        leftJoin: () => ({
          where: () => ({ orderBy: () => Promise.resolve([{ id: 1, scorePercent: 80 }]) }),
        }),
      }),
    })

    const res = await fetch(`${baseUrl}/distortion-attempts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual([{ id: 1, scorePercent: 80 }])
  })
})
