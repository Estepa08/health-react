import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from '../../validation/authSchemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <Label htmlFor="email">Email</Label>
            <Field as={Input} autoComplete="off" type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="mb-3">
            <Label htmlFor="password">Пароль</Label>
            <Field as={Input} autoComplete="off" type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
