import { buttonColors } from '../utils/buttonColors'

function QuestionCard({ questionData, selectedValue, confirmedValue, disabled, onSelect }) {
  if (!questionData) return null

  const { prompt, options } = questionData

  return (
    <div className="d-flex justify-content-center px-5">
      <div className="card" style={{ width: '320px', height: '480px' }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <h5 className="card-title mb-4">{prompt}</h5>
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
                  style={{
                    backgroundColor: isConfirmed
                      ? undefined
                      : isSelected
                        ? buttonColors.primary
                        : buttonColors.outlinePrimary,
                  }}
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
    </div>
  )
}

export default QuestionCard
