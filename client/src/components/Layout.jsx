import Header from './Header'

function Layout({ children, progressBar }) {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center survey-progress-bar">
        <div style={{ width: '18rem' }}>{progressBar}</div>
      </div>
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
