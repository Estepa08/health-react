import { describe, it, expect, vi } from 'vitest'
import { requireParam } from '../validate.js'

function mockRes() {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('requireParam', () => {
  it('calls next when the param is present', () => {
    const req = { params: { id: '42' } }
    const res = mockRes()
    const next = vi.fn()

    requireParam('id')(req, res, next)

    expect(next).toHaveBeenCalledOnce()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('responds 400 when the param is missing', () => {
    const req = { params: {} }
    const res = mockRes()
    const next = vi.fn()

    requireParam('id')(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required parameter: id' })
  })
})
