import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import QuestionCard from './components/QuestionCard'
import questions from './data/questions.json'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const currentQuestion = questions[currentIndex]

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    })

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log('Опрос завершен!', answers)
      // Здесь потом добавим страницу результатов
    }
  }

  return (
    <div>
      <QuestionCard
        questionData={currentQuestion}
        onAnswer={handleAnswer} // ← ИЗМЕНИ: передаем функцию
      />

      {/* НОВОЕ: добавим счетчик для наглядности */}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}></p>
    </div>
  )
}

export default App
