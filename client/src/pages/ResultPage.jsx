import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const totalScore = location.state?.totalScore

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
