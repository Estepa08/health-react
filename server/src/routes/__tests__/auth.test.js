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
const { authRouter } = await import('../auth.js')
const { errorHandler } = await import('../../middleware/errorHandler.js')

function selectResult(rows) {
  return { from: () => ({ where: () => Promise.resolve(rows) }) }
}

function insertResult(row) {
  return { values: () => ({ returning: () => Promise.resolve([row]) }) }
}

let server
let baseUrl

beforeAll(async () => {
  process.env.JWT_SECRET = 'test-secret'
  const app = express()
  app.use(express.json())
  app.use('/auth', authRouter)
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

describe('POST /auth/register', () => {
  it('rejects missing fields', async () => {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A' }),
    })

    expect(res.status).toBe(400)
  })

  it('rejects a duplicate email', async () => {
    db.select.mockReturnValue(selectResult([{ id: 1, email: 'a@b.com' }]))

    const res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'a@b.com', password: 'secret123' }),
    })
    const body = await res.json()

    expect(res.status).toBe(409)
    expect(body.error).toMatch(/уже существует/)
  })

  it('creates a user and returns a token', async () => {
    db.select.mockReturnValue(selectResult([]))
    db.insert.mockReturnValue(insertResult({ id: 1, name: 'A', email: 'a@b.com' }))

    const res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'a@b.com', password: 'secret123' }),
    })
    const body = await res.json()

    expect(res.status).toBe(201)
    expect(body.user).toEqual({ id: 1, name: 'A', email: 'a@b.com' })
    expect(jwt.verify(body.token, 'test-secret')).toMatchObject({ id: 1, email: 'a@b.com' })
  })
})

describe('POST /auth/login', () => {
  it('rejects missing fields', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com' }),
    })

    expect(res.status).toBe(400)
  })

  it('rejects an unknown email', async () => {
    db.select.mockReturnValue(selectResult([]))

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com', password: 'secret123' }),
    })
    const body = await res.json()

    expect(res.status).toBe(401)
    expect(body.error).toMatch(/Неверный/)
  })

  it('rejects a wrong password', async () => {
    const bcrypt = (await import('bcryptjs')).default
    const passwordHash = await bcrypt.hash('correct-password', 10)
    db.select.mockReturnValue(selectResult([{ id: 1, email: 'a@b.com', passwordHash }]))

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com', password: 'wrong-password' }),
    })

    expect(res.status).toBe(401)
  })

  it('logs in with correct credentials', async () => {
    const bcrypt = (await import('bcryptjs')).default
    const passwordHash = await bcrypt.hash('correct-password', 10)
    db.select.mockReturnValue(
      selectResult([{ id: 1, name: 'A', email: 'a@b.com', passwordHash }]),
    )

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.com', password: 'correct-password' }),
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.user).toEqual({ id: 1, name: 'A', email: 'a@b.com' })
  })
})

describe('GET /auth/me', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await fetch(`${baseUrl}/auth/me`)
    expect(res.status).toBe(401)
  })

  it('returns the current user for a valid token', async () => {
    db.select.mockReturnValue(selectResult([{ id: 1, name: 'A', email: 'a@b.com' }]))
    const token = jwt.sign({ id: 1, email: 'a@b.com' }, 'test-secret')

    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.user).toEqual({ id: 1, name: 'A', email: 'a@b.com' })
  })

  it('returns 401 when the user no longer exists', async () => {
    db.select.mockReturnValue(selectResult([]))
    const token = jwt.sign({ id: 1, email: 'a@b.com' }, 'test-secret')

    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    expect(res.status).toBe(401)
  })
})
