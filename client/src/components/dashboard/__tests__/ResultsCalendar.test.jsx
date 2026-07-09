import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ResultsCalendar from '../ResultsCalendar'

const resultLevels = [{ minScore: 0, maxScore: 10, title: 'Норма', emoji: '🙂' }]

function makeResult(overrides = {}) {
  return {
    id: 1,
    themeTitle: 'Тревога',
    score: 5,
    createdAt: '2026-07-09T10:00:00.000Z',
    ...overrides,
  }
}

describe('ResultsCalendar', () => {
  it('renders weekday headers and current month', () => {
    render(<ResultsCalendar results={[]} resultLevels={resultLevels} />)
    expect(screen.getByText('Пн')).toBeInTheDocument()
    expect(screen.getByText('Вс')).toBeInTheDocument()
  })

  it('marks days that have results and shows a dot per result', () => {
    const results = [makeResult({ id: 1 }), makeResult({ id: 2, score: 7 })]
    const { container } = render(<ResultsCalendar results={results} resultLevels={resultLevels} />)
    const dayWithResults = container.querySelector('.calendar-day-has-results')
    expect(dayWithResults).not.toBeNull()
    expect(dayWithResults.querySelectorAll('.calendar-day-dot')).toHaveLength(2)
  })

  it('shows a +N indicator when more than 3 results land on the same day', () => {
    const results = [1, 2, 3, 4].map((id) => makeResult({ id }))
    render(<ResultsCalendar results={results} resultLevels={resultLevels} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('navigates between months without crashing and keeps blank cells outside the month empty', () => {
    const { container } = render(<ResultsCalendar results={[]} resultLevels={resultLevels} />)
    const [prevBtn, nextBtn] = screen.getAllByRole('button')

    fireEvent.click(prevBtn)
    fireEvent.click(nextBtn)
    fireEvent.click(nextBtn)

    const emptyCells = container.querySelectorAll('.calendar-day-empty')
    emptyCells.forEach((cell) => {
      expect(cell.textContent).toBe('')
    })
  })
})
