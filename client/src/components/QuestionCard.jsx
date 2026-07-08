import { buttonColors } from '../utils/buttonColors'

function QuestionCard({ questionData, selectedValue, onSelect }) {
  if (!questionData) return null

  const { prompt, options } = questionData

  return (
    <div className="d-flex justify-content-center px-5">
      <div className="card" style={{ width: '320px', height: '480px' }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <h5 className="card-title mb-4">{prompt}</h5>
          <div className="d-grid gap-2 w-100">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`btn ${option.value === selectedValue ? 'btn-primary' : 'btn-outline-primary'}`}
                style={{
                  backgroundColor:
                    option.value === selectedValue
                      ? buttonColors.primary
                      : buttonColors.outlinePrimary,
                }}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
