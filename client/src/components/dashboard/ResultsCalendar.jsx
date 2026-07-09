import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import { groupResultsByDate } from '../../utils/dashboardStats'
import { findResultLevel } from '../../utils/findResultLevel'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate)
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
  const leadingBlanks = (first.getDay() + 6) % 7

  const cells = []
  for (let i = 0; i < leadingBlanks; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day))
  }
  return cells
}

function ResultsCalendar({ results, resultLevels }) {
  const latestResult = results[results.length - 1]
  const [monthDate, setMonthDate] = useState(
    startOfMonth(latestResult ? new Date(latestResult.createdAt) : new Date())
  )

  const resultsByDate = useMemo(() => groupResultsByDate(results), [results])
  const cells = useMemo(() => buildMonthGrid(monthDate), [monthDate])

  const today = new Date().toLocaleDateString('sv-SE')

  const goToMonth = (offset) => {
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1))
  }

  return (
    <div className="card card-material mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={() => goToMonth(-1)}
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft />
          </button>
          <div className="fw-semibold text-capitalize">
            {monthDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
          </div>
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={() => goToMonth(1)}
            aria-label="Следующий месяц"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="calendar-grid calendar-weekdays">
          {WEEKDAYS.map((weekday) => (
            <div key={weekday} className="calendar-weekday">
              {weekday}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {cells.map((date, index) => {
            if (!date) return <div key={`blank-${index}`} className="calendar-day calendar-day-empty" />

            const dateKey = date.toLocaleDateString('sv-SE')
            const dayResults = resultsByDate.get(dateKey) ?? []
            const hasResults = dayResults.length > 0
            const isToday = dateKey === today

            const tooltip = dayResults
              .map((result) => {
                const level = findResultLevel(resultLevels, result.score)
                const levelLabel = level ? ` — ${level.emoji ?? ''} ${level.title}` : ''
                return `${result.themeTitle}: ${result.score}${levelLabel}`
              })
              .join('\n')

            return (
              <div
                key={dateKey}
                className={`calendar-day${hasResults ? ' calendar-day-has-results' : ''}${
                  isToday ? ' calendar-day-today' : ''
                }`}
                title={tooltip || undefined}
              >
                <span className="calendar-day-number">{date.getDate()}</span>
                {hasResults && (
                  <span className="calendar-day-dots">
                    {dayResults.slice(0, 3).map((result, i) => (
                      <span key={i} className="calendar-day-dot" />
                    ))}
                    {dayResults.length > 3 && (
                      <span className="calendar-day-more">+{dayResults.length - 3}</span>
                    )}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ResultsCalendar
