import { Router } from 'express'
import { isNull, or, eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { resultLevels } from '../db/schema.js'

export const resultLevelsRouter = Router()

resultLevelsRouter.get('/', async (req, res, next) => {
  try {
    const { themeId } = req.query

    const rows = await db
      .select()
      .from(resultLevels)
      .where(themeId ? or(eq(resultLevels.themeId, themeId), isNull(resultLevels.themeId)) : undefined)

    if (themeId) {
      const themeSpecific = rows.filter((row) => row.themeId === themeId)
      return res.json(themeSpecific.length > 0 ? themeSpecific : rows.filter((row) => row.themeId === null))
    }

    res.json(rows)
  } catch (err) {
    next(err)
  }
})
