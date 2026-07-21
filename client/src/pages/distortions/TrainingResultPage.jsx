import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
      <div className="flex justify-center px-3 sm:px-5">
        <Card className="survey-card-width" style={{ height: '480px' }}>
          <CardContent className="flex flex-col justify-center items-center text-center">
            <h1 className="result-score-value mb-4">{attempt.scorePercent}%</h1>
            <p className="card-ink-text result-level-description mb-4">
              {attempt.totalScore} из {attempt.maxScore} баллов · {attempt.situationsCount} ситуаций
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => navigate(`/training/${slug}`)}>
                Пройти заново
              </Button>
              <Button variant="outline" onClick={() => navigate('/training')}>
                К списку тренировок
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default TrainingResultPage
