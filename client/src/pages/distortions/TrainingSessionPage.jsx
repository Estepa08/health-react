import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import SituationCard from '../../components/training/SituationCard'
import {
  fetchDistortionSituations,
  saveDistortionTrainingAttempt,
} from '../../api/distortionTraining'

function TrainingSessionPage() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const [situations, setSituations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const advanceTimeoutRef = useRef(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    return () => clearTimeout(advanceTimeoutRef.current)
  }, [])

  useEffect(() => {
    fetchDistortionSituations(slug)
      .then(setSituations)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [slug])

  const finish = async (finalAnswers) => {
    setIsSaving(true)
    try {
      const attempt = await saveDistortionTrainingAttempt({
        distortionSlug: slug,
        answers: finalAnswers,
      })
      navigate(`/training/${slug}/result`, { state: { attempt } })
    } catch (err) {
      setError(err.message)
      setIsSaving(false)
    }
  }

  const handleSelect = (optionId) => {
    if (isAdvancing) return
    const currentSituation = situations[currentIndex]
    const nextAnswers = { ...answers, [currentSituation.id]: optionId }
    setAnswers(nextAnswers)
    setIsAdvancing(true)
    advanceTimeoutRef.current = setTimeout(() => {
      setIsAdvancing(false)
      if (currentIndex < situations.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        finish(nextAnswers)
      }
    }, 600)
  }

  const progress = situations.length > 0 ? (currentIndex / situations.length) * 100 : 0

  if (isLoading) {
    return (
      <Layout>
        <p className="text-center text-meta">Загрузка ситуаций...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="text-danger text-center text-meta">{error}</p>
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => navigate('/training')}>
            Назад к списку тренировок
          </button>
        </div>
      </Layout>
    )
  }

  const currentSituation = situations[currentIndex]

  return (
    <Layout
      progressBar={
        <div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-caption mt-2">
            {currentIndex + 1} / {situations.length}
          </p>
        </div>
      }
    >
      {currentSituation && (
        <SituationCard
          key={currentSituation.id}
          situation={currentSituation}
          selectedOptionId={answers[currentSituation.id]}
          disabled={isAdvancing || isSaving}
          onSelect={handleSelect}
        />
      )}
    </Layout>
  )
}

export default TrainingSessionPage
