import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Layout from '../components/Layout'
import { login, register } from '../api/auth'
import { loginSchema, registerSchema } from '../validation/authSchemas'

function HomePage() {
  const [mode, setMode] = useState('login')
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError(null)
    try {
      const { token } = mode === 'login' ? await login(values) : await register(values)
      localStorage.setItem('token', token)
      navigate('/survey')
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="d-flex justify-content-center px-5">
        <div className="card" style={{ width: '320px', height: '480px' }}>
          <div className="card-body d-flex flex-column" style={{ overflowY: 'auto' }}>
            <ul className="nav nav-tabs mb-4">
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
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form noValidate>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <Field
                          autoComplete="off"
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Пароль
                        </label>
                        <Field
                          autoComplete="off"
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                      >
                        Войти
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                  validationSchema={registerSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form noValidate>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Имя
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="register-email" className="form-label">
                          Email
                        </label>
                        <Field
                          autoComplete="off"
                          type="email"
                          id="register-email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="register-password" className="form-label">
                          Пароль
                        </label>
                        <Field
                          autoComplete="off"
                          type="password"
                          id="register-password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Подтверждение пароля
                        </label>
                        <Field
                          autoComplete="off"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                      >
                        Зарегистрироваться
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
