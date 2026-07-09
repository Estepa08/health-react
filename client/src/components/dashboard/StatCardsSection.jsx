import { Calendar3, ClipboardData, GraphUp, Star } from 'react-bootstrap-icons'
import TrendBadge from './TrendBadge'

const STAT_CARDS = [
  {
    key: 'totalAttempts',
    label: 'Пройдено тестов',
    icon: ClipboardData,
    badge: 'icon-badge-primary',
  },
  { key: 'averageScore', label: 'Средний балл', icon: GraphUp, badge: 'icon-badge-info' },
  { key: 'lastAttempt', label: 'Последний тест', icon: Calendar3, badge: 'icon-badge-success' },
  { key: 'favoriteTheme', label: 'Частая тема', icon: Star, badge: 'icon-badge-warning' },
]

function StatCardsSection({ statValues, statTrends }) {
  if (!statValues) return null

  return (
    <div className="row row-cols-2 row-cols-md-4 g-3 mb-4 align-items-stretch mx-0">
      {STAT_CARDS.map((card) => (
        <div className="col" key={card.key}>
          <div className="card card-material h-100">
            <div className="card-body d-flex flex-column gap-2">
              <span className={`icon-badge ${card.badge}`}>
                <card.icon />
              </span>
              <div
                className="fs-4 stat-value"
                title={card.key === 'favoriteTheme' ? statValues[card.key] : undefined}
              >
                {statValues[card.key]}
              </div>
              <div className="text-meta">{card.label}</div>
              {card.key in statTrends && <TrendBadge delta={statTrends[card.key]} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatCardsSection
