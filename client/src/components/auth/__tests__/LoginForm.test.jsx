import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  it('renders email, password fields and submit button', () => {
    render(<LoginForm onSubmit={() => {}} />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(await screen.findAllByText('Обязательное поле')).toHaveLength(2)
  })

  it('shows an error for an invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={() => {}} />)

    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.type(screen.getByLabelText('Пароль'), '123456')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument()
  })

  it('calls onSubmit with form values when valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Пароль'), 'secret1')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0]).toEqual({ email: 'user@example.com', password: 'secret1' })
  })
})
