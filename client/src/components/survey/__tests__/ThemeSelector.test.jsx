import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeSelector from '../ThemeSelector'

beforeAll(() => {
  class MockResizeObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
  class MockIntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

const themes = [
  { id: 'anxiety', title: 'Тревога', description: 'Оцените уровень тревоги' },
  { id: 'burnout', title: 'Выгорание', description: 'Оцените уровень выгорания' },
]

describe('ThemeSelector', () => {
  it('renders each theme description', () => {
    render(<ThemeSelector themes={themes} onSelect={() => {}} />)
    expect(screen.getByText('Оцените уровень тревоги')).toBeInTheDocument()
  })

  it('calls onSelect with the theme id when a card is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ThemeSelector themes={themes} onSelect={onSelect} />)

    await user.click(screen.getByRole('button', { name: /Тревога/ }))

    expect(onSelect).toHaveBeenCalledWith('anxiety')
  })

  it('calls onSelect when Enter is pressed on a focused card', () => {
    const onSelect = vi.fn()
    render(<ThemeSelector themes={themes} onSelect={onSelect} />)

    const card = screen.getByRole('button', { name: /Тревога/ })
    fireEvent.keyDown(card, { key: 'Enter' })

    expect(onSelect).toHaveBeenCalledWith('anxiety')
  })

  it('ignores irrelevant key presses', () => {
    const onSelect = vi.fn()
    render(<ThemeSelector themes={themes} onSelect={onSelect} />)

    const card = screen.getByRole('button', { name: /Тревога/ })
    fireEvent.keyDown(card, { key: 'Tab' })

    expect(onSelect).not.toHaveBeenCalled()
  })
})
