import SurveyHeader from './SurveyHeader'

function Layout({ children, progressBar }) {
  return (
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
}

export default Layout
