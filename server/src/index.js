import 'dotenv/config'
import express from 'express'
import { themesRouter } from './routes/themes.js'
import { resultLevelsRouter } from './routes/resultLevels.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/themes', themesRouter)
app.use('/api/result-levels', resultLevelsRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
