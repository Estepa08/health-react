import { assertSafeUrlSegment } from '../utils/assertSafeUrlSegment'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchQuestions(themeId) {
  const res = await fetch(`${API_URL}/api/themes/${assertSafeUrlSegment(themeId)}/questions`)
  if (!res.ok) throw new Error('Не удалось загрузить вопросы')
  const rows = await res.json()
  return rows.map((row) => ({
    id: row.id,
    prompt: row.question,
    options: row.options.map((option) => ({ label: option.label, value: option.score })),
  }))
}
