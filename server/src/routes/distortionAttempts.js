import { Router } from 'express'
import { asc, eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { distortionAttempts, distortionCards, distortionGames } from '../db/schema.js'
import { requireAuth } from '../middleware/auth.js'

export const distortionAttemptsRouter = Router()

distortionAttemptsRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const { gameId, swipes } = req.body

    if (!gameId || typeof swipes !== 'object' || swipes === null) {
      return res.status(400).json({ error: 'gameId и swipes обязательны' })
    }

    const gameCards = await db
      .select()
      .from(distortionCards)
      .where(eq(distortionCards.gameId, gameId))

    if (gameCards.length === 0) {
      return res.status(400).json({ error: 'Игра не найдена' })
    }

    const answeredIds = Object.keys(swipes).map(Number)
    if (answeredIds.length !== gameCards.length) {
      return res.status(400).json({ error: 'Свайпы не соответствуют карточкам игры' })
    }

    let correctCount = 0
    let incorrectCount = 0
    let unsureCount = 0

    for (const card of gameCards) {
      const direction = swipes[card.id]
      if (!['left', 'right', 'down'].includes(direction)) {
        return res.status(400).json({ error: 'Некорректный свайп на карточке' })
      }

      if (direction === 'down') {
        unsureCount += 1
        continue
      }

      const agreed = direction === 'left'
      const isCorrect = agreed === card.isDistorted
      if (isCorrect) correctCount += 1
      else incorrectCount += 1
    }

    const totalCount = gameCards.length
    const decidedCount = correctCount + incorrectCount
    const scorePercent = decidedCount > 0 ? Math.round((correctCount / decidedCount) * 100) : 0

    const [row] = await db
      .insert(distortionAttempts)
      .values({
        userId: req.user.id,
        gameId,
        correctCount,
        incorrectCount,
        unsureCount,
        totalCount,
        scorePercent,
      })
      .returning()

    res.status(201).json(row)
  } catch (err) {
    next(err)
  }
})

distortionAttemptsRouter.get('/', requireAuth, async (req, res, next) => {
  try {
    const rows = await db
      .select({
        id: distortionAttempts.id,
        gameId: distortionAttempts.gameId,
        gameTitle: distortionGames.title,
        correctCount: distortionAttempts.correctCount,
        incorrectCount: distortionAttempts.incorrectCount,
        unsureCount: distortionAttempts.unsureCount,
        totalCount: distortionAttempts.totalCount,
        scorePercent: distortionAttempts.scorePercent,
        createdAt: distortionAttempts.createdAt,
      })
      .from(distortionAttempts)
      .leftJoin(distortionGames, eq(distortionAttempts.gameId, distortionGames.id))
      .where(eq(distortionAttempts.userId, req.user.id))
      .orderBy(asc(distortionAttempts.createdAt))

    res.json(rows)
  } catch (err) {
    next(err)
  }
})
