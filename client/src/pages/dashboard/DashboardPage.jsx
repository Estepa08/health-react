import { useMemo } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton'
import StatCardsSection from '../../components/dashboard/StatCardsSection'
import ThemeChartsSection from '../../components/dashboard/ThemeChartsSection'
import DistortionChartsSection from '../../components/dashboard/DistortionChartsSection'
import HistoryTable from '../../components/dashboard/HistoryTable'
import { useDashboardData } from '../../hooks/useDashboardData'
import { computeStats, formatDate, groupByTheme } from '../../utils/dashboardStats'
import { groupByGame } from '../../utils/distortionStats'

function DashboardPage() {
  const { results, resultLevels, distortionAttempts, error } = useDashboardData()

  const stats = useMemo(() => computeStats(results), [results])

  const themeGroups = useMemo(() => (results ? groupByTheme(results) : []), [results])

  const distortionGameGroups = useMemo(
    () => (distortionAttempts ? groupByGame(distortionAttempts) : []),
    [distortionAttempts]
  )

  const historyRows = useMemo(() => (results ? [...results].reverse() : []), [results])

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-danger text-center text-meta">{error}</p>
      </DashboardLayout>
    )
  }

  if (results === null) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    )
  }

  if (results.length === 0 && distortionGameGroups.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center d-flex flex-column gap-2 align-items-center">
          <p className="text-meta mb-2">У вас пока нет пройденных тестов.</p>
        </div>
      </DashboardLayout>
    )
  }

  const statValues = stats && {
    totalAttempts: stats.totalAttempts,
    averageScore: stats.averageScore,
    lastAttempt: formatDate(stats.lastAttempt.createdAt),
    favoriteTheme: stats.favoriteTheme,
  }

  const statTrends = stats && {
    averageScore: stats.averageDelta,
    lastAttempt: stats.scoreDelta,
  }

  return (
    <DashboardLayout>
      <StatCardsSection statValues={statValues} statTrends={statTrends} />
      <ThemeChartsSection themeGroups={themeGroups} />
      <DistortionChartsSection distortionGameGroups={distortionGameGroups} />
      <HistoryTable historyRows={historyRows} resultLevels={resultLevels} />
    </DashboardLayout>
  )
}

export default DashboardPage
