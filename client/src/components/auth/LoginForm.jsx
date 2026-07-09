import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from '../../validation/authSchemas'
import { buttonColors } from '../../utils/buttonColors'

function LoginForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
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
            <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
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
            <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: buttonColors.primary }}
            disabled={isSubmitting}
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
