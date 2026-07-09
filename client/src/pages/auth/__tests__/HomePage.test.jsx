import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'
import { getMe, login } from '../../../api/auth'

vi.mock('../../../api/auth', async () => {
  const actual = await vi.importActual('../../../api/auth')
  return {
    ...actual,
    getMe: vi.fn().mockResolvedValue({ user: null }),
    login: vi.fn(),
    register: vi.fn(),
  }
})

function createMemoryStorage() {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  beforeAll(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it('renders the login form when there is no stored token', async () => {
    renderPage()
    expect(await screen.findByRole('button', { name: 'Войти' })).toBeInTheDocument()
  })

  it('stores the sanitized user and clears loading state when the token is valid', async () => {
    localStorage.setItem('token', 'valid-token')
    getMe.mockResolvedValue({ user: { id: 1, name: 'Женя', email: 'a@b.com' } })

    renderPage()

    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem('user'))).toEqual({
        id: 1,
        name: 'Женя',
        email: 'a@b.com',
      })
    )
  })

  it('clears storage and falls back to the login form when the token is invalid', async () => {
    localStorage.setItem('token', 'bad-token')
    getMe.mockRejectedValue(new Error('Недействительный токен'))

    renderPage()

    expect(await screen.findByRole('button', { name: 'Войти' })).toBeInTheDocument()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('logs in and stores the token and sanitized user on submit', async () => {
    login.mockResolvedValue({ token: 'new-token', user: { id: 2, name: 'A', email: 'a@b.com' } })
    renderPage()

    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    await screen.findByRole('button', { name: 'Войти' })
    await user.type(screen.getByLabelText('Email'), 'a@b.com')
    await user.type(screen.getByLabelText('Пароль'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    await waitFor(() => expect(localStorage.getItem('token')).toBe('new-token'))
  })

  it('shows the submit error message when login fails', async () => {
    login.mockRejectedValue(new Error('Неверный email или пароль'))
    renderPage()

    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    await screen.findByRole('button', { name: 'Войти' })
    await user.type(screen.getByLabelText('Email'), 'a@b.com')
    await user.type(screen.getByLabelText('Пароль'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(await screen.findByText('Неверный email или пароль')).toBeInTheDocument()
  })

  it('switches to the registration tab', async () => {
    renderPage()
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Регистрация' }))
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Вход' }))
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
  })
})
