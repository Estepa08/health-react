import DashboardSidebar from './DashboardSidebar'

function DashboardLayout({ children }) {
  const rawUser = localStorage.getItem('user')
  const user = rawUser ? JSON.parse(rawUser) : null

  return (
    <div className="md-shell">
      <DashboardSidebar active="dashboard" />
      <div className="md-content">
        <div className="md-topbar d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Дашборд</h5>
          {user && <span className="text-meta">{user.name}</span>}
        </div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
