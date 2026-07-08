import Header from './Header'

function Layout({ children }) {
  return (
    <div className="container py-5 bg-light">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Header />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
