import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { distortionGames, distortionCards } from '../db/schema.js'
import { requireParam } from '../middleware/validate.js'

export const distortionGamesRouter = Router()

distortionGamesRouter.get('/', async (req, res, next) => {
  try {
    const rows = await db.select().from(distortionGames).orderBy(distortionGames.orderNumber)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

distortionGamesRouter.get('/:id/cards', requireParam('id'), async (req, res, next) => {
  try {
    const rows = await db
      .select()
      .from(distortionCards)
      .where(eq(distortionCards.gameId, req.params.id))
      .orderBy(distortionCards.cardNumber)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})
