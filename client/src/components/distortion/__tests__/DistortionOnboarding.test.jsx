import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DistortionOnboarding from '../DistortionOnboarding'

describe('DistortionOnboarding', () => {
  it('renders the legend and example thought', () => {
    render(<DistortionOnboarding onStart={vi.fn()} />)
    expect(screen.getByText(/Смахни карточку влево/)).toBeInTheDocument()
    expect(screen.getByText(/Смахни вправо/)).toBeInTheDocument()
    expect(screen.getByText(/Смахни вниз/)).toBeInTheDocument()
    expect(screen.getByText(/Я всегда всё порчу/)).toBeInTheDocument()
  })

  it('calls onStart when the button is clicked', () => {
    const onStart = vi.fn()
    render(<DistortionOnboarding onStart={onStart} />)
    fireEvent.click(screen.getByRole('button', { name: 'Понятно, начать' }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
})
