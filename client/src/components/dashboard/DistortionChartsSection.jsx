import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent } from '../ui/card'

function DistortionChartsSection({ distortionGameGroups }) {
  if (distortionGameGroups.length === 0) return null

  return (
    <>
      <h6 className="theme-card-title mb-3">Прогресс по когнитивным искажениям</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {distortionGameGroups.map((group) => (
          <Card className="h-full" key={group.gameTitle}>
            <CardContent className="flex flex-col">
              <h6 className="font-heading text-base font-medium theme-card-title mb-3" title={group.gameTitle}>
                {group.gameTitle}
              </h6>
              <div className="theme-chart-area grow flex items-center">
                {group.points.length > 1 ? (
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={group.points}>
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} allowDecimals={false} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3a6d5a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground mb-0">
                    Результат: {group.points[0].score}% ({group.points[0].date}). Пройдите игру
                    ещё раз, чтобы увидеть динамику.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default DistortionChartsSection
