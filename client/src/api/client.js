const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchThemes() {
  const res = await fetch(`${API_URL}/api/themes`)
  if (!res.ok) throw new Error('Не удалось загрузить темы')
  return res.json()
}

export async function register({ name, email, password }) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Не удалось зарегистрироваться')
  return data
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Не удалось войти')
  return data
}

export async function fetchQuestions(themeId) {
  const res = await fetch(`${API_URL}/api/themes/${themeId}/questions`)
  if (!res.ok) throw new Error('Не удалось загрузить вопросы')
  const rows = await res.json()
  return rows.map((row) => ({
    id: row.id,
    prompt: row.question,
    options: row.options.map((label, value) => ({ label, value })),
  }))
}
