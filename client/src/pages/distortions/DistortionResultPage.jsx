import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
      <div className="flex justify-center px-3 sm:px-5">
        <Card className="survey-card-width" style={{ height: '480px' }}>
          <CardContent className="flex flex-col justify-center items-center text-center h-full">
            <h1 className="card-title result-score-value mb-4">{attempt.scorePercent}%</h1>
            <p className="card-ink-text result-level-description mb-2">
              Правильно: {attempt.correctCount} · Неправильно: {attempt.incorrectCount} · Не уверен:{' '}
              {attempt.unsureCount}
            </p>
            <p className="card-ink-text result-level-description mb-4">
              Из {attempt.totalCount} карточек
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => navigate(`/distortions/${gameId}`)}>
                Пройти заново
              </Button>
              <Button variant="outline" onClick={() => navigate('/distortions')}>
                К списку игр
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default DistortionResultPage
