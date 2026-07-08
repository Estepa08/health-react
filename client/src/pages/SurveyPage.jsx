import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import QuestionCard from '../components/QuestionCard'
import ThemeSelector from '../components/ThemeSelector'
import { fetchThemes } from '../api/themes'
import { fetchQuestions } from '../api/questions'
import { calculateScore } from '../utils/calculateScore'
import { saveResult } from '../api/results'
import { buttonColors } from '../utils/buttonColors'

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

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

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

  const handleSelect = (answer) => {
    if (!hasStarted) setHasStarted(true)
    setAnswers({ ...answers, [currentQuestion.id]: answer })
  }

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      const totalScore = calculateScore(answers)
      saveResult({ themeId: selectedTheme, score: totalScore }).catch(() => {})
      navigate('/result', { state: { totalScore } })
    }
  }

  const viewHistory = () => {
    navigate('/result')
  }

  const progress = hasStarted ? (currentIndex / (questions.length - 1)) * 100 : 0

  if (!selectedTheme) {
    return (
      <Layout>
        {themesError && <p className="text-danger text-center">{themesError}</p>}
        <ThemeSelector themes={themes} onSelect={selectTheme} />
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            style={{ backgroundColor: buttonColors.outlineSecondary }}
            onClick={viewHistory}
          >
            Просмотр истории
          </button>
        </div>
      </Layout>
    )
  }

  if (loadingQuestions) {
    return (
      <Layout>
        <p className="text-center">Загрузка вопросов...</p>
      </Layout>
    )
  }

  if (questionsError) {
    return (
      <Layout>
        <p className="text-danger text-center">{questionsError}</p>
        <div className="text-center">
          <button
            className="btn btn-primary"
            style={{ backgroundColor: buttonColors.primary }}
            onClick={restart}
          >
            Назад к выбору теста
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {hasStarted && (
        <div style={{ width: '18rem', margin: '0 auto 1rem auto' }}>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center mt-2">{Math.round(progress)}%</p>
        </div>
      )}
      <QuestionCard
        questionData={currentQuestion}
        selectedValue={selectedValue}
        onSelect={handleSelect}
      />
      <div
        className="d-flex justify-content-between"
        style={{ width: '18rem', margin: '1rem auto 0 auto' }}
      >
        <button
          className="btn btn-secondary"
          style={{ backgroundColor: buttonColors.secondary }}
          onClick={goBack}
          disabled={currentIndex === 0}
        >
          Назад
        </button>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: buttonColors.primary }}
          onClick={goNext}
          disabled={selectedValue === undefined}
        >
          {currentIndex < questions.length - 1 ? 'Далее' : 'Завершить'}
        </button>
      </div>
    </Layout>
  )
}

export default SurveyPage
