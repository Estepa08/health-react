import SurveyHeader from './SurveyHeader'
import DashboardSidebar from './DashboardSidebar'

function Layout({ children, progressBar, wide = false }) {
  const isAuthenticated = Boolean(localStorage.getItem('user'))

  const content = (
    <>
      <SurveyHeader />
      <div className="flex justify-center survey-progress-bar">
        <div className="survey-card-width">{progressBar}</div>
      </div>
      <div className="w-full px-4 py-3 md:py-5">
        <div className="flex justify-center">
          <div className={wide ? 'w-full' : 'md:w-2/3 lg:w-1/2'}>{children}</div>
        </div>
      </div>
    </>
  )

  if (!isAuthenticated) {
    return content
  }

  return (
    <div className="md-shell">
      <DashboardSidebar />
      <div className="md-content">{content}</div>
    </div>
  )
}

export default Layout
