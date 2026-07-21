import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Layout from '../../components/layout/SurveyLayout'
import DistortionCard from '../../components/distortion/DistortionCard'
import DistortionOnboarding from '../../components/distortion/DistortionOnboarding'
import { fetchDistortionCards } from '../../api/distortionGames'
import { saveDistortionAttempt } from '../../api/distortionAttempts'

const ONBOARDING_STORAGE_KEY = 'distortionSwipeOnboardingSeen'

function DistortionGamePage() {
  const navigate = useNavigate()
  const { gameId } = useParams()

  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipes, setSwipes] = useState({})
  const [saving, setSaving] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem(ONBOARDING_STORAGE_KEY)
  )

  const handleOnboardingStart = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, '1')
    setShowOnboarding(false)
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    fetchDistortionCards(gameId)
      .then(setCards)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [gameId])

  const finish = async (finalSwipes) => {
    setSaving(true)
    try {
      const attempt = await saveDistortionAttempt({ gameId, swipes: finalSwipes })
      navigate(`/distortions/${gameId}/result`, { state: { attempt } })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const handleSwipe = (direction) => {
    const currentCard = cards[currentIndex]
    const nextSwipes = { ...swipes, [currentCard.id]: direction }
    setSwipes(nextSwipes)

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finish(nextSwipes)
    }
  }

  const progress = cards.length > 0 ? (currentIndex / cards.length) * 100 : 0

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-muted-foreground">Загрузка карточек...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="text-destructive text-center text-muted-foreground">{error}</p>
        <div className="text-center">
          <Button onClick={() => navigate('/distortions')}>
            Назад к списку игр
          </Button>
        </div>
      </Layout>
    )
  }

  if (showOnboarding) {
    return (
      <Layout>
        <DistortionOnboarding onStart={handleOnboardingStart} />
      </Layout>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <Layout
      progressBar={
        <div>
          <Progress value={progress} />
          <p className="text-center text-xs text-muted-foreground mt-2">
            {currentIndex + 1} / {cards.length}
          </p>
        </div>
      }
    >
      {currentCard && (
        <DistortionCard
          key={currentCard.id}
          thought={currentCard.thought}
          onSwipe={handleSwipe}
          disabled={saving}
        />
      )}
    </Layout>
  )
}

export default DistortionGamePage
