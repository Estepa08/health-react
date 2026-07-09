import { describe, it, expect } from 'vitest'
import { calculateScore } from '../calculateScore.js'

describe('calculateScore', () => {
  it('sums the values of the answers object', () => {
    expect(calculateScore({ 1: 2, 2: 3, 3: 1 })).toBe(6)
  })

  it('returns 0 for an empty answers object', () => {
    expect(calculateScore({})).toBe(0)
  })

  it('handles negative and zero values', () => {
    expect(calculateScore({ 1: -2, 2: 0, 3: 5 })).toBe(3)
  })
})
