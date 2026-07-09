const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function sanitizeUser(user) {
  if (!user || typeof user !== 'object') return null
  const { id, name, email } = user
  return { id, name: String(name ?? ''), email: String(email ?? '') }
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

export async function getMe(token) {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Недействительный токен')
  return res.json()
}
