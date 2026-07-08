import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Layout from '../components/Layout'
import { fetchResults } from '../api/results'
import { fetchResultLevels } from '../api/resultLevels'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
}

function groupByTheme(results) {
  const byTheme = new Map()
  for (const result of results) {
    if (!byTheme.has(result.themeId)) {
      byTheme.set(result.themeId, { themeTitle: result.themeTitle, points: [] })
    }
    byTheme.get(result.themeId).points.push({
      date: formatDate(result.createdAt),
      score: result.score,
    })
  }
  return Array.from(byTheme.values())
}

function DashboardPage() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [resultLevels, setResultLevels] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    fetchResults()
      .then(setResults)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    fetchResultLevels()
      .then(setResultLevels)
      .catch(() => setResultLevels([]))
  }, [])

  const stats = useMemo(() => {
    if (!results || results.length === 0) return null

    const totalAttempts = results.length
    const averageScore = Math.round(
      results.reduce((sum, result) => sum + result.score, 0) / totalAttempts
    )
    const lastAttempt = results[results.length - 1]

    const countByTheme = new Map()
    for (const result of results) {
      countByTheme.set(result.themeTitle, (countByTheme.get(result.themeTitle) ?? 0) + 1)
    }
    const favoriteTheme = Array.from(countByTheme.entries()).sort((a, b) => b[1] - a[1])[0][0]

    return { totalAttempts, averageScore, lastAttempt, favoriteTheme }
  }, [results])

  const themeGroups = useMemo(() => (results ? groupByTheme(results) : []), [results])

  const historyRows = useMemo(() => (results ? [...results].reverse() : []), [results])

  if (error) {
    return (
      <Layout>
        <p className="text-danger text-center text-meta">{error}</p>
      </Layout>
    )
  }

  if (results === null) {
    return (
      <Layout>
        <p className="text-center text-meta">Загрузка истории...</p>
      </Layout>
    )
  }

  if (results.length === 0) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-meta mb-4">У вас пока нет пройденных тестов.</p>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            Пройти первый тест
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
        <div className="col">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="fs-4">{stats.totalAttempts}</div>
              <div className="text-meta">Пройдено тестов</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="fs-4">{stats.averageScore}</div>
              <div className="text-meta">Средний балл</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="fs-4">{formatDate(stats.lastAttempt.createdAt)}</div>
              <div className="text-meta">Последний тест</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="fs-4">{stats.favoriteTheme}</div>
              <div className="text-meta">Частая тема</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
        {themeGroups.map((group) => (
          <div className="col" key={group.themeTitle}>
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title mb-3">{group.themeTitle}</h6>
                {group.points.length > 1 ? (
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={group.points}>
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#2f5896" strokeWidth={2} />
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
        ))}
      </div>

      <div className="table-responsive mb-4">
        <table className="table">
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
              const level = resultLevels.find(
                (item) => result.score >= item.minScore && result.score <= item.maxScore
              )
              return (
                <tr key={result.id}>
                  <td>{formatDate(result.createdAt)}</td>
                  <td>{result.themeTitle}</td>
                  <td>{result.score}</td>
                  <td>{level ? `${level.emoji ?? ''} ${level.title}`.trim() : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate('/survey')}>
          Пройти новый тест
        </button>
      </div>
    </Layout>
  )
}

export default DashboardPage
