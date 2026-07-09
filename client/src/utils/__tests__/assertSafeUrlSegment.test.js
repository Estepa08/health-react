import { describe, it, expect } from 'vitest'
import { assertSafeUrlSegment } from '../assertSafeUrlSegment'

describe('assertSafeUrlSegment', () => {
  it('returns the value when it is a safe segment', () => {
    expect(assertSafeUrlSegment('abc-123_XYZ')).toBe('abc-123_XYZ')
  })

  it('throws for non-string values', () => {
    expect(() => assertSafeUrlSegment(123)).toThrow('Некорректный идентификатор')
  })

  it('throws for values with path separators', () => {
    expect(() => assertSafeUrlSegment('../etc/passwd')).toThrow('Некорректный идентификатор')
  })

  it('throws for empty string', () => {
    expect(() => assertSafeUrlSegment('')).toThrow('Некорректный идентификатор')
  })
})
