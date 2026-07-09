import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ThemeChartsSection({ themeGroups }) {
  if (themeGroups.length === 0) return null

  return (
    <div className="row row-cols-1 row-cols-md-2 g-3 mb-4 align-items-stretch mx-0">
      {themeGroups.map((group) => (
        <div className="col" key={group.themeTitle}>
          <div className="card card-material h-100">
            <div className="card-body d-flex flex-column">
              <h6 className="card-title theme-card-title mb-3" title={group.themeTitle}>
                {group.themeTitle}
              </h6>
              <div className="theme-chart-area flex-grow-1 d-flex align-items-center">
                {group.points.length > 1 ? (
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={group.points}>
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#1a73e8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-meta mb-0">
                    Балл: {group.points[0].score} ({group.points[0].date}). Пройдите тест ещё раз,
                    чтобы увидеть динамику.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ThemeChartsSection
