import { useLocation, useNavigate } from 'react-router-dom'
import {
  BarChartLine,
  BoxArrowRight,
  ClipboardCheck,
  Controller,
  Trophy,
} from 'react-bootstrap-icons'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const links = [
    {
      key: 'survey',
      label: 'Пройти новый тест',
      icon: <ClipboardCheck size={18} />,
      to: '/survey',
    },
    { key: 'dashboard', label: 'Статистика', icon: <BarChartLine size={18} />, to: '/dashboard' },
    {
      key: 'distortions',
      label: 'Игры на когнитивные искажения',
      icon: <Controller size={18} />,
      to: '/distortions',
    },
    {
      key: 'training',
      label: 'Тренировка по искажениям',
      icon: <Trophy size={18} />,
      to: '/training',
    },
  ]

  return (
    <nav className="md-sidebar d-flex flex-column">
      <div className="md-sidebar-brand">Mental Health</div>
      <div className="d-flex flex-column gap-1">
        {links.map((link) => (
          <button
            key={link.key}
            type="button"
            title={link.label}
            className={`md-sidebar-link${location.pathname.startsWith(link.to) ? ' active' : ''}`}
            onClick={() => navigate(link.to)}
          >
            {link.icon}
            <span className="md-sidebar-link-label">{link.label}</span>
          </button>
        ))}
        <button type="button" title="Выход" className="md-sidebar-link" onClick={handleLogout}>
          <BoxArrowRight size={18} />
          <span className="md-sidebar-link-label">Выход</span>
        </button>
      </div>
    </nav>
  )
}

export default Sidebar
