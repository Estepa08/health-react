import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchDistortionGames } from '../../api/distortionGames'
import { fetchDistortionAttempts } from '../../api/distortionAttempts'
import { summarizeByGame } from '../../utils/distortionStats'
import { formatDate } from '../../utils/dashboardStats'

function DistortionGamesPage() {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [progressByGame, setProgressByGame] = useState(new Map())
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    fetchDistortionGames()
      .then(setGames)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    fetchDistortionAttempts()
      .then((attempts) => setProgressByGame(summarizeByGame(attempts)))
      .catch(() => setProgressByGame(new Map()))
  }, [])

  return (
    <Layout>
      <h4 className="text-center mb-4">Игры на когнитивные искажения</h4>
      {error && <p className="text-danger text-center text-meta">{error}</p>}
      <div className="row row-cols-1 row-cols-md-2 g-3 mx-0">
        {games.map((game) => {
          const progress = progressByGame.get(game.id)
          return (
            <div className="col" key={game.id}>
              <div
                className="card card-material h-100"
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/distortions/${game.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    navigate(`/distortions/${game.id}`)
                  }
                }}
              >
                <div className="card-body d-flex flex-column gap-2">
                  <h6 className="card-title theme-card-title mb-1">{game.title}</h6>
                  <p className="card-text text-meta mb-2">{game.description}</p>
                  {progress ? (
                    <p className="text-meta mb-0">
                      Пройдено раз: {progress.timesPlayed} · Последний результат:{' '}
                      {progress.lastPercent}% ({formatDate(progress.lastDate)})
                    </p>
                  ) : (
                    <p className="text-meta mb-0">Ещё не пройдено</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default DistortionGamesPage
