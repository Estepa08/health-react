import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout'
import QuestionCard from './components/QuestionCard'
import ThemeSelector from './components/ThemeSelector'
import { fetchThemes, fetchQuestions } from './api/client'
import { calculateScore } from './utils/calculateScore'

function App() {
  const [themes, setThemes] = useState([])
  const [themesError, setThemesError] = useState(null)

  const [selectedTheme, setSelectedTheme] = useState(null)
  const [questions, setQuestions] = useState([])
  const [questionsError, setQuestionsError] = useState(null)
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [hasStarted, setHasStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

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
    setShowResult(false)
  }

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (answer) => {
    if (!hasStarted) setHasStarted(true)

    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setTotalScore(calculateScore(newAnswers))
      setShowResult(true)
    }
  }

  const progress = hasStarted ? (currentIndex / (questions.length - 1)) * 100 : 0

  if (!selectedTheme) {
    return (
      <Layout>
        {themesError && <p className="text-danger text-center">{themesError}</p>}
        <ThemeSelector themes={themes} onSelect={selectTheme} />
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
          <button className="btn btn-primary" onClick={restart}>
            Назад к выбору теста
          </button>
        </div>
      </Layout>
    )
  }

  if (showResult) {
    return (
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <h1>{totalScore}</h1>
          <button className="btn btn-primary" onClick={restart}>
            Пройти заново
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
      <QuestionCard questionData={currentQuestion} onAnswer={handleAnswer} />
    </Layout>
  )
}

export default App
