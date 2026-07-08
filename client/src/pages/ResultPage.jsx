import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { fetchLastResult } from '../api/results'
import { fetchResultLevels } from '../api/resultLevels'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [totalScore, setTotalScore] = useState(location.state?.totalScore)
  const [loading, setLoading] = useState(location.state?.totalScore === undefined)
  const [resultLevels, setResultLevels] = useState([])

  useEffect(() => {
    if (location.state?.totalScore !== undefined) return

    fetchLastResult()
      .then((result) => setTotalScore(result?.score))
      .catch(() => setTotalScore(undefined))
      .finally(() => setLoading(false))
  }, [location.state])

  useEffect(() => {
    fetchResultLevels()
      .then(setResultLevels)
      .catch(() => setResultLevels([]))
  }, [])

  useEffect(() => {
    if (!loading && totalScore === undefined) {
      navigate('/survey', { replace: true })
    }
  }, [loading, totalScore, navigate])

  if (loading || totalScore === undefined) return null

  const level = resultLevels.find(
    (item) => totalScore >= item.minScore && totalScore <= item.maxScore
  )

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div className="card" style={{ width: '320px', maxWidth: '100%', height: '480px' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="card-title result-score-value mb-4">{totalScore}</h1>
            {level && (
              <>
                <h5 className="card-ink-title result-level-title mb-2">
                  {level.emoji} {level.title}
                </h5>
                <p className="card-ink-text result-level-description mb-4">{level.description}</p>
              </>
            )}
            <button className="btn btn-primary" onClick={() => navigate('/survey')}>
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ResultPage
