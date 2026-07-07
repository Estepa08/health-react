import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout'
import QuestionCard from './components/QuestionCard'
import questions from './data/questions.json'
import { calculateScore } from './utils/calculateScore'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [hasStarted, setHasStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

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

  if (showResult) {
    return (
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <h1>{totalScore}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentIndex(0)
              setAnswers({})
              setHasStarted(false)
              setShowResult(false)
            }}
          >
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
