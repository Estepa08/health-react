import { describe, it, expect, vi, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../auth.js'

function mockRes() {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('requireAuth', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret'
  })

  it('rejects requests with no authorization header', () => {
    const req = { headers: {} }
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Требуется авторизация' })
    expect(next).not.toHaveBeenCalled()
  })

  it('rejects requests with a malformed authorization header', () => {
    const req = { headers: { authorization: 'Token abc' } }
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  it('rejects requests with an invalid token', () => {
    const req = { headers: { authorization: 'Bearer not-a-real-token' } }
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Недействительный токен' })
    expect(next).not.toHaveBeenCalled()
  })

  it('attaches the decoded payload and calls next for a valid token', () => {
    const token = jwt.sign({ id: 1, email: 'a@b.com' }, process.env.JWT_SECRET)
    const req = { headers: { authorization: `Bearer ${token}` } }
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(next).toHaveBeenCalledOnce()
    expect(req.user).toMatchObject({ id: 1, email: 'a@b.com' })
    expect(res.status).not.toHaveBeenCalled()
  })
})
