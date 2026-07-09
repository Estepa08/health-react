import { describe, it, expect } from 'vitest'
import { calculateScore } from '../calculateScore'

describe('calculateScore', () => {
  it('sums answer values', () => {
    expect(calculateScore({ q1: 2, q2: 3, q3: 1 })).toBe(6)
  })

  it('returns 0 for no answers', () => {
    expect(calculateScore({})).toBe(0)
  })
})
