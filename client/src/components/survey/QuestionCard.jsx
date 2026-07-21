import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

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
    <div className="flex justify-center items-start gap-3 px-3 sm:px-5">
      <div className="question-panel survey-card-width">
        <div className="flex items-center justify-between w-full mb-3 question-nav">
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
        <div className="grid gap-2 w-full">
          {options.map((option) => {
            const isConfirmed = option.value === confirmedValue
            const isSelected = option.value === selectedValue

            return (
              <Button
                key={option.value}
                className={`question-option-btn ${isConfirmed ? 'btn-success' : ''}`}
                variant={isConfirmed || isSelected ? 'default' : 'outline'}
                disabled={disabled}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
