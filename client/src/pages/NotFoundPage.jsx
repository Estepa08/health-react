import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { buttonColors } from '../utils/buttonColors'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div className="card" style={{ width: '320px', maxWidth: '100%', height: '480px' }}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="card-title mb-3">404</h1>
            <p className="mb-4">Страница не найдена</p>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: buttonColors.primary }}
              onClick={() => navigate('/')}
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
