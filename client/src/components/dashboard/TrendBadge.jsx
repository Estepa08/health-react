import { ArrowDownShort, ArrowUpShort } from 'react-bootstrap-icons'

function TrendBadge({ delta }) {
  if (delta === null || delta === undefined || delta === 0) return null

  const isImprovement = delta < 0
  const Icon = isImprovement ? ArrowDownShort : ArrowUpShort

  return (
    <span className={`trend-badge ${isImprovement ? 'trend-down' : 'trend-up'}`}>
      <Icon size={16} />
      {Math.abs(delta)}
    </span>
  )
}

export default TrendBadge
