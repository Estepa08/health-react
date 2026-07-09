import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { errorHandler } from '../errorHandler.js'

function mockRes() {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('errorHandler', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('uses the error status and message when provided', () => {
    const res = mockRes()
    const err = Object.assign(new Error('Тема не найдена'), { status: 404 })

    errorHandler(err, {}, res, vi.fn())

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Тема не найдена' })
  })

  it('defaults to 500 and a generic message when none provided', () => {
    const res = mockRes()

    errorHandler(new Error(), {}, res, vi.fn())

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
  })
})
