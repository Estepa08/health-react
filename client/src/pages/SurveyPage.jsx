import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import QuestionCard from '../components/QuestionCard'
import ThemeSelector from '../components/ThemeSelector'
import { fetchThemes } from '../api/themes'
import { fetchQuestions } from '../api/questions'
import { calculateScore } from '../utils/calculateScore'
import { saveResult } from '../api/results'

function SurveyPage() {
  const navigate = useNavigate()
  const [themes, setThemes] = useState([])
  const [themesError, setThemesError] = useState(null)

  const [selectedTheme, setSelectedTheme] = useState(null)
  const [questions, setQuestions] = useState([])
  const [questionsError, setQuestionsError] = useState(null)
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [hasStarted, setHasStarted] = useState(false)
  const [confirmedValue, setConfirmedValue] = useState(null)
  const [isAdvancing, setIsAdvancing] = useState(false)
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
    fetchThemes()
      .then(setThemes)
      .catch((err) => setThemesError(err.message))
  }, [])

  const selectTheme = (themeId) => {
    setSelectedTheme(themeId)
    setLoadingQuestions(true)
    setQuestionsError(null)
    fetchQuestions(themeId)
      .then((data) => setQuestions(data))
      .catch((err) => setQuestionsError(err.message))
      .finally(() => setLoadingQuestions(false))
  }

  const restart = () => {
    setSelectedTheme(null)
    setQuestions([])
    setCurrentIndex(0)
    setAnswers({})
    setHasStarted(false)
  }

  const currentQuestion = questions[currentIndex]
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const finish = async (finalAnswers) => {
    try {
      const saved = await saveResult({ themeId: selectedTheme, answers: finalAnswers })
      navigate('/result', { state: { totalScore: saved.score, themeId: selectedTheme } })
    } catch {
      navigate('/result', {
        state: { totalScore: calculateScore(finalAnswers), themeId: selectedTheme },
      })
    }
  }

  const advance = (finalAnswers) => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finish(finalAnswers)
    }
  }

  const handleSelect = (answer) => {
    if (isAdvancing) return
    if (!hasStarted) setHasStarted(true)
    const nextAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(nextAnswers)
    setConfirmedValue(answer)
    setIsAdvancing(true)
    advanceTimeoutRef.current = setTimeout(() => {
      setConfirmedValue(null)
      setIsAdvancing(false)
      advance(nextAnswers)
    }, 1000)
  }

  const goNext = () => {
    advance(answers)
  }

  const viewHistory = () => {
    navigate('/dashboard')
  }

  const progress = hasStarted ? (currentIndex / (questions.length - 1)) * 100 : 0

  if (!selectedTheme) {
    return (
      <Layout>
        {themesError && <p className="text-danger text-center text-meta">{themesError}</p>}
        <ThemeSelector themes={themes} onSelect={selectTheme} />
        <div className="text-center mt-3 d-flex flex-column gap-2 align-items-center">
          <button className="btn btn-outline-secondary" onClick={viewHistory}>
            Просмотр истории
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate('/distortions')}>
            Игры на когнитивные искажения
          </button>
        </div>
      </Layout>
    )
  }

  if (loadingQuestions) {
    return (
      <Layout>
        <p className="text-center text-meta">Загрузка вопросов...</p>
      </Layout>
    )
  }

  if (questionsError) {
    return (
      <Layout>
        <p className="text-danger text-center text-meta">{questionsError}</p>
        <div className="text-center">
          <button className="btn btn-primary" onClick={restart}>
            Назад к выбору теста
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      progressBar={
        <div style={{ visibility: hasStarted ? 'visible' : 'hidden' }}>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-caption mt-2">{Math.round(progress)}%</p>
        </div>
      }
    >
      <QuestionCard
        questionData={currentQuestion}
        selectedValue={selectedValue}
        confirmedValue={confirmedValue}
        disabled={isAdvancing}
        onSelect={handleSelect}
      />
      <div
        className="d-flex justify-content-between mx-auto mt-3"
        style={{ width: '320px', maxWidth: '100%' }}
      >
        <button
          className="btn btn-secondary"
          onClick={goBack}
          disabled={currentIndex === 0 || isAdvancing}
        >
          Назад
        </button>
        <button
          className="btn btn-primary"
          onClick={goNext}
          disabled={selectedValue === undefined || isAdvancing}
        >
          {currentIndex < questions.length - 1 ? 'Далее' : 'Завершить'}
        </button>
      </div>
    </Layout>
  )
}

export default SurveyPage
