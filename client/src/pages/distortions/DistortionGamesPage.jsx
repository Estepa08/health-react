import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import { fetchDistortionGames } from '../../api/distortionGames'
import { fetchDistortionAttempts } from '../../api/distortionAttempts'
import { summarizeByGame } from '../../utils/distortionStats'

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
    <Layout wide>
      <h4 className="text-center mb-4">Игры на когнитивные искажения</h4>
      {error && <p className="text-danger text-center text-meta">{error}</p>}
      <div className="list-card-grid-container">
        {games.map((game) => {
          const progress = progressByGame.get(game.id)
          return (
            <div
              className="card card-material list-card list-card-grid"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              key={game.id}
              onClick={() => navigate(`/distortions/${game.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/distortions/${game.id}`)
                }
              }}
            >
              <div className="card-body d-flex flex-column gap-2">
                <h6 className="card-title mb-1 list-card-title">{game.title}</h6>
                <p className="card-text text-meta mb-0 list-card-text">{game.description}</p>
                <p className="text-meta mb-0 mt-auto list-card-progress">
                  {progress ? `Пройдено: ${progress.timesPlayed} раз` : 'Ещё не пройдено'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default DistortionGamesPage
