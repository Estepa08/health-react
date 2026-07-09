import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { themesRouter } from './routes/themes.js'
import { resultLevelsRouter } from './routes/resultLevels.js'
import { authRouter } from './routes/auth.js'
import { resultsRouter } from './routes/results.js'
import { distortionGamesRouter } from './routes/distortionGames.js'
import { distortionAttemptsRouter } from './routes/distortionAttempts.js'
import { distortionTrainingRouter } from './routes/distortionTraining.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

app.use('/api/themes', themesRouter)
app.use('/api/result-levels', resultLevelsRouter)
app.use('/api/auth', authRouter)
app.use('/api/results', resultsRouter)
app.use('/api/distortion-games', distortionGamesRouter)
app.use('/api/distortion-attempts', distortionAttemptsRouter)
app.use('/api/distortion-training', distortionTrainingRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
