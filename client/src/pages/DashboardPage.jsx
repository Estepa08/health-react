import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Calendar3, ClipboardData, GraphUp, Star } from 'react-bootstrap-icons'
import DashboardLayout from '../components/DashboardLayout'
import { useDashboardData } from '../hooks/useDashboardData'
import { computeStats, formatDate, groupByTheme } from '../utils/dashboardStats'
import { findResultLevel } from '../utils/findResultLevel'

const STAT_CARDS = [
  {
    key: 'totalAttempts',
    label: 'Пройдено тестов',
    icon: ClipboardData,
    badge: 'icon-badge-primary',
  },
  { key: 'averageScore', label: 'Средний балл', icon: GraphUp, badge: 'icon-badge-info' },
  { key: 'lastAttempt', label: 'Последний тест', icon: Calendar3, badge: 'icon-badge-success' },
  { key: 'favoriteTheme', label: 'Частая тема', icon: Star, badge: 'icon-badge-warning' },
]

function DashboardPage() {
  const navigate = useNavigate()
  const { results, resultLevels, error } = useDashboardData()

  const stats = useMemo(() => computeStats(results), [results])

  const themeGroups = useMemo(() => (results ? groupByTheme(results) : []), [results])

  const historyRows = useMemo(() => (results ? [...results].reverse() : []), [results])

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-danger text-center text-meta">{error}</p>
      </DashboardLayout>
    )
  }

  if (results === null) {
    return (
      <DashboardLayout>
        <p className="text-center text-meta">Загрузка истории...</p>
      </DashboardLayout>
    )
  }

  if (results.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <p className="text-meta mb-4">У вас пока нет пройденных тестов.</p>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            Пройти первый тест
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const statValues = {
    totalAttempts: stats.totalAttempts,
    averageScore: stats.averageScore,
    lastAttempt: formatDate(stats.lastAttempt.createdAt),
    favoriteTheme: stats.favoriteTheme,
  }

  return (
    <DashboardLayout>
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
        {STAT_CARDS.map((card) => (
          <div className="col" key={card.key}>
            <div className="card card-material h-100">
              <div className="card-body d-flex flex-column gap-2">
                <span className={`icon-badge ${card.badge}`}>
                  <card.icon />
                </span>
                <div
                  className="fs-4 stat-value"
                  title={card.key === 'favoriteTheme' ? statValues[card.key] : undefined}
                >
                  {statValues[card.key]}
                </div>
                <div className="text-meta">{card.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
        {themeGroups.map((group) => (
          <div className="col" key={group.themeTitle}>
            <div className="card card-material h-100">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title mb-3">{group.themeTitle}</h6>
                <div className="theme-chart-area flex-grow-1 d-flex align-items-center">
                  {group.points.length > 1 ? (
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={group.points}>
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#1a73e8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-meta mb-0">
                      Балл: {group.points[0].score} ({group.points[0].date}). Пройдите тест ещё раз,
                      чтобы увидеть динамику.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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

      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate('/survey')}>
          Пройти новый тест
        </button>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
