import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchDistortionTypes, fetchDistortionTrainingAttempts } from '../../api/distortionTraining'
import { summarizeByType } from '../../utils/distortionStats'
import { Card, CardContent } from '@/components/ui/card'

function TrainingTypesPage() {
  const navigate = useNavigate()
  const [types, setTypes] = useState([])
  const [progressByType, setProgressByType] = useState(new Map())
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    fetchDistortionTypes()
      .then(setTypes)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    fetchDistortionTrainingAttempts()
      .then((attempts) => setProgressByType(summarizeByType(attempts)))
      .catch(() => setProgressByType(new Map()))
  }, [])

  return (
    <Layout wide>
      <h4 className="text-center mb-4">Тренировка по искажениям</h4>
      {error && <p className="text-destructive text-center text-muted-foreground">{error}</p>}
      <div className="list-card-grid-container">
        {types.map((type) => {
          const progress = progressByType.get(type.slug)
          return (
            <Card
              className="card-material list-card list-card-grid"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              key={type.slug}
              onClick={() => navigate(`/training/${type.slug}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/training/${type.slug}`)
                }
              }}
            >
              <CardContent className="flex flex-col gap-2">
                <h6 className="theme-card-title mb-1 list-card-title">{type.nameRu}</h6>
                <p className="text-muted-foreground mb-0 mt-auto list-card-progress">
                  {progress ? `Пройдено: ${progress.timesPlayed} раз` : 'Ещё не пройдено'}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Layout>
  )
}

export default TrainingTypesPage
