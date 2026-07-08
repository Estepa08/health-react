import { Router } from 'express'
import { desc, eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { results, questions } from '../db/schema.js'
import { requireAuth } from '../middleware/auth.js'
import { calculateScore } from '../utils/calculateScore.js'

export const resultsRouter = Router()

resultsRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const { themeId, answers } = req.body

    if (!themeId || typeof answers !== 'object' || answers === null) {
      return res.status(400).json({ error: 'themeId и answers обязательны' })
    }

    const themeQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.themeId, themeId))

    if (themeQuestions.length === 0) {
      return res.status(400).json({ error: 'Тема не найдена' })
    }

    const answeredIds = Object.keys(answers).map(Number)
    if (answeredIds.length !== themeQuestions.length) {
      return res.status(400).json({ error: 'Ответы не соответствуют вопросам темы' })
    }

    for (const question of themeQuestions) {
      const value = answers[question.id]
      const validScores = question.options.map((option) => option.score)
      if (!Number.isInteger(value) || !validScores.includes(value)) {
        return res.status(400).json({ error: 'Некорректный ответ на вопрос' })
      }
    }

    const score = calculateScore(answers)

    const [row] = await db.insert(results).values({ userId: req.user.id, themeId, score }).returning()

    res.status(201).json(row)
  } catch (err) {
    next(err)
  }
})

resultsRouter.get('/last', requireAuth, async (req, res, next) => {
  try {
    const [row] = await db
      .select()
      .from(results)
      .where(eq(results.userId, req.user.id))
      .orderBy(desc(results.createdAt))
      .limit(1)

    res.json(row ?? null)
  } catch (err) {
    next(err)
  }
})
