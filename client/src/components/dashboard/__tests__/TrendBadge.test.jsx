import { render, screen } from '@testing-library/react'
import TrendBadge from '../TrendBadge'

describe('TrendBadge', () => {
  it('renders nothing when delta is 0, null or undefined', () => {
    const { container: c1 } = render(<TrendBadge delta={0} />)
    expect(c1).toBeEmptyDOMElement()

    const { container: c2 } = render(<TrendBadge delta={null} />)
    expect(c2).toBeEmptyDOMElement()

    const { container: c3 } = render(<TrendBadge delta={undefined} />)
    expect(c3).toBeEmptyDOMElement()
  })

  it('shows absolute value and "down" style for negative delta', () => {
    render(<TrendBadge delta={-5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('5').closest('.trend-badge')).toHaveClass('trend-down')
  })

  it('shows absolute value and "up" style for positive delta', () => {
    render(<TrendBadge delta={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('3').closest('.trend-badge')).toHaveClass('trend-up')
  })
})
