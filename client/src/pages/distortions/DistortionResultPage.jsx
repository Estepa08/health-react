import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'

function DistortionResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { gameId } = useParams()
  const attempt = location.state?.attempt

  useEffect(() => {
    if (!attempt) {
      navigate(`/distortions/${gameId}`, { replace: true })
    }
  }, [attempt, gameId, navigate])

  if (!attempt) return null

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div className="card survey-card-width" style={{ height: '480px' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="card-title result-score-value mb-4">{attempt.scorePercent}%</h1>
            <p className="card-ink-text result-level-description mb-2">
              Правильно: {attempt.correctCount} · Неправильно: {attempt.incorrectCount} · Не уверен:{' '}
              {attempt.unsureCount}
            </p>
            <p className="card-ink-text result-level-description mb-4">
              Из {attempt.totalCount} карточек
            </p>
            <div className="d-flex flex-column gap-2 w-100">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/distortions/${gameId}`)}
              >
                Пройти заново
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate('/distortions')}
              >
                К списку игр
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DistortionResultPage
