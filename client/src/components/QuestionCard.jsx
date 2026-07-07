function QuestionCard({ questionData, onAnswer }) {
  if (!questionData) return null

  const { prompt, options } = questionData

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">{prompt}</h5>
        <div className="d-grid gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="btn btn-outline-primary"
              onClick={() => onAnswer(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
