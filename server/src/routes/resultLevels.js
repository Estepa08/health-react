import { Router } from 'express'
import { db } from '../db/client.js'
import { resultLevels } from '../db/schema.js'

export const resultLevelsRouter = Router()

resultLevelsRouter.get('/', async (req, res, next) => {
  try {
    const rows = await db.select().from(resultLevels)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})
