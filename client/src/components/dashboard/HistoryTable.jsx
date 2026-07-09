import { formatDate } from '../../utils/dashboardStats'
import { findResultLevel } from '../../utils/findResultLevel'

function HistoryTable({ historyRows, resultLevels }) {
  if (historyRows.length === 0) return null

  return (
    <div className="card card-material mb-4">
      <div className="table-responsive">
        <table className="table table-material mb-0">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Тема</th>
              <th>Балл</th>
              <th>Уровень</th>
            </tr>
          </thead>
          <tbody>
            {historyRows.map((result) => {
              const level = findResultLevel(resultLevels, result.score)
              return (
                <tr key={result.id}>
                  <td>{formatDate(result.createdAt)}</td>
                  <td>{result.themeTitle}</td>
                  <td>{result.score}</td>
                  <td>
                    {level ? (
                      <span className="level-badge">
                        {level.emoji ?? ''} {level.title}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryTable
