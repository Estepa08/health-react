import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">Опросник Бернса</h1>
      </header>

      <main className="layout__main">{children}</main>

      <footer className="layout__footer">
        <p className="layout__copyright">© 2024 Health Survey</p>
      </footer>
    </div>
  )
}
