const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function saveDistortionAttempt({ gameId, swipes }) {
  const res = await fetch(`${API_URL}/api/distortion-attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ gameId, swipes }),
  })
  if (!res.ok) throw new Error('Не удалось сохранить результат')
  return res.json()
}

export async function fetchDistortionAttempts() {
  const res = await fetch(`${API_URL}/api/distortion-attempts`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить историю попыток')
  return res.json()
}
