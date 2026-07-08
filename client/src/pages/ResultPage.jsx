import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { fetchLastResult } from '../api/results'
import { buttonColors } from '../utils/buttonColors'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [totalScore, setTotalScore] = useState(location.state?.totalScore)
  const [loading, setLoading] = useState(location.state?.totalScore === undefined)

  useEffect(() => {
    if (location.state?.totalScore !== undefined) return

    fetchLastResult()
      .then((result) => setTotalScore(result?.score))
      .catch(() => setTotalScore(undefined))
      .finally(() => setLoading(false))
  }, [location.state])

  useEffect(() => {
    if (!loading && totalScore === undefined) {
      navigate('/survey', { replace: true })
    }
  }, [loading, totalScore, navigate])

  if (loading || totalScore === undefined) return null

  return (
    <Layout>
      <div className="d-flex justify-content-center px-5">
        <div className="card" style={{ width: '320px', height: '480px' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="card-title mb-4">{totalScore}</h1>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: buttonColors.primary }}
              onClick={() => navigate('/survey')}
            >
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ResultPage
