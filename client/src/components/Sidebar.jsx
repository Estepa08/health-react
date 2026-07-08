import { useNavigate } from 'react-router-dom'
import { BarChartLine, BoxArrowRight, ClipboardCheck } from 'react-bootstrap-icons'

function Sidebar({ active }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const links = [
    { key: 'survey', label: 'Опрос', icon: <ClipboardCheck size={18} />, to: '/survey' },
    { key: 'dashboard', label: 'Дашборд', icon: <BarChartLine size={18} />, to: '/dashboard' },
  ]

  return (
    <nav className="md-sidebar d-flex flex-column">
      <div className="md-sidebar-brand">Health Check</div>
      <div className="d-flex flex-column gap-1">
        {links.map((link) => (
          <button
            key={link.key}
            type="button"
            className={`md-sidebar-link${active === link.key ? ' active' : ''}`}
            onClick={() => navigate(link.to)}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
        <button type="button" className="md-sidebar-link" onClick={handleLogout}>
          <BoxArrowRight size={18} />
          Выход
        </button>
      </div>
    </nav>
  )
}

export default Sidebar
