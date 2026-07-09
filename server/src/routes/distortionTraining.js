import { Router } from 'express'
import { asc, desc, eq, inArray } from 'drizzle-orm'
import { db } from '../db/client.js'
import {
  distortionTypes,
  distortionSituations,
  distortionOptions,
  distortionTrainingAttempts,
} from '../db/schema.js'
import { requireAuth } from '../middleware/auth.js'

export const distortionTrainingRouter = Router()

distortionTrainingRouter.get('/types', async (req, res, next) => {
  try {
    const rows = await db.select().from(distortionTypes).orderBy(asc(distortionTypes.nameRu))
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

distortionTrainingRouter.get('/situations', async (req, res, next) => {
  try {
    const { slug } = req.query

    const situations = slug
      ? await db
          .select()
          .from(distortionSituations)
          .where(eq(distortionSituations.distortionSlug, slug))
      : await db.select().from(distortionSituations)

    if (situations.length === 0) {
      return res.json([])
    }

    const options = await db
      .select()
      .from(distortionOptions)
      .where(
        inArray(
          distortionOptions.situationId,
          situations.map((situation) => situation.id)
        )
      )

    const optionsBySituation = new Map()
    for (const option of options) {
      const list = optionsBySituation.get(option.situationId) ?? []
      list.push(option)
      optionsBySituation.set(option.situationId, list)
    }

    const rows = situations.map((situation) => ({
      id: situation.id,
      distortionSlug: situation.distortionSlug,
      situationText: situation.situationText,
      options: (optionsBySituation.get(situation.id) ?? []).map((option) => ({
        id: option.id,
        optionText: option.optionText,
        score: option.score,
      })),
    }))

    res.json(rows)
  } catch (err) {
    next(err)
  }
})

distortionTrainingRouter.post('/attempts', requireAuth, async (req, res, next) => {
  try {
    const { distortionSlug, answers } = req.body

    if (!distortionSlug || typeof answers !== 'object' || answers === null) {
      return res.status(400).json({ error: 'distortionSlug и answers обязательны' })
    }

    const situationIds = Object.keys(answers).map(Number)
    if (situationIds.length === 0) {
      return res.status(400).json({ error: 'answers не может быть пустым' })
    }

    const situations = await db
      .select()
      .from(distortionSituations)
      .where(eq(distortionSituations.distortionSlug, distortionSlug))

    const situationsById = new Map(situations.map((situation) => [situation.id, situation]))

    if (
      situationIds.length !== situations.length ||
      !situationIds.every((id) => situationsById.has(id))
    ) {
      return res.status(400).json({ error: 'answers не соответствуют ситуациям этого типа' })
    }

    const options = await db
      .select()
      .from(distortionOptions)
      .where(inArray(distortionOptions.situationId, situationIds))

    const optionsById = new Map(options.map((option) => [option.id, option]))

    let totalScore = 0
    for (const situationId of situationIds) {
      const optionId = answers[situationId]
      const option = optionsById.get(optionId)
      if (!option || option.situationId !== situationId) {
        return res.status(400).json({ error: 'Некорректный вариант ответа на ситуацию' })
      }
      totalScore += option.score
    }

    const situationsCount = situationIds.length
    const maxScore = situationsCount * 2
    const scorePercent = Math.round((totalScore / maxScore) * 100)

    const [row] = await db
      .insert(distortionTrainingAttempts)
      .values({
        userId: req.user.id,
        distortionSlug,
        situationsCount,
        totalScore,
        maxScore,
        scorePercent,
      })
      .returning()

    res.status(201).json(row)
  } catch (err) {
    next(err)
  }
})

distortionTrainingRouter.get('/attempts', requireAuth, async (req, res, next) => {
  try {
    const rows = await db
      .select({
        id: distortionTrainingAttempts.id,
        distortionSlug: distortionTrainingAttempts.distortionSlug,
        typeName: distortionTypes.nameRu,
        situationsCount: distortionTrainingAttempts.situationsCount,
        totalScore: distortionTrainingAttempts.totalScore,
        maxScore: distortionTrainingAttempts.maxScore,
        scorePercent: distortionTrainingAttempts.scorePercent,
        createdAt: distortionTrainingAttempts.createdAt,
      })
      .from(distortionTrainingAttempts)
      .leftJoin(
        distortionTypes,
        eq(distortionTrainingAttempts.distortionSlug, distortionTypes.slug)
      )
      .where(eq(distortionTrainingAttempts.userId, req.user.id))
      .orderBy(desc(distortionTrainingAttempts.createdAt))

    res.json(rows)
  } catch (err) {
    next(err)
  }
})
