import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getLastResult } from '../utils/resultHistory'
import { buttonColors } from '../utils/buttonColors'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const totalScore = location.state?.totalScore ?? getLastResult()?.totalScore

  useEffect(() => {
    if (totalScore === undefined) {
      navigate('/survey', { replace: true })
    }
  }, [totalScore, navigate])

  if (totalScore === undefined) return null

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
