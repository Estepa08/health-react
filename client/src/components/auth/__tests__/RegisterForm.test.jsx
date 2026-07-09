import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '../RegisterForm'

describe('RegisterForm', () => {
  it('renders name, email, password, confirmPassword fields and submit button', () => {
    render(<RegisterForm onSubmit={() => {}} />)

    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
    expect(screen.getByLabelText('Подтверждение пароля')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<RegisterForm onSubmit={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(await screen.findAllByText('Обязательное поле')).toHaveLength(4)
  })

  it('shows an error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<RegisterForm onSubmit={() => {}} />)

    await user.type(screen.getByLabelText('Имя'), 'Иван')
    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Пароль'), 'secret1')
    await user.type(screen.getByLabelText('Подтверждение пароля'), 'secret2')
    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(await screen.findByText('Пароли не совпадают')).toBeInTheDocument()
  })

  it('calls onSubmit with form values when valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Имя'), 'Иван')
    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Пароль'), 'secret1')
    await user.type(screen.getByLabelText('Подтверждение пароля'), 'secret1')
    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: 'Иван',
      email: 'user@example.com',
      password: 'secret1',
      confirmPassword: 'secret1',
    })
  })
})
