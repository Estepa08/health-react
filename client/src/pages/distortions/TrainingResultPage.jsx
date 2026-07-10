import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'

function TrainingResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const attempt = location.state?.attempt

  useEffect(() => {
    if (!attempt) {
      navigate(`/training/${slug}`, { replace: true })
    }
  }, [attempt, slug, navigate])

  if (!attempt) return null

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div className="card survey-card-width card-min-height-480">
          <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="card-title result-score-value mb-4">{attempt.scorePercent}%</h1>
            <p className="card-ink-text result-level-description mb-4">
              {attempt.totalScore} из {attempt.maxScore} баллов · {attempt.situationsCount} ситуаций
            </p>
            <div className="d-flex flex-column gap-2 w-100">
              <button className="btn btn-primary" onClick={() => navigate(`/training/${slug}`)}>
                Пройти заново
              </button>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/training')}>
                К списку тренировок
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TrainingResultPage
