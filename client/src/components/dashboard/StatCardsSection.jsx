import { HugeiconsIcon } from '@hugeicons/react'
import { Calendar01Icon, ChartUpIcon, ClipboardCheckIcon, StarIcon } from '@hugeicons/core-free-icons'
import { Card, CardContent } from '../ui/card'
import TrendBadge from './TrendBadge'

const STAT_CARDS = [
  {
    key: 'totalAttempts',
    label: 'Пройдено тестов',
    icon: ClipboardCheckIcon,
    badge: 'icon-badge-primary',
  },
  { key: 'averageScore', label: 'Средний балл', icon: ChartUpIcon, badge: 'icon-badge-info' },
  { key: 'lastAttempt', label: 'Последний тест', icon: Calendar01Icon, badge: 'icon-badge-success' },
  { key: 'favoriteTheme', label: 'Частая тема', icon: StarIcon, badge: 'icon-badge-warning' },
]

function StatCardsSection({ statValues, statTrends }) {
  if (!statValues) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {STAT_CARDS.map((card) => (
        <Card className="h-full" key={card.key}>
          <CardContent className="flex flex-col gap-2">
            <span className={`icon-badge ${card.badge}`}>
              <HugeiconsIcon icon={card.icon} size={20} />
            </span>
            <div
              className="text-2xl stat-value"
              title={card.key === 'favoriteTheme' ? statValues[card.key] : undefined}
            >
              {statValues[card.key]}
            </div>
            <div className="text-muted-foreground">{card.label}</div>
            {card.key in statTrends && <TrendBadge delta={statTrends[card.key]} />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatCardsSection
