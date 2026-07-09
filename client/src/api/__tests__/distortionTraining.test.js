import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fetchDistortionTypes,
  fetchDistortionSituations,
  saveDistortionTrainingAttempt,
  fetchDistortionTrainingAttempts,
} from '../distortionTraining'

function createMemoryStorage() {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
}

describe('distortionTraining api', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('fetchDistortionTypes returns json on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([{ slug: 'x' }]) })
    const result = await fetchDistortionTypes()
    expect(result).toEqual([{ slug: 'x' }])
  })

  it('fetchDistortionTypes throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchDistortionTypes()).rejects.toThrow('Не удалось загрузить список искажений')
  })

  it('fetchDistortionSituations returns json on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([{ id: 1 }]) })
    const result = await fetchDistortionSituations('slug-1')
    expect(result).toEqual([{ id: 1 }])
  })

  it('fetchDistortionSituations rejects unsafe slug', async () => {
    await expect(fetchDistortionSituations('../etc')).rejects.toThrow('Некорректный идентификатор')
  })

  it('saveDistortionTrainingAttempt sends auth header when token present', async () => {
    localStorage.setItem('token', 'abc')
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 1 }) })
    await saveDistortionTrainingAttempt({ distortionSlug: 's', answers: [] })
    const [, options] = global.fetch.mock.calls[0]
    expect(options.headers.Authorization).toBe('Bearer abc')
  })

  it('saveDistortionTrainingAttempt throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(
      saveDistortionTrainingAttempt({ distortionSlug: 's', answers: [] })
    ).rejects.toThrow('Не удалось сохранить результат тренировки')
  })

  it('fetchDistortionTrainingAttempts returns json on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([{ id: 2 }]) })
    const result = await fetchDistortionTrainingAttempts()
    expect(result).toEqual([{ id: 2 }])
  })

  it('fetchDistortionTrainingAttempts throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchDistortionTrainingAttempts()).rejects.toThrow(
      'Не удалось загрузить историю тренировок'
    )
  })
})
