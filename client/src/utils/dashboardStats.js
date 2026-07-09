export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
}

export function groupResultsByDate(results) {
  const byDate = new Map()
  for (const result of results) {
    const dateKey = new Date(result.createdAt).toLocaleDateString('sv-SE')
    if (!byDate.has(dateKey)) byDate.set(dateKey, [])
    byDate.get(dateKey).push(result)
  }
  return byDate
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

  const previousAttempt = results.length > 1 ? results[results.length - 2] : null
  const scoreDelta = previousAttempt ? lastAttempt.score - previousAttempt.score : null

  const averageBeforeLast =
    results.length > 1
      ? Math.round(
          results.slice(0, -1).reduce((sum, result) => sum + result.score, 0) / (results.length - 1)
        )
      : null
  const averageDelta = averageBeforeLast !== null ? averageScore - averageBeforeLast : null

  return {
    totalAttempts,
    averageScore,
    lastAttempt,
    favoriteTheme,
    scoreDelta,
    averageDelta,
  }
}
