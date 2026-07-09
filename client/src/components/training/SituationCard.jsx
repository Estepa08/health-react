function SituationCard({ situation, selectedOptionId, disabled, onSelect }) {
  if (!situation) return null

  return (
    <div className="d-flex justify-content-center px-3 px-sm-5">
      <div className="card survey-card-width" style={{ minHeight: '480px' }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <p className="card-ink-title mb-4">{situation.situationText}</p>
          <div className="d-grid gap-2 w-100">
            {situation.options.map((option) => {
              const isSelected = option.id === selectedOptionId

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`btn question-option-btn ${
                    isSelected ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  disabled={disabled}
                  onClick={() => onSelect(option.id)}
                >
                  {option.optionText}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SituationCard
