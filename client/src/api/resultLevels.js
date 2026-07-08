const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchResultLevels(themeId) {
  const url = themeId
    ? `${API_URL}/api/result-levels?themeId=${encodeURIComponent(themeId)}`
    : `${API_URL}/api/result-levels`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Не удалось загрузить уровни результата')
  return res.json()
}
