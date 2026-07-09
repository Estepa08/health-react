const SAFE_URL_SEGMENT = /^[a-zA-Z0-9_-]+$/

export function assertSafeUrlSegment(value) {
  if (typeof value !== 'string' || !SAFE_URL_SEGMENT.test(value)) {
    throw new Error('Некорректный идентификатор')
  }
  return value
}
