import { useEffect, useRef, useState } from 'react'

function QuestionCard({
  questionData,
  selectedValue,
  confirmedValue,
  disabled,
  onSelect,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}) {
  const [exitingPrompt, setExitingPrompt] = useState(null)
  const prevDataRef = useRef(questionData)
  const exitTimeoutRef = useRef(null)

  useEffect(() => {
    const prev = prevDataRef.current
    if (prev && questionData && prev.id !== questionData.id) {
      setExitingPrompt(prev.prompt)
      clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = setTimeout(() => setExitingPrompt(null), 220)
    }
    if (questionData) prevDataRef.current = questionData
  }, [questionData])

  useEffect(() => () => clearTimeout(exitTimeoutRef.current), [])

  if (!questionData) return null

  const { id, prompt, options } = questionData

  return (
    <div className="d-flex justify-content-center align-items-start gap-3 px-3 px-sm-5">
      <div className="question-panel survey-card-width">
        <div className="d-flex align-items-center justify-content-between w-100 mb-3 question-nav">
          <button
            type="button"
            className="btn-arrow"
            aria-label="Предыдущий вопрос"
            onClick={onPrev}
            disabled={!canGoPrev}
          >
            ‹
          </button>
          <div className="question-prompt-wrap">
            <h5 key={id ?? prompt} className="question-prompt question-prompt-enter mb-0">
              {prompt}
            </h5>
            {exitingPrompt && (
              <h5
                className="question-prompt question-prompt-exit mb-0"
                onAnimationEnd={() => setExitingPrompt(null)}
              >
                {exitingPrompt}
              </h5>
            )}
          </div>
          <button
            type="button"
            className="btn-arrow"
            aria-label="Следующий вопрос"
            onClick={onNext}
            disabled={!canGoNext}
          >
            ›
          </button>
        </div>
        <div className="d-grid gap-2 w-100">
          {options.map((option) => {
            const isConfirmed = option.value === confirmedValue
            const isSelected = option.value === selectedValue

            return (
              <button
                key={option.value}
                type="button"
                className={`btn question-option-btn ${
                  isConfirmed ? 'btn-success' : isSelected ? 'btn-primary' : 'btn-outline-primary'
                }`}
                disabled={disabled}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
