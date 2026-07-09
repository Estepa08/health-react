import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchDistortionTypes, fetchDistortionTrainingAttempts } from '../../api/distortionTraining'
import { summarizeByType } from '../../utils/distortionStats'
import { formatDate } from '../../utils/dashboardStats'

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
    <Layout>
      <h4 className="text-center mb-4">Тренировка по искажениям</h4>
      {error && <p className="text-danger text-center text-meta">{error}</p>}
      <div className="row row-cols-1 row-cols-md-2 g-3 mx-0">
        {types.map((type) => {
          const progress = progressByType.get(type.slug)
          return (
            <div className="col" key={type.slug}>
              <div
                className="card card-material h-100"
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/training/${type.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    navigate(`/training/${type.slug}`)
                  }
                }}
              >
                <div className="card-body d-flex flex-column gap-2">
                  <h6 className="card-title theme-card-title mb-1">{type.nameRu}</h6>
                  {progress ? (
                    <p className="text-meta mb-0">
                      Пройдено раз: {progress.timesPlayed} · Последний результат:{' '}
                      {progress.lastPercent}% ({formatDate(progress.lastDate)})
                    </p>
                  ) : (
                    <p className="text-meta mb-0">Ещё не пройдено</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default TrainingTypesPage
