import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { themes, questions } from '../db/schema.js'
import { requireParam } from '../middleware/validate.js'

export const themesRouter = Router()

themesRouter.get('/', async (req, res, next) => {
  try {
    const rows = await db.select().from(themes)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

themesRouter.get('/:id/questions', requireParam('id'), async (req, res, next) => {
  try {
    const rows = await db
      .select()
      .from(questions)
      .where(eq(questions.themeId, req.params.id))
      .orderBy(questions.questionNumber)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})
