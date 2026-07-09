import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import LoginForm from '../../components/auth/LoginForm'
import RegisterForm from '../../components/auth/RegisterForm'
import { getMe, login, register, sanitizeUser } from '../../api/auth'

function HomePage() {
  const [mode, setMode] = useState('login')
  const [submitError, setSubmitError] = useState(null)
  const [checkingToken, setCheckingToken] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setCheckingToken(false)
      return
    }

    getMe(token)
      .then(({ user }) => {
        localStorage.setItem('user', JSON.stringify(sanitizeUser(user)))
        navigate('/survey', { replace: true })
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setCheckingToken(false)
      })
  }, [navigate])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError(null)
    try {
      const { token, user } = mode === 'login' ? await login(values) : await register(values)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(sanitizeUser(user)))
      navigate('/survey')
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (checkingToken) return null

  return (
    <Layout>
      <div className="d-flex justify-content-center px-3 px-sm-5">
        <div
          className="card card-material"
          style={{ width: '320px', maxWidth: '100%', height: '480px' }}
        >
          <div className="card-body d-flex flex-column" style={{ overflowY: 'auto' }}>
            <ul className="nav nav-tabs auth-tabs mb-4">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => setMode('login')}
                >
                  Вход
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${mode === 'register' ? 'active' : ''}`}
                  onClick={() => setMode('register')}
                >
                  Регистрация
                </button>
              </li>
            </ul>

            <div className="flex-grow-1 d-flex flex-column justify-content-center">
              {submitError && <div className="alert alert-danger">{submitError}</div>}

              {mode === 'login' ? (
                <LoginForm onSubmit={handleSubmit} />
              ) : (
                <RegisterForm onSubmit={handleSubmit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
