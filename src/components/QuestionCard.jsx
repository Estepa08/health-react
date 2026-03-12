import React, { useState } from 'react'
import './QuestionCard.css'

export default function QuestionCard({ questionData, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [prevQuestionData, setPrevQuestionData] = useState(questionData)

  if (questionData !== prevQuestionData) {
    setPrevQuestionData(questionData)
    setSelectedAnswer(null)
  }

  const handleSelect = (option) => {
    setSelectedAnswer(option)
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
    }
  }

  return (
    <div className="question-card">
      <div className="question-card__header">Вопрос {questionData.id}</div>

      <div className="question-card__body">
        <h3 className="question-card__title">{questionData.question}</h3>

        <div className="question-card__options">
          {questionData.options.map((option) => (
            <button
              key={option}
              className={`question-card__option ${
                selectedAnswer === option ? 'question-card__option--selected' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <button className="question-card__submit" onClick={handleSubmit}>
            Далее →
          </button>
        )}
      </div>
    </div>
  )
}