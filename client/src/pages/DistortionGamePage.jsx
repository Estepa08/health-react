import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import DistortionCard from '../components/DistortionCard'
import { fetchDistortionCards } from '../api/distortionGames'
import { saveDistortionAttempt } from '../api/distortionAttempts'

function DistortionGamePage() {
  const navigate = useNavigate()
  const { gameId } = useParams()

  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipes, setSwipes] = useState({})
  const [saving, setSaving] = useState(false)

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
        <p className="text-center text-meta">Загрузка карточек...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="text-danger text-center text-meta">{error}</p>
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => navigate('/distortions')}>
            Назад к списку игр
          </button>
        </div>
      </Layout>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <Layout
      progressBar={
        <div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-caption mt-2">
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
