import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchDistortionTypes, fetchDistortionTrainingAttempts } from '../../api/distortionTraining'
import { summarizeByType } from '../../utils/distortionStats'

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
      {error && <p className="text-danger text-center text-meta">{error}</p>}
      <div className="list-card-grid-container">
        {types.map((type) => {
          const progress = progressByType.get(type.slug)
          return (
            <div
              className="card card-material list-card list-card-grid"
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
              <div className="card-body d-flex flex-column gap-2">
                <h6 className="card-title theme-card-title mb-1 list-card-title">{type.nameRu}</h6>
                <p className="text-meta mb-0 mt-auto list-card-progress">
                  {progress ? `Пройдено: ${progress.timesPlayed} раз` : 'Ещё не пройдено'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default TrainingTypesPage
