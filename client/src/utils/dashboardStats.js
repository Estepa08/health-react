export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
}

export function groupByTheme(results) {
  const byTheme = new Map()
  for (const result of results) {
    if (!byTheme.has(result.themeId)) {
      byTheme.set(result.themeId, { themeTitle: result.themeTitle, points: [] })
    }
    byTheme.get(result.themeId).points.push({
      date: formatDate(result.createdAt),
      score: result.score,
    })
  }
  return Array.from(byTheme.values())
}

export function computeStats(results) {
  if (!results || results.length === 0) return null

  const totalAttempts = results.length
  const averageScore = Math.round(
    results.reduce((sum, result) => sum + result.score, 0) / totalAttempts
  )
  const lastAttempt = results[results.length - 1]

  const countByTheme = new Map()
  for (const result of results) {
    countByTheme.set(result.themeTitle, (countByTheme.get(result.themeTitle) ?? 0) + 1)
  }
  const favoriteTheme = Array.from(countByTheme.entries()).sort((a, b) => b[1] - a[1])[0][0]

  return { totalAttempts, averageScore, lastAttempt, favoriteTheme }
}
