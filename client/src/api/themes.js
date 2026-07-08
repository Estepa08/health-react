const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchThemes() {
  const res = await fetch(`${API_URL}/api/themes`)
  if (!res.ok) throw new Error('Не удалось загрузить темы')
  return res.json()
}
