import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton'
import StatCardsSection from '../../components/dashboard/StatCardsSection'
import ResultsCalendar from '../../components/dashboard/ResultsCalendar'
import ThemeChartsSection from '../../components/dashboard/ThemeChartsSection'
import DistortionChartsSection from '../../components/dashboard/DistortionChartsSection'
import HistoryTable from '../../components/dashboard/HistoryTable'
import { useDashboardData } from '../../hooks/useDashboardData'
import { computeStats, formatDate, groupByTheme } from '../../utils/dashboardStats'
import { groupByGame } from '../../utils/distortionStats'

function DashboardPage() {
  const navigate = useNavigate()
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
        <div className="flex flex-col items-center gap-3 text-center py-12">
          <p className="text-muted-foreground">
            Здесь появится ваша статистика, как только вы пройдёте первый тест.
          </p>
          <Button onClick={() => navigate('/survey')}>Пройти первый тест</Button>
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
      <ResultsCalendar results={results} resultLevels={resultLevels} />
      <ThemeChartsSection themeGroups={themeGroups} />
      <DistortionChartsSection distortionGameGroups={distortionGameGroups} />
      <HistoryTable historyRows={historyRows} resultLevels={resultLevels} />
    </DashboardLayout>
  )
}

export default DashboardPage
