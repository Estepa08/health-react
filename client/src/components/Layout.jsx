function Layout({ children }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">{children}</div>
      </div>
    </div>
  )
}

export default Layout
