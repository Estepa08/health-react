import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { Badge } from '../ui/badge'

function TrendBadge({ delta }) {
  if (delta === null || delta === undefined || delta === 0) return null

  const isImprovement = delta < 0
  const icon = isImprovement ? ArrowDown01Icon : ArrowUp01Icon

  return (
    <Badge variant={isImprovement ? 'positive' : 'negative'}>
      <HugeiconsIcon icon={icon} data-icon="inline-start" />
      {Math.abs(delta)}
    </Badge>
  )
}

export default TrendBadge
