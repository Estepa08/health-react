import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sanitizeUser, register, login, getMe } from '../auth'

describe('sanitizeUser', () => {
  it('returns null for non-object input', () => {
    expect(sanitizeUser(null)).toBeNull()
    expect(sanitizeUser(undefined)).toBeNull()
    expect(sanitizeUser('string')).toBeNull()
  })

  it('picks only id/name/email and coerces them', () => {
    expect(sanitizeUser({ id: 1, name: 'Женя', email: 'a@b.com', password: 'secret' })).toEqual({
      id: 1,
      name: 'Женя',
      email: 'a@b.com',
    })
  })

  it('strips angle brackets from name and email', () => {
    expect(
      sanitizeUser({ id: 2, name: '<script>alert(1)</script>', email: '<a>x@y.com</a>' })
    ).toEqual({
      id: 2,
      name: 'scriptalert(1)/script',
      email: 'ax@y.com/a',
    })
  })

  it('falls back to null id when id is not a finite number', () => {
    expect(sanitizeUser({ id: 'not-a-number', name: 'A', email: 'a@b.com' })).toEqual({
      id: null,
      name: 'A',
      email: 'a@b.com',
    })
  })

  it('defaults missing name/email to empty strings', () => {
    expect(sanitizeUser({ id: 3 })).toEqual({ id: 3, name: '', email: '' })
  })
})

describe('auth api calls', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('register returns data on success', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 't', user: { id: 1 } }),
    })
    const result = await register({ name: 'A', email: 'a@b.com', password: 'pw' })
    expect(result).toEqual({ token: 't', user: { id: 1 } })
  })

  it('register throws server error message on failure', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Email занят' }),
    })
    await expect(register({ name: 'A', email: 'a@b.com', password: 'pw' })).rejects.toThrow(
      'Email занят'
    )
  })

  it('login returns data on success', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 't', user: { id: 1 } }),
    })
    const result = await login({ email: 'a@b.com', password: 'pw' })
    expect(result).toEqual({ token: 't', user: { id: 1 } })
  })

  it('login throws fallback message when server gives none', async () => {
    global.fetch.mockResolvedValue({ ok: false, json: () => Promise.resolve({}) })
    await expect(login({ email: 'a@b.com', password: 'pw' })).rejects.toThrow('Не удалось войти')
  })

  it('getMe returns data on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ user: { id: 1 } }) })
    const result = await getMe('token123')
    expect(result).toEqual({ user: { id: 1 } })
  })

  it('getMe throws on invalid token', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(getMe('bad-token')).rejects.toThrow('Недействительный токен')
  })
})
