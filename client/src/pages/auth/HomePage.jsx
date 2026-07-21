import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/SurveyLayout'
import LoginForm from '../../components/auth/LoginForm'
import RegisterForm from '../../components/auth/RegisterForm'
import { getMe, login, register, sanitizeUser } from '../../api/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

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

  if (checkingToken) {
    return (
      <Layout>
        <div className="flex justify-center px-3 sm:px-5">
          <Card className="card-material" style={{ width: '320px', maxWidth: '100%', minHeight: '480px' }}>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full mt-3" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full mt-2" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex justify-center px-3 sm:px-5">
        <Card className="card-material" style={{ width: '320px', maxWidth: '100%', minHeight: '480px' }}>
          <CardContent className="flex flex-col" style={{ overflowY: 'auto' }}>
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="w-full auth-tabs mb-4">
                <TabsTrigger value="login" className="flex-1">Вход</TabsTrigger>
                <TabsTrigger value="register" className="flex-1">Регистрация</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 flex flex-col justify-center">
              {submitError && <Alert variant="destructive" className="mb-3">{submitError}</Alert>}

              {mode === 'login' ? (
                <LoginForm onSubmit={handleSubmit} />
              ) : (
                <RegisterForm onSubmit={handleSubmit} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default HomePage
