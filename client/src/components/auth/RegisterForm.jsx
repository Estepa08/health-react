import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerSchema } from '../../validation/authSchemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <Label htmlFor="name">Имя</Label>
            <Field as={Input} autoComplete="off" type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="mb-3">
            <Label htmlFor="register-email">Email</Label>
            <Field as={Input} autoComplete="off" type="email" id="register-email" name="email" />
            <ErrorMessage name="email" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="mb-3">
            <Label htmlFor="register-password">Пароль</Label>
            <Field as={Input} autoComplete="off" type="password" id="register-password" name="password" />
            <ErrorMessage name="password" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="mb-3">
            <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
            <Field as={Input} autoComplete="off" type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
