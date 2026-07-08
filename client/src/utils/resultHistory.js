function storageKey() {
  const token = localStorage.getItem('token')
  return token ? `lastResult_${token}` : null
}

export function saveLastResult({ themeId, totalScore }) {
  const key = storageKey()
  if (!key) return
  localStorage.setItem(key, JSON.stringify({ themeId, totalScore, timestamp: Date.now() }))
}

export function getLastResult() {
  const key = storageKey()
  if (!key) return null
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
