import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DistortionGamePage from '../DistortionGamePage'
import { fetchDistortionCards } from '../../../api/distortionGames'
import { saveDistortionAttempt } from '../../../api/distortionAttempts'

vi.mock('../../../api/distortionGames')
vi.mock('../../../api/distortionAttempts')

function createMemoryStorage() {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
}

function renderPage(gameId = 'game-1') {
  return render(
    <MemoryRouter initialEntries={[`/distortions/${gameId}`]}>
      <Routes>
        <Route path="/distortions/:gameId" element={<DistortionGamePage />} />
        <Route path="/distortions" element={<div>Games List Page</div>} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('DistortionGamePage', () => {
  beforeAll(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('token', 'test-token')
    localStorage.setItem('distortionSwipeOnboardingSeen', '1')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it('shows onboarding first when it has not been seen before', async () => {
    localStorage.removeItem('distortionSwipeOnboardingSeen')
    fetchDistortionCards.mockResolvedValue([{ id: 1, thought: 'Мысль' }])
    renderPage()

    expect(await screen.findByText('Понятно, начать')).toBeInTheDocument()
  })

  it('shows a loading state while cards are fetched', () => {
    fetchDistortionCards.mockReturnValue(new Promise(() => {}))
    renderPage()
    expect(screen.getByText('Загрузка карточек...')).toBeInTheDocument()
  })

  it('shows an error and a back button when fetching cards fails', async () => {
    fetchDistortionCards.mockRejectedValue(new Error('Не удалось загрузить карточки'))
    renderPage()

    expect(await screen.findByText('Не удалось загрузить карточки')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Назад к списку игр' }))

    await waitFor(() => expect(screen.getByText('Games List Page')).toBeInTheDocument())
  })

  it('redirects home when there is no auth token', async () => {
    localStorage.removeItem('token')
    fetchDistortionCards.mockReturnValue(new Promise(() => {}))
    renderPage()

    await waitFor(() => expect(screen.getByText('Home Page')).toBeInTheDocument())
  })

  it('shows an error when saving the final attempt fails', async () => {
    fetchDistortionCards.mockResolvedValue([{ id: 1, thought: 'Единственная мысль' }])
    saveDistortionAttempt.mockRejectedValue(new Error('Не удалось сохранить результат'))
    renderPage()

    const card = await screen.findByText('Единственная мысль')
    const cardEl = card.closest('.distortion-card')
    cardEl.setPointerCapture = vi.fn()

    fireEvent.pointerDown(cardEl, { clientX: 0, clientY: 0, pointerId: 1 })
    fireEvent.pointerMove(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })
    fireEvent.pointerUp(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })

    expect(await screen.findByText('Не удалось сохранить результат')).toBeInTheDocument()
  })

  it('advances to the next card without saving when more cards remain', async () => {
    fetchDistortionCards.mockResolvedValue([
      { id: 1, thought: 'Первая мысль' },
      { id: 2, thought: 'Вторая мысль' },
    ])
    renderPage()

    const card = await screen.findByText('Первая мысль')
    const cardEl = card.closest('.distortion-card')
    cardEl.setPointerCapture = vi.fn()

    fireEvent.pointerDown(cardEl, { clientX: 0, clientY: 0, pointerId: 1 })
    fireEvent.pointerMove(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })
    fireEvent.pointerUp(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })

    expect(await screen.findByText('Вторая мысль')).toBeInTheDocument()
    expect(saveDistortionAttempt).not.toHaveBeenCalled()
  })

  it('renders the first card once loaded', async () => {
    fetchDistortionCards.mockResolvedValue([
      { id: 1, thought: 'Я всегда всё порчу' },
      { id: 2, thought: 'Никто меня не понимает' },
    ])
    renderPage()

    expect(await screen.findByText('Я всегда всё порчу')).toBeInTheDocument()
  })

  it('saves the attempt and navigates after swiping through all cards', async () => {
    fetchDistortionCards.mockResolvedValue([{ id: 1, thought: 'Единственная мысль' }])
    saveDistortionAttempt.mockResolvedValue({ id: 99, score: 1 })
    renderPage()

    const card = await screen.findByText('Единственная мысль')
    const cardEl = card.closest('.distortion-card')
    cardEl.setPointerCapture = vi.fn()

    fireEvent.pointerDown(cardEl, { clientX: 0, clientY: 0, pointerId: 1 })
    fireEvent.pointerMove(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })
    fireEvent.pointerUp(cardEl, { clientX: 150, clientY: 0, pointerId: 1 })

    await waitFor(() =>
      expect(saveDistortionAttempt).toHaveBeenCalledWith({
        gameId: 'game-1',
        swipes: { 1: 'right' },
      })
    )
  })
})
