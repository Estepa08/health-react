import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchQuestions } from '../questions'

describe('fetchQuestions', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('maps rows into prompt/options shape on success', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            question: 'Как дела?',
            options: [{ label: 'Хорошо', score: 1 }],
          },
        ]),
    })
    const result = await fetchQuestions('theme-1')
    expect(result).toEqual([
      { id: 1, prompt: 'Как дела?', options: [{ label: 'Хорошо', value: 1 }] },
    ])
  })

  it('throws on failure', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchQuestions('theme-1')).rejects.toThrow('Не удалось загрузить вопросы')
  })

  it('rejects unsafe themeId', async () => {
    await expect(fetchQuestions('../etc')).rejects.toThrow('Некорректный идентификатор')
  })
})
