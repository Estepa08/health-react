import SurveyHeader from './SurveyHeader'
import DashboardSidebar from './DashboardSidebar'

function Layout({ children, progressBar }) {
  const isAuthenticated = Boolean(localStorage.getItem('user'))

  const content = (
    <>
      <SurveyHeader />
      <div className="d-flex justify-content-center survey-progress-bar">
        <div style={{ width: '320px', maxWidth: '100%' }}>{progressBar}</div>
      </div>
      <div className="container-fluid py-3 py-md-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">{children}</div>
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
