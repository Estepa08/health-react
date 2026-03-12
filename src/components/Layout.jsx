import React from 'react'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="layout__title">Health Survey</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="layout__main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">{children}</div>
          </div>
        </div>
      </main>

      <footer className="layout__footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="layout__copyright">© 2024 Health Survey</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
