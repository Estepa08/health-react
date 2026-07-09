import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchDistortionGames, fetchDistortionCards } from '../distortionGames'

describe('distortionGames api', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchDistortionGames returns json on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([{ id: 1 }]) })
    const result = await fetchDistortionGames()
    expect(result).toEqual([{ id: 1 }])
  })

  it('fetchDistortionGames throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchDistortionGames()).rejects.toThrow('Не удалось загрузить список игр')
  })

  it('fetchDistortionCards returns json on success', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([{ id: 'a' }]) })
    const result = await fetchDistortionCards('game-1')
    expect(result).toEqual([{ id: 'a' }])
  })

  it('fetchDistortionCards throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchDistortionCards('game-1')).rejects.toThrow('Не удалось загрузить карточки')
  })

  it('fetchDistortionCards rejects unsafe gameId', async () => {
    await expect(fetchDistortionCards('../etc')).rejects.toThrow('Некорректный идентификатор')
  })
})
