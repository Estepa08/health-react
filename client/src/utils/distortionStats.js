import { formatDate } from './dashboardStats'

export function summarizeByGame(attempts) {
  const byGame = new Map()
  for (const attempt of attempts) {
    byGame.set(attempt.gameId, {
      timesPlayed: (byGame.get(attempt.gameId)?.timesPlayed ?? 0) + 1,
      lastPercent: attempt.scorePercent,
      lastDate: attempt.createdAt,
    })
  }
  return byGame
}

export function groupByGame(attempts) {
  const byGame = new Map()
  for (const attempt of attempts) {
    if (!byGame.has(attempt.gameId)) {
      byGame.set(attempt.gameId, { gameTitle: attempt.gameTitle, points: [] })
    }
    byGame.get(attempt.gameId).points.push({
      date: formatDate(attempt.createdAt),
      score: attempt.scorePercent,
    })
  }
  return Array.from(byGame.values())
}
