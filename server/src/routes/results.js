import { Router } from 'express'
import { desc, eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { results } from '../db/schema.js'
import { requireAuth } from '../middleware/auth.js'

export const resultsRouter = Router()

resultsRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const { themeId, score } = req.body

    if (!themeId || typeof score !== 'number') {
      return res.status(400).json({ error: 'themeId и score обязательны' })
    }

    const [row] = await db
      .insert(results)
      .values({ userId: req.user.id, themeId, score })
      .returning()

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
