const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchResultLevels() {
  const res = await fetch(`${API_URL}/api/result-levels`)
  if (!res.ok) throw new Error('Не удалось загрузить уровни результата')
  return res.json()
}
