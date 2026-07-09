import { render, screen, fireEvent, act } from '@testing-library/react'
import DistortionCard from '../DistortionCard'

function pointerEvent(clientX, clientY) {
  return { clientX, clientY, pointerId: 1 }
}

describe('DistortionCard', () => {
  it('renders the thought text', () => {
    render(<DistortionCard thought="Я всегда всё порчу" onSwipe={() => {}} disabled={false} />)
    expect(screen.getByText('Я всегда всё порчу')).toBeInTheDocument()
  })

  it('triggers a left swipe via the agree button', async () => {
    vi.useFakeTimers()
    const onSwipe = vi.fn()
    render(<DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Согласен' }))
    await act(async () => {
      vi.advanceTimersByTime(220)
    })

    expect(onSwipe).toHaveBeenCalledWith('left')
    vi.useRealTimers()
  })

  it('triggers a right swipe via the disagree button', async () => {
    vi.useFakeTimers()
    const onSwipe = vi.fn()
    render(<DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Не согласен' }))
    await act(async () => {
      vi.advanceTimersByTime(220)
    })

    expect(onSwipe).toHaveBeenCalledWith('right')
    vi.useRealTimers()
  })

  it('triggers a down swipe via the unsure button', async () => {
    vi.useFakeTimers()
    const onSwipe = vi.fn()
    render(<DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Не уверен' }))
    await act(async () => {
      vi.advanceTimersByTime(220)
    })

    expect(onSwipe).toHaveBeenCalledWith('down')
    vi.useRealTimers()
  })

  it('does not trigger a swipe when disabled', () => {
    const onSwipe = vi.fn()
    render(<DistortionCard thought="Мысль" onSwipe={onSwipe} disabled />)

    fireEvent.click(screen.getByRole('button', { name: 'Согласен' }))

    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('drags right past the threshold and triggers a right swipe', async () => {
    vi.useFakeTimers()
    const onSwipe = vi.fn()
    const { container } = render(
      <DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />
    )
    const card = container.querySelector('.distortion-card')
    card.setPointerCapture = vi.fn()

    fireEvent.pointerDown(card, pointerEvent(0, 0))
    fireEvent.pointerMove(card, pointerEvent(150, 0))
    fireEvent.pointerUp(card, pointerEvent(150, 0))

    await act(async () => {
      vi.advanceTimersByTime(220)
    })

    expect(onSwipe).toHaveBeenCalledWith('right')
    vi.useRealTimers()
  })

  it('drags down past the threshold and triggers a down swipe', async () => {
    vi.useFakeTimers()
    const onSwipe = vi.fn()
    const { container } = render(
      <DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />
    )
    const card = container.querySelector('.distortion-card')
    card.setPointerCapture = vi.fn()

    fireEvent.pointerDown(card, pointerEvent(0, 0))
    fireEvent.pointerMove(card, pointerEvent(0, 120))
    fireEvent.pointerUp(card, pointerEvent(0, 120))

    await act(async () => {
      vi.advanceTimersByTime(220)
    })

    expect(onSwipe).toHaveBeenCalledWith('down')
    vi.useRealTimers()
  })

  it('snaps back to center when the drag does not cross any threshold', () => {
    const onSwipe = vi.fn()
    const { container } = render(
      <DistortionCard thought="Мысль" onSwipe={onSwipe} disabled={false} />
    )
    const card = container.querySelector('.distortion-card')
    card.setPointerCapture = vi.fn()

    fireEvent.pointerDown(card, pointerEvent(0, 0))
    fireEvent.pointerMove(card, pointerEvent(10, 10))
    fireEvent.pointerUp(card, pointerEvent(10, 10))

    expect(onSwipe).not.toHaveBeenCalled()
  })
})
