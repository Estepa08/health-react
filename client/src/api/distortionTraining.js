import { assertSafeUrlSegment } from '../utils/assertSafeUrlSegment'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchDistortionTypes() {
  const res = await fetch(`${API_URL}/api/distortion-training/types`)
  if (!res.ok) throw new Error('Не удалось загрузить список искажений')
  return res.json()
}

export async function fetchDistortionSituations(slug) {
  const res = await fetch(
    `${API_URL}/api/distortion-training/situations?slug=${assertSafeUrlSegment(slug)}`
  )
  if (!res.ok) throw new Error('Не удалось загрузить ситуации')
  return res.json()
}

export async function saveDistortionTrainingAttempt({ distortionSlug, answers }) {
  const res = await fetch(`${API_URL}/api/distortion-training/attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ distortionSlug, answers }),
  })
  if (!res.ok) throw new Error('Не удалось сохранить результат тренировки')
  return res.json()
}

export async function fetchDistortionTrainingAttempts() {
  const res = await fetch(`${API_URL}/api/distortion-training/attempts`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Не удалось загрузить историю тренировок')
  return res.json()
}
