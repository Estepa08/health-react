import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard from '../QuestionCard'

const questionData = {
  prompt: 'Как часто вы чувствуете тревогу?',
  options: [
    { label: 'Никогда', value: 0 },
    { label: 'Иногда', value: 1 },
    { label: 'Часто', value: 2 },
  ],
}

describe('QuestionCard', () => {
  it('renders nothing when there is no question data', () => {
    const { container } = render(<QuestionCard questionData={null} onSelect={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the prompt and all option labels', () => {
    render(<QuestionCard questionData={questionData} onSelect={() => {}} />)

    expect(screen.getByText(questionData.prompt)).toBeInTheDocument()
    questionData.options.forEach((option) => {
      expect(screen.getByRole('button', { name: option.label })).toBeInTheDocument()
    })
  })

  it('calls onSelect with the option value when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<QuestionCard questionData={questionData} onSelect={onSelect} />)

    await user.click(screen.getByRole('button', { name: 'Иногда' }))

    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('marks the selected option as selected and the confirmed option as confirmed', () => {
    render(
      <QuestionCard
        questionData={questionData}
        selectedValue={1}
        confirmedValue={2}
        onSelect={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Иногда' })).toHaveClass('bg-primary')
    expect(screen.getByRole('button', { name: 'Часто' })).toHaveClass('btn-success')
    expect(screen.getByRole('button', { name: 'Никогда' })).toHaveClass('border-border')
  })

  it('disables all buttons when disabled is true', () => {
    render(<QuestionCard questionData={questionData} disabled onSelect={() => {}} />)

    questionData.options.forEach((option) => {
      expect(screen.getByRole('button', { name: option.label })).toBeDisabled()
    })
  })

  it('shows an exiting copy of the previous prompt when the question changes', async () => {
    const nextQuestion = {
      id: 2,
      prompt: 'Как часто вы чувствуете усталость?',
      options: questionData.options,
    }
    const { rerender } = render(
      <QuestionCard questionData={{ id: 1, ...questionData }} onSelect={() => {}} />
    )

    rerender(<QuestionCard questionData={nextQuestion} onSelect={() => {}} />)

    const exitingEl = screen.getByText(questionData.prompt)
    expect(exitingEl).toHaveClass('question-prompt-exit')

    fireEvent.animationEnd(exitingEl)
    await waitFor(() => expect(screen.queryByText(questionData.prompt)).not.toBeInTheDocument())
  })
})
