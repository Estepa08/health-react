import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerSchema } from '../../validation/authSchemas'

function RegisterForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Имя
            </label>
            <Field autoComplete="off" type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
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
            <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
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
            <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
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
  )
}

export default RegisterForm
