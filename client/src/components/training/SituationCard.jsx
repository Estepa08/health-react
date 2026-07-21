import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function SituationCard({ situation, selectedOptionId, disabled, onSelect }) {
  if (!situation) return null

  return (
    <div className="flex justify-center px-3 sm:px-5">
      <Card className="survey-card-width" style={{ minHeight: '480px' }}>
        <CardContent className="flex flex-col justify-center items-center text-center">
          <p className="card-ink-title mb-4">{situation.situationText}</p>
          <div className="grid gap-2 w-full">
            {situation.options.map((option) => {
              const isSelected = option.id === selectedOptionId

              return (
                <Button
                  key={option.id}
                  className="question-option-btn"
                  variant={isSelected ? 'default' : 'outline'}
                  disabled={disabled}
                  onClick={() => onSelect(option.id)}
                >
                  {option.optionText}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SituationCard
