const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function saveResult({ themeId, answers }) {
  const res = await fetch(`${API_URL}/api/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ themeId, answers }),
  })
  if (!res.ok) throw new Error('Не удалось сохранить результат')
  return res.json()
}

export async function fetchResults() {
  const res = await fetch(`${API_URL}/api/results`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить историю результатов')
  return res.json()
}

export async function fetchLastResult() {
  const res = await fetch(`${API_URL}/api/results/last`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить результат')
  return res.json()
}
