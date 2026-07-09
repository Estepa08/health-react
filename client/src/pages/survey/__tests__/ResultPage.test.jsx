import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ResultPage from '../ResultPage'
import { fetchLastResult } from '../../../api/results'
import { fetchResultLevels } from '../../../api/resultLevels'
import { fetchThemes } from '../../../api/themes'

vi.mock('../../../api/results')
vi.mock('../../../api/resultLevels')
vi.mock('../../../api/themes')

function createMemoryStorage() {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
}

function renderWithState(state) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/result', state }]}>
      <Routes>
        <Route path="/result" element={<ResultPage />} />
        <Route path="/survey" element={<div>Survey Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ResultPage', () => {
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

  it('renders the score, theme title, and matched level from location state', async () => {
    fetchResultLevels.mockResolvedValue([
      { minScore: 0, maxScore: 10, title: 'Норма', description: 'Всё в порядке' },
    ])
    fetchThemes.mockResolvedValue([{ id: 'anxiety', title: 'Тревога' }])

    renderWithState({ totalScore: 5, themeId: 'anxiety' })

    expect(await screen.findByText('Норма')).toBeInTheDocument()
    expect(screen.getByText('Всё в порядке')).toBeInTheDocument()
    expect(screen.getByText('Тревога')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('fetches the last result when no location state is provided', async () => {
    fetchLastResult.mockResolvedValue({ score: 7, themeId: 'burnout' })
    fetchResultLevels.mockResolvedValue([])
    fetchThemes.mockResolvedValue([{ id: 'burnout', title: 'Выгорание' }])

    renderWithState(undefined)

    expect(await screen.findByText('7')).toBeInTheDocument()
  })

  it('redirects to /survey when there is no score to show', async () => {
    fetchLastResult.mockRejectedValue(new Error('Не удалось загрузить результат'))

    renderWithState(undefined)

    await waitFor(() => expect(screen.getByText('Survey Page')).toBeInTheDocument())
  })

  it('falls back to an empty level list when fetching result levels fails', async () => {
    fetchResultLevels.mockRejectedValue(new Error('Не удалось загрузить уровни результата'))
    fetchThemes.mockResolvedValue([])

    renderWithState({ totalScore: 5, themeId: 'anxiety' })

    expect(await screen.findByText('5')).toBeInTheDocument()
  })

  it('falls back to an empty theme title when fetching themes fails', async () => {
    fetchResultLevels.mockResolvedValue([])
    fetchThemes.mockRejectedValue(new Error('Не удалось загрузить темы'))

    renderWithState({ totalScore: 5, themeId: 'anxiety' })

    expect(await screen.findByText('5')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
  })

  it('navigates back to /survey when "Пройти заново" is clicked', async () => {
    fetchResultLevels.mockResolvedValue([])
    fetchThemes.mockResolvedValue([])

    renderWithState({ totalScore: 5, themeId: 'anxiety' })

    fireEvent.click(await screen.findByRole('button', { name: 'Пройти заново' }))

    await waitFor(() => expect(screen.getByText('Survey Page')).toBeInTheDocument())
  })
})
